import './Participar.css'

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

export default function Participar() {
  return (
    <section id="participar" className="participar">
      <div className="participar__inner">

        {/* Columna izquierda */}
        <div className="participar__content">
          <h2 className="participar__title" style={{ fontFamily: "'Poppins', sans-serif" }}>
            ¿QUIERES<br />PARTICIPAR?
          </h2>

          <p className="participar__desc" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Si tienes una historia que vale la pena contar o representas a una marca que quiere alinearse con nuestros valores, queremos escucharte.
          </p>

          <div className="participar__info">
            <div className="participar__info-item">
              <span className="participar__info-icon">
                <MailIcon />
              </span>
              <span className="participar__info-text" style={{ fontFamily: "'Poppins', sans-serif" }}>
                contacto@willieclother.com
              </span>
            </div>
            <div className="participar__info-item">
              <span className="participar__info-icon">
                <LocationIcon />
              </span>
              <span className="participar__info-text" style={{ fontFamily: "'Poppins', sans-serif" }}>
                San Pedro Sula, Honduras
              </span>
            </div>
          </div>
        </div>

        {/* Columna derecha — Formulario */}
        <form className="participar__form">
          <div className="participar__form-row">
            <input
              className="participar__input"
              type="text"
              placeholder="Nombre"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
            <input
              className="participar__input"
              type="email"
              placeholder="Email"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>
          <div className="participar__form-row">
            <input
              className="participar__input"
              type="text"
              placeholder="Rol / Título"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
            <input
              className="participar__input"
              type="text"
              placeholder="Empresa"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>
          <textarea
            className="participar__textarea"
            placeholder="Cuéntanos más sobre ti o tu propuesta..."
            rows={5}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          <button
            type="submit"
            className="participar__submit"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            ENVIAR PROPUESTA
          </button>
        </form>

      </div>
    </section>
  )
}
