import { useEffect, useRef } from 'react'
import { useCoarsePointer } from './useMedia'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/** Viewport-wide pointer state for hero character tracking */
export function useHeroPointer(heroRef) {
  const pointer = useRef({
    nx: 0.5,
    ny: 0.5,
    x: 0,
    y: 0,
    distance: 1,
    overCharacter: false,
    active: false,
    inHero: true,
  })

  const coarse = useCoarsePointer()

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    let inView = true

    const observer = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting },
      { threshold: 0.05 }
    )
    observer.observe(el)

    const characterAnchor = () => {
      const w = window.innerWidth
      if (w >= 1280) return { cx: 0.58, cy: 0.48 }
      if (w >= 1024) return { cx: 0.55, cy: 0.46 }
      if (w >= 768) return { cx: 0.52, cy: 0.44 }
      return { cx: 0.5, cy: 0.42 }
    }

    const update = (clientX, clientY) => {
      const nx = clamp(clientX / window.innerWidth, 0, 1)
      const ny = clamp(clientY / window.innerHeight, 0, 1)
      const x = (nx - 0.5) * 2
      const y = -(ny - 0.5) * 2

      const { cx, cy } = characterAnchor()
      const dx = nx - cx
      const dy = ny - cy
      const distance = Math.sqrt(dx * dx + dy * dy)

      const heroRect = el.getBoundingClientRect()
      const inHero =
        clientY >= heroRect.top &&
        clientY <= heroRect.bottom &&
        clientX >= heroRect.left &&
        clientX <= heroRect.right

      const w = window.innerWidth
      const charZoneX = w >= 1024 ? w * 0.28 : w * 0.1
      const charZoneW = w >= 1024 ? w * 0.55 : w * 0.8
      const overCharacter =
        clientX >= charZoneX &&
        clientX <= charZoneX + charZoneW &&
        clientY >= heroRect.top &&
        clientY <= heroRect.bottom

      pointer.current = {
        nx,
        ny,
        x,
        y,
        distance,
        overCharacter,
        active: inView,
        inHero,
      }
    }

    const onMove = (e) => update(e.clientX, e.clientY)

    const onTouch = (e) => {
      const t = e.touches[0]
      if (t) update(t.clientX, t.clientY)
    }

    const onLeave = () => {
      pointer.current = {
        ...pointer.current,
        x: 0,
        y: 0,
        nx: 0.5,
        ny: 0.5,
        active: inView,
        overCharacter: false,
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    if (coarse) window.addEventListener('touchmove', onTouch, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [heroRef, coarse])

  return pointer
}

export function useHeroScrollProgress(heroRef) {
  const progress = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const travel = rect.height * 0.92
      progress.current = clamp(-rect.top / travel, 0, 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [heroRef])

  return progress
}

/** Smooth spring toward target */
export function springStep(current, target, stiffness, delta) {
  return current + (target - current) * (1 - Math.exp(-stiffness * delta))
}
