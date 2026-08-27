import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Grid, Float } from '@react-three/drei'

const PHOSPHOR = '#39ff14'
const PINK = '#ff006e'
const CYAN = '#00f5ff'
const PURPLE = '#bf5af2'

function BackgroundParticles({ pointer }) {
  const ref = useRef()
  const count = 180

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7
      arr[i * 3 + 2] = -3 - Math.random() * 5
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const p = pointer.current
    const t = state.clock.elapsedTime * 0.04
    ref.current.rotation.y = t + p.x * 0.08
    ref.current.rotation.x = p.y * 0.05
    ref.current.position.x = p.x * 0.04
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={PHOSPHOR} size={0.014} sizeAttenuation depthWrite={false} opacity={0.3} />
    </Points>
  )
}

function ForegroundParticles({ pointer }) {
  const ref = useRef()
  const count = 30

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = 0.5 + (Math.random() - 0.5) * 3
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4
      arr[i * 3 + 2] = 0.5 + Math.random() * 2
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const p = pointer.current
    ref.current.position.x = 0.6 + p.x * 0.12
    ref.current.position.y = p.y * 0.08
    ref.current.rotation.z = state.clock.elapsedTime * 0.02
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={PINK} size={0.018} sizeAttenuation depthWrite={false} opacity={0.4} />
    </Points>
  )
}

function GlowOrbs({ pointer, layout }) {
  const a = useRef()
  const b = useRef()
  const cx = layout?.charX ?? 0.9

  useFrame((state) => {
    const p = pointer.current
    const t = state.clock.elapsedTime
    if (a.current) {
      a.current.position.x = cx + p.x * 0.2
      a.current.position.y = 0.75 + p.y * 0.15 + Math.sin(t * 0.45) * 0.1
    }
    if (b.current) {
      b.current.position.x = cx + 0.35 + p.x * 0.12
      b.current.position.y = -0.35 + p.y * 0.1
    }
  })

  return (
    <>
      <mesh ref={a} position={[cx, 0.75, -3]}>
        <sphereGeometry args={[0.95, 12, 12]} />
        <meshBasicMaterial color={PINK} transparent opacity={0.05} />
      </mesh>
      <mesh ref={b} position={[cx + 0.35, -0.35, -3.2]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.045} />
      </mesh>
    </>
  )
}

function FloatingShapes({ pointer }) {
  const group = useRef()
  const shapes = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        x: 0.4 + (Math.random() - 0.3) * 2.5,
        y: (Math.random() - 0.5) * 2.8,
        z: -1.8 - Math.random() * 2,
        speed: 0.25 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        scale: 0.06 + Math.random() * 0.08,
      })),
    []
  )

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const p = pointer.current
    group.current.rotation.y = p.x * 0.035 + t * 0.015
    group.current.children.forEach((child, i) => {
      const d = shapes[i]
      child.position.y = d.y + Math.sin(t * d.speed + d.phase) * 0.1
      child.position.x = d.x + p.x * 0.05
    })
  })

  return (
    <group ref={group}>
      {shapes.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]} scale={d.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={PHOSPHOR} transparent opacity={0.1} wireframe />
        </mesh>
      ))}
    </group>
  )
}

function CodeFragments({ pointer }) {
  const group = useRef()
  const items = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        x: 0.2 + (i % 2) * 0.9,
        y: 0.7 - Math.floor(i / 2) * 0.65,
        z: -2.1 - i * 0.28,
        w: 0.28 + (i % 2) * 0.12,
        phase: i * 1.2,
      })),
    []
  )

  useFrame((state) => {
    if (!group.current) return
    const p = pointer.current
    const t = state.clock.elapsedTime
    group.current.position.x = p.x * 0.06
    group.current.children.forEach((child, i) => {
      child.position.y = items[i].y + Math.sin(t * 0.4 + items[i].phase) * 0.06
    })
  })

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <Float key={i} speed={1.2} floatIntensity={0.06}>
          <mesh position={[item.x, item.y, item.z]}>
            <boxGeometry args={[item.w, 0.018, 0.004]} />
            <meshStandardMaterial color={PHOSPHOR} emissive={PHOSPHOR} emissiveIntensity={0.2} transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function SceneGrid({ pointer, layout }) {
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return
    const p = pointer.current
    ref.current.position.x = layout.charX + p.x * 0.04
  })

  return (
    <group ref={ref} position={[layout.charX, -1.45, -1]} rotation={[-Math.PI / 2.15, 0, -0.15]}>
      <Grid
        args={[12, 12]}
        cellSize={0.35}
        cellThickness={0.5}
        sectionSize={1.4}
        sectionThickness={0.9}
        fadeDistance={14}
        fadeStrength={1.2}
        cellColor={PURPLE}
        sectionColor={PHOSPHOR}
        infiniteGrid
      />
    </group>
  )
}

export default function HeroEnvironment({ pointer, scroll, layout }) {
  const env = useRef()

  useFrame(() => {
    if (!env.current) return
    const sp = scroll?.current ?? 0
    env.current.position.z = -sp * 0.6
    env.current.position.y = sp * 0.15
    env.current.position.x = layout?.charX ? layout.charX * 0.15 : 0
  })

  return (
    <group ref={env}>
      <BackgroundParticles pointer={pointer} />
      <GlowOrbs pointer={pointer} layout={layout} />
      <SceneGrid pointer={pointer} layout={layout} />
      <FloatingShapes pointer={pointer} />
      <CodeFragments pointer={pointer} />
      <ForegroundParticles pointer={pointer} />
    </group>
  )
}
