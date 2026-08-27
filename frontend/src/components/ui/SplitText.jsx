import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useMedia'

export default function SplitText({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.025,
  trigger = true,
  /** When false, only split + set initial state — parent timeline animates */
  animate = true,
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const text = String(children)

  useGSAP(
    () => {
      if (!ref.current || reduced || !trigger) return

      ref.current.textContent = ''
      ref.current.setAttribute('aria-label', text)

      const chars = text.split('').map((char) => {
        const span = document.createElement('span')
        span.className = 'split-char'
        span.textContent = char === ' ' ? '\u00A0' : char
        span.setAttribute('aria-hidden', 'true')
        ref.current.appendChild(span)
        return span
      })

      gsap.set(chars, {
        opacity: 0,
        y: animate ? 32 : 80,
        rotateX: animate ? -24 : -35,
        transformOrigin: '50% 100%',
      })

      if (animate) {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger,
          delay,
          ease: EASE.smooth,
        })
      }
    },
    { scope: ref, dependencies: [text, delay, stagger, reduced, trigger, animate] }
  )

  return (
    <Tag ref={ref} className={className}>
      {reduced || !trigger ? children : null}
    </Tag>
  )
}
