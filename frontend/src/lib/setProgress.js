/** Instant-feel loading progress */
export function setProgress(setLoading) {
  let percent = 42
  setLoading(percent)

  let interval = setInterval(() => {
    percent += 18 + Math.round(Math.random() * 12)
    setLoading(Math.min(percent, 96))
    if (percent >= 96) clearInterval(interval)
  }, 12)

  function clear() {
    clearInterval(interval)
    setLoading(100)
  }

  function loaded() {
    return new Promise((resolve) => {
      clearInterval(interval)
      setLoading(100)
      resolve(100)
    })
  }

  return { loaded, percent, clear }
}
