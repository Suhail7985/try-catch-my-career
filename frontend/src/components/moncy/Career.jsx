import { workExperience, education } from '../../data/portfolioData'
import '../../styles/moncy/Career.css'

const entries = [
  ...workExperience.map((job) => ({
    role: job.role,
    org: job.company,
    period: job.duration.split('–')[0]?.trim() || 'NOW',
    text: job.highlights[0],
  })),
  ...education.slice(0, 2).map((edu) => ({
    role: edu.degree,
    org: edu.institution.split(',')[0],
    period: edu.duration.split('–')[0]?.trim() || '',
    text: `${edu.field} — coursework in ${edu.coursework.slice(0, 3).join(', ')}.`,
  })),
]

export default function Career() {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot" />
          </div>
          {entries.map((entry) => (
            <div className="career-info-box" key={`${entry.role}-${entry.org}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <h5>{entry.org}</h5>
                </div>
                <h3>{entry.period}</h3>
              </div>
              <p>{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
