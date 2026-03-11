import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Transmission() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="transmission"
      style={{
        background: 'var(--bg-void)',
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
        ref={ref}
      >
        <motion.blockquote
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            textAlign: 'center',
          }}
        >
          {/* Top rule */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(64,160,192,0.2), transparent)',
              marginBottom: '48px',
            }}
            aria-hidden="true"
          />

          {/* Decorative quotation mark */}
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '120px',
              lineHeight: 0.8,
              color: 'var(--planet-bright)',
              opacity: 0.07,
              position: 'absolute',
              top: '56px',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              userSelect: 'none',
              letterSpacing: '-0.05em',
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 3vw, 36px)',
              lineHeight: 1.55,
              color: 'var(--text-primary)',
              letterSpacing: '0.02em',
              marginBottom: '40px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            We are a way for the cosmos to know itself.
          </motion.p>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <cite
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '13px',
                letterSpacing: '0.2em',
                color: 'var(--warm-accent)',
                textTransform: 'uppercase',
              }}
            >
              — Carl Sagan
            </cite>
          </motion.footer>

          {/* Bottom rule */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(64,160,192,0.2), transparent)',
              marginTop: '48px',
            }}
            aria-hidden="true"
          />
        </motion.blockquote>

        {/* Decorative element below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
            aria-hidden="true"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 3 ? '32px' : i === 2 || i === 4 ? '16px' : '6px',
                  height: '1px',
                  background: `rgba(64, 160, 192, ${i === 3 ? 0.5 : i === 2 || i === 4 ? 0.25 : 0.1})`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
