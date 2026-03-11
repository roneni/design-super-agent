import React, { useState } from 'react'
import { Instagram, Music, Send, Mail } from 'lucide-react'

const quickLinks = ['Lineup', 'Info', 'Gallery', 'Tickets', 'FAQ', 'Terms']

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Music, label: 'SoundCloud', href: '#' },
  { icon: Send, label: 'Telegram', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@nexusfestival.com' },
]

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer
      className="bg-deep pb-audio"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '64px',
        paddingBottom: '100px',
      }}
      aria-label="Site footer"
    >
      <div className="px-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 4-column grid */}
        <div
          className="grid gap-12 mb-16"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
        >
          {/* About */}
          <div>
            <p
              className="font-heading font-bold text-text-primary mb-4 uppercase tracking-widest"
              style={{ fontSize: '18px' }}
            >
              NEXUS
            </p>
            <p
              className="font-body text-text-muted"
              style={{ fontSize: '14px', lineHeight: 1.7 }}
            >
              A gathering of consciousness at the intersection of nature, music, and community. Three days of psychedelic exploration under the stars of southern Portugal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-heading font-bold uppercase tracking-widest text-text-secondary mb-5"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3 list-none">
              {quickLinks.map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-body text-text-muted hover:text-text-primary transition-colors duration-200 focus:outline-none focus:underline"
                    style={{ fontSize: '14px' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Social */}
          <div>
            <h3
              className="font-heading font-bold uppercase tracking-widest text-text-secondary mb-5"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Connect
            </h3>
            <ul className="space-y-3 list-none">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-text-muted hover:text-text-primary transition-colors duration-200 flex items-center gap-3 focus:outline-none focus:underline"
                    style={{ fontSize: '14px' }}
                    aria-label={label}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="font-heading font-bold uppercase tracking-widest text-text-secondary mb-5"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Newsletter
            </h3>
            <p
              className="font-body text-text-muted mb-4"
              style={{ fontSize: '14px', lineHeight: 1.6 }}
            >
              Stay updated with lineup drops, ticket releases, and forest dispatches.
            </p>

            {subscribed ? (
              <p className="font-body text-accent-amber" style={{ fontSize: '14px' }}>
                You're in. See you in the forest.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="font-body text-text-primary bg-surface/50 border border-white/10 rounded focus:outline-none focus:border-accent-amber/40 transition-colors duration-200 w-full"
                  style={{
                    fontSize: '14px',
                    padding: '10px 14px',
                  }}
                />
                <button
                  type="submit"
                  className="font-display font-bold uppercase tracking-wider text-void bg-accent-amber hover:brightness-110 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-accent-amber focus:ring-offset-1 focus:ring-offset-deep"
                  style={{
                    fontSize: '13px',
                    padding: '10px 20px',
                    letterSpacing: '0.1em',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(245,158,11,0.3)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="font-body text-text-muted" style={{ fontSize: '13px' }}>
            © 2026 Nexus Festival. All rights reserved.
          </p>
          <p className="font-body text-text-muted" style={{ fontSize: '13px' }}>
            Made with ♡ under the stars
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
