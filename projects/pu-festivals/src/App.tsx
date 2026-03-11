import { useState, useMemo } from 'react'
import './index.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import FeaturedEvents from './components/sections/FeaturedEvents'
import SearchFilters from './components/sections/SearchFilters'
import MarsStars from './components/sections/MarsStars'
import BackgroundSection from './components/ui/BackgroundSection'
import { TimelineHeader, TimelineZone, TimelineEmpty } from './components/sections/FestivalTimeline'
import { FESTIVALS, MONTH_MAP } from './data/festivals'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeContinent, setActiveContinent] = useState('All')
  const [activeMonths, setActiveMonths] = useState<string[]>([])

  const handleMonthToggle = (month: string) => {
    setActiveMonths(prev =>
      prev.includes(month)
        ? prev.filter(m => m !== month)
        : [...prev, month]
    )
  }

  const filteredFestivals = useMemo(() => {
    return FESTIVALS.filter(festival => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          festival.name.toLowerCase().includes(q) ||
          festival.location.toLowerCase().includes(q) ||
          festival.country.toLowerCase().includes(q) ||
          festival.continent.toLowerCase().includes(q)
        if (!matches) return false
      }

      if (activeContinent !== 'All') {
        if (festival.continent !== activeContinent) return false
      }

      if (activeMonths.length > 0) {
        const festivalMonth = new Date(festival.startDate).getMonth() + 1
        const matchesAnyMonth = activeMonths.some(m => MONTH_MAP[m] === festivalMonth)
        if (!matchesAnyMonth) return false
      }

      return true
    })
  }, [searchQuery, activeContinent, activeMonths])

  const hasResults = filteredFestivals.length > 0

  return (
    <div className="relative min-h-screen bg-void">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar />

      <main>
        {/* ── Zone 1: Hero + Featured Events ── */}
        <Hero />

        <div
          className="h-px -mt-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.15), transparent)' }}
          aria-hidden="true"
        />

        {/* ── Zone 2: Mars/Stars — FeaturedEvents + counter + months 1-3 ── */}
        <MarsStars>
          <FeaturedEvents />
        </MarsStars>

        {/* ── Sticky Search & Filters ── */}
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeContinent={activeContinent}
          onContinentChange={setActiveContinent}
          activeMonths={activeMonths}
          onMonthToggle={handleMonthToggle}
          festivalCount={filteredFestivals.length}
        />

        {!hasResults ? (
          <TimelineEmpty />
        ) : (
          <>
            {/* ── Zone 3: Beach — Late night / moonlit (months 1-5) ── */}
            <BackgroundSection
              imageSrc="/images/beach-festival.png"
              alt="Tropical psytrance festival on a moonlit beach with decorated palm trees"
            >
              <TimelineHeader festivalCount={filteredFestivals.length} />
              <TimelineZone festivals={filteredFestivals} monthRange={[1, 5]} />
            </BackgroundSection>

            {/* ── Zone 4: Deep night — Pre-dawn (month 6) ── */}
            <BackgroundSection
              imageSrc="/images/deep-night.png"
              alt="Mystical psytrance festival valley at deep night with UV art installations"
            >
              <TimelineZone festivals={filteredFestivals} monthRange={[6, 6]} />
            </BackgroundSection>

            {/* ── Zone 5: Crowd sunrise — Golden hour (month 7) ── */}
            <BackgroundSection
              imageSrc="/images/crowd-sunrise.png"
              alt="Massive festival crowd at golden sunrise with sacred geometry stage"
            >
              <TimelineZone festivals={filteredFestivals} monthRange={[7, 7]} />
            </BackgroundSection>

            {/* ── Zone 6: Morning festival (month 8) ── */}
            <BackgroundSection
              imageSrc="/images/morning-festival.png"
              alt="Psytrance festival in morning golden light with colorful stage decorations"
            >
              <TimelineZone festivals={filteredFestivals} monthRange={[8, 8]} />
            </BackgroundSection>

            {/* ── Zone 7: Noon festival — shorter (months 9-12) ── */}
            <BackgroundSection
              imageSrc="/images/noon-festival.png"
              alt="Psytrance festival at high noon with psychedelic decorations and canopy"
              minHeight="60vh"
            >
              <TimelineZone festivals={filteredFestivals} monthRange={[9, 12]} />
            </BackgroundSection>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
