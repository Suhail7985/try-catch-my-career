import { gsap } from './gsap'

/** Scroll-linked landing/about animations adapted for procedural character */
export function setupCharacterScroll() {
  const mm = gsap.matchMedia()

  mm.add('(min-width: 1025px)', () => {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.landing-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    tl1
      .fromTo('.character-model', { x: 0 }, { x: '-25%', duration: 1 }, 0)
      .to('.landing-container', { opacity: 0, duration: 0.4 }, 0)
      .to('.landing-container', { y: '40%', duration: 0.8 }, 0)
      .fromTo('.about-me', { y: '-50%' }, { y: '0%' }, 0)

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'center 55%',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    tl2.to('.about-section', { y: '30%', duration: 6 }, 0)

    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.career-section',
        start: 'top 30%',
        end: 'bottom top',
        scrub: true,
      },
    })

    careerTimeline
      .fromTo('.career-timeline', { maxHeight: '10%' }, { maxHeight: '100%', duration: 0.5 }, 0)
      .fromTo('.career-info-box', { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.1 }, 0)
      .fromTo('.career-dot', { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)

    return () => {
      tl1.kill()
      tl2.kill()
      careerTimeline.kill()
    }
  })

  return () => mm.revert()
}
