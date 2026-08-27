import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2 } from 'lucide-react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 28 + 12
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 350)
        }, 120)
      }
      setProgress(Math.min(p, 100))
    }, 70)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--color-bg-primary)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #9333ea, #f472b6)' }}
            />
          </div>

          <div className="relative mb-8 sm:mb-10">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 mx-auto"
              style={{ background: 'linear-gradient(135deg, #9333ea, #f472b6)' }}
            >
              <Code2 size={32} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-mono gradient-text text-center">
              &lt;Suhail /&gt;
            </h1>
          </div>

          <div className="w-48 sm:w-64 mx-4">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Loading</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-100"
                style={{
                  background: 'linear-gradient(90deg, #9333ea, #f472b6, #fb923c)',
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
