import { motion } from 'framer-motion'
import { FlowerOfLife } from '../ui/SacredGeometry'

const stats = [
  { value: '500+', label: 'Annual Events' },
  { value: '50+', label: 'Countries' },
  { value: '30+', label: 'Years of Spirit' },
]

export function GoaSection() {
  return (
    <section
      style={{
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{ position: 'absolute', inset: 0 }}
      >
        <div
          className="goa-nebula-bg"
          style={{ position: 'absolute', inset: 0 }}
        />

        <img
          src="/images/goa-warm-nebula.webp"
          alt="Warm cosmic nebula with golden amber tones representing the Goa trance spirit"
          width={1536}
          height={768}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />

        {/* Radial gradient overlay — dark at edges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.75) 100%)',
          }}
        />

        {/* Extra warm color tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(249,115,22,0.1) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Sacred geometry rotating */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '-40px',
          }}
        >
          <FlowerOfLife
            size={200}
            color="#f97316"
            opacity={0.18}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'var(--accent-warm)',
              }}
            />
            <span
              style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--accent-warm)',
              }}
            >
              THE ORIGIN
            </span>
            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'var(--accent-warm)',
              }}
            />
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '32px',
            }}
          >
            THE GOA SPIRIT
          </h2>

          {/* Body text */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2vw, 18px)',
              lineHeight: 1.8,
              color: '#f5ebe0',
              marginBottom: '16px',
            }}
          >
            In the late 1980s, on the sun-drenched beaches of Goa, India, a new form of
            electronic music was born from the fertile collision of hippie culture, acid house,
            and Eastern spirituality. DJs like Goa Gil and Laurent played all-night open-air
            gatherings where boundaries dissolved and the music became ritual.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              lineHeight: 1.8,
              color: 'rgba(245, 235, 224, 0.75)',
              marginBottom: '64px',
            }}
          >
            That spirit — of communal transcendence beneath open skies — lives on in every
            psytrance gathering today. From the sands of Bahia to the fields of Hungary,
            the flame of Goa burns eternal.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(32px, 6vw, 80px)',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 900,
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  background: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: '8px',
                  textShadow: 'none',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  color: 'rgba(245, 235, 224, 0.6)',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
