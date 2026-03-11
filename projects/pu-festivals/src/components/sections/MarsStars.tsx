import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── useCountUp (ported from Voyage Beyond Scale.tsx) ──────────────────
function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return

    let startTime: number | null = null
    let frame: number

    const tick = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration])

  return count
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

interface MarsStarsProps {
  children: React.ReactNode
}

export default function MarsStars({ children }: MarsStarsProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px' })
  const count = useCountUp(400_000_000_000, 3000, inView)

  const subRef = useRef(null)
  const subInView = useInView(subRef, { once: true, margin: '0px' })

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ minHeight: '100vh' }}
    >
      {/* Mars/starfield background — slow drift animation */}
      <div
        className="absolute inset-0 mars-bg-drift overflow-hidden"
        style={{
          backgroundImage: 'url(/images/mars-stars.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* Dark overlay — reduced so Mars drift is visible */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10,10,20,0.35)' }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,20,0.5) 60%, rgba(10,10,20,0.9) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to bottom, #0a0a14, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to top, #0a0a14, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Counter display — centered cosmic stat */}
      <div className="relative z-10 flex flex-col items-center pt-20 pb-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-orbitron text-[11px] tracking-[0.35em] uppercase mb-6"
          style={{ color: 'rgba(34,211,238,0.7)' }}
        >
          Milky Way Galaxy
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-orbitron font-black block leading-none"
            style={{
              fontSize: 'clamp(32px, 6vw, 80px)',
              color: '#22d3ee',
              textShadow:
                '0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(34,211,238,0.15)',
              letterSpacing: '0.05em',
              fontVariantNumeric: 'tabular-nums',
            }}
            aria-label="400 billion"
          >
            {formatNumber(count)}
          </span>
        </motion.div>

        <div ref={subRef}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={subInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter text-gray-400 mt-4"
            style={{
              fontSize: 'clamp(16px, 2vw, 24px)',
              letterSpacing: '0.08em',
            }}
          >
            stars in our galaxy alone
          </motion.p>
        </div>
      </div>

      {/* Children (timeline content) on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
