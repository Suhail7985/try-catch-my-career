import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { toast } from 'react-hot-toast'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import TerminalWindow from '../ui/TerminalWindow'
import SplitText from '../ui/SplitText'
import MagneticButton from '../ui/MagneticButton'
import { sendContactMessage } from '../../api/contact'
import { personalInfo, socialLinks } from '../../data/portfolioData'
import { useReducedMotion } from '../../hooks/useMedia'
import { revealSectionHeader, revealOnScroll } from '../../lib/gsap'

const links = [
  { label: 'Email', value: personalInfo.email, href: socialLinks.email },
  { label: 'Mobile', value: personalInfo.phone, href: socialLinks.phone },
  { label: 'LinkedIn', value: 'mohdsuhail0', href: socialLinks.linkedin },
  { label: 'GitHub', value: '@Suhail7985', href: socialLinks.github },
  { label: 'Resume', value: 'Download PDF', href: '/resume.pdf' },
]

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return

      revealSectionHeader(sectionRef.current.querySelector('.contact-hero'), {
        label: '.section-label',
        title: '.contact-title',
        subtitle: '.section-intro',
      })

      revealOnScroll('.contact-link', sectionRef.current, {
        start: 'top 78%',
        y: 32,
        stagger: 0.08,
        duration: 0.75,
      })

      revealOnScroll('.contact-form-panel', sectionRef.current, {
        start: 'top 80%',
        y: 48,
        duration: 1,
      })
    },
    { scope: sectionRef, dependencies: [reduced] }
  )

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setStatus('loading')
    try {
      await sendContactMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      toast.success('Message sent!')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      toast.error('Failed to send. Please try again.')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const Icon = { idle: Send, loading: Loader2, success: CheckCircle, error: AlertCircle }[status]
  const label = { idle: 'Send Message', loading: 'Sending…', success: 'Sent!', error: 'Try Again' }[status]

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container">
        <div className="contact-hero">
          <p className="section-label">Contact</p>
          <h2 className="display-xl contact-title">
            {reduced ? "Let's talk" : <SplitText trigger>Let's talk</SplitText>}
          </h2>
          <p className="section-intro body-lg" style={{ marginTop: '1.25rem' }}>
            Have a project in mind? I typically reply within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          <TerminalWindow title="links">
            <div className="contact-links">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="contact-link"
                  target={link.label !== 'Email' && link.label !== 'Resume' && link.label !== 'Mobile' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  download={link.label === 'Resume' ? true : undefined}
                  data-cursor="external"
                >
                  <span className="contact-link-label">{link.label}</span>
                  <span>{link.value}</span>
                </a>
              ))}
            </div>
          </TerminalWindow>

          <TerminalWindow title="message" className="contact-form-panel">
            <form onSubmit={onSubmit} className="terminal-form">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name *</label>
                  <input id="name" name="name" value={form.name} onChange={onChange} required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" value={form.subject} onChange={onChange} />
              </div>
              <div className="form-field">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" value={form.message} onChange={onChange} required rows={5} />
              </div>
              <MagneticButton
                as="button"
                type="submit"
                className="btn btn-cinematic"
                style={{ width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}
                disabled={status === 'loading'}
              >
                <Icon size={18} className={status === 'loading' ? 'animate-spin' : ''} />
                {status === 'idle' ? 'Send Message' : label}
              </MagneticButton>
            </form>
          </TerminalWindow>
        </div>
      </div>
    </section>
  )
}
