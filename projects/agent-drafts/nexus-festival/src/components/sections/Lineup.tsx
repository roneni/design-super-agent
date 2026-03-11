import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/utils'
import { SeedOfLife } from '../ui/FlowerOfLife'

interface Artist {
  name: string
  genre: string
  time: string
  day: number
}

const artists: Artist[] = [
  // Day 1
  { name: 'Astral Projection', genre: 'Full On', time: 'FRI 18:00', day: 1 },
  { name: 'Vini Vici', genre: 'Full On', time: 'FRI 20:00', day: 1 },
  { name: 'Ace Ventura', genre: 'Progressive', time: 'FRI 22:00', day: 1 },
  { name: 'Infected Mushroom', genre: 'Psytrance', time: 'FRI 00:00', day: 1 },
  { name: 'Neelix', genre: 'Progressive', time: 'FRI 02:00', day: 1 },
  { name: 'Captain Hook', genre: 'Full On', time: 'FRI 04:00', day: 1 },
  // Day 2
  { name: 'Shpongle', genre: 'Psychill', time: 'SAT 16:00', day: 2 },
  { name: 'Hallucinogen', genre: 'Dark Psytrance', time: 'SAT 18:00', day: 2 },
  { name: 'Ajja', genre: 'Forest', time: 'SAT 20:00', day: 2 },
  { name: 'Astrix', genre: 'Progressive', time: 'SAT 22:00', day: 2 },
  { name: 'GMS', genre: 'Full On', time: 'SAT 00:00', day: 2 },
  { name: 'Liquid Soul', genre: 'Progressive', time: 'SAT 02:00', day: 2 },
  // Day 3
  { name: 'Raja Ram', genre: 'Goa Trance', time: 'SUN 14:00', day: 3 },
  { name: 'Chicago', genre: 'Psychedelic', time: 'SUN 16:00', day: 3 },
  { name: 'Tristan', genre: 'Forest', time: 'SUN 18:00', day: 3 },
  { name: 'Avalon', genre: 'Full On', time: 'SUN 20:00', day: 3 },
  { name: 'Electric Universe', genre: 'Goa Trance', time: 'SUN 22:00', day: 3 },
  { name: 'Emok', genre: 'Dark Forest', time: 'SUN 00:00', day: 3 },
]

const dayTabs = [
  { label: 'DAY 1 · FRI', value: 1 },
  { label: 'DAY 2 · SAT', value: 2 },
  { label: 'DAY 3 · SUN', value: 3 },
  { label: 'ALL', value: 0 },
]

// Generate initials from artist name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Get gradient class for each artist index
const getGradient = (i: number) => {
  const gradients = [
    'from-accent-cyan/20 to-accent-violet/20',
    'from-accent-violet/20 to-accent-magenta/20',
    'from-accent-amber/20 to-accent-cyan/20',
    'from-accent-magenta/20 to-accent-violet/20',
    'from-accent-cyan/20 to-accent-amber/20',
    'from-accent-violet/20 to-accent-cyan/20',
  ]
  return gradients[i % gradients.length]
}

const ArtistCard: React.FC<{ artist: Artist; index: number }> = ({ artist, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
      className="group relative rounded-lg p-6 cursor-default transition-all duration-300"
      style={{
        background: 'rgba(26, 26, 46, 0.5)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.border = '1px solid rgba(34,211,238,0.2)'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 0 10px rgba(34,211,238,0.15), 0 0 30px rgba(34,211,238,0.05)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.border = '1px solid rgba(255,255,255,0.06)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      <div className="flex items-center gap-4 mb-3">
        {/* Avatar */}
        <div
          className={cn('w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br', getGradient(index))}
        >
          <span className="font-heading text-text-primary text-sm font-bold">
            {getInitials(artist.name)}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-text-primary truncate" style={{ fontSize: '18px' }}>
            {artist.name}
          </h3>
          <span
            className="font-body text-accent-cyan inline-block mt-1 rounded-full"
            style={{
              fontSize: '12px',
              background: 'rgba(34,211,238,0.1)',
              padding: '2px 12px',
            }}
          >
            {artist.genre}
          </span>
        </div>
      </div>
      <p className="font-body text-text-muted" style={{ fontSize: '13px' }}>
        {artist.time}
      </p>
    </motion.article>
  )
}

const Lineup: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(0)

  const filtered = activeDay === 0 ? artists : artists.filter(a => a.day === activeDay)

  return (
    <section
      id="lineup"
      className="relative overflow-hidden"
      style={{ paddingTop: '120px', paddingBottom: '80px' }}
      aria-labelledby="lineup-heading"
    >
      {/* Violet background glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(168,85,247,0.03) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Seed of Life background geometry */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <SeedOfLife size={800} strokeColor="#a855f7" strokeOpacity={0.04} />
      </div>

      <div className="relative z-10 px-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section label */}
        <p className="section-label text-accent-cyan mb-3">
          THE LINEUP
        </p>

        {/* Section heading */}
        <h2
          className="font-display font-bold text-text-primary mb-10"
          id="lineup-heading"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700 }}
        >
          Sonic Architects
        </h2>

        {/* Day filter tabs */}
        <div className="flex flex-wrap gap-3 mb-10" role="tablist" aria-label="Filter by day">
          {dayTabs.map(tab => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeDay === tab.value}
              onClick={() => setActiveDay(tab.value)}
              className={cn(
                'font-body font-medium uppercase tracking-widest rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-1 focus:ring-offset-void',
                activeDay === tab.value
                  ? 'text-accent-cyan bg-accent-cyan/20 border border-accent-cyan/30'
                  : 'text-text-muted border border-white/10 hover:text-text-secondary hover:border-white/20'
              )}
              style={{ fontSize: '12px', padding: '8px 20px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Artist grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          }}
          role="tabpanel"
        >
          {filtered.map((artist, i) => (
            <ArtistCard key={`${artist.name}-${artist.day}`} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Lineup
