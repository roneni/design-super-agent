import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { StarField } from '../ui/StarField'

export function Hero() {
  const heroImagePath = '/images/hero-nebula.webp'

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image with CSS fallback */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* CSS fallback nebula (always visible as base) */}
        <div
          className="hero-nebula-bg"
          style={{ position: 'absolute', inset: 0 }}
        />

        {/* Image on top of CSS (will show if image loads) */}
        <img
          src={heroImagePath}
          alt="Cosmic nebula landscape for Psychedelic Universe Festivals"
          width={1536}
          height={1024}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />

        {/* Gradient overlay */}
        <div
          className="hero-nebula-bg-overlay"
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      {/* Animated star field layer */}
      <StarField count={180} />

      {/* Nebula glow animation orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '15%',
            top: '20%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26, 96, 96, 0.4) 0%, transparent 70%)',
            animationName: 'nebula-drift',
            animationDuration: '25s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '5%',
            top: '10%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 168, 83, 0.2) 0%, transparent 70%)',
            animationName: 'nebula-drift',
            animationDuration: '35s',
            animationDelay: '-12s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '5%',
            bottom: '20%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            animationName: 'nebula-drift',
            animationDuration: '40s',
            animationDelay: '-20s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      </div>

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '700px',
          paddingLeft: 'clamp(24px, 8vw, 120px)',
          paddingRight: '24px',
        }}
      >
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--accent-cyan)',
              boxShadow: '0 0 6px var(--accent-cyan)',
            }}
          />
          <span
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: 'var(--accent-cyan)',
              textTransform: 'uppercase',
            }}
          >
            EXPLORE THE COSMOS
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.1,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            textShadow: '0 0 40px rgba(34, 211, 238, 0.3), 0 2px 20px rgba(0,0,0,0.8)',
            marginBottom: '24px',
          }}
        >
          FESTIVALS<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AMONG THE
          </span>{' '}
          <span style={{ color: 'var(--text-primary)' }}>STARS</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '550px',
            marginBottom: '40px',
          }}
        >
          Where earthly rhythm meets cosmic wonder. Discover the world's most
          transcendent psytrance gatherings.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#featured"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              background: 'var(--accent-cyan)',
              color: '#0a0a0a',
              border: '2px solid var(--accent-cyan)',
              transition: 'box-shadow 0.3s ease, transform 0.2s ease',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.boxShadow = 'var(--glow-cyan)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.boxShadow = 'none'
              el.style.transform = 'translateY(0)'
            }}
          >
            EXPLORE FESTIVALS
          </a>
          <a
            href="#upcoming"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--accent-cyan)',
              border: '2px solid var(--accent-cyan)',
              transition: 'box-shadow 0.3s ease, transform 0.2s ease, background 0.2s',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.boxShadow = 'var(--glow-cyan)'
              el.style.background = 'rgba(34, 211, 238, 0.08)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.boxShadow = 'none'
              el.style.background = 'transparent'
              el.style.transform = 'translateY(0)'
            }}
          >
            VIEW CALENDAR
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '9px',
            letterSpacing: '0.15em',
            color: 'var(--text-muted)',
          }}
        >
          SCROLL
        </span>
        <div className="scroll-bounce">
          <ChevronDown size={20} color="var(--accent-cyan)" />
        </div>
      </div>
    </section>
  )
}
