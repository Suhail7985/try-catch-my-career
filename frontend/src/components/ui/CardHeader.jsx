export default function CardHeader({ icon, iconWrapClassName = '', title, subtitle, className = '' }) {
  return (
    <div className={`flex items-center gap-3 shrink-0 mb-4 sm:mb-5 ${className}`}>
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl glass flex items-center justify-center shrink-0 ${iconWrapClassName}`}
      >
        {icon}
      </div>
      <div className="min-w-0 text-left">
        <h3 className="text-theme font-bold text-lg sm:text-xl leading-tight">{title}</h3>
        {subtitle && (
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
