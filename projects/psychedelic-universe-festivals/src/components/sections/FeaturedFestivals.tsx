import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SacredDivider } from '../ui/SacredGeometry'

interface Festival {
  name: string
  location: string
  date: string
  genres: string[]
  description: string
  bgClass: string
  imagePath: string
  accentColor: string
}

const festivals: Festival[] = [
  {
    name: 'OZORA FESTIVAL',
    location: 'Ozora, Hungary',
    date: 'August 4–11, 2026',
    genres: ['Full-On', 'Goa Trance', 'Psychill'],
    description: 'A magical journey in the Hungarian fields, where thousands gather under ancient stars.',
    bgClass: 'festival-ozora-bg',
    imagePath: '/images/festival-ozora.webp',
    accentColor: '#10b981',
  },
  {
    name: 'BOOM FESTIVAL',
    location: 'Idanha-a-Nova, Portugal',
    date: 'August 5–12, 2026',
    genres: ['Progressive', 'Dark Psy', 'Sunrise'],
    description: 'Desert dust and cosmic beats at the shores of Idanha lake — the biennial pilgrimage.',
    bgClass: 'festival-boom-bg',
    imagePath: '/images/festival-boom.webp',
    accentColor: '#a855f7',
  },
  {
    name: 'UNIVERSO PARALELLO',
    location: 'Bahia, Brazil',
    date: 'December 28, 2026 – Jan 4',
    genres: ['Goa Trance', 'Forest', 'Hi-Tech'],
    description: 'Ring in the New Year on a tropical beach with the most mystical gathering on Earth.',
    bgClass: 'festival-universo-bg',
    imagePath: '/images/festival-universo.webp',
    accentColor: '#22d3ee',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1] as const },
  },
}

function FestivalCard({ festival }: { festival: Festival }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Card image area */}
      <div
        style={{
          aspectRatio: '3/2',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* CSS fallback background */}
        <div
          className={festival.bgClass}
          style={{ position: 'absolute', inset: 0 }}
        />

        {/* Actual image */}
        <img
          src={festival.imagePath}
          alt={`${festival.name} cosmic festival landscape`}
          width={768}
          height={512}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'filter 0.3s ease',
          }}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.92) 100%)',
          }}
        />

        {/* Stars overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '12px -8px 0 1px white, -18px 20px 0 1px rgba(255,255,255,0.7), 35px 5px 0 1px rgba(255,255,255,0.5), -5px -25px 0 1px rgba(255,255,255,0.6), 50px -15px 0 1px white',
          }}
        />
      </div>

      {/* Card content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px',
        }}
      >
        {/* Festival name */}
        <h3
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '20px',
            letterSpacing: '0.06em',
            color: 'var(--text-primary)',
            marginBottom: '6px',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          {festival.name}
        </h3>

        {/* Location + date */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
          }}
        >
          {festival.location} &nbsp;·&nbsp; {festival.date}
        </p>

        {/* Genre tags */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            marginBottom: '16px',
          }}
        >
          {festival.genres.map((genre) => (
            <span
              key={genre}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                padding: '3px 10px',
                borderRadius: '100px',
                border: `1px solid ${festival.accentColor}55`,
                color: festival.accentColor,
                background: `${festival.accentColor}15`,
              }}
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Explore link */}
        <a
          href="#"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'var(--accent-cyan)',
            textDecoration: 'none',
            transition: 'gap 0.2s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget).style.gap = '10px'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget).style.gap = '6px'
          }}
        >
          EXPLORE <ArrowRight size={14} />
        </a>
      </div>

      {/* Hover glow border */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          border: `1px solid ${festival.accentColor}22`,
          pointerEvents: 'none',
          transition: 'border-color 0.3s',
        }}
      />
    </motion.article>
  )
}

export function FeaturedFestivals() {
  return (
    <section
      id="featured"
      style={{
        padding: '120px 0',
        position: 'relative',
        background: 'var(--bg-void)',
      }}
    >
      {/* Top sacred geometry divider */}
      <SacredDivider color="#22d3ee" />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Section title */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '72px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                height: '1px',
                width: '80px',
                background: 'linear-gradient(to right, transparent, var(--accent-cyan))',
              }}
            />
            <h2
              style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 700,
                fontSize: 'clamp(24px, 3vw, 40px)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}
            >
              FEATURED GATHERINGS
            </h2>
            <div
              style={{
                height: '1px',
                width: '80px',
                background: 'linear-gradient(to left, transparent, var(--accent-cyan))',
              }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em',
            }}
          >
            The most transcendent psytrance festivals on the planet
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {festivals.map((festival) => (
            <FestivalCard key={festival.name} festival={festival} />
          ))}
        </motion.div>
      </div>

      {/* Bottom sacred geometry divider */}
      <div style={{ marginTop: '80px' }}>
        <SacredDivider color="#a855f7" />
      </div>
    </section>
  )
}
