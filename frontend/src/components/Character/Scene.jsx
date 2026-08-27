import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import setCharacter from './utils/character'
import setLighting from './utils/lighting'
import { useLoading } from '../../context/LoadingProvider'
import handleResize from './utils/resizeUtils'
import { handleMouseMove, handleTouchEnd, handleHeadRotation, handleTouchMove } from './utils/mouseUtils'
import setAnimations from './utils/animationUtils'
import { setProgress } from '../../lib/setProgress'

export default function Scene() {
  const canvasDiv = useRef(null)
  const hoverDivRef = useRef(null)
  const sceneRef = useRef(new THREE.Scene())
  const { setLoading } = useLoading()

  useEffect(() => {
    if (!canvasDiv.current) return

    const rect = canvasDiv.current.getBoundingClientRect()
    const container = { width: rect.width, height: rect.height }
    const aspect = container.width / container.height
    const scene = sceneRef.current

    const isMobile = window.innerWidth <= 1024
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.width, container.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5))
    renderer.shadowMap.enabled = false
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    canvasDiv.current.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000)
    camera.position.set(0, 13.1, 24.7)
    camera.zoom = 1.1
    camera.updateProjectionMatrix()

    let headBone = null
    let screenLight = null
    let mixer
    let character = null
    const clock = new THREE.Clock()

    const light = setLighting(scene)
    const progress = setProgress(setLoading)
    const { loadCharacter } = setCharacter(renderer, scene, camera)

    loadCharacter().then((gltf) => {
      if (!gltf) {
        progress.loaded()
        return
      }
      const animations = setAnimations(gltf)
      if (hoverDivRef.current) animations.hover(hoverDivRef.current)
      mixer = animations.mixer
      character = gltf.scene
      scene.add(character)
      headBone = character.getObjectByName('spine006') || null
      screenLight = character.getObjectByName('screenlight') || null
      progress.loaded().then(() => {
        light.turnOnLights()
        animations.startIntro()
      })
      window.addEventListener('resize', () => handleResize(renderer, camera, canvasDiv, character))
    }).catch((err) => {
      console.error('Character load failed:', err)
      progress.loaded()
    })

    let mouse = { x: 0, y: 0 }
    let interpolation = { x: 0.1, y: 0.2 }
    let debounce

    const onMouseMove = (event) => handleMouseMove(event, (x, y) => { mouse = { x, y } })
    const onTouchStart = (event) => {
      const element = event.target
      debounce = setTimeout(() => {
        element?.addEventListener('touchmove', (e) => handleTouchMove(e, (x, y) => { mouse = { x, y } }))
      }, 200)
    }
    const onTouchEnd = () => {
      handleTouchEnd((x, y, ix, iy) => {
        mouse = { x, y }
        interpolation = { x: ix, y: iy }
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    const landingDiv = document.getElementById('landingDiv')
    landingDiv?.addEventListener('touchstart', onTouchStart)
    landingDiv?.addEventListener('touchend', onTouchEnd)

    let rafId
    let animating = true

    const animate = () => {
      if (!animating) return
      rafId = requestAnimationFrame(animate)
      if (headBone) {
        handleHeadRotation(headBone, mouse.x, mouse.y, interpolation.x, interpolation.y, THREE.MathUtils.lerp)
        light.setPointLight(screenLight)
      }
      if (mixer) mixer.update(clock.getDelta())
      renderer.render(scene, camera)
    }
    animate()

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animating) {
            animating = true
            clock.getDelta()
            animate()
          }
        } else {
          animating = false
          cancelAnimationFrame(rafId)
        }
      },
      { threshold: 0.05 },
    )
    visibilityObserver.observe(canvasDiv.current)

    return () => {
      animating = false
      visibilityObserver.disconnect()
      cancelAnimationFrame(rafId)
      clearTimeout(debounce)
      progress.clear()
      scene.clear()
      renderer.dispose()
      window.removeEventListener('resize', () => handleResize(renderer, camera, canvasDiv, character))
      document.removeEventListener('mousemove', onMouseMove)
      landingDiv?.removeEventListener('touchstart', onTouchStart)
      landingDiv?.removeEventListener('touchend', onTouchEnd)
      if (canvasDiv.current?.contains(renderer.domElement)) {
        canvasDiv.current.removeChild(renderer.domElement)
      }
    }
  }, [setLoading])

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim" />
        <div className="character-hover" ref={hoverDivRef} />
      </div>
    </div>
  )
}
