import React from 'react'

// Flower of Life — large hero background element
export function FlowerOfLife({ size = 600, className = '' }: { size?: number; className?: string }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.083 // petal radius relative to total size

  // Generate the 7 central circles (center + 6 around)
  const centers: Array<[number, number]> = [[cx, cy]]
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    centers.push([cx + r * 2 * Math.cos(angle), cy + r * 2 * Math.sin(angle)])
  }
  // Outer ring of 12
  const outerR = r * 4
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    centers.push([cx + outerR * Math.cos(angle), cy + outerR * Math.sin(angle)])
  }
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 + Math.PI / 6
    centers.push([cx + outerR * Math.cos(angle), cy + outerR * Math.sin(angle)])
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {centers.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill="none"
          stroke="var(--accent-purple)"
          strokeWidth="1"
        />
      ))}
      {/* Outer containing circle */}
      <circle cx={cx} cy={cy} r={r * 6} fill="none" stroke="var(--accent-purple)" strokeWidth="1" />
    </svg>
  )
}

// Seed of Life — smaller decorative element
export function SeedOfLife({ size = 120, color = 'var(--accent-cyan)', className = '' }: { size?: number; color?: string; className?: string }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.167

  const centers: Array<[number, number]> = [[cx, cy]]
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 - Math.PI / 6
    centers.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)])
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {centers.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth="1.5" />
      ))}
    </svg>
  )
}

// Metatron's Cube simplified — section divider
export function MetatronsCube({ size = 120, color = 'var(--accent-purple)', className = '' }: { size?: number; color?: string; className?: string }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38

  // Outer hexagon vertices
  const hex: Array<[number, number]> = []
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 - Math.PI / 6
    hex.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)])
  }

  // Inner hexagon (rotated 30deg)
  const hexInner: Array<[number, number]> = []
  const rInner = r * 0.5
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    hexInner.push([cx + rInner * Math.cos(angle), cy + rInner * Math.sin(angle)])
  }

  // Lines from center to outer vertices
  const lines: Array<[number, number, number, number]> = []
  hex.forEach(([x, y]) => lines.push([cx, cy, x, y]))
  // Lines connecting all outer vertices
  for (let i = 0; i < 6; i++) {
    for (let j = i + 1; j < 6; j++) {
      lines.push([hex[i][0], hex[i][1], hex[j][0], hex[j][1]])
    }
  }

  const hexPath = hex.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ') + ' Z'

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" />
      ))}
      <path d={hexPath} fill="none" stroke={color} strokeWidth="1.2" />
      <path
        d={hexInner.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ') + ' Z'}
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke={color} strokeWidth="0.8" />
    </svg>
  )
}

// Product category icons (stroke-only)
export function MandalaIcon({ size = 80, color = 'var(--accent-purple)', className = '' }: { size?: number; color?: string; className?: string }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.35

  const petalCenters: Array<[number, number]> = []
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4
    petalCenters.push([cx + r * 0.5 * Math.cos(angle), cy + r * 0.5 * Math.sin(angle)])
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      {petalCenters.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r * 0.45} ry={r * 0.2}
          transform={`rotate(${i * 45}, ${x}, ${y})`}
          fill="none" stroke={color} strokeWidth="1.5" />
      ))}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r * 0.3} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export function SriYantraIcon({ size = 80, color = 'var(--accent-purple)', className = '' }: { size?: number; color?: string; className?: string }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.42

  // Downward triangles
  const tri1 = `${cx},${cy - r} ${cx - r * 0.9},${cy + r * 0.5} ${cx + r * 0.9},${cy + r * 0.5}`
  const tri2 = `${cx},${cy - r * 0.55} ${cx - r * 0.65},${cy + r * 0.35} ${cx + r * 0.65},${cy + r * 0.35}`
  // Upward triangles
  const tri3 = `${cx},${cy + r * 0.85} ${cx - r * 0.75},${cy - r * 0.25} ${cx + r * 0.75},${cy - r * 0.25}`
  const tri4 = `${cx},${cy + r * 0.45} ${cx - r * 0.5},${cy - r * 0.05} ${cx + r * 0.5},${cy - r * 0.05}`

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points={tri1} fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points={tri2} fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points={tri3} fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points={tri4} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r * 0.08} fill={color} />
    </svg>
  )
}

export function CrescentMoonIcon({ size = 80, color = 'var(--accent-purple)', className = '' }: { size?: number; color?: string; className?: string }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.35

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      {/* Crescent */}
      <path
        d={`M ${cx + r * 0.2} ${cy - r} A ${r} ${r} 0 1 0 ${cx + r * 0.2} ${cy + r} A ${r * 0.7} ${r * 0.7} 0 1 1 ${cx + r * 0.2} ${cy - r} Z`}
        fill="none" stroke={color} strokeWidth="1.5"
      />
      {/* Stars/dots around */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4
        const dx = cx + r * 1.3 * Math.cos(angle)
        const dy = cy + r * 1.3 * Math.sin(angle)
        return <circle key={i} cx={dx} cy={dy} r={2} fill={color} />
      })}
    </svg>
  )
}

export function CrystalGemIcon({ size = 80, color = 'var(--accent-purple)', className = '' }: { size?: number; color?: string; className?: string }) {
  const cx = size / 2
  const cy = size / 2
  const w = size * 0.6
  const h = size * 0.7
  const top = cy - h * 0.4
  const bottom = cy + h * 0.6
  const facetY = cy - h * 0.05

  const topL = cx - w * 0.3
  const topR = cx + w * 0.3
  const midL = cx - w * 0.5
  const midR = cx + w * 0.5

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      {/* Outer gem shape */}
      <polygon
        points={`${cx},${top} ${topR},${facetY} ${midR},${facetY} ${cx},${bottom} ${midL},${facetY} ${topL},${facetY}`}
        fill="none" stroke={color} strokeWidth="1.5"
      />
      {/* Inner facets */}
      <line x1={cx} y1={top} x2={cx} y2={facetY} stroke={color} strokeWidth="1.5" />
      <line x1={cx} y1={bottom} x2={midL} y2={facetY} stroke={color} strokeWidth="1" />
      <line x1={cx} y1={bottom} x2={midR} y2={facetY} stroke={color} strokeWidth="1" />
    </svg>
  )
}
