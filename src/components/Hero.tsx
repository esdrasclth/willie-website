import heroImg from '../assets/hero.png'
import './Hero.css'

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <img src={heroImg} alt="Hero" className="hero__img" />
      <div className="hero__content">
        <h1
          className="text-white font-black tracking-widest leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.3rem, 4.2vw, 4.2rem)' }}
        >
          TODOS SABEN ALGO<br />
          QUE PUEDE<br />
          CAMBIAR TU VIDA
        </h1>
        <div className="hero__accent" />
        <p
          className="text-white/80 font-light mt-6"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', lineHeight: '1.7' }}
        >
          Descubre las historias, visiones y experiencias de personas que están
          redefiniendo el éxito, y el camino real detrás de ambos.
        </p>

        <div className="flex items-center gap-4 mt-8">
          {/* YouTube — botón principal */}
          <a
            href="#youtube"
            className="flex items-center gap-3 text-white font-semibold text-sm tracking-wider px-8 py-3 rounded-lg transition-all hover:opacity-90"
            style={{ fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(135deg, #e60000, #1a0000)' }}
          >
            <YoutubeIcon />
            VER EN YOUTUBE
          </a>

          {/* Facebook — solo icono */}
          <a
            href="#facebook"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/35 transition-all backdrop-blur-sm"
          >
            <FacebookIcon />
          </a>

          {/* TikTok — solo icono */}
          <a
            href="#tiktok"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/35 transition-all backdrop-blur-sm"
          >
            <TikTokIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
