import { gsap } from './gsap'
import { resumeSmoothScroll } from './smoothScroll'

const fadeUp = (selector, delay = 0) => {
  const el = document.querySelector(selector)
  if (!el) return
  gsap.from(el, {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: 'power3.out',
    delay,
    immediateRender: false,
  })
}

function loopText(text1Selector, text2Selector) {
  const t1 = document.querySelector(text1Selector)
  const t2 = document.querySelector(text2Selector)
  if (!t1 || !t2) return

  gsap.set([t1, t2], { opacity: 1, y: 0 })

  const delay = 4
  const delay2 = delay * 2 + 1

  gsap.timeline({ repeat: -1, repeatDelay: 1 })
    .fromTo(t2, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.2, ease: 'power3.inOut', delay, immediateRender: false,
    }, 0)
    .fromTo(t1, { y: 40 }, {
      y: 0, duration: 1.2, ease: 'power3.inOut', delay: delay2, immediateRender: false,
    }, 1)
    .to(t1, { y: -40, duration: 1.2, ease: 'power3.inOut', delay }, 0)
    .to(t2, { y: -40, duration: 1.2, ease: 'power3.inOut', delay: delay2 }, 1)
}

/** Safe post-mount animations — content stays visible if GSAP fails */
export function initialFX() {
  document.body.style.overflowY = 'auto'
  document.body.style.backgroundColor = '#0b080c'
  resumeSmoothScroll()

  document.querySelector('main')?.classList.add('main-active')
  document.body.classList.add('character-loaded')

  gsap.set(['.header', '.icons-section', '.nav-fade', '.landing-intro', '.landing-info'], {
    opacity: 1,
    visibility: 'visible',
  })

  fadeUp('.landing-intro h2')
  fadeUp('.landing-intro h1', 0.1)
  fadeUp('.landing-info h3', 0.15)
  fadeUp('.landing-info-h2', 0.25)

  loopText('.landing-h2-info', '.landing-h2-info-1')
  loopText('.landing-h2-1', '.landing-h2-2')
}

export function runInitialFXWhenReady() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      try {
        initialFX()
      } catch (err) {
        console.error('initialFX failed:', err)
      }
    })
  })
}
