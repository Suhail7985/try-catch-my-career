import { useEffect } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { TbNotes } from 'react-icons/tb'
import HoverLinks from './HoverLinks'
import { socialLinks } from '../../data/portfolioData'
import '../../styles/moncy/SocialIcons.css'

export default function SocialIcons() {
  useEffect(() => {
    const social = document.getElementById('social')
    if (!social) return

    const cleanups = []
    social.querySelectorAll('span').forEach((item) => {
      const link = item.querySelector('a')
      if (!link) return
      const rect = item.getBoundingClientRect()
      let mouseX = rect.width / 2
      let mouseY = rect.height / 2
      let currentX = 0
      let currentY = 0
      let rafId

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1
        currentY += (mouseY - currentY) * 0.1
        link.style.setProperty('--siLeft', `${currentX}px`)
        link.style.setProperty('--siTop', `${currentY}px`)
        rafId = requestAnimationFrame(updatePosition)
      }

      const onMouseMove = (e) => {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX = (x < 40 && x > 10 && y < 40 && y > 5) ? x : rect.width / 2
        mouseY = (x < 40 && x > 10 && y < 40 && y > 5) ? y : rect.height / 2
      }

      document.addEventListener('mousemove', onMouseMove)
      rafId = requestAnimationFrame(updatePosition)
      cleanups.push(() => { cancelAnimationFrame(rafId); document.removeEventListener('mousemove', onMouseMove) })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span><a href={socialLinks.github} target="_blank" rel="noreferrer"><FaGithub /></a></span>
        <span><a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /></a></span>
      </div>
      <a className="resume-button" href="/resume.pdf" download data-cursor="disable">
        <HoverLinks text="RESUME" />
        <span><TbNotes /></span>
      </a>
    </div>
  )
}
