import { lazy, Suspense, useEffect, useRef } from 'react'
import { useHeroPointer, useHeroScrollProgress } from '../../hooks/useHeroPointer'
import { setupCharacterScroll } from '../../lib/charScroll'
import '../../styles/moncy/Landing.css'

const HeroScene = lazy(() => import('../experience/HeroScene'))

function HeroFallback() {
  return (
    <div className="character-rim" aria-hidden="true" />
  )
}

export default function CharacterScene() {
  const wrapRef = useRef(null)
  const pointer = useHeroPointer(wrapRef)
  const scroll = useHeroScrollProgress(wrapRef)

  useEffect(() => {
    const cleanup = setupCharacterScroll()
    return cleanup
  }, [])

  return (
    <div className="character-model" ref={wrapRef} id="home">
      <div className="character-rim" aria-hidden="true" />
      <div className="character-hover" aria-hidden="true" />
      <Suspense fallback={<HeroFallback />}>
        <HeroScene pointer={pointer} scroll={scroll} />
      </Suspense>
    </div>
  )
}
