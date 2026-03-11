import { useEffect, useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(10, 10, 20, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(64, 160, 192, 0.08)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '0.2em',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
        }}
      >
        Voyage Beyond
      </span>

      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}
      >
        {['Destinations', 'Scale', 'Transmission', 'Horizon'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'var(--planet-bright)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)'
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
