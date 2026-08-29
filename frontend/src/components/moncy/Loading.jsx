import { useEffect } from 'react'
import { useLoading } from '../../context/LoadingProvider'
import { initialFX } from '../utils/initialFX'
import setSplitText from '../utils/splitText'
import '../../styles/moncy/Loading.css'

export default function Loading({ percent }) {
  const { setIsLoading } = useLoading()
  const done = percent >= 100

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => {
      try {
        initialFX()
        setSplitText()
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    }, 40)
    return () => clearTimeout(t)
  }, [done, setIsLoading])

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">Suhail.</a>
        <div className={`loaderGame ${done ? 'loader-out' : ''}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, i) => <div className="loaderGame-line" key={i} />)}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>
      <div className={`loading-screen ${done ? 'loading-screen-out' : ''}`}>
        <div className="loading-marquee">
          <div className="loading-marquee-track">
            <span>Full-Stack Developer</span>
            <span>MERN Engineer</span>
            <span>Full-Stack Developer</span>
            <span>MERN Engineer</span>
          </div>
        </div>
        <div className={`loading-wrap ${done ? 'loading-clicked' : ''}`}>
          <div className="loading-button">
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
