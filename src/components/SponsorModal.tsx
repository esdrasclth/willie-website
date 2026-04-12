import { useEffect } from 'react'
import './SponsorModal.css'

type Props = {
  open: boolean
  onClose: () => void
}

export default function SponsorModal({ open, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="sponsor-modal__overlay" onClick={onClose}>
      <div
        className="sponsor-modal__box"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header */}
        <div className="sponsor-modal__header">
          <div>
            <p className="sponsor-modal__eyebrow">ALIANZAS ESTRATÉGICAS</p>
            <h2 className="sponsor-modal__title">SÉ PATROCINADOR</h2>
          </div>
          <button className="sponsor-modal__close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="sponsor-modal__body">
          <p className="sponsor-modal__desc">
            ¿Tu marca quiere conectar con una audiencia auténtica y comprometida?
            Escríbenos directamente y conversamos sobre cómo podemos trabajar juntos.
          </p>

          <a
            href="mailto:williejosue26@gmail.com?subject=Quiero%20ser%20patrocinador%20—%20Willie%20Clother"
            className="sponsor-modal__cta"
          >
            williejosue26@gmail.com
          </a>

          <p className="sponsor-modal__hint">
            Haz clic en el correo para abrir tu cliente de email.
          </p>
        </div>
      </div>
    </div>
  )
}
