/**
 * Consistent section title block — centered eyebrow, heading, divider, optional description.
 */
export default function SectionHeader({ eyebrow, children, description, className = '' }) {
  return (
    <div className={`section-header ${className}`.trim()}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="text-section-title text-theme text-balance">{children}</h2>
      <div className="section-divider" aria-hidden="true" />
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}
