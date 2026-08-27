export default function TerminalMarquee() {
  const text =
    ' ★ SUHAIL.DEV ★ full-stack dev ★ AI systems intern ★ it\'s giving main character energy ★ MERN • NEXT • TS • PYTHON ★ lowkey cracked at debugging ★ move cursor — character watches you ★ scroll for the sauce ★ '

  return (
    <div className="terminal-marquee" aria-hidden="true">
      <div className="terminal-marquee__track mono">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}
