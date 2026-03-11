import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import type { Festival } from '../../data/festivals'
import { MONTH_NAMES, COUNTRY_FLAGS } from '../../data/festivals'
import { cn } from '../../lib/utils'

// Today's date for past detection
const TODAY = new Date('2026-03-06')

function isPast(festival: Festival): boolean {
  return new Date(festival.startDate) < TODAY
}

function getSizeBadgeClass(size: Festival['size']): string {
  switch (size) {
    case 'Major':
      return 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    case 'Large':
      return 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
    case 'Medium':
      return 'border-purple-500/30 text-purple-400 bg-purple-500/10'
    case 'Boutique':
      return 'border-pink-500/30 text-pink-400 bg-pink-500/10'
    default:
      return 'border-white/10 text-gray-400 bg-white/5'
  }
}

function getMonthFromDate(dateStr: string): number {
  return new Date(dateStr).getMonth() + 1
}

export function groupByMonth(festivals: Festival[]): Map<number, Festival[]> {
  const map = new Map<number, Festival[]>()
  for (const f of festivals) {
    const month = getMonthFromDate(f.startDate)
    if (!map.has(month)) map.set(month, [])
    map.get(month)!.push(f)
  }
  for (const [, arr] of map) {
    arr.sort((a, b) => a.startDate.localeCompare(b.startDate))
  }
  return map
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${monthNames[s.getMonth()]} ${s.getDate()} – ${e.getDate()}`
  }
  return `${monthNames[s.getMonth()]} ${s.getDate()} – ${monthNames[e.getMonth()]} ${e.getDate()}`
}

// Intersection Observer hook for staggered entrance animation
function useCardAnimation(count: number) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = Array.from(container.querySelectorAll<HTMLElement>('.festival-card-enter'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement
            const index = parseInt(card.dataset.cardIndex || '0', 10)
            setTimeout(() => {
              card.classList.add('visible')
            }, index * 40)
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [count])

  return containerRef
}

interface MonthGroupProps {
  month: number
  festivals: Festival[]
}

// Month-specific subtle gradient colors for the chapter background
function getMonthGradient(month: number): string {
  const gradients: Record<number, string> = {
    1: 'radial-gradient(ellipse at 20% 50%, rgba(34,211,238,0.04) 0%, transparent 60%)',
    2: 'radial-gradient(ellipse at 80% 30%, rgba(168,85,247,0.04) 0%, transparent 60%)',
    3: 'radial-gradient(ellipse at 30% 60%, rgba(34,211,238,0.03) 0%, transparent 60%)',
    4: 'radial-gradient(ellipse at 70% 40%, rgba(245,158,11,0.04) 0%, transparent 60%)',
    5: 'radial-gradient(ellipse at 20% 70%, rgba(236,72,153,0.04) 0%, transparent 60%)',
    6: 'radial-gradient(ellipse at 80% 60%, rgba(168,85,247,0.05) 0%, transparent 60%)',
    7: 'radial-gradient(ellipse at 40% 30%, rgba(245,158,11,0.05) 0%, transparent 60%)',
    8: 'radial-gradient(ellipse at 60% 70%, rgba(34,211,238,0.04) 0%, transparent 60%)',
    9: 'radial-gradient(ellipse at 30% 40%, rgba(168,85,247,0.04) 0%, transparent 60%)',
    10: 'radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.03) 0%, transparent 60%)',
    11: 'radial-gradient(ellipse at 50% 30%, rgba(236,72,153,0.03) 0%, transparent 60%)',
    12: 'radial-gradient(ellipse at 50% 70%, rgba(34,211,238,0.05) 0%, transparent 60%)',
  }
  return gradients[month] ?? gradients[1]
}

export function MonthGroup({ month, festivals }: MonthGroupProps) {
  const containerRef = useCardAnimation(festivals.length)

  return (
    <div
      className="relative mb-12"
      style={{ background: getMonthGradient(month) }}
    >
      {/* Month header — chapter style */}
      <div className="flex items-center gap-4 py-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
        <div className="flex items-center gap-3 flex-shrink-0">
          <h3 className="font-orbitron text-2xl md:text-3xl uppercase tracking-widest text-white/90"
            style={{ textShadow: '0 0 30px rgba(168,85,247,0.4)' }}
          >
            {MONTH_NAMES[month - 1]}
          </h3>
          <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-2.5 py-0.5 rounded-full font-inter">
            {festivals.length}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      </div>

      {/* Festival cards grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
        role="list"
        aria-label={`${MONTH_NAMES[month - 1]} festivals`}
      >
        {festivals.map((festival, i) => {
          const past = isPast(festival)
          return (
            <div
              key={festival.id}
              data-card-index={i}
              className={cn(
                'festival-card-enter',
                'relative rounded-xl p-4 cursor-pointer group',
                'transition-all duration-200',
                festival.featured
                  ? 'border-l-2 border-l-amber-500/60'
                  : '',
                past && 'past'
              )}
              style={{
                background: 'rgba(15,15,25,0.6)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: festival.featured
                  ? '1px solid rgba(245,158,11,0.25)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
              role="listitem"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  window.open(festival.website, '_blank', 'noopener noreferrer')
                }
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = festival.featured
                  ? 'rgba(245,158,11,0.5)'
                  : 'rgba(255,255,255,0.15)'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = festival.featured
                  ? '0 4px 24px rgba(245,158,11,0.12)'
                  : '0 4px 16px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = festival.featured
                  ? 'rgba(245,158,11,0.25)'
                  : 'rgba(255,255,255,0.06)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
              aria-label={`${festival.name}, ${festival.location}, ${formatDateRange(festival.startDate, festival.endDate)}${past ? ' (past)' : ''}`}
            >
              {/* Festival name + external link */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-inter text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-150 leading-snug">
                  {festival.name}
                </span>
                <a
                  href={festival.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-gray-600 hover:text-cyan-400 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded p-0.5 mt-0.5"
                  aria-label={`Visit ${festival.name} website`}
                  onClick={e => e.stopPropagation()}
                  tabIndex={-1}
                >
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>

              {/* Location */}
              <div className="text-xs text-gray-400 mb-2 truncate">
                {COUNTRY_FLAGS[festival.country] ?? ''} {festival.location}
              </div>

              {/* Date range */}
              <div className="text-xs text-cyan-400/70 mb-3">
                {formatDateRange(festival.startDate, festival.endDate)}
              </div>

              {/* Badges row */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={cn(
                    'text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border whitespace-nowrap font-inter',
                    getSizeBadgeClass(festival.size)
                  )}
                >
                  {festival.size}
                </span>

                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 whitespace-nowrap">
                  {festival.genre}
                </span>

                {past && (
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 whitespace-nowrap">
                    Past
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Timeline header (used in Zone 2) ──────────────────────────────────
export function TimelineHeader({ festivalCount }: { festivalCount: number }) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-px bg-purple-500/60" aria-hidden="true" />
          <span className="text-purple-400 text-sm tracking-wider uppercase font-inter">
            The Journey
          </span>
        </div>
        <h2
          id="timeline-heading"
          className="font-orbitron text-3xl text-white mb-3"
        >
          Festival Timeline
        </h2>
        <p className="text-gray-400 font-inter">
          All {festivalCount} festivals — navigate by month and continent
        </p>
      </div>
    </div>
  )
}

// ── Zone renderer: renders specific months from grouped data ──────────
interface TimelineZoneProps {
  festivals: Festival[]
  monthRange: [number, number]
}

export function TimelineZone({ festivals, monthRange }: TimelineZoneProps) {
  const grouped = groupByMonth(festivals)
  const [start, end] = monthRange
  const months = Array.from(grouped.keys())
    .filter(m => m >= start && m <= end)
    .sort((a, b) => a - b)

  if (months.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8" aria-label="Festival timeline by month">
      {months.map(month => (
        <MonthGroup
          key={month}
          month={month}
          festivals={grouped.get(month)!}
        />
      ))}
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────
export function TimelineEmpty() {
  return (
    <section className="py-24 min-h-[40vh] flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 font-inter text-lg">No festivals match your filters.</p>
        <p className="text-gray-600 text-sm mt-2">Try adjusting your search or filters.</p>
      </div>
    </section>
  )
}

// ── Default export (kept for backward compatibility if needed) ────────
interface FestivalTimelineProps {
  festivals: Festival[]
}

export default function FestivalTimeline({ festivals }: FestivalTimelineProps) {
  const grouped = groupByMonth(festivals)
  const sortedMonths = Array.from(grouped.keys()).sort((a, b) => a - b)

  if (festivals.length === 0) {
    return <TimelineEmpty />
  }

  return (
    <section
      className="py-16 pb-24"
      aria-labelledby="timeline-heading"
      style={{ background: '#0a0a14' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-purple-500/60" aria-hidden="true" />
            <span className="text-purple-400 text-sm tracking-wider uppercase font-inter">
              The Journey
            </span>
          </div>
          <h2
            id="timeline-heading"
            className="font-orbitron text-3xl text-white mb-3"
          >
            Festival Timeline
          </h2>
          <p className="text-gray-400 font-inter">
            All {festivals.length} festivals — navigate by month and continent
          </p>
        </div>
      </div>

      <div aria-label="Festival timeline by month">
        {sortedMonths.map((month) => (
          <div key={month} className="max-w-7xl mx-auto px-6 md:px-10">
            <MonthGroup
              month={month}
              festivals={grouped.get(month)!}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
