import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, revealOnScroll, revealSectionHeader, EASE } from '../../lib/gsap'
import SplitText from '../ui/SplitText'
import MagneticButton from '../ui/MagneticButton'
import TerminalWindow from '../ui/TerminalWindow'
import { stats, personalInfo } from '../../data/portfolioData'
import { smoothScrollTo } from '../../lib/smoothScroll'
import { useReducedMotion } from '../../hooks/useMedia'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return

      revealSectionHeader(sectionRef.current)

      revealOnScroll('.about-reveal', sectionRef.current, {
        start: 'top 78%',
        y: 56,
        stagger: 0.12,
        duration: 1,
      })

      gsap.from('.about-stat', {
        scrollTrigger: {
          trigger: sectionRef.current.querySelector('.about-stats'),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 32,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.08,
        ease: EASE.outExpo,
      })
    },
    { scope: sectionRef, dependencies: [reduced] }
  )

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container about-grid">
        <div className="about-reveal">
          <p className="section-label">About</p>
          <h2 className="about-statement section-title">
            AI Systems Evaluator &amp; Full-Stack Engineer
          </h2>
        </div>

        <TerminalWindow title="about" prompt="">
          <div className="about-reveal space-y-6">
            <p className="body-lg">
              I am a <strong>B.Tech CSE student</strong> at Lovely Professional University,
              currently working as an <strong>AI Systems Evaluation Intern at AirDawg Labs</strong>,
              testing LLMs with Terminal Bench 2.0, Docker, and structured AI benchmarking.
            </p>
            <p className="body-lg">
              I build with the <strong>MERN stack</strong>, <strong>Next.js</strong>,{' '}
              <strong>TypeScript</strong>, and <strong>Python</strong> — from AI-powered apps like BuggyBot to
              full-stack e-commerce platforms.
            </p>
            <p className="body-lg">
              Certified in <strong>AWS Cloud Technical Essentials</strong> and{' '}
              <strong>Agile Project Management</strong>. Based in {personalInfo.location}.
            </p>
          </div>

          <div className="about-stats about-reveal">
            {stats.map((s) => (
              <div key={s.label} className="about-stat">
                <p className="about-stat-value">{s.value}{s.suffix}</p>
                <p className="about-stat-label">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="about-reveal about-actions">
            <MagneticButton
              href="#contact"
              className="btn btn-cinematic"
              onClick={(e) => { e.preventDefault(); smoothScrollTo('#contact', { offset: -80 }) }}
            >
              Get in Touch
            </MagneticButton>
            <MagneticButton
              href="#experience"
              className="btn btn-cinematic-ghost"
              onClick={(e) => { e.preventDefault(); smoothScrollTo('#experience', { offset: -80 }) }}
            >
              Experience
            </MagneticButton>
          </div>
        </TerminalWindow>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        <TerminalWindow title="manifesto" prompt="">
          <p className="display-lg about-reveal" style={{ maxWidth: '28ch', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            {reduced ? (
              'Built different. Shipped different.'
            ) : (
              <SplitText as="span">Built different. Shipped different.</SplitText>
            )}
          </p>
        </TerminalWindow>
      </div>
    </section>
  )
}
