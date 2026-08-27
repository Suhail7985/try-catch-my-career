import { useRef } from 'react'
import { useCanHover } from '../../hooks/useMedia'

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as: Tag = 'a',
  ...props
}) {
  const ref = useRef(null)
  const rafRef = useRef(0)
  const canHover = useCanHover()

  const onMove = (e) => {
    if (!canHover || !ref.current) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      ref.current.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
    })
  }

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current)
    if (!ref.current) return
    ref.current.style.transform = ''
  }

  return (
    <Tag
      ref={ref}
      className={`magnetic-btn ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}
