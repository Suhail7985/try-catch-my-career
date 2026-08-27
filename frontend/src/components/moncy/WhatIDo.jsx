import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '../../lib/gsap'
import { skills } from '../../data/portfolioData'
import '../../styles/moncy/WhatIDo.css'

const cards = [
  {
    title: 'DEVELOP',
    subtitle: 'Full-Stack Engineering',
    description:
      'Building scalable web applications with React, Next.js, Node.js, and MongoDB — from polished UI to robust REST APIs and deployment pipelines.',
    tags: [...skills.Frontend, ...skills.Backend, ...skills.Languages].map((s) => s.name).slice(0, 10),
  },
  {
    title: 'EVALUATE',
    subtitle: 'AI Systems & QA',
    description:
      'Testing and evaluating LLMs in Linux environments — designing benchmarks, probing edge cases, and documenting findings for reliable AI systems.',
    tags: [...skills['AI & Evaluation'], ...skills['QA & Testing']].map((s) => s.name).slice(0, 10),
  },
]

function handleClick(container) {
  container.classList.toggle('what-content-active')
  container.classList.remove('what-sibling')
  if (container.parentElement) {
    Array.from(container.parentElement.children).forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove('what-content-active')
        sibling.classList.toggle('what-sibling')
      }
    })
  }
}

export default function WhatIDo() {
  const containerRef = useRef([])

  useEffect(() => {
    if (!ScrollTrigger.isTouch) return

    containerRef.current.forEach((container) => {
      if (!container) return
      container.classList.remove('what-noTouch')
      const fn = () => handleClick(container)
      container.addEventListener('click', fn)
      container.__clickFn = fn
    })

    return () => {
      containerRef.current.forEach((container) => {
        if (container?.__clickFn) {
          container.removeEventListener('click', container.__clickFn)
        }
      })
    }
  }, [])

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%" aria-hidden="true">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="what-content what-noTouch"
              ref={(el) => { containerRef.current[index] = el }}
            >
              <div className="what-border1">
                <svg height="100%" aria-hidden="true">
                  {index === 0 && (
                    <>
                      <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                      <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                    </>
                  )}
                  {index === 1 && (
                    <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  )}
                </svg>
              </div>
              <div className="what-corner" />
              <div className="what-content-in">
                <h3>{card.title}</h3>
                <h4>{card.subtitle}</h4>
                <p>{card.description}</p>
                <h5>Skillset &amp; tools</h5>
                <div className="what-content-flex">
                  {card.tags.map((tag) => (
                    <div className="what-tags" key={tag}>{tag}</div>
                  ))}
                </div>
                <div className="what-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
