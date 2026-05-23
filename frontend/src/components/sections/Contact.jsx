import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2, Github } from 'lucide-react'
import { toast } from 'react-hot-toast'
import ScrollReveal from '../animations/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import SectionShell from '../ui/SectionShell'
import GlassCard from '../ui/GlassCard'
import CardHeader from '../ui/CardHeader'
import { sendContactMessage } from '../../api/contact'
import { contactInfo } from '../../data/portfolioData'

const iconMap = {
  email: Mail,
  location: MapPin,
  github: Github,
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setStatus('loading')
    try {
      await sendContactMessage(formData)
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      toast.success('Message sent successfully!')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      toast.error('Failed to send. Please try again.')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const btnLabel = {
    idle: 'Send Message',
    loading: 'Sending...',
    success: 'Message Sent!',
    error: 'Try Again',
  }

  const BtnIcon = { idle: Send, loading: Loader2, success: CheckCircle, error: AlertCircle }[status]

  return (
    <SectionShell
      id="contact"
      className="overflow-hidden"
      glow={
        <>
          <div
            className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
          />
        </>
      }
    >
      <ScrollReveal animation="fade-up">
        <SectionHeader
          eyebrow="Let's Connect"
          description="Have a project, role, or collaboration in mind? Send a message — I typically reply within 24 hours."
        >
          Get In <span className="gradient-text">Touch</span>
        </SectionHeader>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 grid-stretch">
        <div className="lg:col-span-1 flex flex-col gap-4 h-full min-h-0">
          {contactInfo.map((info, i) => {
            const Icon = iconMap[info.id] || Mail
            const Wrapper = info.href ? motion.a : motion.div
            const linkProps = info.href
              ? {
                  href: info.href,
                  target: info.external ? '_blank' : undefined,
                  rel: info.external ? 'noopener noreferrer' : undefined,
                }
              : {}

            return (
              <ScrollReveal key={info.id} animation="fade-right" delay={i * 0.1} stretch>
                <Wrapper
                  {...linkProps}
                  whileHover={info.href ? { x: 6 } : undefined}
                  className="block h-full"
                >
                  <div className="glass-strong rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 gradient-border h-full min-h-[4.5rem] transition-transform duration-300 hover:-translate-y-0.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl glass flex items-center justify-center text-purple-400 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-slate-500 text-[10px] uppercase tracking-wider">{info.label}</p>
                      <p className="text-theme font-medium text-xs sm:text-sm truncate">{info.value}</p>
                    </div>
                  </div>
                </Wrapper>
              </ScrollReveal>
            )
          })}

          <ScrollReveal animation="fade-right" delay={0.35} stretch className="flex-1 min-h-0">
            <GlassCard padding="compact" className="h-full">
              <CardHeader
                icon={
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                }
                title="Current Status"
                subtitle="Open to new opportunities"
              />
              <p className="text-slate-500 text-xs leading-relaxed text-left">
                Available for full-time roles, internships, and freelance projects.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-left" stretch className="lg:col-span-2 h-full">
          <GlassCard hover={false} className="h-full">
            <CardHeader
              icon={<Send size={18} className="text-purple-400" />}
              title="Send a Message"
              subtitle="Fill out the form and I'll get back to you"
            />
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 -mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="form-input w-full"
                    required
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Email <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="form-input w-full"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5 mb-4 sm:mb-5 text-left">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, collaboration, etc."
                  className="form-input w-full"
                />
              </div>
              <div className="space-y-1.5 mb-6 sm:mb-8 text-left">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Message <span className="text-purple-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows="5"
                  className="form-input w-full resize-none min-h-[120px]"
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-primary w-full justify-center gap-2 py-3.5 sm:py-4 mt-auto ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <BtnIcon size={18} className={status === 'loading' ? 'animate-spin' : ''} />
                {btnLabel[status]}
              </motion.button>
            </form>
          </GlassCard>
        </ScrollReveal>
      </div>
    </SectionShell>
  )
}
