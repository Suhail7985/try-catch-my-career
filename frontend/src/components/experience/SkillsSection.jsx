import { useRef, useState, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, revealSectionHeader, EASE } from '../../lib/gsap'
import TerminalWindow from '../ui/TerminalWindow'
import { skills, projects } from '../../data/portfolioData'
import { useReducedMotion } from '../../hooks/useMedia'

const categories = Object.keys(skills)

function getRelatedProjects(techName) {
  const needle = techName.toLowerCase().replace('.js', '')
  return projects.filter(
    (p) =>
      p.tech.some((t) => t.toLowerCase().includes(needle) || needle.includes(t.toLowerCase().split('.')[0])) ||
      p.category.some((c) => c.toLowerCase().includes(needle))
  )
}

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('Languages')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const reduced = useReducedMotion()

  const activeSkills = skills[activeCategory] || []
  const related = useMemo(
    () => (hoveredSkill ? getRelatedProjects(hoveredSkill) : []),
    [hoveredSkill]
  )

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return
      revealSectionHeader(sectionRef.current, {
        subtitle: '.section-intro',
      })

      gsap.from(sectionRef.current.querySelector('.skills-layout'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 48,
        duration: 1,
        ease: EASE.outExpo,
      })
    },
    { scope: sectionRef, dependencies: [reduced] }
  )

  useGSAP(
    () => {
      if (reduced || !gridRef.current) return
      gsap.from(gridRef.current.querySelectorAll('.skill-chip'), {
        opacity: 0,
        y: 20,
        scale: 0.94,
        duration: 0.55,
        stagger: 0.025,
        ease: EASE.out,
      })
    },
    { scope: gridRef, dependencies: [activeCategory, reduced] }
  )

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <p className="section-label">Skills</p>
        <h2 className="section-title">
          Tech <em>Stack</em>
        </h2>
        <p className="section-intro body-lg" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          Hover a skill to see related projects.
        </p>

        <TerminalWindow title="stack">
          <div className="skills-layout">
            <div className="skills-categories" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`skill-category-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => { setActiveCategory(cat); setHoveredSkill(null) }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div ref={gridRef}>
              <div className="skills-grid" role="tabpanel">
                {activeSkills.map((skill) => {
                  const isHovered = hoveredSkill === skill.name
                  const isDimmed = hoveredSkill && !isHovered
                  return (
                    <span
                      key={skill.name}
                      className={`skill-chip ${isHovered ? 'highlight' : ''} ${isDimmed ? 'dim' : ''}`}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onFocus={() => setHoveredSkill(skill.name)}
                      onBlur={() => setHoveredSkill(null)}
                      tabIndex={0}
                    >
                      {skill.icon ? `${skill.icon} ` : ''}{skill.name}
                    </span>
                  )
                })}
              </div>

              {related.length > 0 && (
                <div className="skills-related">
                  <p className="skills-related-label">Used in</p>
                  <div className="work-tags">
                    {related.map((p) => (
                      <a
                        key={p.id}
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tag"
                        data-cursor="project"
                      >
                        {p.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
