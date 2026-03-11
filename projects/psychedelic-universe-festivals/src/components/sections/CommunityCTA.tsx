import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { SacredBgPattern } from '../ui/SacredGeometry'

export function CommunityCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section
      style={{
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #1a0a2e 0%, var(--bg-void) 70%)',
      }}
    >
      {/* Sacred geometry background pattern */}
      <SacredBgPattern color="#a855f7" />

      {/* Glow orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '20%',
            top: '20%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '15%',
            bottom: '20%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--accent-purple))',
            }}
          />
          <span
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--accent-purple)',
            }}
          >
            THE COMMUNITY
          </span>
          <div
            style={{
              width: '32px',
              height: '1px',
              background: 'linear-gradient(to left, transparent, var(--accent-purple))',
            }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '24px',
            lineHeight: 1.15,
          }}
        >
          JOIN THE COSMIC TRIBE
        </motion.h2>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            marginBottom: '48px',
          }}
        >
          Join thousands of cosmic explorers who receive curated festival guides,
          artist spotlights, and early ticket alerts. No spam — only signals from the cosmos.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '0',
            maxWidth: '480px',
            margin: '0 auto 48px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            boxShadow: '0 0 30px rgba(34, 211, 238, 0.08)',
          }}
        >
          {!submitted ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email address"
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  color: 'var(--text-primary)',
                  minHeight: '44px',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '16px 24px',
                  background: 'var(--accent-cyan)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#0a0a0a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.2s',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget).style.background = '#38e8ff'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget).style.background = 'var(--accent-cyan)'
                }}
              >
                SUBSCRIBE <Send size={14} />
              </button>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                padding: '16px 24px',
                background: 'rgba(34, 211, 238, 0.1)',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--accent-cyan)',
                textAlign: 'center',
              }}
            >
              TRANSMISSION RECEIVED — WELCOME TO THE TRIBE
            </div>
          )}
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {['Instagram', 'Facebook', 'Soundcloud', 'YouTube', 'Mixcloud'].map((platform) => (
            <a
              key={platform}
              href="#"
              style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 600,
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLAnchorElement).style.color = 'var(--accent-cyan)'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLAnchorElement).style.color = 'var(--text-muted)'
              }}
            >
              {platform.toUpperCase()}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
