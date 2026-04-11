import { useYoutubeVideos } from '../hooks/useYoutubeVideos'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function VideoCard({ title, thumbnail, url, publishedAt }: {
  title: string
  thumbnail: string
  url: string
  publishedAt: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl overflow-hidden bg-white hover:scale-[1.02] transition-transform duration-300 no-underline"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)' }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p
          className="text-black font-semibold text-sm leading-snug line-clamp-2"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {title}
        </p>
        <p
          className="text-black/50 text-xs mt-auto"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {formatDate(publishedAt)}
        </p>
      </div>
    </a>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-white animate-pulse">
      <div className="aspect-video bg-black/10" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-black/10 rounded w-full" />
        <div className="h-4 bg-black/10 rounded w-3/4" />
        <div className="h-3 bg-black/5 rounded w-1/3 mt-2" />
      </div>
    </div>
  )
}

export default function RecentEpisodes() {
  const { videos, loading, error } = useYoutubeVideos(6)

  return (
    <section
      id="episodios"
      className="py-20 px-12"
      style={{ background: '#edede9' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p
              className="text-xs tracking-[4px] font-medium mb-3"
              style={{ fontFamily: "'Poppins', sans-serif", color: '#e60000' }}
            >
              PODCAST
            </p>
            <h2
              className="text-black font-black text-4xl tracking-wide"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              EPISODIOS RECIENTES
            </h2>
            <div className="mt-4 w-16 h-1" style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)' }} />
          </div>
          <a
            href="https://www.youtube.com/@WillieClother"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-black font-semibold text-sm tracking-widest no-underline hover:opacity-60 transition-opacity"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            VER MÁS <span className="text-xl" style={{ color: '#e60000' }}>›</span>
          </a>
        </div>

        {/* Grid */}
        {error ? (
          <p className="text-black/50 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : videos.map((video) => <VideoCard key={video.id} {...video} />)
            }
          </div>
        )}

      </div>
    </section>
  )
}
