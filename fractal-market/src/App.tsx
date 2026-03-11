import { useState } from 'react'
import './styles/globals.css'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AudioPlayer } from './components/layout/AudioPlayer'
import { Hero } from './components/sections/Hero'
import { FestivalInfo } from './components/sections/FestivalInfo'
import { GeometryDivider } from './components/sections/GeometryDivider'
import { ProductGrid } from './components/sections/ProductGrid'
import { TrustBar } from './components/sections/TrustBar'
import { FestivalCTA } from './components/sections/FestivalCTA'

interface CartItem {
  id: number
  name: string
  price: number
  size?: string
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item])
  }

  return (
    <>
      <Navbar cartCount={cartItems.length} />
      <main>
        <Hero />
        <FestivalInfo />
        <GeometryDivider />
        <ProductGrid onAddToCart={handleAddToCart} />
        <TrustBar />
        <FestivalCTA />
      </main>
      <Footer />
      <AudioPlayer />
    </>
  )
}

export default App
