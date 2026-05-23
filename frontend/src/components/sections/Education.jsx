import { GraduationCap, BookOpen, Award } from 'lucide-react'
import ScrollReveal from '../animations/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import SectionShell from '../ui/SectionShell'
import GlassCard from '../ui/GlassCard'
import CardHeader from '../ui/CardHeader'
import CardBody from '../ui/CardBody'
import { education } from '../../data/portfolioData'

export default function Education() {
  return (
    <SectionShell
      id="education"
      glow={
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
        />
      }
    >
      <ScrollReveal animation="fade-up">
        <SectionHeader
          eyebrow="My Academic Path"
          description="Formal education in computer science with a focus on systems, algorithms, and web technologies."
        >
          Education <span className="gradient-text">& Degrees</span>
        </SectionHeader>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 grid-stretch">
        {education.map((item, i) => (
          <ScrollReveal
            key={item.id}
            animation={i % 2 === 0 ? 'fade-right' : 'fade-left'}
            delay={i * 0.1}
            stretch
          >
            <GlassCard className="relative overflow-hidden group flex flex-col">
              <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <GraduationCap size={64} style={{ color: item.color }} />
              </div>
              <CardHeader
                icon={<Award size={20} style={{ color: item.color }} />}
                title={item.degree}
                subtitle={item.field}
              />
              <div className="relative z-10 mb-4 sm:mb-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3 sm:mb-4">
                  <span className="text-slate-300 text-xs sm:text-sm font-medium text-left">
                    {item.institution}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono px-2 sm:px-3 py-1 rounded-full bg-white/5 text-slate-300 whitespace-nowrap">
                    {item.duration}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <BookOpen size={11} /> Key Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  )
}
