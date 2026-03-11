import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CardData {
  title: string
  subtitle: string
  description: string
  backgroundType: 'image' | 'coral' | 'void'
  imageSrc?: string
}

const cards: CardData[] = [
  {
    title: 'The Abyssal Plain',
    subtitle: '4,000-6,000m Depth',
    description:
      'The vast flat expanse of the deep ocean floor, covering over 50% of Earth\'s surface. Hydrothermal vents pierce the darkness, sustaining alien ecosystems that thrive without sunlight.',
    backgroundType: 'image',
    imageSrc: '/images/abyssal-card.png',
  },
  {
    title: 'The Coral Cathedral',
    subtitle: 'Mesopelagic Reef System',
    description:
      'Ancient reef formations rising like gothic architecture from the ocean floor. Light filters through crystalline water, illuminating schools of fish that move like living stained glass.',
    backgroundType: 'coral',
    imageSrc: '/images/coral-card.png',
  },
  {
    title: 'The Midnight Zone',
    subtitle: '1,000-4,000m Depth',
    description:
      'Beyond the reach of sunlight, the bathypelagic zone hosts creatures that create their own light. Bioluminescent displays flash in the eternal darkness — nature\'s own light show.',
    backgroundType: 'void',
  },
]

function CardBackground({ type, imageSrc }: { type: CardData['backgroundType']; imageSrc?: string }) {
  if (type === 'image' || type === 'coral') {
    return (
      <div
        style={{
          height: '200px',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          borderRadius: '12px 12px 0 0',
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
    )
  }

  // void type — midnight zone with bioluminescent dots
  const bioDots = Array.from({ length: 36 }, (_, i) => ({
    top: `${Math.sin(i * 2.7) * 43 + 50}%`,
    left: `${((i * 41 + 17) % 100)}%`,
    size: i % 7 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 0.9,
    opacity: 0.15 + (i % 5) * 0.08,
    color: i % 4 === 0 ? '#00ffcc' : '#00e5ff',
  }))

  return (
    <div
      style={{
        height: '200px',
        background:
          'radial-gradient(ellipse at center, #0a1628 0%, #050d18 50%, #030810 100%)',
        borderRadius: '12px 12px 0 0',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {/* Subtle deep glow suggesting water depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 40% 60%, rgba(0, 105, 148, 0.18) 0%, transparent 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(0, 229, 255, 0.06) 0%, transparent 50%)',
        }}
      />

      {/* Bioluminescent dots */}
      {bioDots.map((dot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: '50%',
            background: dot.color,
            opacity: dot.opacity,
            boxShadow:
              dot.size > 1.5
                ? `0 0 ${dot.size * 3}px ${dot.color}`
                : 'none',
          }}
        />
      ))}
    </div>
  )
}

function DepthCard({ card, index }: { card: CardData; index: number }) {
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
        background: 'rgba(10, 22, 40, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 229, 255, 0.12)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{
        y: -6,
        borderColor: 'rgba(0, 229, 255, 0.28)',
        transition: { duration: 0.3 },
      }}
    >
      <CardBackground type={card.backgroundType} imageSrc={card.imageSrc} />
      <div
        style={{
          padding: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'var(--ocean-glow)',
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
            background: 'linear-gradient(to right, rgba(0, 229, 255, 0.3), transparent)',
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
      id="depths"
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
              color: 'var(--ocean-glow)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Charted Zones
          </p>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(24px, 3.5vw, 44px)',
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              textShadow: '0 0 30px rgba(0, 229, 255, 0.25)',
              textTransform: 'uppercase',
            }}
          >
            Depths
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              background:
                'linear-gradient(to right, transparent, rgba(0, 229, 255, 0.3), transparent)',
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
            <DepthCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
