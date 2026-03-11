import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

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

      // Ease out cubic
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

export default function Scale() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const count = useCountUp(36000, 3000, inView)

  const subRef = useRef(null)
  const subInView = useInView(subRef, { once: true, margin: '-60px' })

  return (
    <section
      id="scale"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/ocean-vista.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 10, 18, 0.72)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Top fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, var(--bg-void), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to top, var(--bg-void), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.35em',
            color: 'var(--ocean-glow)',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          Mariana Trench
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 6vw, 80px)',
              color: 'var(--ocean-bright)',
              textShadow:
                '0 0 20px rgba(0, 255, 204, 0.6), 0 0 40px rgba(0, 255, 204, 0.3), 0 0 80px rgba(0, 255, 204, 0.15)',
              letterSpacing: '0.05em',
              display: 'block',
              lineHeight: 1.1,
              fontVariantNumeric: 'tabular-nums',
            }}
            aria-label="36,000 feet"
          >
            {formatNumber(count)}
          </span>
        </motion.div>

        <div ref={subRef}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={subInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(16px, 2vw, 24px)',
              color: 'var(--text-secondary)',
              marginTop: '20px',
              letterSpacing: '0.08em',
            }}
          >
            feet — the deepest point on Earth
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={subInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '14px',
              color: 'rgba(122, 142, 160, 0.5)',
              marginTop: '12px',
              letterSpacing: '0.05em',
              fontStyle: 'italic',
            }}
          >
            Deeper than Mount Everest is tall. A place of crushing pressure and eternal darkness, where life still finds a way.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
