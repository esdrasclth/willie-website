import './Metricas.css'
import { useInView } from '../hooks/useInView'
import { useChannelStats } from '../hooks/useChannelStats'

const delays = ['', ' anim-d1', ' anim-d2', ' anim-d3']

export default function Metricas() {
  const { ref, inView } = useInView()
  const { stats, loading } = useChannelStats()
  const v = inView ? ' is-visible' : ''

  const metrics = [
    { value: stats?.videos ?? '—', label: 'Episodios', description: 'Conversaciones publicadas' },
    { value: stats?.subscribers ?? '—', label: 'Suscriptores', description: 'En YouTube' },
    { value: stats?.views ?? '—', label: 'Visualizaciones', description: 'Vistas totales' },
    { value: stats?.years ?? '—', label: 'Años', description: 'Creando contenido' },
  ]

  return (
    <section id="metricas" className="metricas">
      <div className="metricas__inner" ref={ref}>
        {/* Header */}
        <div className={`metricas__header anim-fade-up${v}`}>
          <p
            className="text-xs tracking-[4px] font-medium mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", color: '#e60000' }}
          >
            IMPACTO
          </p>
          <h2
            className="text-black font-black text-4xl tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            EL PODCAST EN NÚMEROS
          </h2>
          <div className="mt-4 w-16 h-1" style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)' }} />
        </div>

        {/* Grid */}
        <div className="metricas__grid">
          {metrics.map((m, i) => (
            <div key={i} className={`metricas__card anim-fade-up${delays[i]}${v}`}>
              <span
                className="metricas__value"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {loading ? (
                  <span className="metricas__skeleton" />
                ) : (
                  m.value
                )}
              </span>
              <span
                className="metricas__label"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {m.label}
              </span>
              <span
                className="metricas__desc"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {m.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
