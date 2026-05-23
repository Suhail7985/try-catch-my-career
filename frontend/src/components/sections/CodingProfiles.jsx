import { motion } from 'framer-motion'
import { Trophy, Code, Activity } from 'lucide-react'
import ScrollReveal from '../animations/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import SectionShell from '../ui/SectionShell'
import GlassCard from '../ui/GlassCard'
import CardHeader from '../ui/CardHeader'
import CardBody from '../ui/CardBody'
import CardFooter from '../ui/CardFooter'
import DeferredImage from '../ui/DeferredImage'
import { codingProfiles } from '../../data/portfolioData'

const GithubIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const difficultyIcons = { Easy: Code, Medium: Activity, Hard: Trophy }

export default function CodingProfiles() {
  const { github, leetcode, platforms } = codingProfiles
  const total = leetcode.difficulties.reduce((s, d) => s + d.count, 0)

  return (
    <SectionShell
      id="coding-profiles"
      glow={
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      }
    >
      <ScrollReveal animation="fade-up">
        <SectionHeader
          eyebrow="My Coding Life"
          description="Live stats from GitHub and LeetCode — where I build, ship, and solve problems."
        >
          Coding <span className="gradient-text">Profiles</span>
        </SectionHeader>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 grid-stretch">
        <ScrollReveal animation="fade-right" stretch>
          <GlassCard>
            <CardHeader
              icon={<GithubIcon />}
              iconWrapClassName="text-white"
              title={github.title}
              subtitle={github.subtitle}
            />
            <CardBody className="gap-4">
              <div className="flex items-center justify-center min-h-[140px] sm:min-h-[160px] overflow-hidden rounded-xl bg-white/[0.02]">
                <DeferredImage
                  src={github.statsImage}
                  alt="GitHub Stats"
                  className="w-full max-w-full h-auto object-contain"
                  wrapperClassName="w-full flex items-center justify-center p-2"
                />
              </div>
              <div className="overflow-hidden rounded-xl bg-white/[0.02]">
                <DeferredImage
                  src={github.streakImage}
                  alt="GitHub Streak"
                  className="w-full max-w-full h-auto object-contain mx-auto block"
                  wrapperClassName="w-full flex items-center justify-center p-2 min-h-[100px]"
                />
              </div>
            </CardBody>
            <CardFooter
              stats={github.stats}
              linkHref={github.profileUrl}
              linkLabel={github.linkLabel}
              linkClassName={github.linkClass}
            />
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal animation="fade-left" stretch>
          <GlassCard>
            <CardHeader
              icon={<Trophy size={20} className="text-amber-500" />}
              title={leetcode.title}
              subtitle={leetcode.subtitle}
            />
            <CardBody className="gap-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
              <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                <p className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Total Solved</p>
                <p className="text-2xl sm:text-3xl font-bold text-theme">{leetcode.totalSolved}</p>
                <p className="text-slate-500 text-[10px] mt-1">problems</p>
              </div>
              <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                <p className="text-slate-500 text-xs mb-1 uppercase tracking-wider">{leetcode.rankLabel}</p>
                <p className="text-2xl sm:text-3xl font-bold text-theme">{leetcode.rankValue}</p>
                <p className="text-slate-500 text-[10px] mt-1">solved</p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {leetcode.difficulties.map(({ label, count, color }) => {
                const Icon = difficultyIcons[label] || Code
                return (
                  <div key={label} className="glass rounded-xl p-3 sm:p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon size={14} style={{ color }} />
                        <span className="text-slate-300 text-xs sm:text-sm">{label}</span>
                      </div>
                      <span className="text-theme font-bold text-sm">{count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(count / total) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            </CardBody>
            <CardFooter
              linkHref={leetcode.profileUrl}
              linkLabel={leetcode.linkLabel}
              linkClassName={leetcode.linkClass}
            />
          </GlassCard>
        </ScrollReveal>
      </div>

      <ScrollReveal animation="fade-up" delay={0.15} className="mt-8 sm:mt-10">
        <div className="glass-strong rounded-2xl p-4 sm:p-6 gradient-border">
          <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest text-center mb-4">
            All Platforms
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {platforms.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target={p.id === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[2.75rem] rounded-full glass text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors border border-white/5 hover:border-white/15"
                style={{ boxShadow: `0 0 20px ${p.color}15` }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </SectionShell>
  )
}
