import { aboutBio } from '../../data/portfolioData'
import '../../styles/moncy/About.css'

export default function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{aboutBio}</p>
      </div>
    </div>
  )
}
