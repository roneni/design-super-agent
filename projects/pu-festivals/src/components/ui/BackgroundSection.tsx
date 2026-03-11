// Rule: Never include text in AI image generation prompts.
// Text artifacts are a common failure mode. All text is rendered as HTML/CSS overlays.

interface BackgroundSectionProps {
  imageSrc: string
  alt: string
  minHeight?: string
  children: React.ReactNode
}

export default function BackgroundSection({
  imageSrc,
  alt,
  minHeight = '100vh',
  children,
}: BackgroundSectionProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight }}
      role="img"
      aria-label={alt}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* Dark overlay for card/text readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10,10,20,0.55)' }}
        aria-hidden="true"
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(10,10,20,0.55) 60%, rgba(10,10,20,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to bottom, #0a0a14, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to top, #0a0a14, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Content on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
