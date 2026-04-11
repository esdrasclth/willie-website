import { useEffect, useState } from 'react'

export interface YoutubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  url: string
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const CHANNEL_HANDLE = 'WillieClother'

async function getChannelUploadsPlaylistId(): Promise<string> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
  )
  const data = await res.json()
  if (data.error) throw new Error(`YouTube API error (channels): ${JSON.stringify(data.error)}`)
  if (!data.items || data.items.length === 0) throw new Error(`Canal no encontrado para handle: ${CHANNEL_HANDLE}`)
  return data.items[0].contentDetails.relatedPlaylists.uploads
}

// Parsea duración ISO 8601 (PT1M30S) a segundos
function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')
  return hours * 3600 + minutes * 60 + seconds
}

function isShort(item: any): boolean {
  const duration = parseDuration(item.contentDetails.duration)
  const title: string = item.snippet.title ?? ''
  const description: string = item.snippet.description ?? ''
  const tags: string[] = item.snippet.tags ?? []

  const hasShortHashtag =
    /#shorts/i.test(title) ||
    /#shorts/i.test(description) ||
    tags.some((t) => /^shorts$/i.test(t))

  return (duration <= 180 && hasShortHashtag) || duration <= 60
}

async function getVideoDetails(videoIds: string[]): Promise<Record<string, any>> {
  if (videoIds.length === 0) return {}
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(',')}&key=${API_KEY}`
  )
  const data = await res.json()
  if (data.error) throw new Error(`YouTube API error (videos): ${JSON.stringify(data.error)}`)

  const map: Record<string, any> = {}
  for (const item of data.items ?? []) {
    map[item.id] = item
  }
  return map
}

// Pagina la playlist y devuelve los primeros `needed` videos que NO son Shorts
async function fetchNonShortVideos(playlistId: string, needed: number): Promise<YoutubeVideo[]> {
  const results: YoutubeVideo[] = []
  let pageToken: string | undefined = undefined
  const MAX_PAGES = 6 // hasta 300 videos revisados

  for (let page = 0; page < MAX_PAGES && results.length < needed; page++) {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('key', API_KEY)
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
