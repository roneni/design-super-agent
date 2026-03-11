import './App.css'
import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
import Journey from './components/sections/Journey'
import Scale from './components/sections/Scale'
import Transmission from './components/sections/Transmission'
import Horizon from './components/sections/Horizon'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Journey />
        <Scale />
        <Transmission />
        <Horizon />
      </main>
    </>
  )
}

export default App
