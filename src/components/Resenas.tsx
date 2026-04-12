import './Resenas.css'
import { useInView } from '../hooks/useInView'

const resenas = [
  {
    nombre: 'Carlos Mendoza',
    cargo: 'Emprendedor',
    texto:
      'Willie tiene una habilidad única para hacer que sus invitados se abran de una manera que raramente ves en otros podcasts. Cada episodio me deja con algo nuevo que aplicar.',
  },
  {
    nombre: 'Sofía Ramírez',
    cargo: 'Directora de Marketing',
    texto:
      'El podcast de Willie cambió mi perspectiva sobre el éxito. Las conversaciones son profundas, honestas y siempre llenas de valor real. Lo recomiendo a todos mis colegas.',
  },
  {
    nombre: 'Andrés Torres',
    cargo: 'Coach de Negocios',
    texto:
      'De los pocos espacios donde se habla sin filtros de los fracasos y los aprendizajes reales. Willie sabe escuchar y eso hace toda la diferencia.',
  },
]

const delays = [' anim-d1', ' anim-d2', ' anim-d3']

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export default function Resenas() {
  const { ref, inView } = useInView()
  const v = inView ? ' is-visible' : ''

  return (
    <section id="resenas" className="resenas">
      <div className="resenas__inner" ref={ref}>
        {/* Header */}
        <div className={`resenas__header anim-fade-up${v}`}>
          <p
            className="text-xs tracking-[4px] font-medium mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", color: '#e60000' }}
          >
            TESTIMONIOS
          </p>
          <h2
            className="text-black font-black text-4xl tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            LO QUE DICE LA COMUNIDAD
          </h2>
          <div className="mt-4 w-16 h-1" style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)' }} />
        </div>

        {/* Cards */}
        <div className="resenas__grid">
          {resenas.map((r, i) => (
            <div key={i} className={`resenas__card anim-fade-up${delays[i]}${v}`}>
              <div className="flex gap-1 mb-5" style={{ color: '#e60000' }}>
                {Array.from({ length: 5 }).map((_, s) => <StarIcon key={s} />)}
              </div>

              <p
                className="resenas__texto"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                "{r.texto}"
              </p>

              <div className="resenas__autor">
                <div className="resenas__avatar">
                  {r.nombre.charAt(0)}
                </div>
                <div>
                  <p
                    className="resenas__nombre"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {r.nombre}
                  </p>
                  <p
                    className="resenas__cargo"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {r.cargo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
