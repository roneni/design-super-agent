import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface CardData {
  title: string
  subtitle: string
  description: string
  backgroundType: 'image' | 'planet' | 'void'
}

const cards: CardData[] = [
  {
    title: 'The Ember Nebula',
    subtitle: 'NGC-7293-B',
    description:
      'A stellar nursery 650 light-years distant, where amber cores of collapsing gas birth new suns. The interplay of heat and void creates halos of ethereal amber light.',
    backgroundType: 'image',
  },
  {
    title: 'Kepler-442b',
    subtitle: 'Super-Earth Candidate',
    description:
      'A world 1,200 light-years away orbiting in the habitable zone. Cyan seas, deep atmosphere, and a sun slightly cooler than our own paint this world in cool alien hues.',
    backgroundType: 'planet',
  },
  {
    title: 'The Void Between',
    subtitle: 'Intergalactic Medium',
    description:
      'The vast emptiness between galaxy clusters — not truly empty, but home to tendrils of warm ionized gas stretching across cosmic scales, mostly invisible, mostly nothing.',
    backgroundType: 'void',
  },
]

function CardBackground({ type }: { type: CardData['backgroundType'] }) {
  if (type === 'image') {
    return (
      <div
        style={{
          height: '200px',
          backgroundImage: 'url(/images/nebula-card.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          borderRadius: '12px 12px 0 0',
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
    )
  }

  if (type === 'planet') {
    return (
      <div
        style={{
          height: '200px',
          background: 'radial-gradient(circle at 50% 60%, #1a6080 0%, #0d3d55 30%, #061a28 60%, #0a0a14 100%)',
          borderRadius: '12px 12px 0 0',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {/* Planet sphere */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #60d0e0 0%, #40a0c0 25%, #1a6080 55%, #061a28 85%, #030e18 100%)',
            boxShadow: '0 0 40px rgba(64,160,192,0.4), inset -20px -15px 40px rgba(0,0,0,0.6)',
          }}
        />
        {/* Stars */}
        {[
          { top: '15%', left: '12%', size: 2 },
          { top: '25%', left: '78%', size: 1.5 },
          { top: '8%', left: '55%', size: 1 },
          { top: '40%', left: '85%', size: 2 },
          { top: '18%', left: '35%', size: 1.5 },
          { top: '35%', left: '8%', size: 1 },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: '50%',
              background: 'rgba(200, 220, 255, 0.8)',
            }}
          />
        ))}
      </div>
    )
  }

  // void type
  return (
    <div
      style={{
        height: '200px',
        background: 'radial-gradient(ellipse at center, #0d0d20 0%, #08080f 50%, #050509 100%)',
        borderRadius: '12px 12px 0 0',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {/* Sparse star dots */}
      {Array.from({ length: 30 }, (_, i) => ({
        top: `${Math.sin(i * 2.3) * 45 + 50}%`,
        left: `${((i * 37 + 13) % 100)}%`,
        size: i % 5 === 0 ? 1.5 : 0.8,
        opacity: 0.2 + (i % 4) * 0.1,
      })).map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: 'rgba(180, 200, 255, 1)',
            opacity: s.opacity,
          }}
        />
      ))}
      {/* Subtle cosmic web line */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 70% 40%, rgba(26,96,128,0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}

function DestinationCard({ card, index }: { card: CardData; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        maxWidth: '360px',
        minHeight: '440px',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(15, 16, 32, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(96, 208, 224, 0.12)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{
        y: -6,
        borderColor: 'rgba(96, 208, 224, 0.28)',
        transition: { duration: 0.3 },
      }}
    >
      <CardBackground type={card.backgroundType} />
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'var(--planet-glow)',
            textTransform: 'uppercase',
          }}
        >
          {card.subtitle}
        </span>
        <h3
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            color: 'var(--text-primary)',
            letterSpacing: '0.05em',
            lineHeight: 1.3,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            flex: 1,
          }}
        >
          {card.description}
        </p>
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(to right, rgba(64,160,192,0.3), transparent)',
            marginTop: '8px',
          }}
          aria-hidden="true"
        />
      </div>
    </motion.article>
  )
}

export default function Journey() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      id="destinations"
      style={{
        background: 'var(--bg-void)',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
      }}
    >
      {/* Top gradient fade from hero */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, var(--bg-void), transparent)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <p
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.35em',
              color: 'var(--planet-glow)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Charted Systems
          </p>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(24px, 3.5vw, 44px)',
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              textShadow: '0 0 30px rgba(64,160,192,0.25)',
              textTransform: 'uppercase',
            }}
          >
            Destinations
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(to right, transparent, var(--planet-glow), transparent)',
              margin: '20px auto 0',
            }}
            aria-hidden="true"
          />
        </motion.div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '28px',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {cards.map((card, i) => (
            <DestinationCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
