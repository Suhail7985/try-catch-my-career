import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Code2, ChevronDown, ArrowUpRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { navLinks, navMain, navMore } from '../../data/portfolioData'

function NavItem({ link, isActive, onNavigate, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(link.href)}
      className={`nav-link ${isActive ? 'nav-link--active' : ''} ${className}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="nav-link__indicator"
          transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
        />
      )}
      <span className="relative z-10">{link.label}</span>
    </button>
  )
}

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)

  const sectionIds = navLinks.map((l) => l.href.slice(1))
  const isMoreActive = navMore.some((l) => activeSection === l.href.slice(1))

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen)
    return () => document.body.classList.remove('menu-open')
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setMoreOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  useEffect(() => {
    const visibility = new Map(sectionIds.map((id) => [id, 0]))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        let best = sectionIds[0]
        let bestRatio = 0
        for (const id of sectionIds) {
          const ratio = visibility.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (bestRatio > 0) setActiveSection(best)
      },
      { rootMargin: '-12% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.55, 0.75] }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds.join(',')])

  useEffect(() => {
    if (!moreOpen) return
    const close = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('touchstart', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('touchstart', close)
    }
  }, [moreOpen])

  const handleNav = useCallback((href) => {
    setMobileOpen(false)
    setMoreOpen(false)
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  return (
    <>
      <header className="navbar fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)]">
        <motion.nav
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={`navbar__bar transition-all duration-300 ${
            scrolled ? 'navbar__bar--scrolled' : ''
          }`}
        >
          <div className="container-custom navbar__inner">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                handleNav('#home')
              }}
              className="navbar__brand group shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Go to home"
            >
              <div className="navbar__logo">
                <Code2 size={17} className="text-white" aria-hidden="true" />
              </div>
              <span className="navbar__brand-text font-mono gradient-text-2 hidden sm:inline">
                &lt;Suhail /&gt;
              </span>
            </motion.a>

            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-4 min-w-0">
              <div className="navbar__pill">
                <ul className="flex items-center gap-0.5">
                  {navMain.map((link) => (
                    <li key={link.href}>
                      <NavItem
                        link={link}
                        isActive={activeSection === link.href.slice(1)}
                        onNavigate={handleNav}
                      />
                    </li>
                  ))}
                  <li className="relative" ref={moreRef}>
                    <button
                      type="button"
                      onClick={() => setMoreOpen((v) => !v)}
                      className={`nav-link nav-link--more ${isMoreActive || moreOpen ? 'nav-link--active' : ''}`}
                      aria-expanded={moreOpen}
                      aria-haspopup="true"
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        More
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </button>
                    <AnimatePresence>
                      {moreOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="navbar__dropdown"
                          role="menu"
                        >
                          {navMore.map((link) => {
                            const active = activeSection === link.href.slice(1)
                            return (
                              <button
                                key={link.href}
                                type="button"
                                role="menuitem"
                                onClick={() => handleNav(link.href)}
                                className={`navbar__dropdown-item ${active ? 'navbar__dropdown-item--active' : ''}`}
                              >
                                {link.label}
                                {active && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                )}
                              </button>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                type="button"
                onClick={toggleTheme}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="navbar__icon-btn"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    {isDark ? <Moon size={16} /> : <Sun size={16} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleNav('#contact')
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:inline-flex btn-primary py-2.5 px-5 text-sm gap-1.5"
              >
                Hire Me
                <ArrowUpRight size={14} aria-hidden="true" />
              </motion.a>

              <motion.button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                whileTap={{ scale: 0.92 }}
                className="lg:hidden navbar__icon-btn"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>

          <div
            className="navbar__progress"
            style={{ transform: `scaleX(${scrollProgress})` }}
            aria-hidden="true"
          />
        </motion.nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md cursor-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />
            <motion.nav
              className="navbar-mobile fixed inset-x-0 bottom-0 z-50 rounded-t-3xl glass-strong border-t border-white/10 max-h-[min(88dvh,640px)] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              aria-label="Mobile navigation"
            >
              <div className="navbar-mobile__handle" aria-hidden="true" />
              <div className="px-6 pt-2 pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold font-mono gradient-text-2 text-sm">&lt;Suhail /&gt;</span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="navbar__icon-btn"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
                  Navigate
                </p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {navMain.map((link, i) => {
                    const active = activeSection === link.href.slice(1)
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 + i * 0.04 }}
                      >
                        <button
                          type="button"
                          onClick={() => handleNav(link.href)}
                          className={`navbar-mobile__tile w-full ${active ? 'navbar-mobile__tile--active' : ''}`}
                        >
                          {link.label}
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>

                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
                  More
                </p>
                <ul className="flex flex-col gap-1.5 mb-6">
                  {navMore.map((link, i) => {
                    const active = activeSection === link.href.slice(1)
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.04 }}
                      >
                        <button
                          type="button"
                          onClick={() => handleNav(link.href)}
                          className={`navbar-mobile__row w-full ${active ? 'navbar-mobile__row--active' : ''}`}
                        >
                          {link.label}
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>

                <button
                  type="button"
                  onClick={() => handleNav('#home')}
                  className="w-full py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white glass mb-3"
                >
                  Back to Home
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('#contact')}
                  className="btn-primary w-full justify-center gap-2 py-3.5"
                >
                  Hire Me
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
