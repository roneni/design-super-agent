import { useMemo } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3,
    delay: Math.random() * 8,
    duration: 3 + Math.random() * 6,
    opacity: 0.3 + Math.random() * 0.7,
  }))
}

export function StarField({ count = 150 }: { count?: number }) {
  const stars = useMemo(() => generateStars(count), [count])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: star.opacity,
            animationName: star.size === 1 ? 'twinkle-slow' : 'twinkle',
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            boxShadow: star.size >= 2 ? `0 0 ${star.size * 2}px rgba(200, 220, 255, 0.8)` : 'none',
          }}
        />
      ))}
    </div>
  )
}
