import { useState } from 'react'
import { MandalaIcon, SriYantraIcon, CrescentMoonIcon, CrystalGemIcon } from './SacredGeometry'

export interface Product {
  id: number
  name: string
  price: number
  category: 'CLOTHING' | 'PRINTS' | 'JEWELRY' | 'ACCESSORIES'
  sizes?: string[]
}

interface ProductCardProps {
  product: Product
  onAddToCart: (item: { id: number; name: string; price: number; size?: string }) => void
}

function CategoryIcon({ category }: { category: Product['category'] }) {
  const glowColors: Record<Product['category'], string> = {
    CLOTHING: 'rgba(168,85,247,0.12)',
    PRINTS: 'rgba(34,211,238,0.1)',
    JEWELRY: 'rgba(236,72,153,0.1)',
    ACCESSORIES: 'rgba(245,158,11,0.1)',
  }
  const iconColors: Record<Product['category'], string> = {
    CLOTHING: 'rgba(168,85,247,0.3)',
    PRINTS: 'rgba(34,211,238,0.3)',
    JEWELRY: 'rgba(236,72,153,0.3)',
    ACCESSORIES: 'rgba(245,158,11,0.3)',
  }

  const IconComponent = {
    CLOTHING: MandalaIcon,
    PRINTS: SriYantraIcon,
    JEWELRY: CrescentMoonIcon,
    ACCESSORIES: CrystalGemIcon,
  }[category]

  return (
    <div style={{
      width: '100%',
      aspectRatio: '1 / 1',
      background: 'var(--bg-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${glowColors[category]} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} aria-hidden="true" />
      <IconComponent size={80} color={iconColors[category]} />
    </div>
  )
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  )
  const [addedState, setAddedState] = useState(false)

  const handleAddToCart = () => {
    if (addedState) return
    onAddToCart({ id: product.id, name: product.name, price: product.price, size: selectedSize })
    setAddedState(true)
    setTimeout(() => setAddedState(false), 1500)
  }

  const categoryLabels: Record<Product['category'], string> = {
    CLOTHING: 'Clothing',
    PRINTS: 'Art Print',
    JEWELRY: 'Jewelry',
    ACCESSORIES: 'Accessories',
  }

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Image area */}
      <CategoryIcon category={product.category} />

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: '15px',
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {product.name}
        </h3>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--accent-cyan)',
          marginTop: '4px',
        }}>
          {categoryLabels[product.category]}
        </p>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '22px',
          color: 'var(--accent-amber)',
          marginTop: '8px',
          fontVariantNumeric: 'tabular-nums',
        }}>
          €{product.price}
        </p>

        {/* Size selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '6px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}>
            {product.sizes.map(size => (
              <button
                key={size}
                className={`size-btn${selectedSize === size ? ' selected' : ''}`}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                aria-label={`Size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Add to Cart */}
        <button
          className={`add-to-cart-btn${addedState ? ' added' : ''}`}
          onClick={handleAddToCart}
          style={{ marginTop: '12px' }}
          aria-label={`Add ${product.name} to cart`}
        >
          {addedState ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              ADDED
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              ADD TO CART
            </>
          )}
        </button>
      </div>
    </article>
  )
}
