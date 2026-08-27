import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolioData'
import WorkImage from './WorkImage'
import '../../styles/moncy/Work.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Work() {
  useGSAP(() => {
    let translateX = 0

    function setTranslateX() {
      const boxes = document.getElementsByClassName('work-box')
      if (!boxes.length) return
      const container = document.querySelector('.work-container')
      if (!container) return
      const rectLeft = container.getBoundingClientRect().left
      const rect = boxes[0].getBoundingClientRect()
      const parentWidth = boxes[0].parentElement.getBoundingClientRect().width
      const padding = parseInt(window.getComputedStyle(boxes[0]).padding, 10) / 2
      translateX = rect.width * boxes.length - (rectLeft + parentWidth) + padding
    }

    setTranslateX()
    if (translateX <= 0) return

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.work-section',
        start: 'top top',
        end: `+=${translateX}`,
        scrub: 0.5,
        pin: true,
        id: 'work',
      },
    })

    timeline.to('.work-flex', { x: -translateX, ease: 'none' })

    return () => {
      timeline.kill()
      ScrollTrigger.getById('work')?.kill()
    }
  }, [])

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.subtitle}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tech.slice(0, 6).join(', ')}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
