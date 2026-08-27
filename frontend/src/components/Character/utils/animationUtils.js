import * as THREE from 'three'
import { eyebrowBoneNames, typingBoneNames } from '../../../data/boneData'
import { attachCapToHead } from './capUtils'

function filterAnimationTracks(clip, boneNames) {
  const filteredTracks = clip.tracks.filter((track) =>
    boneNames.some((boneName) => track.name.includes(boneName))
  )
  return new THREE.AnimationClip(clip.name + '_filtered', clip.duration, filteredTracks)
}

function createBoneAction(gltf, mixer, clipName, boneNames) {
  const clip = THREE.AnimationClip.findByName(gltf.animations, clipName)
  if (!clip) return null
  return mixer.clipAction(filterAnimationTracks(clip, boneNames))
}

export default function setAnimations(gltf) {
  const character = gltf.scene
  const mixer = new THREE.AnimationMixer(character)
  let capAttached = false

  function wearCap() {
    if (capAttached) return
    capAttached = true
    attachCapToHead(character)
  }

  if (gltf.animations) {
    ;['key1', 'key2', 'key5', 'key6'].forEach((name) => {
      const clip = THREE.AnimationClip.findByName(gltf.animations, name)
      if (clip) {
        const action = mixer.clipAction(clip)
        action.play()
        action.timeScale = 1.2
      }
    })

    const typingAction = createBoneAction(gltf, mixer, 'typing', typingBoneNames)
    if (typingAction) {
      typingAction.enabled = true
      typingAction.play()
      typingAction.timeScale = 1.2
    }
  }

  mixer.addEventListener('finished', (event) => {
    if (event.action?.getClip()?.name === 'introAnimation') wearCap()
  })

  function startIntro() {
    const introClip = gltf.animations.find((clip) => clip.name === 'introAnimation')
    if (!introClip) {
      wearCap()
      return
    }

    const introAction = mixer.clipAction(introClip)
    introAction.setLoop(THREE.LoopOnce, 1)
    introAction.clampWhenFinished = true
    introAction.reset().play()

    setTimeout(wearCap, 2800)

    setTimeout(() => {
      const blink = gltf.animations.find((clip) => clip.name === 'Blink')
      if (blink) mixer.clipAction(blink).play().fadeIn(0.5)
    }, 2400)
  }

  function hover(hoverDiv) {
    const eyeBrowUpAction = createBoneAction(gltf, mixer, 'browup', eyebrowBoneNames)
    let isHovering = false
    if (eyeBrowUpAction) {
      eyeBrowUpAction.setLoop(THREE.LoopOnce, 1)
      eyeBrowUpAction.clampWhenFinished = true
      eyeBrowUpAction.enabled = true
    }

    const onHoverFace = () => {
      if (eyeBrowUpAction && !isHovering) {
        isHovering = true
        eyeBrowUpAction.reset()
        eyeBrowUpAction.enabled = true
        eyeBrowUpAction.setEffectiveWeight(4)
        eyeBrowUpAction.fadeIn(0.5).play()
      }
    }

    const onLeaveFace = () => {
      if (eyeBrowUpAction && isHovering) {
        isHovering = false
        eyeBrowUpAction.fadeOut(0.6)
      }
    }

    if (!hoverDiv) return
    hoverDiv.addEventListener('mouseenter', onHoverFace)
    hoverDiv.addEventListener('mouseleave', onLeaveFace)
    return () => {
      hoverDiv.removeEventListener('mouseenter', onHoverFace)
      hoverDiv.removeEventListener('mouseleave', onLeaveFace)
    }
  }

  return { mixer, startIntro, hover }
}
