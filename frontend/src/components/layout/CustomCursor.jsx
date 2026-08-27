import { useEffect, useRef } from 'react'
import { useCanHover } from '../../hooks/useMedia'

const LABELS = {
  view: 'View',
  open: 'Open',
  project: 'View',
  explore: 'Explore',
  external: 'Open',
  character: '',
  default: '',
}

export default function CustomCursor() {
  const canHover = useCanHover()
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const state = useRef({ x: 0, y: 0, mode: 'default', hovering: false, inHero: false })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!canHover) return

    document.body.classList.add('custom-cursor-active')

    let raf = 0
    const apply = () => {
      const s = state.current
      const dot = dotRef.current
      const ring = ringRef.current
      const root = rootRef.current
      const label = labelRef.current

      ringPos.current.x += (s.x - ringPos.current.x) * 0.14
      ringPos.current.y += (s.y - ringPos.current.y) * 0.14

      if (dot) {
        dot.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%)`
      }
      if (ring) {
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }
      if (root) {
        root.classList.toggle('hovering', s.hovering)
        root.classList.toggle('cursor-root--hero', s.inHero && !s.hovering)
      }
      if (label) {
        const text = LABELS[s.mode] && s.mode !== 'character' ? LABELS[s.mode] : ''
        label.textContent = text
        label.style.opacity = text ? '1' : '0'
        label.style.transform = `translate(${s.x + 18}px, ${s.y}px) translateY(-50%)`
      }
    }

    const tick = () => {
      apply()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      state.current.x = e.clientX
      state.current.y = e.clientY

      const hero = document.getElementById('home')
      if (hero) {
        const rect = hero.getBoundingClientRect()
        state.current.inHero =
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom &&
          e.clientX >= rect.left &&
          e.clientX <= rect.right
      }
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        state.current.mode = target.dataset.cursor || 'default'
        state.current.hovering = true
      }
    }

    const onOut = (e) => {
      const related = e.relatedTarget
      if (!related?.closest?.('[data-cursor]')) {
        state.current.mode = 'default'
        state.current.hovering = false
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [canHover])

  if (!canHover) return null

  return (
    <div ref={rootRef} className="cursor-root cursor-root--cinematic" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={labelRef} className="cursor-label" />
    </div>
  )
}
