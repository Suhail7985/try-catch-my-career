import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '../../lib/SplitText'

gsap.registerPlugin(ScrollTrigger)

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true })
  if (window.innerWidth < 900) return

  const paras = document.querySelectorAll('.para')
  const titles = document.querySelectorAll('.title')
  const triggerStart = window.innerWidth <= 1024 ? 'top 60%' : '20% 60%'
  const toggleAction = 'play pause resume reverse'

  paras.forEach((para) => {
    para.classList.add('visible')
    if (para.anim) {
      para.anim.progress(1).kill()
      para.split?.revert()
    }
    para.split = new SplitText(para, { type: 'lines,words', linesClass: 'split-line' })
    para.anim = gsap.fromTo(para.split.words, { autoAlpha: 0, y: 80 }, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: para.parentElement?.parentElement,
        toggleActions: toggleAction,
        start: triggerStart,
      },
      duration: 1,
      ease: 'power3.out',
      y: 0,
      stagger: 0.02,
    })
  })

  titles.forEach((title) => {
    if (title.anim) {
      title.anim.progress(1).kill()
      title.split?.revert()
    }
    title.split = new SplitText(title, { type: 'chars,lines', linesClass: 'split-line' })
    title.anim = gsap.fromTo(title.split.chars, { autoAlpha: 0, y: 80, rotate: 10 }, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: title.parentElement?.parentElement,
        toggleActions: toggleAction,
        start: triggerStart,
      },
      duration: 0.8,
      ease: 'power2.inOut',
      y: 0,
      rotate: 0,
      stagger: 0.03,
    })
  })
}
