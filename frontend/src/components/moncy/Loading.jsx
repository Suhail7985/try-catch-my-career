import { useEffect, useState } from 'react'
import { useLoading } from '../../context/LoadingProvider'
import { initialFX } from '../utils/initialFX'
import setSplitText from '../utils/splitText'
import '../../styles/moncy/Loading.css'

export default function Loading({ percent }) {
  const { setIsLoading } = useLoading()
  const [loaded, setLoaded] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (percent < 100) return
    const t = setTimeout(() => setLoaded(true), 30)
    return () => clearTimeout(t)
  }, [percent])

  useEffect(() => {
    if (!loaded) return
    setClicked(true)
    const t = setTimeout(() => {
      try {
        initialFX()
        setSplitText()
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    }, 160)
    return () => clearTimeout(t)
  }, [loaded, setIsLoading])

  function handleMouseMove(e) {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    target.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    target.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">Suhail.</a>
        <div className={`loaderGame ${clicked ? 'loader-out' : ''}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, i) => <div className="loaderGame-line" key={i} />)}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <div className="loading-marquee-track">
            <span> A Creative Developer</span>
            <span> A Creative Designer</span>
            <span> A Creative Developer</span>
            <span> A Creative Designer</span>
          </div>
        </div>
        <div
          className={`loading-wrap ${clicked ? 'loading-clicked' : ''}`}
          onMouseMove={handleMouseMove}
          role="presentation"
        >
          <div className="loading-hover" />
          <div className={`loading-button ${loaded ? 'loading-complete' : ''}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box" />
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
