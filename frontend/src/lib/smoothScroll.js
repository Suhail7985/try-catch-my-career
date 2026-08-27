import { gsap, ScrollTrigger, refreshScrollTriggers } from './gsap'

let lenisInstance = null
let tickerAttached = false
let resizeTimer = null

const LENIS_OPTIONS = {
  duration: 1.25,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.82,
  touchMultiplier: 1.05,
  syncTouch: true,
  syncTouchLerp: 0.075,
  infinite: false,
  lerp: 0.08,
}

function attachTicker(lenis) {
  if (tickerAttached || !lenis) return
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  tickerAttached = true
  lenis.__tick = tick
}

function detachTicker(lenis) {
  if (!tickerAttached || !lenis?.__tick) return
  gsap.ticker.remove(lenis.__tick)
  gsap.ticker.lagSmoothing(500, 33)
  tickerAttached = false
}

function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 120)
}

export async function initSmoothScroll({ startPaused = false } = {}) {
  if (lenisInstance) return lenisInstance

  const { default: Lenis } = await import('lenis')
  document.documentElement.classList.add('lenis', 'lenis-smooth')

  const lenis = new Lenis(LENIS_OPTIONS)
  lenis.on('scroll', ScrollTrigger.update)

  lenisInstance = lenis
  attachTicker(lenis)

  if (startPaused) lenis.stop()

  window.addEventListener('resize', onResize, { passive: true })
  refreshScrollTriggers()

  return lenis
}

export function pauseSmoothScroll() {
  lenisInstance?.stop()
}

export function resumeSmoothScroll() {
  lenisInstance?.start()
}

export function destroySmoothScroll() {
  if (!lenisInstance) return
  window.removeEventListener('resize', onResize)
  clearTimeout(resizeTimer)
  detachTicker(lenisInstance)
  lenisInstance.destroy()
  lenisInstance = null
  document.documentElement.classList.remove('lenis', 'lenis-smooth')
}

export function smoothScrollTo(target, options = {}) {
  const { offset = 0, duration = 1.35 } = options

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration, easing: LENIS_OPTIONS.easing })
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function getLenis() {
  return lenisInstance
}
