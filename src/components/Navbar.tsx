import { useState, useEffect } from 'react'
import './Navbar.css'
import SponsorModal from './SponsorModal'

const links = [
  { label: 'INICIO', href: '#inicio' },
  { label: 'EPISODIOS', href: '#episodios' },
  { label: 'SOBRE MÍ', href: '#sobre-mi' },
  { label: 'REVIEWS', href: '#resenas' },
  { label: 'FAQ', href: '#faq' },
  { label: 'PARTICIPAR', href: '#participar' },
]

export default function Navbar() {
  const [active, setActive] = useState('INICIO')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sponsorOpen, setSponsorOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLink(label: string) {
    setActive(label)
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
        style={{
          fontFamily: "'Poppins', sans-serif",
          background: scrolled || menuOpen ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="#inicio"
          onClick={() => handleLink('INICIO')}
          className="text-white tracking-widest font-black no-underline navbar__logo"
        >
          WILLIE CLOTHER
        </a>

        {/* Links desktop */}
        <ul className="navbar__links-desktop flex gap-10 list-none m-0 p-0">
          {links.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => handleLink(item.label)}
                className="text-white text-sm tracking-widest hover:opacity-70 transition-opacity no-underline pb-1"
                style={
                  active === item.label
                    ? { borderBottom: '2px solid #e60000' }
                    : { borderBottom: '2px solid transparent' }
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón patrocinador desktop */}
        <button
          onClick={() => setSponsorOpen(true)}
          className="navbar__sponsor-btn text-white text-sm font-semibold tracking-widest px-6 py-3 rounded-lg transition-all"
          style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)', border: 'none', cursor: 'pointer' }}
        >
          SÉ PATROCINADOR
        </button>

        {/* Hamburguesa */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`navbar__bar${menuOpen ? ' navbar__bar--open-1' : ''}`} />
          <span className={`navbar__bar${menuOpen ? ' navbar__bar--open-2' : ''}`} />
          <span className={`navbar__bar${menuOpen ? ' navbar__bar--open-3' : ''}`} />
        </button>
      </nav>

      {/* Menú móvil */}
      <div className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}>
        <ul className="list-none m-0 p-0 flex flex-col">
          {links.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => handleLink(item.label)}
                className="navbar__mobile-link"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  borderLeft: active === item.label ? '3px solid #e60000' : '3px solid transparent',
                  color: active === item.label ? '#ffffff' : 'rgba(255,255,255,0.7)',
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => { setMenuOpen(false); setSponsorOpen(true) }}
          className="navbar__mobile-sponsor"
          style={{ fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(135deg, #e60000, #1a0000)', border: 'none', cursor: 'pointer' }}
        >
          SÉ PATROCINADOR
        </button>
      </div>

      <SponsorModal open={sponsorOpen} onClose={() => setSponsorOpen(false)} />
    </>
  )
}
