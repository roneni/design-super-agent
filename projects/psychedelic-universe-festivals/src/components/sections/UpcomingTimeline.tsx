import { motion } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'

interface TimelineFestival {
  name: string
  country: string
  city: string
  month: string
  day: string
  year: string
  description: string
  genres: string[]
  accentColor: 'cyan' | 'purple'
}

const festivals: TimelineFestival[] = [
  {
    name: 'Indian Spirit',
    country: 'Germany',
    city: 'Eldagsen',
    month: 'JUN',
    day: '18',
    year: '2026',
    description: 'Where Native American spirit and psychedelic trance merge in the German countryside.',
    genres: ['Full-On', 'Goa', 'Night Psy'],
    accentColor: 'cyan',
  },
  {
    name: 'Antaris Project',
    country: 'Germany',
    city: 'Seefeld',
    month: 'JUL',
    day: '02',
    year: '2026',
    description: 'Two decades of underground psychedelic culture beside serene Bavarian lakes.',
    genres: ['Progressive', 'Psychill', 'Forest'],
    accentColor: 'purple',
  },
  {
    name: 'Modem Festival',
    country: 'Croatia',
    city: 'Tisno',
    month: 'JUL',
    day: '14',
    year: '2026',
    description: 'An intimate gathering of global trance families on the Adriatic coast.',
    genres: ['Minimal', 'Progressive', 'Dark Psy'],
    accentColor: 'cyan',
  },
  {
    name: 'Hadra Trance Festival',
    country: 'France',
    city: 'Albertville',
    month: 'AUG',
    day: '06',
    year: '2026',
    description: "Alpine altitude and psychedelic frequencies — France's premier trance gathering.",
    genres: ['Full-On', 'Hi-Tech', 'Forest'],
    accentColor: 'purple',
  },
  {
    name: 'Ozora Festival',
    country: 'Hungary',
    city: 'Ozora',
    month: 'AUG',
    day: '04',
    year: '2026',
    description: 'The crown jewel of European psychedelic gatherings, held in the heart of Hungary.',
    genres: ['Full-On', 'Goa', 'Psychill'],
    accentColor: 'cyan',
  },
  {
    name: 'Boom Festival',
    country: 'Portugal',
    city: 'Idanha-a-Nova',
    month: 'AUG',
    day: '05',
    year: '2026',
    description: 'The biennial transformation festival on the banks of the magical Idanha lake.',
    genres: ['Progressive', 'Dark Psy', 'Sunrise'],
    accentColor: 'purple',
  },
  {
    name: 'ZNA Gathering',
    country: 'Portugal',
    city: 'Alcácer do Sal',
    month: 'SEP',
    day: '11',
    year: '2026',
    description: 'Small, intimate, and deeply spiritual — a sacred gathering for the devoted.',
    genres: ['Goa Trance', 'Old School', 'Psychill'],
    accentColor: 'cyan',
  },
  {
    name: 'Universo Paralello',
    country: 'Brazil',
    city: 'Bahia',
    month: 'DEC',
    day: '28',
    year: '2026',
    description: 'Tropical paradise meets psychedelic cosmos. Ring in the New Year on the beach.',
    genres: ['Goa', 'Forest', 'Hi-Tech'],
    accentColor: 'purple',
  },
]

interface TimelineCardProps {
  festival: TimelineFestival
  index: number
  side: 'left' | 'right'
}

function TimelineCard({ festival, index, side }: TimelineCardProps) {
  const isLeft = side === 'left'
  const isCyan = festival.accentColor === 'cyan'
  const color = isCyan ? 'var(--accent-cyan)' : 'var(--accent-purple)'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr',
        gap: '0',
        alignItems: 'start',
        marginBottom: '48px',
      }}
    >
      {/* Left side */}
      <div style={{ paddingRight: '32px', textAlign: isLeft ? 'right' : 'left' }}>
        {isLeft && (
          <FestivalCardContent festival={festival} color={color} align="right" />
        )}
      </div>

      {/* Center dot on timeline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '20px',
        }}
      >
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 12px ${color}, 0 0 24px ${color}44`,
            border: '2px solid var(--bg-deep)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Right side */}
      <div style={{ paddingLeft: '32px' }}>
        {!isLeft && (
          <FestivalCardContent festival={festival} color={color} align="left" />
        )}
      </div>
    </motion.div>
  )
}

