import { Component, lazy, Suspense } from 'react'
import { LoadingProvider } from './context/LoadingProvider'

const CharacterModel = lazy(() => import('./components/Character'))
const MainContainer = lazy(() => import('./components/moncy/MainContainer'))

class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          padding: '2rem',
          background: '#0b080c',
          color: '#eae5ec',
          fontFamily: 'Geist, sans-serif',
        }}>
          <h1 style={{ color: '#c2a4ff' }}>App error</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error?.message || this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Suspense fallback={
          <div style={{ minHeight: '100vh', background: '#0b080c', color: '#eae5ec', display: 'grid', placeItems: 'center' }}>
            Loading…
          </div>
        }>
          <MainContainer>
            <Suspense fallback={null}>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </ErrorBoundary>
  )
}
