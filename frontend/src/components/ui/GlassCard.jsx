import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  hover = true,
  padding = 'default',
  as: Component = motion.div,
  ...props
}) {
  const paddingClass = {
    compact: 'p-4 sm:p-5',
    default: 'p-5 sm:p-6 lg:p-7',
    large: 'p-6 sm:p-8 lg:p-10',
  }[padding] ?? 'p-5 sm:p-6 lg:p-7'

  return (
    <Component
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.3 }}
      className={`glass-strong rounded-2xl sm:rounded-3xl ${paddingClass} gradient-border flex flex-col h-full min-h-0 w-full ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
