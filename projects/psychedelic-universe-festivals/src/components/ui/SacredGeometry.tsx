interface SacredGeometryProps {
  size?: number
  color?: string
  opacity?: number
  rotating?: boolean
  className?: string
}

export function FlowerOfLife({
  size = 200,
  color = '#22d3ee',
  opacity = 0.15,
  rotating = false,
  className = '',
}: SacredGeometryProps) {
  const r = size / 6
  const centers = [
    [0, 0],
    [r, 0],
    [-r, 0],
    [r / 2, (r * Math.sqrt(3)) / 2],
    [-r / 2, (r * Math.sqrt(3)) / 2],
    [r / 2, -(r * Math.sqrt(3)) / 2],
    [-r / 2, -(r * Math.sqrt(3)) / 2],
  ]

  const cx = size / 2
  const cy = size / 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{
        opacity,
        ...(rotating
          ? {
              animationName: 'spin',
              animationDuration: '90s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
            }
          : {}),
      }}
    >
      <defs>
        <clipPath id="flower-clip">
          <circle cx={cx} cy={cy} r={cx - 2} />
        </clipPath>
      </defs>
      <g clipPath="url(#flower-clip)">
        {centers.map(([dx, dy], i) => (
          <circle
            key={i}
            cx={cx + dx}
            cy={cy + dy}
            r={r}
            stroke={color}
            strokeWidth="0.5"
            fill="none"
          />
        ))}
        {/* Outer ring of 6 circles */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3
          const dx = 2 * r * Math.cos(angle)
          const dy = 2 * r * Math.sin(angle)
          return (
            <circle
              key={`outer-${i}`}
              cx={cx + dx}
              cy={cy + dy}
              r={r}
              stroke={color}
              strokeWidth="0.5"
              fill="none"
            />
          )
        })}
        {/* Outer boundary circle */}
        <circle cx={cx} cy={cy} r={cx - 2} stroke={color} strokeWidth="0.8" fill="none" />
        {/* Sri Yantra triangles for extra geometry */}
        <polygon
          points={`${cx},${cy - r * 2.5} ${cx - r * 2.16},${cy + r * 1.25} ${cx + r * 2.16},${cy + r * 1.25}`}
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
        <polygon
          points={`${cx},${cy + r * 2.5} ${cx - r * 2.16},${cy - r * 1.25} ${cx + r * 2.16},${cy - r * 1.25}`}
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
      </g>
    </svg>
  )
}

export function SacredDivider({ color = '#22d3ee' }: { color?: string }) {
  const points = Array.from({ length: 9 }, (_, i) => {
    const x = (i * 100) / 8
    const r = 4
    const angle = (i * Math.PI) / 4
    return { x, r, angle }
  })

  return (
    <svg
      width="100%"
      height="60"
      viewBox="0 0 800 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity: 0.12 }}
    >
      <line x1="0" y1="30" x2="800" y2="30" stroke={color} strokeWidth="0.5" />
      {points.map(({ x, r }, i) => (
        <g key={i} transform={`translate(${x}, 30)`}>
          <circle r={r} stroke={color} strokeWidth="0.5" fill="none" />
          <circle r={r * 0.5} stroke={color} strokeWidth="0.5" fill="none" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1={0}
                y1={0}
                x2={r * Math.cos(rad)}
                y2={r * Math.sin(rad)}
                stroke={color}
                strokeWidth="0.3"
              />
            )
          })}
        </g>
      ))}
    </svg>
  )
}

export function SacredBgPattern({ color = '#a855f7' }: { color?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="sacred-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="30" stroke={color} strokeWidth="0.5" fill="none" />
          <circle cx="60" cy="60" r="20" stroke={color} strokeWidth="0.5" fill="none" />
          <circle cx="60" cy="60" r="10" stroke={color} strokeWidth="0.5" fill="none" />
          <circle cx="90" cy="60" r="30" stroke={color} strokeWidth="0.5" fill="none" />
          <circle cx="30" cy="60" r="30" stroke={color} strokeWidth="0.5" fill="none" />
          <circle cx="60" cy="34" r="30" stroke={color} strokeWidth="0.5" fill="none" />
          <circle cx="60" cy="86" r="30" stroke={color} strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
    </svg>
  )
}
