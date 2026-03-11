import { useMemo } from 'react'
import { ChevronDown, Globe, MapPin, Calendar, Sparkles } from 'lucide-react'
import FlowerOfLife from '../ui/FlowerOfLife'

interface Star {
  id: number
  top: string
  left: string
  size: number
  opacityMin: number
  opacityMax: number
  duration: string
  delay: string
  warm: boolean
}

function generateStars(count: number): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    const opacityMin = 0.1 + Math.random() * 0.2
    const opacityMax = 0.4 + Math.random() * 0.5
    stars.push({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      opacityMin,
      opacityMax,
      duration: `${3 + Math.random() * 5}s`,
      delay: `${Math.random() * 8}s`,
      warm: Math.random() < 0.2,
    })
  }
  return stars
}

const stats = [
  { icon: Globe, number: '56', label: 'Festivals' },
  { icon: MapPin, number: '30+', label: 'Countries' },
  { icon: Calendar, number: '10', label: 'Months' },
  { icon: Sparkles, number: 'Feb–Dec', label: '2026' },
]

export default function Hero() {
  const stars = useMemo(() => generateStars(200), [])

  return (
    <section
      className="hero-bg relative min-h-screen flex items-center justify-center text-center overflow-hidden pb-20"
      aria-label="Festival Calendar 2026 Hero"
    >
      {/* Dark base overlay to ensure text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(10,10,20,0.75) 0%, rgba(10,10,20,0.45) 50%, rgba(10,10,20,0.65) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 2: breathing radial gradient overlay for depth */}
      <div
        className="hero-breathe absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.05) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 3a: Sacred geometry — primary spinning */}
      <div
        className="sacred-spin absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          opacity: 0.08,
        }}
        aria-hidden="true"
      >
        <FlowerOfLife />
      </div>

      {/* Layer 3b: Sacred geometry — secondary counter-rotating */}
      <div
        className="sacred-spin-reverse absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          opacity: 0.04,
        }}
        aria-hidden="true"
      >
        <FlowerOfLife />
      </div>

      {/* Layer 4: Star particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full star-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.warm ? 'rgba(245,180,80,0.9)' : 'rgba(255,255,255,0.9)',
              '--star-opacity-min': star.opacityMin,
              '--star-opacity-max': star.opacityMax,
              animationDuration: star.duration,
              animationDelay: star.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Layer 5: Content */}
      <div className="relative z-10 px-6 md:px-10 flex flex-col items-center">
        {/* Label */}
        <div className="mb-4">
          <span
            className="font-inter text-xs tracking-[0.2em] uppercase text-amber-400 font-medium"
            aria-label="2026 Global Calendar"
          >
            ✦ 2026 GLOBAL CALENDAR
          </span>
        </div>

        {/* Heading glow backdrop */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.12) 0%, transparent 70%)',
              filter: 'blur(20px)',
              transform: 'scaleX(1.5)',
            }}
            aria-hidden="true"
          />
          <h1
            className="font-orbitron font-bold gradient-text-cyan-purple leading-tight relative"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            FESTIVALS
          </h1>
        </div>

        {/* Subtitle */}
        <p className="font-inter text-lg text-gray-300 max-w-[600px] mx-auto mt-4 leading-relaxed">
          Your map to transformative gatherings across the globe
        </p>

        {/* Stats bar */}
        <div
          className="mt-10 flex flex-wrap justify-center"
          style={{
            background: 'rgba(10,10,20,0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-6 md:px-10 py-4 ${
                  i < stats.length - 1
                    ? 'border-r border-white/10'
                    : ''
                }`}
              >
                <Icon size={16} className="text-amber-400 mb-2" aria-hidden="true" />
                <span className="font-orbitron text-2xl text-cyan-400 leading-none">
                  {stat.number}
                </span>
                <span className="text-xs uppercase tracking-wider text-gray-400 mt-1">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 chevron-bounce text-gray-400"
        aria-hidden="true"
      >
        <ChevronDown size={24} />
      </div>
    </section>
  )
}
