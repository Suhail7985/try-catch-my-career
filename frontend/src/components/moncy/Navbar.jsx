import { useEffect } from 'react'
import HoverLinks from './HoverLinks'
import { personalInfo } from '../../data/portfolioData'
import { initSmoothScroll, smoothScrollTo, pauseSmoothScroll, getLenis } from '../../lib/smoothScroll'
import '../../styles/moncy/Navbar.css'
import '../../styles/moncy/Landing.css'

export default function Navbar() {
  useEffect(() => {
    let active = true

    initSmoothScroll({ startPaused: true }).then((lenis) => {
      if (!active) {
        lenis?.destroy()
        return
      }
      // Keep paused until loading finishes (initialFX resumes it)
      if (!document.querySelector('.main-active')) {
        pauseSmoothScroll()
      }
    })

    const links = document.querySelectorAll('.header ul a')
    const handlers = []

    links.forEach((elem) => {
      const handler = (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault()
          const section = elem.getAttribute('data-href')
          if (section) smoothScrollTo(section, { offset: 0 })
        }
      }
      elem.addEventListener('click', handler)
      handlers.push({ elem, handler })
    })

    return () => {
      active = false
      handlers.forEach(({ elem, handler }) => elem.removeEventListener('click', handler))
    }
  }, [])

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">Suhail.</a>
        <a href={`mailto:${personalInfo.email}`} className="navbar-connect" data-cursor="disable">
          {personalInfo.email}
        </a>
        <ul>
          <li><a data-href="#about" href="#about"><HoverLinks text="ABOUT" /></a></li>
          <li><a data-href="#work" href="#work"><HoverLinks text="WORK" /></a></li>
          <li><a data-href="#contact" href="#contact"><HoverLinks text="CONTACT" /></a></li>
        </ul>
      </div>
      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  )
}

// Compatibility export for initialFX imports
export const smoother = {
  paused: (value) => {
    if (value) pauseSmoothScroll()
    else getLenis()?.start()
  },
}
