import { lazy, Suspense, useEffect, useState } from 'react'
import Cursor from './Cursor'
import Navbar from './Navbar'
import SocialIcons from './SocialIcons'
import Landing from './Landing'
import About from './About'
import WhatIDo from './WhatIDo'
import Career from './Career'
import Work from './Work'
import Contact from './Contact'
import setSplitText from '../utils/splitText'

const TechStack = lazy(() => import('./TechStack'))

export default function MainContainer({ children }) {
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > 1024)
  const [showTechStack, setShowTechStack] = useState(false)

  useEffect(() => {
    const onResize = () => {
      setSplitText()
      setIsDesktopView(window.innerWidth > 1024)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!isDesktopView) return

    const target = document.querySelector('.work-section')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTechStack(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [isDesktopView])

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && showTechStack && (
              <Suspense fallback={null}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  )
}
