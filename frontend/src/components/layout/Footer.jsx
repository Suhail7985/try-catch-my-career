import { motion } from 'framer-motion'
import { Mail, Heart, Code2, ArrowUp } from 'lucide-react'
import { socialLinks, navLinks } from '../../data/portfolioData'

// Inline SVG icons
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const footerLinks = navLinks

const socials = [
  { Icon: GithubIcon, href: socialLinks.github, label: 'GitHub' },
  { Icon: LinkedinIcon, href: socialLinks.linkedin, label: 'LinkedIn' },
  { Icon: () => <Mail size={15} />, href: socialLinks.email, label: 'Email' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative mt-0 border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #06b6d4, transparent)' }}
      />

      <div className="container-custom py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12 items-start">

          {/* Brand — full width on mobile, half at sm:, one-third at lg: */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
                <Code2 size={16} className="text-white" />
              </div>
              <span className="text-base sm:text-lg font-bold font-mono gradient-text-2">&lt;Suhail /&gt;</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Full-Stack MERN Developer crafting modern, scalable, and visually stunning web applications.
            </p>
            <div className="flex items-center gap-2 sm:gap-3 mt-5 justify-center sm:justify-start">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-widest">Navigation</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 max-w-xs mx-auto sm:mx-0 sm:max-w-none">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-widest">Status</h4>
            <div className="glass rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 text-sm font-medium">Available for Work</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Open to full-time roles, freelance projects, and exciting collaborations.
              </p>
              <a
                href={socialLinks.email}
                className="inline-block mt-3 text-xs font-semibold gradient-text-2 hover:opacity-80 transition-opacity"
              >
                Let's talk →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-5 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            Built with <Heart size={12} className="text-pink-500 fill-pink-500" /> by Mohd Suhail · {new Date().getFullYear()}
          </p>
          <p className="text-slate-600 text-xs text-center">React · Next.js · TypeScript · Node.js · MongoDB</p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors justify-self-center sm:justify-self-end"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))', border: '1px solid rgba(124,58,237,0.3)' }}
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
