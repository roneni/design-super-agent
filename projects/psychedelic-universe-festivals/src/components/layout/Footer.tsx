export function Footer() {
  const currentYear = 2026

  const links = {
    Explore: ['Festivals', 'Artists', 'Labels', 'Sets & Mixes'],
    Community: ['Forum', 'Events Map', 'Festival Reviews', 'Newsletter'],
    About: ['About Us', 'Contact', 'Advertise', 'Press Kit'],
  }

  return (
    <footer
      style={{
        background: 'var(--bg-void)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '64px 0 48px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  boxShadow: '0 0 8px var(--accent-cyan)',
                }}
              />
              <span
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'var(--text-primary)',
                }}
              >
                PSYCHEDELIC<br />UNIVERSE
              </span>
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                maxWidth: '200px',
              }}
            >
              The definitive guide to psychedelic trance culture, festivals, and community worldwide.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        minHeight: '44px',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.target as HTMLAnchorElement).style.color = 'var(--accent-cyan)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.target as HTMLAnchorElement).style.color = 'var(--text-muted)'
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--text-muted)',
            }}
          >
            &copy; {currentYear} Psychedelic Universe. All rights reserved.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '24px',
            }}
          >
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)'
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = 'var(--text-muted)'
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
