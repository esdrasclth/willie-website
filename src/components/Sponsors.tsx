import bloxiImg from '../assets/bloxi.png'
import macImg from '../assets/mac.png'
import brandsoftImg from '../assets/brandsoft.png'
import latwentyImg from '../assets/latwenty.png'
import { useInView } from '../hooks/useInView'

const sponsors = [
  { id: 1, name: 'Bloxi', img: bloxiImg, width: '140px' },
  { id: 2, name: 'Mac', img: macImg, width: '140px' },
  { id: 3, name: 'Brandsoft', img: brandsoftImg, width: '60px' },
  { id: 4, name: 'La Twenty', img: latwentyImg, width: '90px' },
]

const delays = [' anim-d1', ' anim-d2', ' anim-d3', ' anim-d4']

export default function Sponsors() {
  const { ref, inView } = useInView()
  const v = inView ? ' is-visible' : ''

  return (
    <section
      id="patrocinador"
      className="py-12 px-6 md:px-12"
      style={{ background: 'linear-gradient(135deg, #e60000, #1a0000)' }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`mb-10 anim-fade-up${v}`}>
          <p
            className="text-xs tracking-[4px] font-medium mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.6)' }}
          >
            ALIANZAS
          </p>
          <h2
            className="text-white font-black text-4xl tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            PATROCINADORES
          </h2>
          <div className="mt-4 w-16 h-1 bg-white/40" />
        </div>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {sponsors.map((sponsor, i) => (
            <div
              key={sponsor.id}
              className={`w-48 h-24 rounded-xl flex items-center justify-center p-4 anim-fade-up${delays[i]}${v}`}
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <img
                src={sponsor.img}
                alt={sponsor.name}
                style={{ filter: 'brightness(0) invert(1)', width: sponsor.width, height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
