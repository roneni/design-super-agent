import { FlowerOfLife } from '../ui/SacredGeometry'

export function Hero() {
  return (
    <section
      id="festival"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 30% 40%, rgba(168,85,247,0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 60%, rgba(34,211,238,0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, rgba(236,72,153,0.08) 0%, transparent 40%),
          var(--bg-void)
        `,
      }}
    >
      {/* Stars */}
      <div className="stars-bg" aria-hidden="true" />

      {/* Sacred Geometry — Flower of Life */}
      <div
        className="geo-rotate"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          opacity: 0.06,
          pointerEvents: 'none',
          transformOrigin: 'center',
        }}
      >
        <FlowerOfLife size={600} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '800px',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-secondary)',
          marginBottom: '16px',
        }}>
          5 DAYS · GREEK MOUNTAINS · AUGUST 2026
        </p>

        <h1
          className="font-orbitron text-glow-cyan"
          style={{
            fontSize: 'clamp(40px, 8vw, 96px)',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
          }}
        >
          FRACTAL MARKET
        </h1>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '20px',
          color: 'var(--text-secondary)',
          maxWidth: '500px',
          margin: '16px auto 0',
          lineHeight: 1.6,
        }}>
          Where cosmic consciousness meets sacred commerce
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          marginTop: '32px',
          flexWrap: 'wrap',
        }}>
          <a href="#festival" className="btn-primary">
            GET TICKETS
          </a>
          <a href="#merch" className="btn-secondary">
            SHOP MERCH
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-chevron"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
