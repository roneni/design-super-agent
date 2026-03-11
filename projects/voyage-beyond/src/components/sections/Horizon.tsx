import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Horizon() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="horizon"
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/horizon-vista.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay — dark at bottom for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(10,10,20,0.1) 0%, rgba(10,10,20,0.25) 40%, rgba(10,10,20,0.75) 70%, rgba(10,10,20,0.95) 100%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Top gradient fade from previous section */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, var(--bg-void), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
          paddingBottom: 'clamp(80px, 10vw, 120px)',
          maxWidth: '900px',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.35em',
            color: 'var(--planet-glow)',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          Final Transmission
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(24px, 4vw, 48px)',
            letterSpacing: '0.12em',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}
        >
          The Journey Continues
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(15px, 1.6vw, 19px)',
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          Every star is a destination. Every void, an invitation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <CTAButton />
        </motion.div>

        {/* Coordinates decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            marginTop: '60px',
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'RA', value: '17h 45m 40s' },
            { label: 'DEC', value: '-29° 00\' 28"' },
            { label: 'DIST', value: '26,000 ly' },
          ].map((item) => (
            <div
              key={item.label}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  color: 'var(--planet-glow)',
                  opacity: 0.6,
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  opacity: 0.5,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CTAButton() {
  return (
    <button
      style={{
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(11px, 1vw, 13px)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--planet-bright)',
        background: 'transparent',
        border: '1px solid var(--planet-glow)',
        padding: '16px 40px',
        borderRadius: '2px',
        cursor: 'pointer',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.background = 'rgba(64,160,192,0.12)'
        el.style.boxShadow = '0 0 20px rgba(64,160,192,0.2), inset 0 0 20px rgba(64,160,192,0.05)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.background = 'transparent'
        el.style.boxShadow = 'none'
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = '2px solid var(--planet-glow)'
        e.currentTarget.style.outlineOffset = '3px'
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none'
      }}
      aria-label="Begin your voyage"
    >
      Begin Your Voyage
    </button>
  )
}
