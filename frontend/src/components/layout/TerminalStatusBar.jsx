import { useEffect, useState } from 'react'

export default function TerminalStatusBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="terminal-status-bar mono" aria-hidden="true">
      <span className="terminal-status-bar__left">
        <span className="status-ok">● ONLINE</span>
        <span>VIBE: immaculate</span>
        <span>AURA: +999</span>
        <span>CWD: ~/retro-wave</span>
      </span>
      <span className="terminal-status-bar__right">
        <span>CPU: i486</span>
        <span>MEM: 640K OK</span>
        <span>{time}</span>
      </span>
    </div>
  )
}
