import { useEffect, useState } from 'react'
import { getChannelUploadsPlaylistId, getVideoDetails, isShort } from '../utils/youtube'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const CHANNEL_HANDLE = 'WillieClother'

export interface ChannelStats {
  subscribers: string
  views: string
  videos: string
  years: string
}

function fmt(n: string | number): string {
  const num = Number(n)
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M+`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K+`
  return `${num}+`
}

async function countNonShortVideos(playlistId: string): Promise<number> {
  let count = 0
  let pageToken: string | undefined = undefined

  while (true) {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('key', API_KEY)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const res = await fetch(url.toString())
    const data = await res.json()
    if (data.error) throw new Error(`YouTube API error: ${JSON.stringify(data.error)}`)

    const items: any[] = data.items ?? []
    const videoIds = items.map((i) => i.snippet.resourceId.videoId)
    const detailsMap = await getVideoDetails(videoIds)

    for (const item of items) {
      const detail = detailsMap[item.snippet.resourceId.videoId]
      if (detail && !isShort(detail)) count++
    }

    if (!data.nextPageToken) break
    pageToken = data.nextPageToken
  }

  return count
}

export function useChannelStats() {
  const [stats, setStats] = useState<ChannelStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [channelRes, playlistId] = await Promise.all([
          fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
          ).then((r) => r.json()),
          getChannelUploadsPlaylistId(),
        ])

        if (!channelRes.items?.length) return

        const { statistics, snippet } = channelRes.items[0]
        const created = new Date(snippet.publishedAt)
        const years = Math.max(1, Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24 * 365)))
        const episodeCount = await countNonShortVideos(playlistId)

        setStats({
          subscribers: fmt(statistics.subscriberCount ?? 0),
          views: fmt(statistics.viewCount ?? 0),
          videos: fmt(episodeCount),
          years: `${years}+`,
        })
      } catch (err) {
        console.error('[useChannelStats]', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { stats, loading }
}
