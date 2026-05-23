import { useState, lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/animations/LoadingScreen'
import LazySection from './components/ui/LazySection'
import { useLenisScroll } from './hooks/useLenisScroll'

const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Courses = lazy(() => import('./components/sections/Courses'))
const Education = lazy(() => import('./components/sections/Education'))
const Services = lazy(() => import('./components/sections/Services'))
const CodingProfiles = lazy(() => import('./components/sections/CodingProfiles'))
const Contact = lazy(() => import('./components/sections/Contact'))

const CursorGlow = lazy(() => import('./components/animations/CursorGlow'))

const SESSION_KEY = 'portfolio-session-ready'

export default function App() {
  const [isLoading, setIsLoading] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)
  )

  useLenisScroll(!isLoading)

  const handleLoadComplete = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setIsLoading(false)
  }

  return (
    <div className="app-shell relative min-h-screen w-full overflow-x-hidden">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-primary)',
            border: '1px solid rgba(124,58,237,0.3)',
          },
        }}
      />

      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      {!isLoading && (
        <>
          <Suspense fallback={null}>
            <CursorGlow />
          </Suspense>
          <Navbar />
          <main className="w-full">
            <Suspense fallback={null}>
              <Hero />
            </Suspense>
            <LazySection><About /></LazySection>
            <LazySection><Skills /></LazySection>
            <LazySection><Projects /></LazySection>
            <LazySection><Courses /></LazySection>
            <LazySection><Education /></LazySection>
            <LazySection><Services /></LazySection>
            <LazySection><CodingProfiles /></LazySection>
            <LazySection><Contact /></LazySection>
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
