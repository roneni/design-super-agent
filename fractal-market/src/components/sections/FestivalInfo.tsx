import { useScrollReveal } from '../../hooks/useScrollReveal'

function MountainSVG() {
  return (
    <svg width="360" height="220" viewBox="0 0 360 220" aria-hidden="true">
      {/* Sky glow */}
      <defs>
        <radialGradient id="horizonGlow" cx="50%" cy="90%" r="60%">
          <stop offset="0%" stopColor="rgba(249,115,22,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="360" height="220" fill="url(#horizonGlow)" />
      {/* Far mountains */}
      <polygon points="0,180 60,100 120,140 180,80 240,120 300,90 360,130 360,220 0,220" fill="rgba(30,20,15,0.9)" />
      {/* Near mountains */}
      <polygon points="0,220 80,140 160,170 230,110 310,155 360,125 360,220" fill="rgba(18,12,8,0.95)" />
      {/* Horizon line */}
      <line x1="0" y1="180" x2="360" y2="180" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
      {/* Stars */}
      {[20, 60, 100, 140, 200, 250, 300, 340].map((x, i) => (
        <circle key={i} cx={x} cy={[20, 40, 15, 50, 25, 10, 35, 55][i]} r="1.5" fill="rgba(255,255,255,0.7)" />
      ))}
    </svg>
  )
}

export function FestivalInfo() {
  const leftRef = useScrollReveal<HTMLDivElement>()
  const rightRef = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="lineup"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 60%),
          linear-gradient(to bottom, var(--bg-void) 0%, #1a1210 100%)
        `,
        padding: '120px 0',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '64px',
        alignItems: 'center',
      }}>
        {/* Left column */}
        <div ref={leftRef} className="reveal">
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent-amber)',
            marginBottom: '16px',
          }}>
            THE GATHERING
          </p>

          <h2 className="font-orbitron" style={{
            fontSize: '36px',
            color: 'var(--text-primary)',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}>
            5 Nights Under<br />Greek Stars
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '500px',
          }}>
            Nestled in the mountains of Northern Greece, Fractal Market brings together world-class psytrance artists, sacred geometry workshops, and an artisan marketplace under the infinite canopy of stars. From sunrise sets to moonlit bazaars, every moment is a portal.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '32px',
            marginTop: '32px',
            flexWrap: 'wrap',
          }}>
            {[
              { number: '50+', label: 'Artists' },
              { number: '5', label: 'Stages' },
              { number: '3000', label: 'Souls' },
            ].map(({ number, label }) => (
              <div key={label}>
                <div className="stat-number">{number}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — mountain circle */}
        <div
          ref={rightRef}
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', width: '404px', height: '404px', flexShrink: 0 }}>
            {/* Conic gradient border ring */}
            <div className="mountain-circle-border" aria-hidden="true" />
            {/* Inner circle */}
            <div style={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              right: '2px',
              bottom: '2px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'linear-gradient(to bottom, #0d0d1a 0%, #120e0a 100%)',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: 'radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.18) 0%, transparent 70%)',
              }} aria-hidden="true" />
              <MountainSVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
