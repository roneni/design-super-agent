import './styles/globals.css'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { FeaturedFestivals } from './components/sections/FeaturedFestivals'
import { UpcomingTimeline } from './components/sections/UpcomingTimeline'
import { GoaSection } from './components/sections/GoaSection'
import { CommunityCTA } from './components/sections/CommunityCTA'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedFestivals />
        <UpcomingTimeline />
        <GoaSection />
        <CommunityCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
