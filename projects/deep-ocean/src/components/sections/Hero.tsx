import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Bubble {
  x: number
  y: number
  size: number
  speedY: number
  wobbleSpeed: number
  wobbleAmp: number
  wobbleOffset: number
  opacity: number
  pulseSpeed: number
  pulseOffset: number
  colorType: 'cyan' | 'bright' | 'warm'
}

function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colorTypes: Bubble['colorType'][] = ['cyan', 'cyan', 'bright', 'bright', 'warm']

    // Initialize bubbles
    const count = 100
    bubblesRef.current = Array.from({ length: count }, () => {
      const roll = Math.random()
      const colorType: Bubble['colorType'] =
        roll < 0.4 ? 'cyan' : roll < 0.8 ? 'bright' : 'warm'
      // Tiny particles for distant plankton, medium for bioluminescence
      const isTiny = Math.random() < 0.55
      const size = isTiny
        ? Math.random() * 1.0 + 0.5
        : Math.random() * 1.0 + 2.0

      return {
        x: Math.random() * (canvas?.width ?? window.innerWidth),
        y: Math.random() * (canvas?.height ?? window.innerHeight),
        size,
        speedY: -(Math.random() * 0.25 + 0.06), // negative = upward drift
        wobbleSpeed: Math.random() * 0.5 + 0.2,
        wobbleAmp: Math.random() * 12 + 4,
        wobbleOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.55 + 0.15,
        pulseSpeed: Math.random() * 0.003 + 0.001,
        pulseOffset: Math.random() * Math.PI * 2,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)] ?? colorType,
      }
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const elapsed = (Date.now() - startTimeRef.current) * 0.001

      bubblesRef.current.forEach((bubble) => {
        // Rise upward
        bubble.y += bubble.speedY
        // Horizontal wobble (sinusoidal)
        bubble.x += Math.sin(elapsed * bubble.wobbleSpeed + bubble.wobbleOffset) * 0.18

        // Wrap around — when a bubble exits top, reset to bottom
        if (bubble.y < -bubble.size * 2) {
          bubble.y = canvas.height + bubble.size * 2
          bubble.x = Math.random() * canvas.width
        }
        if (bubble.x < 0) bubble.x = canvas.width
        if (bubble.x > canvas.width) bubble.x = 0

        // Pulse opacity
        const pulse = Math.sin(elapsed * bubble.pulseSpeed * 1000 + bubble.pulseOffset) * 0.25 + 0.75
        const finalOpacity = bubble.opacity * pulse

        // Color based on type
        let fillColor: string
        if (bubble.colorType === 'cyan') {
          fillColor = `rgba(0, 229, 255, ${finalOpacity})`
        } else if (bubble.colorType === 'bright') {
          fillColor = `rgba(0, 255, 200, ${finalOpacity})`
        } else {
          fillColor = `rgba(255, 107, 107, ${finalOpacity * 0.55})`
        }

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fillStyle = fillColor
        ctx.fill()
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
      aria-hidden="true"
    />
  )
}

function ChevronDown() {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="var(--ocean-glow)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '12vh',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero-ocean.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(5,10,18,0.55) 60%, rgba(5,10,18,0.92) 100%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Bottom gradient fade into next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to bottom, transparent, var(--bg-void))',
          zIndex: 3,
        }}
        aria-hidden="true"
      />

      {/* Animated bubble particles */}
      <BubbleCanvas />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 80px)',
            letterSpacing: '0.15em',
            color: 'var(--text-primary)',
            textShadow:
              '0 0 40px rgba(0, 229, 255, 0.3), 0 0 80px rgba(0, 229, 255, 0.1)',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          DEEP OCEAN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(14px, 1.5vw, 20px)',
            color: 'var(--text-secondary)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Into the abyss
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}
        >
          Descend
        </span>
        <ChevronDown />
      </motion.div>
    </section>
  )
}
