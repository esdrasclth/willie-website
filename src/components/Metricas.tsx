import './Metricas.css'
import { useInView } from '../hooks/useInView'

const metrics = [
  { value: '3+', label: 'Episodios', description: 'Conversaciones publicadas' },
  { value: '76+', label: 'Suscriptores', description: 'En YouTube' },
  { value: '525+', label: 'Visualizaciones', description: 'Vistas totales' },
  { value: '3+', label: 'Años', description: 'Creando contenido' },
]

const delays = ['', ' anim-d1', ' anim-d2', ' anim-d3']

export default function Metricas() {
  const { ref, inView } = useInView()
  const v = inView ? ' is-visible' : ''

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
                {m.value}
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
