import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import FlowerOfLife from '../ui/FlowerOfLife'

const springIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 20,
      delay: delay / 1000,
    },
  }),
}

const Hero: React.FC = () => {
  const handleScrollDown = () => {
    const lineup = document.querySelector('#lineup')
    if (lineup) lineup.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
      aria-label="Nexus Festival Hero"
    >
      {/* Starfield layer */}
      <div className="starfield absolute inset-0" aria-hidden="true" />

      {/* Nebula gradient layers — cosmic atmospheric depth */}
      <div className="absolute inset-0" aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 35% 40%, rgba(212,168,83,0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 65% 55%, rgba(168,85,247,0.08) 0%, transparent 40%),
            radial-gradient(ellipse 100% 60% at 50% 50%, rgba(64,64,160,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 20% 70%, rgba(34,211,238,0.05) 0%, transparent 40%),
            linear-gradient(180deg, #050510 0%, #0a0e1a 30%, #0d1020 50%, #0a0e1a 70%, #050510 100%)
          `
        }}
      />

      {/* Forest silhouette at bottom — the foreground layer */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true"
        style={{
          height: '25vh',
          background: `
            linear-gradient(to top, #050510 0%, #050510 20%, transparent 100%)
          `,
          maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 200\'%3E%3Cpath d=\'M0 200V120c20-10 40-30 60-35s40 5 60 15 40 20 60 15 40-20 60-30 40-10 60 0 40 25 60 30 40 0 60-10 40-15 60-10 40 15 60 25 40 15 60 0 40-25 60-35 40-10 60 5 40 20 60 30 40 10 60-10 40-30 60-35 40 0 60 10 40 20 60 25 40 5 60-5 40-10 60-5 40 10 60 20 40 15 60 5V200z\' fill=\'%23050510\'/%3E%3C/svg%3E")',
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 200\'%3E%3Cpath d=\'M0 200V120c20-10 40-30 60-35s40 5 60 15 40 20 60 15 40-20 60-30 40-10 60 0 40 25 60 30 40 0 60-10 40-15 60-10 40 15 60 25 40 15 60 0 40-25 60-35 40-10 60 5 40 20 60 30 40 10 60-10 40-30 60-35 40 0 60 10 40 20 60 25 40 5 60-5 40-10 60-5 40 10 60 20 40 15 60 5V200z\' fill=\'%23050510\'/%3E%3C/svg%3E")',
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5,5,16,0) 20%, rgba(5,5,16,0.7) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,16,0.85) 0%, rgba(5,5,16,0.4) 30%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,5,16,0.5) 0%, transparent 20%)',
        }}
        aria-hidden="true"
      />

      {/* Sacred geometry — positioned behind text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        {/* Outer flower — larger, more transparent */}
        <div className="absolute" style={{ opacity: 1 }}>
          <FlowerOfLife
            size={500}
            strokeColor="#d4a853"
            strokeOpacity={0.12}
            animate={true}
            animationDuration={120}
            innerAnimDuration={90}
            className="hidden md:block"
          />
          <FlowerOfLife
            size={300}
            strokeColor="#d4a853"
            strokeOpacity={0.12}
            animate={true}
            animationDuration={120}
            innerAnimDuration={90}
            className="block md:hidden"
          />
        </div>
      </div>

      {/* Warm nebula glow behind title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div style={{
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, rgba(245,158,11,0.03) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          className="font-heading text-text-primary uppercase"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 900,
            letterSpacing: '0.15em',
            textShadow: '0 0 40px rgba(212,168,83,0.3), 0 0 80px rgba(212,168,83,0.1)',
            lineHeight: 1,
          }}
          variants={springIn}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          NEXUS
        </motion.h1>

        <motion.p
          className="font-display font-semibold uppercase text-accent-amber"
          style={{
            fontSize: 'clamp(20px, 3vw, 36px)',
            fontWeight: 600,
            letterSpacing: '0.3em',
            marginTop: '8px',
          }}
          variants={springIn}
          initial="hidden"
          animate="visible"
          custom={150}
        >
          FESTIVAL
        </motion.p>

        <motion.p
          className="font-body font-medium text-text-secondary uppercase tracking-widest"
          style={{ fontSize: '14px', marginTop: '24px' }}
          variants={springIn}
          initial="hidden"
          animate="visible"
          custom={300}
        >
          3 DAYS · SOUTHERN PORTUGAL · FOREST
        </motion.p>

        <motion.p
          className="font-body text-accent-amber"
          style={{ fontSize: '16px', marginTop: '8px' }}
          variants={springIn}
          initial="hidden"
          animate="visible"
          custom={400}
        >
          AUGUST 14–16, 2026
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-4 mt-10"
          variants={springIn}
          initial="hidden"
          animate="visible"
          custom={450}
        >
          <a
            href="#tickets"
            id="tickets"
            className="font-display font-bold uppercase tracking-wider text-void bg-accent-amber transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-amber focus:ring-offset-2 focus:ring-offset-void"
            style={{
              fontSize: '14px',
              padding: '14px 40px',
              borderRadius: '4px',
              letterSpacing: '0.1em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(245,158,11,0.5), 0 0 60px rgba(245,158,11,0.2)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
            onClick={e => {
              e.preventDefault()
              document.querySelector('#info')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            GET TICKETS
          </a>

          <a
            href="#lineup"
            className="font-body font-medium text-accent-cyan hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan rounded"
            style={{ fontSize: '14px' }}
            onClick={e => {
              e.preventDefault()
              document.querySelector('#lineup')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore Lineup →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-secondary flex flex-col items-center gap-2 opacity-60 hover:opacity-90 transition-opacity duration-200 focus:outline-none"
        onClick={handleScrollDown}
        aria-label="Scroll down"
        style={{
          animation: 'scrollBounce 2s ease-in-out infinite',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <ChevronDown size={24} />
      </button>
    </section>
  )
}

export default Hero