function FestivalCardContent({
  festival,
  color,
  align,
}: {
  festival: TimelineFestival
  color: string
  align: 'left' | 'right'
}) {
  return (
    <div
      className="glass-card"
      style={{
        borderRadius: '12px',
        padding: '24px',
        borderLeft: align === 'left' ? `3px solid ${color}` : undefined,
        borderRight: align === 'right' ? `3px solid ${color}` : undefined,
        boxShadow: `0 4px 24px rgba(0,0,0,0.3), ${
          align === 'left'
            ? `inset 3px 0 0 ${color}44`
            : `inset -3px 0 0 ${color}44`
        }`,
        textAlign: align,
      }}
    >
      {/* Date badge */}
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: `${color}15`,
          border: `1px solid ${color}44`,
          borderRadius: '8px',
          padding: '8px 12px',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: color,
          }}
        >
          {festival.month}
        </span>
        <span
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 900,
            fontSize: '22px',
            color: color,
            lineHeight: 1,
          }}
        >
          {festival.day}
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            color: 'var(--text-muted)',
          }}
        >
          {festival.year}
        </span>
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 700,
          fontSize: '16px',
          letterSpacing: '0.06em',
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}
      >
        {festival.name}
      </h3>

      {/* Location */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
          marginBottom: '10px',
        }}
      >
        <MapPin size={12} color="var(--text-muted)" />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}
        >
          {festival.city}, {festival.country}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          marginBottom: '12px',
        }}
      >
        {festival.description}
      </p>

      {/* Genre tags */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        {festival.genres.map((genre) => (
          <span
            key={genre}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              padding: '2px 8px',
              borderRadius: '100px',
              border: `1px solid ${color}44`,
              color: color,
              background: `${color}0f`,
            }}
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  )
}

// Mobile card (single column)
function MobileCard({
  festival,
  index,
}: {
  festival: TimelineFestival
  index: number
}) {
  const isCyan = festival.accentColor === 'cyan'
  const color = isCyan ? 'var(--accent-cyan)' : 'var(--accent-purple)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {/* Dot + line */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          paddingTop: '20px',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 8px ${color}`,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: '1px',
            flex: 1,
            background: `linear-gradient(to bottom, ${color}, transparent)`,
            marginTop: '4px',
          }}
        />
      </div>

      {/* Card */}
      <div style={{ flex: 1 }}>
        <FestivalCardContent festival={festival} color={color} align="left" />
      </div>
    </motion.div>
  )
}

export function UpcomingTimeline() {
  return (
    <section
      id="upcoming"
      style={{
        padding: '120px 0',
        background: 'var(--bg-deep)',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <Calendar size={16} color="var(--accent-cyan)" />
            <span
              style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: 'var(--accent-cyan)',
              }}
            >
              2026 SEASON
            </span>
          </div>
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
            UPCOMING JOURNEYS
          </h2>
        </motion.div>

        {/* Desktop timeline */}
        <div className="desktop-timeline" style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            className="timeline-line"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              transform: 'translateX(-50%)',
            }}
          />

          {festivals.map((festival, index) => (
            <TimelineCard
              key={festival.name}
              festival={festival}
              index={index}
              side={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

        {/* Mobile timeline */}
        <div className="mobile-timeline">
          {/* Vertical line */}
          <div style={{ position: 'relative' }}>
            {festivals.map((festival, index) => (
              <MobileCard key={festival.name} festival={festival} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-timeline { display: none !important; }
          .mobile-timeline { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-timeline { display: block !important; }
          .mobile-timeline { display: none !important; }
        }
      `}</style>
    </section>
  )
}
