import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { useCharacterRig } from '../../../hooks/useCharacterRig'

const SKIN = '#c9a882'
const SKIN_SHADOW = '#a88462'
const HAIR = '#0f0c14'
const HOODIE = '#1a1a1f'
const HOODIE_LIGHT = '#252530'
const PINK = '#c9a96e'
const CYAN = '#e8e4dc'
const LIME = '#d4a574'
const PURPLE = '#6b5d4f'

function VisorEye({ side, pupilRef }) {
  const x = side * 0.078
  return (
    <group position={[x, 0.02, 0.395]}>
      <mesh ref={pupilRef}>
        <circleGeometry args={[0.022, 20]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0.006, 0.006, 0.002]}>
        <circleGeometry args={[0.006, 10]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Headphones({ side }) {
  const x = side * 0.34
  return (
    <group position={[x, 0.06, 0]}>
      <mesh rotation={[0, 0, side * 0.15]}>
        <torusGeometry args={[0.1, 0.018, 10, 24, Math.PI * 1.15]} />
        <meshStandardMaterial color="#111" roughness={0.35} metalness={0.55} />
      </mesh>
      <mesh position={[side * 0.02, -0.02, 0.04]}>
        <RoundedBox args={[0.1, 0.14, 0.06]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color={HOODIE_LIGHT} emissive={PINK} emissiveIntensity={0.15} roughness={0.5} />
        </RoundedBox>
      </mesh>
    </group>
  )
}

function Laptop({ hoverRef }) {
  const screenMat = useRef()
  const linesRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const hover = hoverRef?.current ?? 0
    if (screenMat.current) {
      screenMat.current.emissiveIntensity = 0.35 + hover * 0.25 + Math.sin(t * 2.2) * 0.08
    }
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        line.material.opacity = 0.45 + Math.sin(t * 3 + i) * 0.2 + hover * 0.15
      })
    }
  })

  return (
    <group position={[0.02, -0.38, 0.38]} rotation={[-0.38, -0.08, 0]}>
      <RoundedBox args={[0.72, 0.028, 0.48]} radius={0.012} smoothness={3}>
        <meshStandardMaterial color="#14141c" roughness={0.3} metalness={0.55} />
      </RoundedBox>
      <group position={[0, 0.2, -0.22]} rotation={[-0.68, 0, 0]}>
        <RoundedBox args={[0.66, 0.38, 0.014]} radius={0.006} smoothness={2}>
          <meshStandardMaterial ref={screenMat} color="#050508" roughness={0.1} emissive={PINK} emissiveIntensity={0.35} />
        </RoundedBox>
        <group ref={linesRef} position={[-0.22, 0.06, 0.008]}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, -i * 0.07, 0]}>
              <boxGeometry args={[0.28 + (i % 2) * 0.08, 0.01, 0.002]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? CYAN : LIME}
                emissive={i % 2 === 0 ? CYAN : LIME}
                emissiveIntensity={0.5}
                transparent
                opacity={0.55}
              />
            </mesh>
          ))}
        </group>
      </group>
      <mesh position={[0, 0.008, 0.04]}>
        <boxGeometry args={[0.1, 0.006, 0.035]} />
        <meshStandardMaterial color={PURPLE} emissive={PURPLE} emissiveIntensity={0.3} metalness={0.4} roughness={0.25} />
      </mesh>
    </group>
  )
}

function PlatformRing({ layout }) {
  const ring = useRef()
  useFrame((state) => {
    if (!ring.current) return
    ring.current.rotation.z = state.clock.elapsedTime * 0.15
  })

  return (
    <group position={[layout.charX, -1.32, 0]}>
      <Torus ref={ring} args={[0.55, 0.012, 12, 48]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.45} transparent opacity={0.7} />
      </Torus>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.52, 32]} />
        <meshStandardMaterial color="#0d0a14" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[0.48, 0.52, 32]} />
        <meshStandardMaterial color={PINK} emissive={PINK} emissiveIntensity={0.2} transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

