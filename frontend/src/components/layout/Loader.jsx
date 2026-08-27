import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [line, setLine] = useState(0)
  const bootLines = [
    '> booting RETRO-WAVE.SYS...',
    '> loading [REACT][THREE][GSAP][VIBES]...',
    '> connecting to the sauce...',
  ]

  useEffect(() => {
    const start = performance.now()
    const duration = 1600

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setProgress(p)
      setLine(Math.min(Math.floor(p * bootLines.length), bootLines.length - 1))
      if (p < 1) requestAnimationFrame(tick)
      else setTimeout(onComplete, 280)
    }

    requestAnimationFrame(tick)
  }, [onComplete, bootLines.length])

  return (
    <AnimatePresence>
      <motion.div
        className="loader"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="loader-terminal">
          <p className="loader-text">&gt; SUHAIL.EXE // retro-wave edition</p>
          <p className="loader-line">{bootLines[line]}</p>
          <div className="loader-bar">
            <motion.div
              className="loader-bar-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="loader-percent mono">{Math.round(progress * 100)}%</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
