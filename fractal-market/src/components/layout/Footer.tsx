import React, { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer style={{
      background: 'var(--bg-void)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '64px 0 100px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Columns grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Col 1: Brand */}
          <div>
            <span
              className="font-orbitron"
              style={{
                fontSize: '16px',
                color: 'var(--accent-cyan)',
                textShadow: '0 0 15px rgba(34,211,238,0.4)',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              FRACTAL MARKET
            </span>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '220px',
            }}>
              A psytrance gathering and sacred marketplace in the mountains of Northern Greece.
            </p>
          </div>

          {/* Col 2: Festival */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}>
              FESTIVAL
            </h4>
            {['Lineup', 'Stages', 'Info', 'Getting There'].map(link => (
              <a key={link} href="#" style={footerLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Col 3: Shop */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}>
              SHOP
            </h4>
            {['All Products', 'Clothing', 'Prints', 'Jewelry'].map(link => (
              <a key={link} href="#merch" style={footerLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Col 4: Connect */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}>
              CONNECT
            </h4>
            {['Instagram', 'Telegram', 'SoundCloud'].map(link => (
              <a key={link} href="#" style={footerLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link}
              </a>
            ))}
            {/* Newsletter */}
            <form onSubmit={handleSubmit} style={{ marginTop: '16px', display: 'flex' }}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-label="Newsletter email"
              />
              <button type="submit" className="newsletter-submit">
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'var(--border-subtle)',
          marginBottom: '24px',
        }} aria-hidden="true" />

        {/* Bottom bar */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}>
          © 2026 Fractal Market. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

const footerLinkStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  color: 'var(--text-muted)',
  textDecoration: 'none',
  marginBottom: '10px',
  transition: 'color 150ms ease',
}
