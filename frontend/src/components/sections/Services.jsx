import ScrollReveal from '../animations/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import SectionShell from '../ui/SectionShell'
import GlassCard from '../ui/GlassCard'
import CardBody from '../ui/CardBody'
import { services } from '../../data/portfolioData'

export default function Services() {
  return (
    <SectionShell
      id="services"
      className="overflow-hidden"
      glow={
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none" />
      }
    >
      <ScrollReveal animation="fade-up">
        <SectionHeader
          eyebrow="What I Offer"
          description="End-to-end web development solutions tailored to your needs — from design to deployment."
        >
          My <span className="gradient-text">Services</span>
        </SectionHeader>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 grid-stretch">
        {services.map((service, i) => (
          <ScrollReveal key={service.id} animation="fade-up" delay={i * 0.08} stretch>
            <GlassCard className="group relative overflow-hidden">
              <div
                className="absolute -bottom-8 -right-8 w-28 h-28 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: service.color }}
              />
              <div className="relative z-10 shrink-0 text-3xl sm:text-4xl mb-4 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="relative z-10 text-base sm:text-xl font-bold text-theme mb-2 group-hover:text-purple-400 transition-colors text-left shrink-0">
                {service.title}
              </h3>
              <CardBody className="gap-4 relative z-10">
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed text-left">
                {service.description}
              </p>
              <ul className="space-y-2 sm:space-y-2.5 mt-auto">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-xs text-slate-300 text-left">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: service.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              </CardBody>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  )
}
