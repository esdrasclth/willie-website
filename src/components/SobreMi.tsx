import wilieImg from '../assets/perfil.png'
import './SobreMi.css'

export default function SobreMi() {
  return (
    <section id="sobre-mi" className="sobre-mi">
      <div className="sobre-mi__content">
        <div className="sobre-mi__text">
          <p
            className="text-xs tracking-[4px] font-medium mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", color: '#e60000' }}
          >
            SOBRE MÍ
          </p>
          <h2 className="sobre-mi__title">
            <span className="sobre-mi__title--black">WILLIE </span>
            <span className="sobre-mi__title--red">CLOTHER</span>
          </h2>
          <div className="mt-4 mb-7 w-16 h-1" style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)' }} />

          <p className="sobre-mi__description">
            No soy solo un entrevistador; soy un curador de experiencias. Con
            amplia trayectoria analizando el comportamiento humano y la
            estrategia de negocios, he creado un espacio donde las preguntas
            difíciles encuentran respuestas honestas.
          </p>

          <blockquote className="sobre-mi__quote">
            "Todos saben algo que puede cambiar tu vida, solo tienes que saber
            cómo escucharlo."
          </blockquote>

          <p className="sobre-mi__description">
            En cada episodio me sumerjo profundo en las historias de quienes
            tienen algo valioso que compartir, para darte herramientas
            prácticas que impulsen tu evolución personal y profesional.
          </p>
        </div>

        <div className="sobre-mi__image-wrapper">
          <img src={wilieImg} alt="Willie Clother" className="sobre-mi__image" />
        </div>
      </div>
    </section>
  )
}
