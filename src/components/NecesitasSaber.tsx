import { useState } from 'react'
import './NecesitasSaber.css'

const faqs = [
  {
    pregunta: '¿De qué trata el podcast?',
    respuesta:
      'Willie Clother es un podcast de conversaciones profundas con emprendedores, líderes y personas que han recorrido caminos poco convencionales. Cada episodio explora las historias reales detrás del éxito, los fracasos y las lecciones que transforman.',
  },
  {
    pregunta: '¿Dónde puedo escucharlo?',
    respuesta:
      'Los episodios están disponibles en YouTube y próximamente en las principales plataformas de streaming. Puedes suscribirte al canal para no perderte ningún episodio nuevo.',
  },
  {
    pregunta: '¿Con qué frecuencia se publican episodios?',
    respuesta:
      'Publicamos nuevos episodios de forma regular. Suscríbete al canal de YouTube y activa las notificaciones para enterarte en cuanto salga contenido nuevo.',
  },
  {
    pregunta: '¿Cómo puedo ser invitado al podcast?',
    respuesta:
      'Si tienes una historia que vale la pena contar o una visión que puede cambiar la perspectiva de otros, puedes contactarnos a través de nuestras redes sociales. Buscamos personas auténticas con experiencias reales.',
  },
  {
    pregunta: '¿Cómo puedo apoyar el proyecto?',
    respuesta:
      'La mejor forma de apoyarnos es suscribirte al canal, compartir los episodios que más te impacten y dejar un comentario. También puedes contactarnos si estás interesado en ser patrocinador del podcast.',
  },
  {
    pregunta: '¿El contenido es apto para cualquier persona?',
    respuesta:
      'Sí. El podcast está diseñado para cualquier persona con curiosidad por crecer, ya sea en los negocios, en lo personal o en ambos. No importa en qué etapa estés, siempre hay algo valioso que llevarte de cada episodio.',
  },
]

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        fontWeight: 300,
        lineHeight: 1,
        color: '#e60000',
        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      +
    </span>
  )
}

export default function NecesitasSaber() {
  const [abierto, setAbierto] = useState<number | null>(null)

  return (
    <section id="faq" className="necesitas-saber">
      <div className="necesitas-saber__inner">
        {/* Header */}
        <div className="necesitas-saber__header">
          <p
            className="text-xs tracking-[4px] font-medium mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", color: '#e60000' }}
          >
            FAQ
          </p>
          <h2
            className="text-black font-black text-4xl tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            TODO LO QUE NECESITAS SABER
          </h2>
          <div className="mt-4 w-16 h-1" style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)' }} />
        </div>

        {/* Acordeón */}
        <div className="necesitas-saber__list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`necesitas-saber__item${abierto === i ? ' necesitas-saber__item--open' : ''}`}
            >
              <button
                className="necesitas-saber__trigger"
                onClick={() => setAbierto(abierto === i ? null : i)}
              >
                <span
                  className="necesitas-saber__pregunta"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {faq.pregunta}
                </span>
                <span className={`necesitas-saber__icon${abierto === i ? ' necesitas-saber__icon--open' : ''}`}>
                  <PlusIcon open={abierto === i} />
                </span>
              </button>

              <div className="necesitas-saber__body">
                <div className="necesitas-saber__body-inner">
                  <p
                    className="necesitas-saber__respuesta"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {faq.respuesta}
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
