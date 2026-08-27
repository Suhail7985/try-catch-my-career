/** Ultra-fast loading progress */
export function setProgress(setLoading) {
  let percent = 28
  setLoading(percent)

  let interval = setInterval(() => {
    percent += 14 + Math.round(Math.random() * 16)
    setLoading(Math.min(percent, 92))
    if (percent >= 92) clearInterval(interval)
  }, 22)

  function clear() {
    clearInterval(interval)
    setLoading(100)
  }

  function loaded() {
    return new Promise((resolve) => {
      clearInterval(interval)
      percent = Math.max(percent, 94)
      setLoading(percent)
      interval = setInterval(() => {
        if (percent < 100) {
          percent += 6
          setLoading(Math.min(percent, 100))
        } else {
          resolve(percent)
          clearInterval(interval)
        }
      }, 3)
    })
  }

  return { loaded, percent, clear }
}
