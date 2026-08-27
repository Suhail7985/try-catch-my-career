import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({
  ignoreMobileResize: true,
  limitCallbacks: true,
})

export function refreshScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

export { gsap, ScrollTrigger }
export { SplitText } from './SplitText'
