const BANNER = `╔═╗╦ ╦╔═╗╦ ╦╔═╗
╚═╗║ ║║ ╦╠═╣║
╚═╝╚═╝╚═╝╩ ╩╚═╝`

export default function AsciiBanner({ className = '' }) {
  return (
    <pre className={`ascii-banner mono ${className}`.trim()} aria-hidden="true">
      {BANNER}
    </pre>
  )
}
