import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, Zap, Cpu, Database, Server } from 'lucide-react'
import ScrollReveal from '../animations/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import SectionShell from '../ui/SectionShell'
import GlassCard from '../ui/GlassCard'
import { stats, personalInfo } from '../../data/portfolioData'

function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  const highlights = [
    { icon: MapPin, label: 'Location', value: personalInfo.location },
    { icon: Calendar, label: 'B.Tech', value: 'CSE (2021-25)' },
    { icon: Database, label: 'Focus', value: 'Backend Systems' },
    { icon: Zap, label: 'Status', value: 'Seeking Opportunities' },
  ]

  return (
    <SectionShell
      id="about"
      glow={
        <>
          <div
            className="absolute top-1/2 left-0 w-80 h-80 rounded-full blur-[120px] opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #9333ea, transparent)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
          />
        </>
      }
    >
      <ScrollReveal animation="fade-up">
        <SectionHeader
          eyebrow="Biography"
          description="Backend-focused MERN developer with AWS certifications and a passion for scalable systems."
        >
          About <span className="gradient-text">Me</span>
        </SectionHeader>
      </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-20 items-stretch">
          
          {/* Left - Visual Tech Stack */}
          <ScrollReveal animation="fade-right" stretch className="lg:col-span-5">
              <GlassCard padding="large" className="relative overflow-hidden group h-full">
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ background: '#9333ea' }} />
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                      <Server size={28} />
                    </div>
                    <div>
                      <p className="text-theme font-bold text-lg">Backend Mastery</p>
                      <p className="text-slate-500 text-sm">Node.js, Express & Scalable APIs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
                      <Database size={28} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Database Design</p>
                      <p className="text-slate-500 text-sm">MongoDB & Data Modeling</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-pink-400 border border-pink-500/20 shadow-lg shadow-pink-500/5">
                      <Cpu size={28} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Cloud Infrastructure</p>
                      <p className="text-slate-500 text-sm">AWS Architecting & Solutions</p>
                    </div>
                  </div>
                </div>

                {/* Highlight Pills */}
                <div className="grid grid-cols-2 gap-4 mt-12">
                  {highlights.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="glass rounded-2xl p-4 flex flex-col gap-1 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-purple-400" />
                        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">{label}</p>
                      </div>
                      <p className="text-theme text-xs font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
          </ScrollReveal>

          {/* Right — Professional Narrative */}
          <ScrollReveal animation="fade-left" stretch className="lg:col-span-7">
            <div className="space-y-6 sm:space-y-8 h-full flex flex-col">
              <div>
                <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-theme mb-4 sm:mb-6 leading-tight text-center lg:text-left">
                  Passionate <span className="text-purple-400">Backend Developer</span>{' '}
                  & <span className="gradient-text">AWS Solutions Architect</span>
                </h3>
                
                <div className="space-y-6 text-slate-400 text-base sm:text-lg leading-relaxed text-center lg:text-left">
                  <p>
                    I am a <span className="text-white font-semibold">Computer Science Engineer</span> specializing in the 
                    <span className="text-white font-semibold"> MERN Stack</span>,{' '}
                    <span className="text-white font-semibold">Next.js</span>, and{' '}
                    <span className="text-white font-semibold">TypeScript</span>. My primary focus lies in building robust 
                    server-side logic, architecting secure databases, and developing high-performance RESTful APIs.
                  </p>
                  <p>
                    Through my academic journey and intensive self-learning, I have earned several certifications from 
                    <span className="text-white font-semibold"> Amazon Web Services (AWS)</span> and the 
                    <span className="text-white font-semibold"> University of Colorado Boulder</span>. I am particularly 
                    skilled in Agile Project Management and Cloud Infrastructure design.
                  </p>
                  <p>
                    I am dedicated to writing <span className="text-white font-semibold">optimized, clean, and maintainable code</span>. 
                    I thrive on solving complex algorithmic challenges and am always eager to implement modern cloud solutions 
                    to improve application scalability and security.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-5 text-center border border-white/5 hover:border-purple-500/30 transition-all group">
                    <p className="text-2xl font-bold gradient-text group-hover:scale-110 transition-transform">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1.5 font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA Group */}
              <div className="flex flex-wrap gap-3 pt-2 sm:pt-4 justify-center lg:justify-start">
                <a href="#contact" className="btn-primary text-sm w-full sm:w-auto text-center">Let&apos;s Connect</a>
                <a href="#courses" className="btn-outline text-sm w-full sm:w-auto text-center">View Certifications</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
    </SectionShell>
  )
}
