import * as THREE from 'three'

/** Parent the cap mesh onto the head bone after the intro animation. */
export function attachCapToHead(character) {
  const cap = character.getObjectByName('Cube.002')
  const head =
    character.getObjectByName('spine006') ||
    character.getObjectByName('spine.006')
  if (!cap || !head) return

  head.attach(cap)
  cap.position.set(0, 1.48, 0.05)
  cap.rotation.set(-0.1, 0, 0)
  cap.scale.setScalar(0.133)

  const hair = character.getObjectByName('hair')
  if (hair) hair.visible = false
}
