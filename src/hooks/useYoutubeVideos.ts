import { useEffect, useState } from 'react'
import { getChannelUploadsPlaylistId, getVideoDetails, isShort } from '../utils/youtube'

export interface YoutubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  url: string
}

async function fetchNonShortVideos(playlistId: string, needed: number): Promise<YoutubeVideo[]> {
  const results: YoutubeVideo[] = []
  let pageToken: string | undefined = undefined
  const MAX_PAGES = 6

  for (let page = 0; page < MAX_PAGES && results.length < needed; page++) {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('key', import.meta.env.VITE_YOUTUBE_API_KEY)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const res = await fetch(url.toString())
    const data = await res.json()
    if (data.error) throw new Error(`YouTube API error (playlistItems): ${JSON.stringify(data.error)}`)

    const items: any[] = data.items ?? []
    const videoIds = items.map((i) => i.snippet.resourceId.videoId)
    const detailsMap = await getVideoDetails(videoIds)

    for (const item of items) {
      if (results.length >= needed) break
      const videoId = item.snippet.resourceId.videoId
      const detail = detailsMap[videoId]
      if (!detail || isShort(detail)) continue

      const snippet = item.snippet
      results.push({
        id: videoId,
        title: snippet.title,
        thumbnail:
          snippet.thumbnails?.maxres?.url ||
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url,
        publishedAt: snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      })
    }

    if (!data.nextPageToken) break
    pageToken = data.nextPageToken
  }

  return results
}

export function useYoutubeVideos(count = 6) {
  const [videos, setVideos] = useState<YoutubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const playlistId = await getChannelUploadsPlaylistId()
        const nonShorts = await fetchNonShortVideos(playlistId, count)
        setVideos(nonShorts)
      } catch (err) {
        console.error('[useYoutubeVideos] Error:', err)
        setError('No se pudieron cargar los episodios.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [count])

  return { videos, loading, error }
}
