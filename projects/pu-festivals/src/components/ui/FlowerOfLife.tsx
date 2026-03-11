// Sacred geometry — Flower of Life pattern (7 circles: 1 center + 6 surrounding)
export default function FlowerOfLife({ className = '' }: { className?: string }) {
  const r = 50
  const cx = 100
  const cy = 100

  // Center circle + 6 surrounding at radius r from center
  const angles = [0, 60, 120, 180, 240, 300]
  const circles = [
    { cx, cy },
    ...angles.map(deg => {
      const rad = (deg * Math.PI) / 180
      return {
        cx: cx + r * Math.cos(rad),
        cy: cy + r * Math.sin(rad),
      }
    }),
  ]

  // Outer ring — 6 more circles at 2r radius (60-degree offsets, 30° offset from inner)
  const outerAngles = [30, 90, 150, 210, 270, 330]
  const outerCircles = outerAngles.map(deg => {
    const rad = (deg * Math.PI) / 180
    return {
      cx: cx + r * 2 * Math.cos(rad) * 0.866, // * sqrt(3)/2 for proper hex spacing
      cy: cy + r * 2 * Math.sin(rad) * 0.866,
    }
  })

  const allCircles = [...circles, ...outerCircles]

  return (
    <svg
      viewBox="-10 -10 220 220"
      width="600"
      height="600"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="flower-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {allCircles.map((c, i) => (
        <circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={r}
          stroke="url(#flower-gradient)"
          strokeWidth="0.7"
          fill="none"
        />
      ))}
    </svg>
  )
}
