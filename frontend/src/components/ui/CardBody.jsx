/** Flex-grow card content area — keeps headers/footers aligned in grid cards */
export default function CardBody({ children, className = '' }) {
  return (
    <div className={`flex flex-col flex-1 min-h-0 gap-3 ${className}`.trim()}>
      {children}
    </div>
  )
}
