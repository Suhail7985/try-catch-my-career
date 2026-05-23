import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../animations/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import { ExternalLink, Star, Filter } from 'lucide-react'
import SectionShell from '../ui/SectionShell'
import { projects } from '../../data/portfolioData'
import { useCanHover } from '../../hooks/useMedia'

const allTech = ['All', ...new Set(projects.flatMap((p) => p.category))]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const canHover = useCanHover()
  const showOverlay = canHover ? hovered : false

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass rounded-2xl overflow-hidden gradient-border group flex flex-col h-full min-h-0 w-full"
    >
      <div className="relative h-44 sm:h-48 overflow-hidden bg-white/5">
        <img
          src={project.image}
          alt={project.title}
          width={800}
          height={480}
          className={`w-full h-full object-cover transition-transform duration-500 ${canHover && hovered ? 'scale-105' : 'scale-100'}`}
          loading="lazy"
          decoding="async"
        />
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showOverlay ? 'opacity-100' : 'opacity-0 max-md:opacity-0'} focus:opacity-100`}
          style={{ background: 'rgba(5,8,20,0.75)' }}
          aria-label={`Open ${project.title} live site`}
        >
          <span
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
          >
            <ExternalLink size={14} /> Visit Live Site
          </span>
        </a>

        {project.featured && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.9))' }}
          >
            <Star size={10} fill="white" className="text-white" /> Live Product
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-theme font-bold text-base sm:text-lg mb-2">{project.title}</h3>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        <ul className="space-y-1 mb-4">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: '#7c3aed' }} />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="glass px-2 py-0.5 rounded-full text-xs text-slate-400"
              style={{ border: '1px solid rgba(124,58,237,0.2)' }}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center gap-2 py-2.5 sm:py-3 text-xs sm:text-sm mt-auto"
        >
          <ExternalLink size={14} /> Visit Live Site
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category.includes(filter))

  return (
    <SectionShell
      id="projects"
      glow={
        <div
          className="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
        />
      }
    >
      <ScrollReveal animation="fade-up">
        <SectionHeader
          eyebrow="What I've Built"
          description="Three production-ready apps — e-commerce, ATS resume scoring, and a DSA learning platform."
        >
          My <span className="gradient-text">Projects</span>
        </SectionHeader>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={0.1}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-slate-500 shrink-0">
            <Filter size={13} />
            <span className="text-xs uppercase tracking-widest">Filter</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {allTech.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => setFilter(tech)}
                whileTap={{ scale: 0.95 }}
                className={`min-h-[2.75rem] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  filter === tech
                    ? 'text-white shadow-lg shadow-purple-500/25'
                    : 'glass text-slate-400 hover:text-white'
                }`}
                style={filter === tech ? { background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' } : {}}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 grid-stretch max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}
