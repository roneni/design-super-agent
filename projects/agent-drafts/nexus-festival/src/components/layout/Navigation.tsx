import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const navLinks = [
  { label: 'LINEUP', href: '#lineup' },
  { label: 'INFO', href: '#info' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'TICKETS', href: '#tickets' },
]

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-xl bg-void/80 border-b border-white/5'
          : 'bg-transparent'
      )}
      style={{ height: '72px' }}
    >
      <nav
        className="flex items-center justify-between h-full px-6"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Logo */}
        <a
          href="#"
          className="group font-heading font-bold text-xl text-text-primary tracking-widest uppercase select-none transition-all duration-300"
          style={{
            textShadow: 'none',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.textShadow = '0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(34,211,238,0.2)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.textShadow = 'none'
          }}
        >
          NEXUS
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => handleLinkClick(e, link.href)}
                className="font-body font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 uppercase tracking-widest"
                style={{ fontSize: '13px' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors duration-200 p-2"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-void/95 backdrop-blur-xl border-b border-white/5 px-6 pb-6">
          <ul className="flex flex-col gap-4 list-none pt-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => handleLinkClick(e, link.href)}
                  className="font-body font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 uppercase tracking-widest block"
                  style={{ fontSize: '14px' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navigation
