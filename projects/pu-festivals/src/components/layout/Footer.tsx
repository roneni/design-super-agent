export default function Footer() {
  return (
    <footer
      className="py-12 mb-20"
      aria-label="Site footer"
      style={{
        background: 'linear-gradient(to bottom, #0a0a14, #0d0d1a)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center gap-3 text-center">
        {/* Logo / brand */}
        <p className="font-orbitron text-sm tracking-widest uppercase text-white/30">
          Psychedelic Universe
        </p>

        {/* Tagline */}
        <p className="text-xs text-gray-600 font-inter">
          Made with ♡ for the global psytrance community
        </p>

        {/* Divider */}
        <div
          className="w-32 h-px my-1"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }}
          aria-hidden="true"
        />

        {/* Disclaimer */}
        <p className="text-xs text-gray-700 max-w-sm">
          Festival dates are approximate and subject to change. Always verify with official festival websites.
        </p>

        {/* Contact */}
        <p className="text-xs text-gray-700">
          Know a festival we&rsquo;re missing?{' '}
          <a
            href="mailto:festivals@psychedelicuniverse.com"
            className="text-cyan-600 hover:text-cyan-400 transition-colors duration-150 focus:outline-none focus-visible:underline"
          >
            Let us know &rarr;
          </a>
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-700 mt-1">
          &copy; 2026 Psychedelic Universe
        </p>
      </div>
    </footer>
  )
}
