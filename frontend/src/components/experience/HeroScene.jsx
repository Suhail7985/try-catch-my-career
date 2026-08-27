import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import DeveloperCharacter from './hero/DeveloperCharacter'
import HeroEnvironment from './hero/HeroEnvironment'
import HeroLighting from './hero/HeroLighting'
import { useReducedMotion, useCoarsePointer } from '../../hooks/useMedia'
import { useHeroLayout } from '../../hooks/useHeroLayout'

function CameraRig({ pointer, scroll, layout }) {
  useFrame((state) => {
    const p = pointer.current
    const sp = scroll?.current ?? 0
    const px = p.active ? p.x : 0
    const py = p.active ? p.y : 0

    if (state.camera.fov !== layout.fov) {
      state.camera.fov = layout.fov
      state.camera.updateProjectionMatrix()
    }

    state.camera.position.x = layout.camX + px * 0.06 - sp * 0.1
    state.camera.position.y = layout.camY + py * 0.04 - sp * 0.14
    state.camera.position.z = layout.camZ + sp * 0.55
    state.camera.lookAt(
      layout.lookX - sp * 0.18,
      layout.lookY - sp * 0.12,
      0
    )
  })
  return null
}

function Scene({ pointer, scroll, reduced, layout }) {
  return (
    <>
      <HeroLighting pointer={pointer} />
      <HeroEnvironment pointer={pointer} scroll={scroll} layout={layout} />
      <DeveloperCharacter pointer={pointer} scroll={scroll} reduced={reduced} layout={layout} />
      <ContactShadows
        position={[layout.charX, -1.38, 0]}
        opacity={0.42}
        scale={2.8}
        blur={2.4}
        far={1.15}
        color="#000000"
      />
      <CameraRig pointer={pointer} scroll={scroll} layout={layout} />
    </>
  )
}

function HeroFallback({ layout }) {
  return (
    <div className={`hero-character-fallback ${layout?.wide ? 'hero-character-fallback--wide' : ''}`} aria-hidden="true">
      <div className="hero-character-fallback__glow" />
      <div className="hero-character-fallback__silhouette" />
      <div className="hero-character-fallback__ring" />
    </div>
  )
}

export default function HeroScene({ pointer, scroll }) {
  const reduced = useReducedMotion()
  const coarse = useCoarsePointer()
  const layout = useHeroLayout()
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '10% 0px', threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (reduced) {
    return <HeroFallback layout={layout} />
  }

  const maxDpr = coarse ? 1 : 1.5

  return (
    <div ref={wrapRef} className="hero-scene-wrap">
      <Suspense fallback={<HeroFallback layout={layout} />}>
        <Canvas
          className="hero-canvas"
          camera={{ position: [layout.camX, layout.camY, layout.camZ], fov: layout.fov }}
          dpr={[1, maxDpr]}
          frameloop={visible ? 'always' : 'never'}
          performance={{ min: 0.5, debounce: 200 }}
          gl={{
            antialias: !coarse,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ background: 'transparent' }}
        >
          <Scene pointer={pointer} scroll={scroll} reduced={reduced} layout={layout} />
        </Canvas>
      </Suspense>
    </div>
  )
}
