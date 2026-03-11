import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface GalleryItem {
  gradient: string
  label: string
  span2: boolean
}

const galleryItems: GalleryItem[] = [
  {
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #083344 100%)',
    label: 'Main Stage',
    span2: true,
  },
  {
    gradient: 'linear-gradient(135deg, #451a03 0%, #431407 100%)',
    label: 'Forest Floor',
    span2: false,
  },
  {
    gradient: 'linear-gradient(135deg, #083344 0%, #1e3a8a 100%)',
    label: 'Sacred Garden',
    span2: false,
  },
  {
    gradient: 'linear-gradient(135deg, #4a044e 0%, #1e1b4b 100%)',
    label: 'UV Canyon',
    span2: false,
  },
  {
    gradient: 'linear-gradient(135deg, #78350f 0%, #7f1d1d 100%)',
    label: 'Sunrise Set',
    span2: true,
  },
  {
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2e1065 100%)',
    label: 'The Gathering',
    span2: false,
  },
]

// Inner dots/lights for visual interest in gradient placeholders
const GalleryPlaceholderOverlay: React.FC<{ label: string; gradient?: string }> = ({ label }) => (
  <>
    {/* Simulated light orbs */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 30%)',
      }}
      aria-hidden="true"
    />
    {/* Label overlay */}
    <div
      className="absolute bottom-0 left-0 right-0 p-4"
      style={{
        background: 'linear-gradient(to top, rgba(5,5,16,0.8) 0%, transparent 100%)',
      }}
    >
      <span
        className="font-body font-medium text-white/70"
        style={{ fontSize: '13px' }}
      >
        {label}
      </span>
    </div>
  </>
)

const GalleryCard: React.FC<{ item: GalleryItem; index: number }> = ({ item, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      style={{
        background: item.gradient,
        gridRow: item.span2 ? 'span 2' : 'span 1',
        minHeight: item.span2 ? '420px' : '200px',
      }}
      role="img"
      aria-label={`Gallery: ${item.label}`}
    >
      {/* Hover effect overlay */}
      <div
        className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: 'rgba(255,255,255,0.05)',
          transform: 'scale(1)',
          transition: 'opacity 500ms, transform 500ms',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
        style={{ background: item.gradient }}
        aria-hidden="true"
      />

      <GalleryPlaceholderOverlay label={item.label} />
    </motion.div>
  )
}

const Gallery: React.FC = () => {
  return (
    <section
      id="gallery"
      className="relative bg-void overflow-hidden"
      style={{ paddingTop: '120px', paddingBottom: '80px' }}
      aria-labelledby="gallery-heading"
    >
      <div className="px-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section label */}
        <p className="section-label text-accent-magenta mb-3">
          MEMORIES
        </p>

        {/* Section heading */}
        <h2
          className="font-display font-bold text-text-primary mb-12"
          id="gallery-heading"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700 }}
        >
          Moments in Time
        </h2>

        {/* Masonry grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '200px',
          }}
        >
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Mobile: 2-column fallback handled via responsive style */}
        <style>{`
          @media (max-width: 640px) {
            #gallery .grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-auto-rows: 150px !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default Gallery
