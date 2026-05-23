import { useEffect } from 'react'
import { useReducedMotion, useCoarsePointer } from './useMedia'

export function useLenisScroll(enabled = true) {
  const reducedMotion = useReducedMotion()
  const coarsePointer = useCoarsePointer()

  useEffect(() => {
    if (!enabled || reducedMotion || coarsePointer) return

    let lenis
    let rafId

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1,
        smoothWheel: true,
        smoothTouch: false,
      })

      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [enabled, reducedMotion, coarsePointer])
}
