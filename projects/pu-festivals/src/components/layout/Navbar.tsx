import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Mixes', href: '#', active: false },
  { label: 'Artists', href: '#', active: false },
  { label: 'Festivals', href: '#', active: true },
  { label: 'Events', href: '#', active: false },
  { label: 'About', href: '#', active: false },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10 nav-base ${
        scrolled ? 'nav-scrolled' : ''
      }`}
    >
      {/* Logo */}
      <div className="flex-1">
        <a
          href="#"
          className="font-orbitron text-sm tracking-[0.08em] uppercase text-white hover:text-cyan-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          Psychedelic Universe
        </a>
      </div>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-8" role="list">
        {navLinks.map(link => (
          <li key={link.label}>
            <a
              href={link.href}
              className={`
                text-xs tracking-[0.05em] uppercase transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm px-1
                ${link.active
                  ? 'text-white border-b border-cyan-400 pb-0.5'
                  : 'text-gray-400 hover:text-white border-b border-transparent pb-0.5'
                }
              `}
              aria-current={link.active ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile menu placeholder */}
      <div className="flex-1 flex justify-end md:hidden">
        <button
          className="text-gray-400 hover:text-white transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <rect y="3" width="20" height="1.5" rx="0.75" />
            <rect y="9.25" width="20" height="1.5" rx="0.75" />
            <rect y="15.5" width="20" height="1.5" rx="0.75" />
          </svg>
        </button>
      </div>

      {/* Right spacer on desktop */}
      <div className="hidden md:flex flex-1" />
    </nav>
  )
}
