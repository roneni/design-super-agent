import { Search } from 'lucide-react'
import { CONTINENTS, MONTHS } from '../../data/festivals'
import { cn } from '../../lib/utils'

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (v: string) => void
  activeContinent: string
  onContinentChange: (v: string) => void
  activeMonths: string[]
  onMonthToggle: (v: string) => void
  festivalCount: number
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  activeContinent,
  onContinentChange,
  activeMonths,
  onMonthToggle,
  festivalCount,
}: SearchFiltersProps) {
  return (
    <div
      className="sticky z-40 backdrop-blur-xl border-y border-white/5 py-4 px-6 md:px-10"
      style={{
        top: '64px',
        background: 'rgba(10,10,20,0.8)',
      }}
      role="search"
      aria-label="Festival search and filters"
    >
      <div className="max-w-7xl mx-auto">
        {/* Search row */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search festivals, countries, locations..."
              className="
                w-full bg-white/5 border border-white/10 rounded-lg
                px-4 py-2.5 pl-10
                text-sm text-white placeholder:text-gray-500
                transition-all duration-200
                focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20
              "
              aria-label="Search festivals"
            />
          </div>

          <span className="hidden md:block text-sm text-gray-500 flex-shrink-0" aria-live="polite">
            {festivalCount} {festivalCount === 1 ? 'festival' : 'festivals'}
          </span>
        </div>

        {/* Mobile count */}
        <div className="md:hidden mt-2" aria-live="polite">
          <span className="text-sm text-gray-500">
            {festivalCount} {festivalCount === 1 ? 'festival' : 'festivals'}
          </span>
        </div>

        {/* Continent chips */}
        <div className="flex flex-wrap gap-2 mt-3" role="group" aria-label="Filter by continent">
          {CONTINENTS.map(continent => {
            const isActive = continent === 'All'
              ? activeContinent === 'All'
              : activeContinent === continent
            return (
              <button
                key={continent}
                onClick={() => onContinentChange(continent)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500',
                  isActive
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                )}
                aria-pressed={isActive}
              >
                {continent}
              </button>
            )
          })}
        </div>

        {/* Month chips */}
        <div className="flex flex-wrap gap-2 mt-2" role="group" aria-label="Filter by month">
          {MONTHS.map(month => {
            const isActive = activeMonths.includes(month)
            return (
              <button
                key={month}
                onClick={() => onMonthToggle(month)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
                  isActive
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.15)]'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                )}
                aria-pressed={isActive}
              >
                {month}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
