import { SeedOfLife } from '../ui/SacredGeometry'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function FestivalCTA() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="info"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 60%),
          var(--bg-void)
        `,
        padding: '120px 0',
      }}
    >
      <div
        ref={ref}
        className="reveal"
        style={{
          textAlign: 'center',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Seed of Life */}
        <div style={{ opacity: 0.1 }} aria-hidden="true">
          <SeedOfLife size={120} color="var(--accent-cyan)" />
        </div>

        <h2 className="font-orbitron" style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          color: 'var(--text-primary)',
          marginTop: '24px',
          lineHeight: 1.1,
        }}>
          JOIN THE FRACTAL
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '18px',
          color: 'var(--text-secondary)',
          marginTop: '12px',
        }}>
          August 12–17, 2026 · Northern Greece
        </p>

        <a
          href="#festival"
          className="btn-primary"
          style={{
            marginTop: '32px',
            padding: '16px 40px',
            fontSize: '16px',
          }}
        >
          SECURE YOUR TICKET
        </a>
      </div>
    </section>
  )
}
