import { personalInfo } from '../../data/portfolioData'
import '../../styles/moncy/Landing.css'

export default function Landing({ children }) {
  const parts = personalInfo.name.split(' ')
  const firstName = parts[0] || 'Suhail'
  const lastName = parts.slice(1).join(' ') || firstName

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I&apos;m</h2>
          <h1>
            {firstName.toUpperCase()}
            <br />
            <span>{lastName.toUpperCase()}</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>A Creative</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">Designer</div>
            <div className="landing-h2-2">Developer</div>
          </h2>
          <h2>
            <div className="landing-h2-info">Developer</div>
            <div className="landing-h2-info-1">Designer</div>
          </h2>
        </div>
      </div>
      {children}
    </div>
  )
}
