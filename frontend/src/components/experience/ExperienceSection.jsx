import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, revealSectionHeader, revealOnScroll, EASE, ScrollTrigger } from '../../lib/gsap'
import { workExperience, education, courses, achievements } from '../../data/portfolioData'
import { useReducedMotion } from '../../hooks/useMedia'

const timelineItems = [
  ...workExperience.map((job) => ({
    id: `work-${job.id}`,
    year: job.duration,
    title: job.role,
    subtitle: job.company,
    desc: job.highlights.join(' '),
    type: 'work',
  })),
  ...education.map((e) => ({
    id: `edu-${e.id}`,
    year: e.duration,
    title: e.degree,
    subtitle: `${e.field} · ${e.institution}`,
    desc: e.coursework.join(', '),
    type: 'education',
  })),
  ...courses.map((c) => ({
    id: `cert-${c.id}`,
    year: c.date,
    title: c.title,
    subtitle: c.institution,
    desc: c.categories.join(', '),
    type: 'certification',
  })),
  ...achievements.map((a) => ({
    id: `ach-${a.id}`,
    year: a.date,
    title: a.title,
    subtitle: a.org,
    desc: '',
    type: 'achievement',
  })),
]

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return
      revealSectionHeader(sectionRef.current, { subtitle: '.section-intro' })
    },
    { scope: sectionRef, dependencies: [reduced] }
  )

  useGSAP(
    () => {
      if (reduced || !timelineRef.current) return

      const items = timelineRef.current.querySelectorAll('.timeline-item')

      gsap.from(items, {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -32,
        duration: 0.85,
        stagger: 0.12,
        ease: EASE.outExpo,
      })

      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        })
      })
    },
    { scope: timelineRef, dependencies: [reduced] }
  )

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        <p className="section-label">Experience</p>
        <h2 className="section-title">
          My <em>Journey</em>
        </h2>
        <p className="section-intro body-lg" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          Work, education, and certifications along the way.
        </p>

        <div className="timeline" ref={timelineRef}>
          {timelineItems.map((item, i) => (
            <article
              key={item.id}
              className={`timeline-item ${activeIndex === i ? 'active' : ''}`}
            >
              <div className="timeline-dot" />
              <p className="timeline-year mono">{item.type} · {item.year}</p>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-sub">{item.subtitle}</p>
              {item.desc && <p className="timeline-desc">{item.desc}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
