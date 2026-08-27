import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Download, ArrowRight, ChevronDown } from 'lucide-react'
import { socialLinks } from '../../data/portfolioData'
import { useReducedMotion } from '../../hooks/useMedia'

const LONGEST_ROLE = 'Cloud Solutions Architect'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
)

const roles = [
  'Backend Developer',
  'MERN Stack Engineer',
  'Cloud Solutions Architect',
  'Full-Stack Developer',
  'Problem Solver',
]

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (isPaused) {
      timeout = setTimeout(() => { setIsPaused(false); setDeleting(true) }, 1800)
      return () => clearTimeout(timeout)
    }

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      setIsPaused(true)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex, isPaused])

  return (
    <span className="gradient-text font-bold whitespace-nowrap">
      {displayed}
      <span className="typing-cursor" />
    </span>
  )
}

function MeshBackground({ reducedMotion }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className={`absolute -top-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-20 ${reducedMotion ? '' : 'animate-float-slow'}`}
        style={{ background: 'radial-gradient(circle, #9333ea, transparent)' }}
      />
      <div
        className={`absolute top-1/3 -right-20 sm:-right-32 w-60 sm:w-80 h-60 sm:h-80 rounded-full blur-3xl opacity-15 max-md:opacity-10 ${reducedMotion ? '' : 'animate-float'}`}
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', animationDelay: '2s' }}
      />
    </div>
  )
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } },
  }
  const item = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }

  const socials = [
    { Icon: GithubIcon, href: socialLinks.github, label: 'GitHub' },
    { Icon: LinkedinIcon, href: socialLinks.linkedin, label: 'LinkedIn' },
    { Icon: LeetCodeIcon, href: socialLinks.leetcode, label: 'LeetCode' },
    { Icon: () => <Mail size={18} />, href: socialLinks.email, label: 'Email' },
  ]

  return (
    <section id="home" className="hero-section">
      <MeshBackground reducedMotion={reducedMotion} />

      <div className="container-custom hero-section__container">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="hero-content"
        >
          <motion.div variants={item} className="hero-content__badge">
            <span className="inline-flex items-center justify-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium text-slate-300">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for New Projects
            </span>
          </motion.div>

          <motion.p variants={item} className="hero-content__eyebrow text-slate-400">
            Hello, I&apos;m
          </motion.p>

          <motion.h1 variants={item} className="hero-content__title text-hero text-theme">
            Mohd Suhail<span className="gradient-text">.</span>
          </motion.h1>

          <motion.div variants={item} className="hero-typewriter" aria-live="polite">
            <span className="hero-typewriter__ghost gradient-text font-bold" aria-hidden="true">
              {LONGEST_ROLE}
            </span>
            <span className="hero-typewriter__text">
              <TypewriterText />
            </span>
          </motion.div>

          <motion.p variants={item} className="hero-content__description text-slate-400">
            I craft{' '}
            <span className="text-theme font-medium">modern, scalable web applications</span>{' '}
            with React, Next.js, TypeScript, the MERN stack, and cloud technologies. Passionate about clean code,
            system architecture, and turning complex ideas into seamless digital experiences.
          </motion.p>

          <motion.div variants={item} className="hero-content__actions">
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary gap-2 w-full sm:w-auto"
            >
              View Projects <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="/resume.pdf" download className="btn-outline gap-2 w-full sm:w-auto">
              <Download size={16} aria-hidden="true" /> Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="hero-content__social">
            <span className="text-slate-500 text-[10px] uppercase tracking-widest shrink-0">
              Find me on
            </span>
            <div className="hero-content__social-icons">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="touch-target w-11 h-11 glass rounded-xl sm:rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {!reducedMotion && (
        <motion.button
          type="button"
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll Down</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center justify-center"
          >
            <ChevronDown size={20} aria-hidden="true" />
          </motion.span>
        </motion.button>
      )}
    </section>
  )
}
