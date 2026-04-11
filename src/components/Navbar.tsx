import { useState, useEffect } from 'react'

const links = ['INICIO', 'EPISODIOS', 'SOBRE MI', 'REVIEWS', 'CONTACTO']

export default function Navbar() {
  const [active, setActive] = useState('INICIO')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 w-full z-100 flex items-center justify-between px-12 py-5 transition-all duration-300"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: scrolled ? 'rgba(0, 0, 0, 0.55)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <a
        href="#inicio"
        onClick={() => setActive('INICIO')}
        className="text-white text-2xl tracking-widest font-black no-underline"
      >
        WILLIE CLOTHER
      </a>

      <ul className="flex gap-10 list-none m-0 p-0">
        {links.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={() => setActive(item)}
              className="text-white text-base tracking-widest hover:opacity-70 transition-opacity no-underline pb-1"
              style={
                active === item
                  ? { borderBottom: '2px solid #e60000' }
                  : { borderBottom: '2px solid transparent' }
              }
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#patrocinador"
        className="text-white text-sm font-semibold tracking-widest px-6 py-3 rounded-lg transition-all no-underline"
        style={{ fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(135deg, #e60000, #1a0000)' }}
      >
        SÉ PATROCINADOR
      </a>
    </nav>
  )
}
