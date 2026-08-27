import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function HeroLighting({ pointer }) {
  const key = useRef()
  const fill = useRef()
  const rim = useRef()

  useFrame(() => {
    const p = pointer.current
    const px = p.active ? p.x : 0
    const py = p.active ? p.y : 0

    if (key.current) {
      key.current.position.set(2.2 + px * 0.9, 3.5 + py * 0.45, 2.8)
    }
    if (fill.current) {
      fill.current.position.set(-1.8 + px * 0.5, 1.2 + py * 0.3, 2)
    }
    if (rim.current) {
      rim.current.position.set(px * 1.2, 0.5 + py * 0.4, -2.5)
    }
  })

  return (
    <>
      <ambientLight intensity={0.28} color="#e8e8f0" />
      <directionalLight ref={key} intensity={1.05} color="#fafafa" castShadow={false} />
      <directionalLight ref={fill} intensity={0.3} color="#e8e4dc" />
      <directionalLight ref={rim} intensity={0.4} color="#c9a96e" />
      <pointLight position={[1.2, 0.5, 2.5]} intensity={0.25} color="#f5f5f0" distance={8} />
      <pointLight position={[-1, -0.5, 1.5]} intensity={0.1} color="#8a7355" distance={6} />
    </>
  )
}
