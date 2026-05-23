import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from '../animations/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import SectionShell from '../ui/SectionShell'
import { skills } from '../../data/portfolioData'

const categories = Object.keys(skills)

function SkillBar({ level, inView }) {
  return (
    <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-2">
      <motion.div
        className="skill-bar"
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </div>
  )
}

function SkillCard({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 gradient-border group cursor-default h-full min-h-[5.25rem]"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl">{skill.icon}</span>
          <span className="text-xs sm:text-sm font-medium text-theme">{skill.name}</span>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-slate-500 group-hover:text-purple-400 transition-colors">
          {skill.level}%
        </span>
      </div>
      <SkillBar level={skill.level} inView={inView} />
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Frontend')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <SectionShell
      id="skills"
      glow={
        <div
          className="absolute bottom-0 right-1/4 w-64 sm:w-72 h-64 sm:h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
        />
      }
    >
        <ScrollReveal animation="fade-up">
          <SectionHeader
            eyebrow="What I Work With"
            description="A curated set of technologies I use to build scalable, performant, and beautiful applications."
          >
            My <span className="gradient-text">Skills</span>
          </SectionHeader>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="flex flex-wrap justify-center items-center gap-2 mb-8 sm:mb-12">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveTab(cat)}
                whileTap={{ scale: 0.95 }}
                className={`min-h-[2.75rem] px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === cat
                    ? 'text-white shadow-lg shadow-purple-500/25'
                    : 'glass text-slate-400 hover:text-white'
                }`}
                style={activeTab === cat ? { background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' } : {}}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div ref={ref} className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
            >
              {skills[activeTab].map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Summary bar */}
        <ScrollReveal animation="fade-up" delay={0.3} className="mt-12 sm:mt-16">
          <div className="glass-strong rounded-2xl p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 text-center">
            {[
              { label: 'Frontend', count: skills.Frontend.length, color: '#a78bfa' },
              { label: 'Backend', count: skills.Backend.length, color: '#06b6d4' },
              { label: 'Databases', count: skills.Database.length, color: '#ec4899' },
              { label: 'Dev Tools', count: skills.Tools.length, color: '#f59e0b' },
              { label: 'DevOps', count: skills.Deployment.length, color: '#10b981' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: item.color }}>{item.count}+</p>
                <p className="text-slate-400 text-[10px] sm:text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
    </SectionShell>
  )
}
