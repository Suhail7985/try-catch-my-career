import { useInView } from 'react-intersection-observer'

export default function DeferredImage({ src, alt, className = '', wrapperClassName = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '120px' })

  return (
    <div ref={ref} className={wrapperClassName}>
      {inView ? (
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className={`bg-white/5 animate-pulse rounded-xl ${wrapperClassName.includes('min-h') ? '' : 'min-h-[160px]'}`} aria-hidden />
      )}
    </div>
  )
}
