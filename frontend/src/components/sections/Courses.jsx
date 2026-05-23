import { Award, ExternalLink, Calendar, BookOpen } from 'lucide-react'
import ScrollReveal from '../animations/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import SectionShell from '../ui/SectionShell'
import GlassCard from '../ui/GlassCard'
import CardBody from '../ui/CardBody'
import { courses } from '../../data/portfolioData'

export default function Courses() {
  return (
    <SectionShell
      id="courses"
      glow={
        <div
          className="absolute top-0 left-1/4 w-64 sm:w-72 h-64 sm:h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        />
      }
    >
      <ScrollReveal animation="fade-up">
        <SectionHeader
          eyebrow="Professional Learning"
          description="AWS, cloud architecture, agile PM, and full-stack fundamentals from top institutions."
        >
          Courses & <span className="gradient-text">Certifications</span>
        </SectionHeader>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 grid-stretch">
        {courses.map((course, i) => (
          <ScrollReveal key={course.id} animation="fade-up" delay={i * 0.08} stretch>
            <GlassCard className="group relative overflow-hidden flex flex-col">
              <div
                className="absolute -bottom-8 -right-8 w-28 h-28 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: course.color }}
              />
              <div className="relative z-10 flex items-start justify-between mb-4 sm:mb-5 gap-3">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500"
                  style={{ background: `${course.color}22`, border: `1px solid ${course.color}44` }}
                >
                  <Award size={24} style={{ color: course.color }} />
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                  <Calendar size={10} /> {course.date}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-theme mb-2 sm:mb-3 group-hover:text-purple-400 transition-colors leading-snug text-left relative z-10">
                {course.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1 text-left relative z-10">
                {course.institution}
              </p>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider text-left mb-4 sm:mb-5 relative z-10">
                Platform: {course.platform}
              </p>
              <div className="mb-4 sm:mb-5 relative z-10 flex-1">
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <BookOpen size={11} /> Skills Covered
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {course.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative z-10 pt-4 sm:pt-5 border-t border-white/5 shrink-0 mt-auto">
                <a
                  href={course.credentialUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-theme hover:text-purple-400 transition-colors"
                >
                  View Credentials <ExternalLink size={12} />
                </a>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  )
}
