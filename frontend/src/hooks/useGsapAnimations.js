import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, revealOnScroll, revealSectionHeader, EASE } from '../lib/gsap'
import { useReducedMotion } from './useMedia'

/**
 * Attach scroll-triggered reveal animations to a section scope.
 * Adds class "reveal" to children or uses custom selector.
 */
export function useScrollReveal({
  selector = '.reveal',
  start = 'top 82%',
  y = 48,
  stagger = 0.1,
  duration = 0.9,
  header = false,
  headerSelectors,
} = {}) {
  const scopeRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !scopeRef.current) return

      if (header) {
        revealSectionHeader(scopeRef.current, headerSelectors)
      }

      const targets = scopeRef.current.querySelectorAll(selector)
      if (targets.length) {
        revealOnScroll(targets, scopeRef.current, { start, y, stagger, duration })
      }
    },
    { scope: scopeRef, dependencies: [reduced, selector, start] }
  )

  return scopeRef
}

/**
 * Run a GSAP context callback with automatic cleanup (useGSAP wrapper).
 */
export function useGsapAnimation(callback, deps = []) {
  const scopeRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      return callback(scopeRef.current, gsap)
    },
    { scope: scopeRef, dependencies: [reduced, ...deps] }
  )

  return scopeRef
}

export { EASE }
