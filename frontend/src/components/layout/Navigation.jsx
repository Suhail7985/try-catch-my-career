import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteNav } from '../../data/portfolioData'
import { smoothScrollTo } from '../../lib/smoothScroll'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = siteNav.map((n) => document.querySelector(n.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href) => {
    setMobileOpen(false)
    smoothScrollTo(href, { offset: -80 })
  }

  return (
    <>
      <header className={`nav nav--cinematic ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="nav-brand nav-brand--cinematic" onClick={(e) => { e.preventDefault(); scrollTo('#home') }}>
            Suhail<span className="nav-brand-dot">.</span>
          </a>

          <ul className="nav-links">
            {siteNav.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-link nav-link--cinematic ${active === href.slice(1) ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="nav-toggle nav-toggle--cinematic"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <nav className={`nav-mobile nav-mobile--cinematic ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        {siteNav.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={`nav-mobile-link ${active === href.slice(1) ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo(href) }}
          >
            {label}
          </a>
        ))}
      </nav>
    </>
  )
}
