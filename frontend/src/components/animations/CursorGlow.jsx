import { useEffect, useRef } from 'react'
import { useReducedMotion, useCanHover } from '../../hooks/useMedia'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const canHover = useCanHover()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!canHover || reducedMotion) return

    const glow = glowRef.current
    if (!glow) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12
      currentY += (mouseY - currentY) * 0.12
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [canHover, reducedMotion])

  if (!canHover || reducedMotion) return null

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}
