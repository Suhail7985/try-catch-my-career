import { SplitText } from '../../lib/SplitText'
import gsap from 'gsap'
import { resumeSmoothScroll } from '../../lib/smoothScroll'

function LoopText(Text1, Text2) {
  if (!Text1?.chars?.length || !Text2?.chars?.length) return

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
  const delay = 3
  const delay2 = delay * 2 + 0.5

  tl.fromTo(Text2.chars, { opacity: 0, y: 50 }, {
    opacity: 1, duration: 0.85, ease: 'power3.inOut', y: 0, stagger: 0.06, delay,
  }, 0)
    .fromTo(Text1.chars, { y: 50 }, {
      duration: 0.85, ease: 'power3.inOut', y: 0, stagger: 0.06, delay: delay2,
    }, 1)
    .fromTo(Text1.chars, { y: 0 }, {
      y: -50, duration: 0.85, ease: 'power3.inOut', stagger: 0.06, delay,
    }, 0)
    .to(Text2.chars, {
      y: -50, duration: 0.85, ease: 'power3.inOut', stagger: 0.06, delay: delay2,
    }, 1)
}

export function initialFX() {
  document.body.style.overflowY = 'auto'
  document.body.style.backgroundColor = '#0b080c'
  resumeSmoothScroll()

  document.getElementsByTagName('main')[0]?.classList.add('main-active')

  gsap.to('body', { backgroundColor: '#0b080c', duration: 0.35 })

  try {
    const landingText = new SplitText(['.landing-info h3', '.landing-intro h2', '.landing-intro h1'], {
      type: 'chars,lines',
      linesClass: 'split-line',
    })

    gsap.fromTo(landingText.chars, { opacity: 0, y: 40 }, {
      opacity: 1, duration: 0.75, ease: 'power3.out', y: 0, stagger: 0.018, delay: 0.05,
    })

    const textProps = { type: 'chars,lines', linesClass: 'split-h2' }
    const landingText2 = new SplitText('.landing-h2-info', textProps)
    gsap.fromTo(landingText2.chars, { opacity: 0, y: 40 }, {
      opacity: 1, duration: 0.75, ease: 'power3.out', y: 0, stagger: 0.018, delay: 0.08,
    })

    gsap.fromTo('.landing-info-h2', { opacity: 0, y: 20 }, {
      opacity: 1, duration: 0.7, ease: 'power2.out', y: 0, delay: 0.15,
    })

    gsap.fromTo(['.header', '.icons-section', '.nav-fade'], { opacity: 0 }, {
      opacity: 1, duration: 0.65, ease: 'power2.out', delay: 0.02,
    })

    const landingText3 = new SplitText('.landing-h2-info-1', textProps)
    const landingText4 = new SplitText('.landing-h2-1', textProps)
    const landingText5 = new SplitText('.landing-h2-2', textProps)

    LoopText(landingText2, landingText3)
    LoopText(landingText4, landingText5)
  } catch (err) {
    console.error('initialFX split failed:', err)
    gsap.set(['.header', '.icons-section', '.nav-fade', '.landing-intro', '.landing-info'], { opacity: 1 })
  }
}
