import { useEffect } from 'react'
import { getLenis, initSmoothScroll } from '../../lib/smoothScroll'

function setProgress(scrollTop) {
  const { scrollHeight, clientHeight } = document.documentElement
  const max = scrollHeight - clientHeight
  const progress = max > 0 ? scrollTop / max : 0
  document.documentElement.style.setProperty('--scroll-progress', String(progress))
}

export default function ScrollProgress() {
  useEffect(() => {
    let detach = () => {}

    const bindLenis = (lenis) => {
      const onScroll = (instance) => setProgress(instance.animatedScroll)
      const unsubscribe = lenis.on('scroll', onScroll)
      setProgress(lenis.animatedScroll)
      detach = unsubscribe
    }

    const existing = getLenis()
    if (existing) {
      bindLenis(existing)
    } else {
      const onNativeScroll = () => setProgress(document.documentElement.scrollTop)
      window.addEventListener('scroll', onNativeScroll, { passive: true })
      onNativeScroll()
      detach = () => window.removeEventListener('scroll', onNativeScroll)

      initSmoothScroll().then((lenis) => {
        detach()
        bindLenis(lenis)
      })
    }

    return () => detach()
  }, [])

  return <div className="scroll-progress" aria-hidden="true" />
}
