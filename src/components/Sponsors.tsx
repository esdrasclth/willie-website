export default function Sponsors() {
  const sponsors = [
    { id: 1, name: 'Patrocinador 1' },
    { id: 2, name: 'Patrocinador 2' },
    { id: 3, name: 'Patrocinador 3' },
    { id: 4, name: 'Patrocinador 4' },
  ]

  return (
    <section
      id="patrocinador"
      className="py-12 px-12"
      style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p
            className="text-xs tracking-[4px] font-medium mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.6)' }}
          >
            ALIANZAS
          </p>
          <h2
            className="text-white font-black text-4xl tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            PATROCINADORES
          </h2>
          <div className="mt-4 w-16 h-1 bg-white/40" />
        </div>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="w-48 h-24 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <span
                className="text-white/50 text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
