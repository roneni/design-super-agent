import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Calendar, Ticket } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const Info: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="info"
      className="relative overflow-hidden"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
      aria-labelledby="info-heading"
    >
      {/* Warm ambient gradient — CSS fallback for section atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 30% 60%, rgba(212,168,83,0.05) 0%, transparent 40%),
            radial-gradient(ellipse 50% 40% at 70% 40%, rgba(249,115,22,0.04) 0%, transparent 40%),
            linear-gradient(180deg, #050510 0%, #0d0a05 30%, #1a1210 50%, #0d0a05 70%, #050510 100%)
          `
        }}
        aria-hidden="true"
      />

      {/* Overlay: void at top, transparent middle, void at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,5,16,0.95) 0%, rgba(5,5,16,0.5) 30%, rgba(13,10,5,0.4) 50%, rgba(5,5,16,0.5) 70%, rgba(5,5,16,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Warm amber tint overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative z-10 px-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section label — amber instead of cyan */}
        <p
          className="section-label text-accent-amber mb-3"
        >
          ESSENTIALS
        </p>

        {/* Section heading */}
        <h2
          className="font-display font-bold text-text-primary mb-14"
          id="info-heading"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700 }}
        >
          Find Your Way
        </h2>

        {/* 3-column grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {/* Location Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
            className="rounded-xl p-8"
            style={{
              background: 'rgba(26,26,46,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245,158,11,0.1)',
              borderRadius: '12px',
            }}
          >
            <MapPin
              size={32}
              className="text-accent-amber mb-5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h3
              className="font-display font-semibold text-text-primary mb-2"
              style={{ fontSize: '20px', fontWeight: 600 }}
            >
              Serra de Monchique
            </h3>
            <p
              className="font-body text-text-secondary mb-4"
              style={{ fontSize: '15px' }}
            >
              Algarve, Southern Portugal
            </p>
            <p
              className="font-body text-text-muted"
              style={{ fontSize: '14px', lineHeight: 1.7 }}
            >
              Deep within ancient cork oak forests, where the mountain meets the sky. A 500-hectare sanctuary of nature and sound.
            </p>
          </motion.div>

          {/* Dates Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            className="rounded-xl p-8"
            style={{
              background: 'rgba(26,26,46,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(168,85,247,0.12)',
              borderRadius: '12px',
            }}
          >
            <Calendar
              size={32}
              className="text-accent-violet mb-5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h3
              className="font-display font-semibold text-text-primary mb-2"
              style={{ fontSize: '20px', fontWeight: 600 }}
            >
              August 14–16, 2026
            </h3>
            <p
              className="font-body text-text-secondary mb-4"
              style={{ fontSize: '15px' }}
            >
              Three days under the stars
            </p>
            <ul className="space-y-2">
              {[
                'Gates Open: Thu 14:00',
                'Music Starts: Fri 18:00',
                'Closing: Sun 06:00',
              ].map(item => (
                <li key={item} className="font-body text-text-muted flex items-center gap-2" style={{ fontSize: '14px' }}>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-accent-violet flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tickets Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            className="rounded-xl p-8"
            style={{
              background: 'rgba(26,26,46,0.65)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '12px',
            }}
          >
            <Ticket
              size={32}
              className="text-accent-amber mb-5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h3
              className="font-display font-semibold text-text-primary mb-5"
              style={{ fontSize: '20px', fontWeight: 600 }}
            >
              Tickets
            </h3>

            <ul className="space-y-3 mb-8">
              {/* Early Bird — SOLD OUT */}
              <li className="flex items-center justify-between">
                <span
                  className="font-body text-text-muted line-through"
                  style={{ fontSize: '15px' }}
                >
                  Early Bird — €89
                </span>
                <span
                  className="font-body font-medium text-xs rounded px-2 py-0.5"
                  style={{
                    background: 'rgba(107,107,128,0.2)',
                    color: '#6b6b80',
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                  }}
                >
                  SOLD OUT
                </span>
              </li>

              {/* Regular */}
              <li className="flex items-center justify-between">
                <span className="font-body text-text-primary font-medium" style={{ fontSize: '15px' }}>
                  Regular — €129
                </span>
                <span
                  className="font-body font-medium text-xs rounded px-2 py-0.5"
                  style={{
                    background: 'rgba(34,211,238,0.1)',
                    color: '#22d3ee',
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                  }}
                >
                  AVAILABLE
                </span>
              </li>

              {/* VIP */}
              <li className="flex items-center justify-between">
                <span className="font-body text-text-primary font-medium" style={{ fontSize: '15px' }}>
                  VIP — €249
                </span>
                <span
                  className="font-body font-medium text-xs rounded px-2 py-0.5"
                  style={{
                    background: 'rgba(212,168,83,0.15)',
                    color: '#d4a853',
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                  }}
                >
                  LIMITED
                </span>
              </li>
            </ul>

            <button
              className="w-full font-display font-bold uppercase tracking-wider text-void bg-accent-amber transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-amber focus:ring-offset-2 focus:ring-offset-surface"
              style={{
                fontSize: '14px',
                padding: '14px 24px',
                borderRadius: '4px',
                letterSpacing: '0.1em',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(245,158,11,0.4), 0 0 60px rgba(245,158,11,0.15)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              SECURE YOUR SPOT
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Info
