export default function TerminalWindow({ title, children, className = '', prompt }) {
  return (
    <div className={`terminal-window ${className}`.trim()}>
      <div className="terminal-titlebar">
        <div className="terminal-dots" aria-hidden="true">
          <span className="terminal-dot terminal-dot--close" />
          <span className="terminal-dot terminal-dot--min" />
          <span className="terminal-dot terminal-dot--max" />
        </div>
        <span className="terminal-title mono">{title}</span>
      </div>
      <div className="terminal-body">
        {prompt && <p className="terminal-cmd mono">{prompt}</p>}
        {children}
      </div>
    </div>
  )
}
