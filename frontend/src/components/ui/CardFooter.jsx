export default function CardFooter({ stats = [], linkHref, linkLabel, linkClassName = 'text-purple-400 hover:text-white' }) {
  return (
    <div className="mt-auto shrink-0 pt-4 sm:pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
      {stats.length > 0 && (
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start w-full sm:w-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center min-w-[4rem]">
              <p className="text-theme font-bold text-base sm:text-lg">{s.value}</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      )}
      {linkHref && linkLabel && (
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xs font-bold transition-colors shrink-0 ${linkClassName}`}
        >
          {linkLabel}
        </a>
      )}
    </div>
  )
}
