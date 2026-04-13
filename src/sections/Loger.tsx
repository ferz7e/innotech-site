import { useEffect, useState } from 'react'

/**
 * Loader de entrada:
 * - bloquea el scroll del documento mientras está visible
 * - inicia fade-out antes del fin
 * - notifica al padre cuando termina la secuencia
 */
type LogerProps = {
  duration?: number
  onFinish?: () => void
}

const DEFAULT_LOGER_DURATION_MS = 4200
const OVERLAY_FADE_MS = 550

function Loger({ duration = DEFAULT_LOGER_DURATION_MS, onFinish }: LogerProps) {
  const [isOverlayExiting, setIsOverlayExiting] = useState(false)

  useEffect(() => {
    // Si duration fuese menor al fade, evitamos delay negativo.
    const overlayFadeAtMs = Math.max(duration - OVERLAY_FADE_MS, 0)

    // Guardamos y restauramos el overflow para no afectar el estado previo del body.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const overlayTimerId = window.setTimeout(() => {
      setIsOverlayExiting(true)
    }, overlayFadeAtMs)

    const finishTimerId = window.setTimeout(() => {
      onFinish?.()
    }, duration)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(overlayTimerId)
      window.clearTimeout(finishTimerId)
    }
  }, [duration, onFinish])

  return (
    <div
      className={`loger-overlay fixed inset-0 z-[90] flex items-center justify-center bg-[var(--bg)] transition-opacity duration-[550ms] ${
        isOverlayExiting ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <span className="loger-logo inline-block text-[1.8rem] font-black tracking-[-0.06em] text-[var(--text)]">
        innotech
      </span>
    </div>
  )
}

export default Loger
