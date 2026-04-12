import { useState } from 'react'
import './Footer.css'

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Episodios', href: '#episodios' },
  { label: 'Patrocinadores', href: '#patrocinador' },
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Participar', href: '#participar' },
]

const socialLinks = [
  { icon: <YoutubeIcon />, href: 'https://www.youtube.com/@WillieClother', label: 'YouTube' },
  { icon: <FacebookIcon />, href: 'https://www.facebook.com/profile.php?id=61584598955883', label: 'Facebook' },
  { icon: <TikTokIcon />, href: 'https://www.tiktok.com/@willieclother1', label: 'TikTok' },
]

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': import.meta.env.VITE_BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          listIds: [Number(import.meta.env.VITE_BREVO_LIST_ID)],
          updateEnabled: true,
        }),
      })

      if (res.ok || res.status === 204) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="footer__newsletter">
      <p className="footer__nav-title" style={{ fontFamily: "'Poppins', sans-serif" }}>
        NEWSLETTER
      </p>
      <p className="footer__newsletter-desc" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Únete y recibe los nuevos episodios directo en tu correo.
      </p>

      {status === 'success' ? (
        <p className="footer__newsletter-success" style={{ fontFamily: "'Poppins', sans-serif" }}>
          ¡Listo! Ya estás suscrito.
        </p>
      ) : (
        <form className="footer__newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="footer__newsletter-input"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            required
          />
          <button
            type="submit"
            className="footer__newsletter-btn"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? '...' : 'UNIRME'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="footer__newsletter-error" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Algo salió mal. Intenta de nuevo.
        </p>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Top */}
        <div className="footer__top">
          {/* Marca */}
          <div className="footer__brand">
            <a href="#inicio" className="footer__logo" style={{ fontFamily: "'Poppins', sans-serif" }}>
              WILLIE<br />
              <span className="footer__logo--red">CLOTHER</span>
            </a>
            <p className="footer__tagline" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Todos saben algo que puede<br />cambiar tu vida.
            </p>
            {/* Redes sociales */}
            <div className="footer__socials">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="footer__nav">
            <p className="footer__nav-title" style={{ fontFamily: "'Poppins', sans-serif" }}>
              NAVEGACIÓN
            </p>
            <ul className="footer__nav-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__nav-link"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto + Newsletter */}
          <div className="footer__contact">
            <p className="footer__nav-title" style={{ fontFamily: "'Poppins', sans-serif" }}>
              CONTACTO
            </p>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__contact-label" style={{ fontFamily: "'Poppins', sans-serif" }}>Email</span>
                <a
                  href="mailto:contacto@willieclother.com"
                  className="footer__contact-value"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  contacto@willieclother.com
                </a>
              </li>
              <li>
                <span className="footer__contact-label" style={{ fontFamily: "'Poppins', sans-serif" }}>Ubicación</span>
                <span className="footer__contact-value" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  San Pedro Sula, Honduras
                </span>
              </li>
            </ul>

            <Newsletter />
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy" style={{ fontFamily: "'Poppins', sans-serif" }}>
            © {new Date().getFullYear()} Willie Clother. Todos los derechos reservados.
          </p>
          <p className="footer__made" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Hecho con pasión en Honduras por{' '}
            <a
              href="https://www.instagram.com/esdrasclth/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__made-link"
            >
              Esdras Clother
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}
