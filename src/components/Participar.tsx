import { useState } from 'react'
import emailjs from '@emailjs/browser'
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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

type FormState = {
  nombre: string
  email: string
  rol: string
  empresa: string
  mensaje: string
}

const emptyForm: FormState = { nombre: '', email: '', rol: '', empresa: '', mensaje: '' }

export default function Participar() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.target.name === 'email') setEmailError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEmailError('')

    if (!isValidEmail(form.email)) {
      setEmailError('Ingresa un correo electrónico válido.')
      return
    }

    setStatus('loading')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_emails: import.meta.env.VITE_EMAILJS_TO_EMAILS,
          nombre: form.nombre,
          email: form.email,
          rol: form.rol || '—',
          empresa: form.empresa || '—',
          mensaje: form.mensaje,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setForm(emptyForm)
    } catch {
      setStatus('error')
    }
  }

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
              <span className="participar__info-icon"><MailIcon /></span>
              <span className="participar__info-text" style={{ fontFamily: "'Poppins', sans-serif" }}>
                contacto@willieclother.com
              </span>
            </div>
            <div className="participar__info-item">
              <span className="participar__info-icon"><LocationIcon /></span>
              <span className="participar__info-text" style={{ fontFamily: "'Poppins', sans-serif" }}>
                San Pedro Sula, Honduras
              </span>
            </div>
          </div>
        </div>

        {/* Columna derecha — Formulario */}
        {status === 'success' ? (
          <div className="participar__success">
            <div className="participar__success-icon">✓</div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif" }}>¡Propuesta enviada!</h3>
            <p style={{ fontFamily: "'Poppins', sans-serif" }}>
              Recibimos tu mensaje. Te contactaremos pronto al correo <strong>{form.email || 'proporcionado'}</strong>.
            </p>
            <button
              className="participar__success-btn"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              onClick={() => setStatus('idle')}
            >
              ENVIAR OTRA
            </button>
          </div>
        ) : (
          <form className="participar__form" onSubmit={handleSubmit}>
            <div className="participar__form-row">
              <input
                className="participar__input"
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input
                  className={`participar__input${emailError ? ' participar__input--error' : ''}`}
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
                {emailError && (
                  <p className="participar__email-error" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {emailError}
                  </p>
                )}
              </div>
            </div>
            <div className="participar__form-row">
              <input
                className="participar__input"
                type="text"
                name="rol"
                placeholder="Rol / Título"
                value={form.rol}
                onChange={handleChange}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
              <input
                className="participar__input"
                type="text"
                name="empresa"
                placeholder="Empresa"
                value={form.empresa}
                onChange={handleChange}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>
            <textarea
              className="participar__textarea"
              name="mensaje"
              placeholder="Cuéntanos más sobre ti o tu propuesta..."
              rows={5}
              value={form.mensaje}
              onChange={handleChange}
              required
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />

            {status === 'error' && (
              <p className="participar__error" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Algo salió mal. Intenta de nuevo.
              </p>
            )}

            <button
              type="submit"
              className="participar__submit"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'ENVIANDO...' : 'ENVIAR PROPUESTA'}
            </button>
          </form>
        )}

      </div>
    </section>
  )
}
