import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, revealOnScroll, revealSectionHeader, EASE } from '../../lib/gsap'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import { projects } from '../../data/portfolioData'
import { useReducedMotion } from '../../hooks/useMedia'

function ProjectBlock({ project, index, total }) {
  const blockRef = useRef(null)
  const previewRef = useRef(null)
  const metaRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !blockRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blockRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: EASE.out, duration: 0.9 },
      })

      if (previewRef.current) {
        tl.from(previewRef.current, { opacity: 0, y: 48, scale: 0.96, duration: 1.1 })
      }

      tl.from(
        metaRef.current?.children || [],
        { opacity: 0, y: 36, stagger: 0.07, duration: 0.85 },
        previewRef.current ? '-=0.65' : 0
      )
    },
    { scope: blockRef, dependencies: [reduced] }
  )

  const onMove = (e) => {
    if (reduced || !previewRef.current) return
    cancelAnimationFrame(previewRef.current.__raf)
    previewRef.current.__raf = requestAnimationFrame(() => {
      if (!previewRef.current) return
      const rect = previewRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      previewRef.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
    })
  }

  const onLeave = () => {
    if (previewRef.current) previewRef.current.style.transform = ''
  }

  const num = String(index + 1).padStart(2, '0')

  return (
    <article ref={blockRef} className="work-item">
      <div className="work-sticky">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          <div
            ref={previewRef}
            className="work-preview order-2 lg:order-1"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            data-cursor="explore"
          >
            <div className="work-preview-browser">
              <span className="work-preview-dot" />
              <span className="work-preview-dot" />
              <span className="work-preview-dot" />
              <span className="mono text-xs ml-2" style={{ color: 'var(--text-faint)' }}>
                {new URL(project.live).hostname}
              </span>
            </div>
            <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
          </div>

          <div ref={metaRef} className="work-meta order-1 lg:order-2">
            <span className="work-index mono">[{num}/{String(total).padStart(2, '0')}]</span>
            <h3 className="display-lg">{project.title}</h3>
            {project.subtitle && (
              <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '-0.75rem' }}>
                {project.subtitle} · {project.period}
              </p>
            )}
            <p className="body-lg">{project.description}</p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.features.slice(0, 3).map((f) => (
                <li key={f} className="body-lg" style={{ fontSize: '0.875rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-secondary)' }}>—</span> {f}
                </li>
              ))}
            </ul>

            <div className="work-tags">
              {project.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <MagneticButton
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cinematic"
              data-cursor="project"
              style={{ alignSelf: 'flex-start' }}
            >
              Visit Live Site <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function WorkSection() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return
      revealSectionHeader(sectionRef.current, {
        label: '.section-label',
        title: '.section-title',
        subtitle: '.section-intro',
      })
    },
    { scope: sectionRef, dependencies: [reduced] }
  )

  return (
    <section id="work" className="section" ref={sectionRef}>
      <div className="container" style={{ marginBottom: '4rem' }}>
        <p className="section-label">Work</p>
        <h2 className="section-title">
          Selected <em>Projects</em>
        </h2>
        <p className="section-intro body-lg" style={{ maxWidth: '32rem', marginTop: '1rem' }}>
          AI debugging assistant and full-stack e-commerce — built with Next.js, TypeScript, and the MERN stack.
        </p>
      </div>

      {projects.map((project, i) => (
        <ProjectBlock key={project.id} project={project} index={i} total={projects.length} />
      ))}
    </section>
  )
}
