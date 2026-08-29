import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Loading from '../components/moncy/Loading'

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: () => {},
  setLoading: () => {},
})

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [loading, setLoading] = useState(0)
  const safetyRef = useRef(null)

  useEffect(() => {
    safetyRef.current = setTimeout(() => setLoading(100), 700)
    return () => clearTimeout(safetyRef.current)
  }, [])

  useEffect(() => {
    if (loading >= 100 && safetyRef.current) clearTimeout(safetyRef.current)
  }, [loading])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, setLoading }}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  return useContext(LoadingContext)
}
