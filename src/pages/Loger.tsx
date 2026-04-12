import { useEffect, useState } from 'react'

type LogerProps = {
  duration?: number
  onFinish?: () => void
}

function Loger({ duration = 3150, onFinish }: LogerProps) {
  const [isOverlayExiting, setIsOverlayExiting] = useState(false)

  useEffect(() => {
    const overlayFadeAt = Math.max(duration - 450, 0)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const overlayTimer = window.setTimeout(() => {
      setIsOverlayExiting(true)
    }, overlayFadeAt)

    const finishTimer = window.setTimeout(() => {
      onFinish?.()
    }, duration)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(overlayTimer)
      window.clearTimeout(finishTimer)
    }
  }, [duration, onFinish])

  return (
    <div
      className={`loger-overlay fixed inset-0 z-[90] flex items-center justify-center bg-[var(--bg)] transition-opacity duration-[450ms] ${
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
