import { useState } from 'react'
import { ProductCard, type Product } from '../ui/ProductCard'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const PRODUCTS: Product[] = [
  { id: 1, name: 'Cosmic Serpent UV Tee', price: 45, category: 'CLOTHING', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 2, name: 'Flower of Life Print', price: 35, category: 'PRINTS', sizes: ['A3', 'A2'] },
  { id: 3, name: 'Amethyst Cluster Pendant', price: 65, category: 'JEWELRY' },
  { id: 4, name: 'Sacred Geometry Hoodie', price: 75, category: 'CLOTHING', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 5, name: 'Sri Yantra Gold Print', price: 40, category: 'PRINTS', sizes: ['A3', 'A2', 'A1'] },
  { id: 6, name: 'Moonstone Ring', price: 55, category: 'JEWELRY', sizes: ['6', '7', '8', '9'] },
  { id: 7, name: 'UV Reactive Bandana', price: 20, category: 'ACCESSORIES' },
  { id: 8, name: 'Crystal Grid Kit', price: 85, category: 'ACCESSORIES' },
]

type FilterCategory = 'ALL' | 'CLOTHING' | 'PRINTS' | 'JEWELRY' | 'ACCESSORIES'

const FILTER_TABS: FilterCategory[] = ['ALL', 'CLOTHING', 'PRINTS', 'JEWELRY', 'ACCESSORIES']

interface ProductGridProps {
  onAddToCart: (item: { id: number; name: string; price: number; size?: string }) => void
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL')
  const headerRef = useScrollReveal<HTMLDivElement>()

  const filtered = activeFilter === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter)

  return (
    <section
      id="merch"
      style={{
        background: 'var(--bg-deep)',
        padding: '80px 0',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Section header */}
        <div ref={headerRef} className="reveal" style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '40px',
            color: 'var(--text-primary)',
            lineHeight: 1.15,
          }}>
            Sacred Wares
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginTop: '8px',
          }}>
            Festival-ready gear infused with cosmic intention
          </p>

          {/* Filter tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '24px',
            flexWrap: 'wrap',
          }} role="tablist" aria-label="Filter products by category">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                className={`filter-tab${activeFilter === tab ? ' active' : ''}`}
                onClick={() => setActiveFilter(tab)}
                role="tab"
                aria-selected={activeFilter === tab}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}
