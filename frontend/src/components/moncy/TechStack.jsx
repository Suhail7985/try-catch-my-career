import { useEffect, useMemo, useRef, useState } from 'react'

import * as THREE from 'three'

import { Canvas, useFrame } from '@react-three/fiber'

import { Environment } from '@react-three/drei'

import { BallCollider, Physics, RigidBody, CylinderCollider } from '@react-three/rapier'



const textureLoader = new THREE.TextureLoader()

const imageUrls = [

  '/images/react2.webp',

  '/images/next2.webp',

  '/images/node2.webp',

  '/images/express.webp',

  '/images/mongo.webp',

  '/images/mysql.webp',

  '/images/typescript.webp',

  '/images/javascript.webp',

]

const textures = imageUrls.map((url) => textureLoader.load(url))

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)



const SPHERE_COUNT = 18



const spheres = [...Array(SPHERE_COUNT)].map(() => ({

  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],

}))



function SphereGeo({ scale, material, isActive }) {

  const api = useRef()



  useFrame((_state, delta) => {

    if (!isActive || !api.current) return

    const d = Math.min(0.1, delta)

    const translation = api.current.translation()

    const impulse = new THREE.Vector3(translation.x, translation.y, translation.z)

      .normalize()

      .multiply(new THREE.Vector3(-50 * d * scale, -150 * d * scale, -50 * d * scale))

    api.current.applyImpulse(impulse, true)

  })



  return (

    <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2}

      position={[THREE.MathUtils.randFloatSpread(20), THREE.MathUtils.randFloatSpread(20) - 25, THREE.MathUtils.randFloatSpread(20) - 10]}

      ref={api} colliders={false}>

      <BallCollider args={[scale]} />

      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]} args={[0.15 * scale, 0.275 * scale]} />

      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material={material} rotation={[0.3, 1, 1]} />

    </RigidBody>

  )

}



function Pointer({ isActive }) {

  const ref = useRef()

  const vec = useMemo(() => new THREE.Vector3(), [])



  useFrame(({ pointer, viewport }) => {

    if (!isActive || !ref.current) return

    vec.lerp(new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0), 0.2)

    ref.current.setNextKinematicTranslation(vec)

  })



  return (

    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>

      <BallCollider args={[2]} />

    </RigidBody>

  )

}



export default function TechStack() {

  const [isActive, setIsActive] = useState(false)

  const wrapRef = useRef(null)



  useEffect(() => {

    const el = wrapRef.current

    if (!el) return



    const observer = new IntersectionObserver(

      ([entry]) => setIsActive(entry.isIntersecting),

      { rootMargin: '120px', threshold: 0.05 },

    )

    observer.observe(el)

    return () => observer.disconnect()

  }, [])



  const materials = useMemo(() => textures.map((texture) => new THREE.MeshPhysicalMaterial({

    map: texture, emissive: '#ffffff', emissiveMap: texture, emissiveIntensity: 0.3,

    metalness: 0.5, roughness: 1, clearcoat: 0.1,

  })), [])



  return (

    <div className="techstack" ref={wrapRef}>

      <h2>My Techstack</h2>

      <Canvas shadows={false} dpr={[1, 1.25]} frameloop={isActive ? 'always' : 'demand'}

        gl={{ alpha: true, stencil: false, depth: true, antialias: false, powerPreference: 'high-performance' }}

        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}

        onCreated={(state) => { state.gl.toneMappingExposure = 1.5 }}

        className="tech-canvas">

        <ambientLight intensity={1} />

        <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" />

        <directionalLight position={[0, 5, -4]} intensity={2} />

        <Physics gravity={[0, 0, 0]} paused={!isActive}>

          <Pointer isActive={isActive} />

          {spheres.map((props, i) => (

            <SphereGeo key={i} {...props} material={materials[i % materials.length]} isActive={isActive} />

          ))}

        </Physics>

        <Environment files="/models/char_enviorment.hdr" environmentIntensity={0.5} environmentRotation={[0, 4, 2]} />

      </Canvas>

    </div>

  )

}

