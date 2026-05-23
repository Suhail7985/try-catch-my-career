import { Suspense } from 'react'
import { useInView } from 'react-intersection-observer'

const SectionPlaceholder = () => (
  <div className="section-padding w-full max-w-full" aria-hidden>
    <div className="container-custom mx-auto">
      <div className="h-64 sm:h-80 w-full rounded-2xl bg-white/[0.02] animate-pulse" />
    </div>
  </div>
)

/**
 * Loads section chunk only when user scrolls near it — faster initial paint.
 */
export default function LazySection({ children, rootMargin = '280px 0px' }) {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin })

  return (
    <div ref={ref} className="w-full">
      {inView ? (
        <Suspense fallback={<SectionPlaceholder />}>{children}</Suspense>
      ) : (
        <SectionPlaceholder />
      )}
    </div>
  )
}
