import React from 'react'
import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
import Lineup from './components/sections/Lineup'
import Info from './components/sections/Info'
import Gallery from './components/sections/Gallery'
import Footer from './components/layout/Footer'

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Lineup />
        <Info />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}

export default App
