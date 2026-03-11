import { MapPin, Calendar } from 'lucide-react'
import { FEATURED_FESTIVALS, COUNTRY_FLAGS } from '../../data/festivals'

function TierStars({ tier }: { tier: number }) {
  return (
    <span className="text-amber-400 text-sm" aria-label={`${tier} star rating`}>
      {'★'.repeat(tier)}{'☆'.repeat(3 - tier)}
    </span>
  )
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  if (s.getMonth() === e.getMonth()) {
    return `${monthNames[s.getMonth()]} ${s.getDate()} – ${e.getDate()}`
  }
  return `${monthNames[s.getMonth()]} ${s.getDate()} – ${monthNames[e.getMonth()]} ${e.getDate()}`
}

export default function FeaturedEvents() {
  return (
    <section
      className="relative py-32"
      aria-labelledby="featured-heading"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-amber-500/60" aria-hidden="true" />
            <span className="text-amber-400 text-sm tracking-wider uppercase font-inter">
              ✦ Major Events
            </span>
          </div>
          <h2
            id="featured-heading"
            className="font-orbitron text-3xl md:text-4xl text-white mb-3"
          >
            The Brightest Stars of 2026
          </h2>
          <p className="text-gray-400 font-inter max-w-xl">
            The landmark gatherings that define the global psytrance calendar
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_FESTIVALS.map(festival => (
            <article
              key={festival.id}
              className="
                card-amber-glow
                relative overflow-hidden rounded-xl p-6
                cursor-pointer group
                transition-all duration-300
                hover:-translate-y-1
                focus-within:border-amber-500/50
              "
              style={{
                background: 'rgba(15,15,25,0.6)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(245,158,11,0.2)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(245,158,11,0.18), 0 8px 32px rgba(0,0,0,0.4)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.5)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.2)'
              }}
            >
              {/* Warm amber radial glow on hover — always present but invisible until hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(ellipse at top center, rgba(245,158,11,0.08) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Top row: name + stars */}
              <div className="flex items-start justify-between gap-2 mb-3 relative">
                <h3 className="font-orbitron text-base font-bold text-white leading-tight group-hover:text-amber-200 transition-colors duration-200">
                  {festival.name}
                </h3>
                {festival.tier && <TierStars tier={festival.tier} />}
              </div>

              {/* Location row */}
              <div className="flex items-center gap-1.5 mb-2 relative">
                <MapPin size={14} className="text-gray-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-gray-300 truncate">
                  {COUNTRY_FLAGS[festival.country] ?? ''} {festival.location}
                </span>
              </div>

              {/* Dates row */}
              <div className="flex items-center gap-1.5 mb-4 relative">
                <Calendar size={14} className="text-cyan-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-cyan-400/80">
                  {formatDateRange(festival.startDate, festival.endDate)}
                </span>
              </div>

              {/* Bottom row: badges */}
              <div className="flex items-center gap-2 relative">
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded border border-amber-500/20">
                  {festival.duration}
                </span>
                <span className="bg-purple-500/10 text-purple-400 text-[10px] px-1.5 py-0.5 rounded border border-purple-500/20">
                  {festival.genre}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
