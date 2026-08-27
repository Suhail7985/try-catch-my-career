import { useEffect, useState } from 'react'

/** Cinematic centered layout — character as hero focal point */
const DEFAULT = {
  wide: true,
  charX: 0.28,
  charY: -0.38,
  charScale: 1.28,
  camX: 0,
  camY: 0.04,
  camZ: 2.85,
  lookX: 0.28,
  lookY: 0.1,
  fov: 32,
}

function getLayout(width) {
  if (width >= 1280) {
    return {
      wide: true,
      charX: 0.32,
      charY: -0.32,
      charScale: 1.42,
      camX: 0,
      camY: 0.06,
      camZ: 2.75,
      lookX: 0.32,
      lookY: 0.12,
      fov: 30,
    }
  }
  if (width >= 1024) {
    return { ...DEFAULT }
  }
  if (width >= 768) {
    return {
      wide: false,
      charX: 0.22,
      charY: -0.42,
      charScale: 1.15,
      camX: 0,
      camY: 0,
      camZ: 3.05,
      lookX: 0.22,
      lookY: 0.06,
      fov: 34,
    }
  }
  return {
    wide: false,
    charX: 0.08,
    charY: -0.55,
    charScale: 0.95,
    camX: 0,
    camY: -0.04,
    camZ: 3.25,
    lookX: 0.08,
    lookY: 0,
    fov: 36,
  }
}

export function useHeroLayout() {
  const [layout, setLayout] = useState(() =>
    typeof window !== 'undefined' ? getLayout(window.innerWidth) : DEFAULT
  )

  useEffect(() => {
    const update = () => setLayout(getLayout(window.innerWidth))
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return layout
}