export default function DeveloperCharacter({ pointer, scroll, reduced, layout }) {
  const root = useRef()
  const torso = useRef()
  const shoulders = useRef()
  const neck = useRef()
  const head = useRef()
  const visorMat = useRef()
  const leftPupil = useRef()
  const rightPupil = useRef()
  const hoverRef = useRef(0)

  const { update } = useCharacterRig(pointer, scroll, reduced)

  useFrame((state, delta) => {
    if (!head.current || !root.current || !layout) return

    const rig = update(delta, state.clock.elapsedTime)
    hoverRef.current = rig.hover

    const applyPupil = (pupil) => {
      if (!pupil?.current) return
      pupil.current.position.x = rig.eyeX * 0.014
      pupil.current.position.y = rig.eyeY * 0.01
    }
    applyPupil(leftPupil)
    applyPupil(rightPupil)

    head.current.rotation.y = rig.headX + rig.idleSway * 0.3
    head.current.rotation.x = rig.headY + rig.hover * 0.04 + rig.microNod
    head.current.rotation.z = rig.headZ

    neck.current.rotation.y = rig.neckX
    neck.current.rotation.x = rig.neckY
    shoulders.current.rotation.y = rig.shoulderX
    shoulders.current.rotation.x = rig.shoulderY
    torso.current.rotation.y = rig.bodyX
    torso.current.rotation.x = rig.bodyY

    if (visorMat.current) {
      visorMat.current.emissiveIntensity = 0.25 + rig.hover * 0.35 + rig.proximity * 0.15
    }

    const sp = rig.scrollP
    const scale = layout.charScale * (1 - sp * 0.2)
    root.current.position.set(
      layout.charX - sp * 0.12,
      layout.charY + rig.breathe - sp * 0.45,
      -sp * 0.75
    )
    root.current.rotation.z = sp * 0.03 - rig.idleSway * 0.12
    root.current.scale.setScalar(scale)
  })

  return (
    <>
      <PlatformRing layout={layout} />
      <group ref={root}>
        <group ref={torso}>
          <RoundedBox args={[0.88, 1.05, 0.44]} radius={0.1} smoothness={5} position={[0, -0.48, 0]}>
            <meshStandardMaterial color={HOODIE} roughness={0.88} metalness={0.04} />
          </RoundedBox>
          <RoundedBox args={[0.84, 0.32, 0.4]} radius={0.08} smoothness={4} position={[0, -0.06, -0.03]}>
            <meshStandardMaterial color={HOODIE_LIGHT} roughness={0.9} />
          </RoundedBox>
          {/* Neon stripe */}
          <mesh position={[0, 0.02, 0.21]}>
            <boxGeometry args={[0.5, 0.04, 0.012]} />
            <meshStandardMaterial color={PINK} emissive={PINK} emissiveIntensity={0.35} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.06, 0.21]}>
            <boxGeometry args={[0.35, 0.025, 0.01]} />
            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.25} roughness={0.3} />
          </mesh>

          <group ref={shoulders} position={[0, 0.02, 0]}>
            {/* Arms — angled toward laptop */}
            <group position={[-0.52, -0.18, 0.18]} rotation={[0.55, 0.2, 0.45]}>
              <RoundedBox args={[0.15, 0.52, 0.15]} radius={0.04} smoothness={3}>
                <meshStandardMaterial color={HOODIE} roughness={0.9} />
              </RoundedBox>
              <mesh position={[0.04, -0.32, 0.08]}>
                <sphereGeometry args={[0.07, 14, 14]} />
                <meshStandardMaterial color={SKIN} roughness={0.62} />
              </mesh>
            </group>
            <group position={[0.52, -0.18, 0.18]} rotation={[0.45, -0.15, -0.35]}>
              <RoundedBox args={[0.15, 0.52, 0.15]} radius={0.04} smoothness={3}>
                <meshStandardMaterial color={HOODIE} roughness={0.9} />
              </RoundedBox>
              <mesh position={[-0.04, -0.32, 0.08]}>
                <sphereGeometry args={[0.07, 14, 14]} />
                <meshStandardMaterial color={SKIN} roughness={0.62} />
              </mesh>
            </group>

            <Laptop hoverRef={hoverRef} />

            <group ref={neck} position={[0, 0.34, 0]}>
              <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.075, 0.09, 0.12, 16]} />
                <meshStandardMaterial color={SKIN_SHADOW} roughness={0.58} />
              </mesh>

              <group ref={head} position={[0, 0.22, 0]}>
                <mesh scale={[0.9, 1, 0.86]}>
                  <sphereGeometry args={[0.26, 28, 28]} />
                  <meshStandardMaterial color={SKIN} roughness={0.58} />
                </mesh>

                {/* Hair cap */}
                <mesh position={[0, 0.14, -0.02]} scale={[1, 0.55, 0.95]}>
                  <sphereGeometry args={[0.27, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
                  <meshStandardMaterial color={HAIR} roughness={0.92} />
                </mesh>

                <Headphones side={-1} />
                <Headphones side={1} />

                {/* Visor band */}
                <mesh position={[0, 0.04, 0.36]} scale={[1.05, 0.55, 0.35]}>
                  <boxGeometry args={[0.42, 0.12, 0.08]} />
                  <meshStandardMaterial
                    ref={visorMat}
                    color="#0a0a12"
                    emissive={CYAN}
                    emissiveIntensity={0.25}
                    roughness={0.15}
                    metalness={0.65}
                  />
                </mesh>
                <mesh position={[0, 0.04, 0.392]}>
                  <planeGeometry args={[0.36, 0.06]} />
                  <meshStandardMaterial
                    color={CYAN}
                    emissive={CYAN}
                    emissiveIntensity={0.15}
                    transparent
                    opacity={0.35}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                <VisorEye side={-1} pupilRef={leftPupil} />
                <VisorEye side={1} pupilRef={rightPupil} />

                {/* Star clip — gen z accent */}
                <mesh position={[0.18, 0.2, 0.32]} rotation={[0, 0, 0.4]} scale={0.06}>
                  <octahedronGeometry args={[1, 0]} />
                  <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.6} roughness={0.2} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  )
}
