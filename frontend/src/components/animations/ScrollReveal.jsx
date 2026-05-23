import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from '../../hooks/useMedia'

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

const noMotion = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  stretch = false,
}) {
  const reducedMotion = useReducedMotion()
  const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  const chosen = reducedMotion ? noMotion : (variants[animation] || variants['fade-up'])
  const stretchClass = stretch ? 'h-full min-h-0 flex flex-col w-full' : ''

  return (
    <motion.div
      ref={ref}
      variants={chosen}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={reducedMotion ? { duration: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={[stretchClass, className].filter(Boolean).join(' ')}
    >
      {children}
    </motion.div>
  )
}
