const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export const CHANNEL_HANDLE = 'WillieClother'

export async function getChannelUploadsPlaylistId(): Promise<string> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
  )
  const data = await res.json()
  if (data.error) throw new Error(`YouTube API error (channels): ${JSON.stringify(data.error)}`)
  if (!data.items || data.items.length === 0) throw new Error(`Canal no encontrado: ${CHANNEL_HANDLE}`)
  return data.items[0].contentDetails.relatedPlaylists.uploads
}

export async function getVideoDetails(videoIds: string[]): Promise<Record<string, any>> {
  if (videoIds.length === 0) return {}
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(',')}&key=${API_KEY}`
  )
  const data = await res.json()
  if (data.error) throw new Error(`YouTube API error (videos): ${JSON.stringify(data.error)}`)
  const map: Record<string, any> = {}
  for (const item of data.items ?? []) map[item.id] = item
  return map
}

function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  return parseInt(match[1] || '0') * 3600 + parseInt(match[2] || '0') * 60 + parseInt(match[3] || '0')
}

export function isShort(item: any): boolean {
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
