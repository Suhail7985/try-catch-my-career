import { useEffect } from 'react'
import { useReducedMotion } from './useMedia'
import { initSmoothScroll, destroySmoothScroll } from '../lib/smoothScroll'

export function useLenisScroll(enabled = true, options = {}) {
  const reducedMotion = useReducedMotion()
  const { startPaused = false } = options

  useEffect(() => {
    if (!enabled || reducedMotion) return

    let active = true

    initSmoothScroll({ startPaused }).then(() => {
      if (!active) destroySmoothScroll()
    })

    return () => {
      active = false
      destroySmoothScroll()
    }
  }, [enabled, reducedMotion, startPaused])
}

export { smoothScrollTo } from '../lib/smoothScroll'
