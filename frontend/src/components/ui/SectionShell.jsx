export default function SectionShell({ id, children, glow, className = '' }) {
  return (
    <section id={id} className={`section-padding relative ${className}`.trim()}>
      {glow}
      <div className="container-custom">{children}</div>
    </section>
  )
}
