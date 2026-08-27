import { useRef } from 'react'
import { springStep } from './useHeroPointer'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

export function useCharacterRig(pointer, scroll, reduced) {
  const state = useRef({
    eyeX: 0,
    eyeY: 0,
    headX: 0,
    headY: 0,
    headZ: 0,
    neckX: 0,
    neckY: 0,
    shoulderX: 0,
    shoulderY: 0,
    bodyX: 0,
    bodyY: 0,
    blink: 1,
    blinkT: 0,
    nextBlink: 2.2,
    hover: 0,
    breathe: 0,
  })

  const update = (delta, time) => {
    const p = pointer.current
    const scrollP = scroll?.current ?? 0
    const t = time

    const breathe = Math.sin(t * 1.15) * 0.014
    const idleSway = Math.sin(t * 0.55) * 0.018
    const microNod = Math.sin(t * 0.31) * 0.008

    const proximity = p.active ? clamp(1.1 - p.distance * 1.85, 0.12, 1) : 0.2
    const targetEyeX = p.active ? p.x * 0.26 * proximity : Math.sin(t * 0.38) * 0.05
    const targetEyeY = p.active ? p.y * 0.2 * proximity : Math.cos(t * 0.33) * 0.035

    const targetHeadX = targetEyeX * 0.48
    const targetHeadY = targetEyeY * 0.4
    const targetHeadZ = targetEyeX * 0.06
    const targetNeckX = targetHeadX * 0.32
    const targetNeckY = targetHeadY * 0.28
    const targetShoulderX = targetHeadX * 0.1
    const targetShoulderY = targetHeadY * 0.08
    const targetBodyX = targetHeadX * 0.04
    const targetBodyY = targetHeadY * 0.03

    const s = state.current
    const eyeStiff = reduced ? 0 : 16
    const headStiff = reduced ? 0 : 7.5
    const bodyStiff = reduced ? 0 : 4.5

    s.eyeX = springStep(s.eyeX, targetEyeX, eyeStiff, delta)
    s.eyeY = springStep(s.eyeY, targetEyeY, eyeStiff, delta)
    s.headX = springStep(s.headX, targetHeadX, headStiff, delta)
    s.headY = springStep(s.headY, targetHeadY, headStiff, delta)
    s.headZ = springStep(s.headZ, targetHeadZ, headStiff * 0.9, delta)
    s.neckX = springStep(s.neckX, targetNeckX, bodyStiff, delta)
    s.neckY = springStep(s.neckY, targetNeckY, bodyStiff, delta)
    s.shoulderX = springStep(s.shoulderX, targetShoulderX, bodyStiff, delta)
    s.shoulderY = springStep(s.shoulderY, targetShoulderY, bodyStiff, delta)
    s.bodyX = springStep(s.bodyX, targetBodyX, bodyStiff * 0.75, delta)
    s.bodyY = springStep(s.bodyY, targetBodyY, bodyStiff * 0.75, delta)

    const hoverTarget = p.overCharacter || p.distance < 0.32 ? 1 : 0
    s.hover = springStep(s.hover, hoverTarget, 5, delta)
    s.breathe = breathe

    s.blinkT += delta
    if (s.blinkT > s.nextBlink) {
      s.blinkT = 0
      s.nextBlink = 2.5 + Math.random() * 4
    }
    const blinkPhase =
      s.blinkT < 0.1 ? 1 - s.blinkT / 0.05 : s.blinkT < 0.16 ? (s.blinkT - 0.1) / 0.06 : 1
    s.blink = springStep(s.blink, Math.max(0.05, blinkPhase), 22, delta)

    return {
      ...s,
      idleSway,
      microNod,
      scrollP,
      proximity,
    }
  }

  return { state, update }
}
