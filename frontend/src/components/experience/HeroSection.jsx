import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, createHeroIntroTimeline, createHeroScrollTimeline } from '../../lib/gsap'
import { ArrowDown, ArrowRight } from 'lucide-react'
import SplitText from '../ui/SplitText'
import MagneticButton from '../ui/MagneticButton'
import { personalInfo } from '../../data/portfolioData'
import { useReducedMotion, useCoarsePointer } from '../../hooks/useMedia'
import { useHeroPointer, useHeroScrollProgress } from '../../hooks/useHeroPointer'
import { smoothScrollTo } from '../../lib/smoothScroll'

const HeroScene = lazy(() => import('./HeroScene'))

const roles = [
  'Full-Stack Developer',
  'AI Systems Engineer',
  'MERN Stack Specialist',
  'Next.js Developer',
]

function RoleCycle() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[index]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 55)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 28)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index])

  return (
    <span aria-live="polite" className="hero-role-text">
      {text}
      <span className="hero-role-caret" />
    </span>
  )
}

export default function HeroSection() {
  const reduced = useReducedMotion()
  const coarse = useCoarsePointer()
  const heroRef = useRef(null)
  const copyRef = useRef(null)
  const pointer = useHeroPointer(heroRef)
  const scroll = useHeroScrollProgress(heroRef)

  const firstName = personalInfo.name.split(' ').slice(-1)[0] || 'Suhail'

  useGSAP(
    () => {
      if (reduced || !heroRef.current || !copyRef.current) return

      gsap.set(copyRef.current, { opacity: 1 })

      createHeroIntroTimeline(copyRef.current)
      createHeroScrollTimeline(heroRef.current, copyRef.current)
    },
    { scope: heroRef, dependencies: [reduced] }
  )

  return (
    <section id="home" className="hero hero--cinematic" ref={heroRef} data-cursor="character">
      <div className="hero-canvas-wrap hero-canvas-wrap--full" aria-hidden="true">
        <Suspense fallback={<div className="hero-stage-skeleton" />}>
          <HeroScene pointer={pointer} scroll={scroll} />
        </Suspense>
      </div>

      <div className="hero-atmosphere hero-atmosphere--cinematic" aria-hidden="true" />
      <div className="hero-vignette hero-vignette--cinematic" aria-hidden="true" />

      <div className="hero-content" ref={copyRef}>
        <p className="hero-eyebrow">Creative Developer</p>

        <h1 className="hero-title">
          <SplitText trigger={!reduced} animate={false}>
            {firstName}
          </SplitText>
        </h1>

        <div className="hero-role-wrap">
          <RoleCycle />
        </div>

        <div className="hero-tagline">
          <p>
            Building immersive web experiences with React, Next.js, TypeScript &amp; the MERN stack.
            Currently evaluating AI systems at AirDawg Labs.
          </p>
        </div>

        <div className="hero-actions hero-actions--cinematic">
          <MagneticButton
            href="#work"
            className="btn btn-cinematic"
            data-cursor="view"
            onClick={(e) => { e.preventDefault(); smoothScrollTo('#work', { offset: -80 }) }}
          >
            View Work <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton
            href="/resume.pdf"
            download
            className="btn btn-cinematic-ghost"
            data-cursor="open"
          >
            Resume
          </MagneticButton>
        </div>
      </div>

      {!reduced && (
        <p className="hero-interact-hint" aria-hidden="true">
          {coarse ? 'Touch to interact' : 'Move cursor to interact'}
        </p>
      )}

      {!reduced && (
        <button
          type="button"
          className="hero-scroll-hint hero-scroll-hint--cinematic"
          onClick={() => smoothScrollTo('#about', { offset: -80 })}
          aria-label="Scroll to explore"
        >
          <span>Scroll</span>
          <ArrowDown size={18} className="hero-scroll-icon" />
        </button>
      )}
    </section>
  )
}
