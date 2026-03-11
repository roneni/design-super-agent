/**
 * Hand-crafted Flower of Life sacred geometry SVG.
 *
 * The Flower of Life is constructed from overlapping circles of equal radius,
 * where each circle's center lies on the circumference of adjacent circles.
 *
 * Construction:
 * - Central circle at (cx, cy)
 * - 6 circles arranged in a hexagonal ring, each at distance r from center
 * - Outer ring of 6 more circles at distance 2r
 * - Enclosing outer boundary circle at radius 2r
 * - Inner Seed of Life (center + 6 ring 1 circles)
 *
 * All coordinates computed with r = 100 (SVG units), viewBox centered at 0,0
 */

import React from 'react'

interface FlowerOfLifeProps {
  size?: number
  className?: string
  strokeColor?: string
  strokeOpacity?: number
  animate?: boolean
  animationDuration?: number // outer ring CW rotation seconds
  innerAnimDuration?: number  // inner ring CCW rotation seconds
}

const r = 100 // base circle radius in SVG units
const sqrt3 = Math.sqrt(3)

// Hexagonal offsets for ring-1 circles (distance r from center)
const ring1: [number, number][] = [
  [r, 0],
  [r * 0.5, r * sqrt3 / 2],
  [-r * 0.5, r * sqrt3 / 2],
  [-r, 0],
  [-r * 0.5, -r * sqrt3 / 2],
  [r * 0.5, -r * sqrt3 / 2],
]

// Ring-2 circles at distance 2r (outer petals)
const ring2: [number, number][] = [
  [2 * r, 0],
  [r, r * sqrt3],
  [-r, r * sqrt3],
  [-2 * r, 0],
  [-r, -r * sqrt3],
  [r, -r * sqrt3],
]

// viewBox: slightly beyond 3r to show full outer circles
const viewBoxSize = r * 3.4

const FlowerOfLife: React.FC<FlowerOfLifeProps> = ({
  size = 500,
  className = '',
  strokeColor = '#d4a853',
  strokeOpacity = 0.12,
  animate = true,
  animationDuration = 120,
  innerAnimDuration = 90,
}) => {
  const vb = viewBoxSize
  const strokeW = 0.8

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-vb} ${-vb} ${vb * 2} ${vb * 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer boundary containment circle */}
      <circle
        cx={0}
        cy={0}
        r={r * 3}
        stroke={strokeColor}
        strokeOpacity={strokeOpacity * 0.6}
        strokeWidth={strokeW}
        fill="none"
      />

      {/* Outer ring — slow CW rotation + pulse */}
      <g
        style={animate ? {
          transformOrigin: '0 0',
          animation: `rotateCW ${animationDuration}s linear infinite, pulseGeometry 8s ease-in-out infinite`,
        } : undefined}
      >
        {/* Outer ring 2 circles */}
        {ring2.map(([cx, cy], i) => (
          <circle
            key={`r2-${i}`}
            cx={cx}
            cy={cy}
            r={r}
            stroke={strokeColor}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeW}
            fill="none"
          />
        ))}
        {/* Second containment ring */}
        <circle
          cx={0}
          cy={0}
          r={r * 2}
          stroke={strokeColor}
          strokeOpacity={strokeOpacity * 0.5}
          strokeWidth={strokeW * 0.6}
          fill="none"
        />
      </g>

      {/* Inner ring — CCW counter-rotation */}
      <g
        style={animate ? {
          transformOrigin: '0 0',
          animation: `rotateCCW ${innerAnimDuration}s linear infinite`,
        } : undefined}
      >
        {/* Central circle */}
        <circle
          cx={0}
          cy={0}
          r={r}
          stroke={strokeColor}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeW}
          fill="none"
        />
        {/* Ring 1 — Seed of Life */}
        {ring1.map(([cx, cy], i) => (
          <circle
            key={`r1-${i}`}
            cx={cx}
            cy={cy}
            r={r}
            stroke={strokeColor}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeW}
            fill="none"
          />
        ))}
      </g>

      {/* Static structural lines — hexagonal grid connecting all centers */}
      <g opacity={strokeOpacity * 0.5}>
        {/* Inner hexagon connecting ring-1 centers */}
        <polygon
          points={ring1.map(([cx, cy]) => `${cx},${cy}`).join(' ')}
          stroke={strokeColor}
          strokeOpacity={1}
          strokeWidth={strokeW * 0.5}
          fill="none"
        />
        {/* Star of David inner lines */}
        {ring1.map(([cx, cy], i) => {
          const [ox, oy] = ring1[(i + 3) % 6]
          return (
            <line
              key={`star-${i}`}
              x1={cx} y1={cy}
              x2={ox} y2={oy}
              stroke={strokeColor}
              strokeOpacity={1}
              strokeWidth={strokeW * 0.4}
            />
          )
        })}
      </g>

      {/* Center dot */}
      <circle
        cx={0}
        cy={0}
        r={2}
        fill={strokeColor}
        opacity={strokeOpacity * 2}
      />

      {/* Ring 1 center dots */}
      {ring1.map(([cx, cy], i) => (
        <circle
          key={`dot-r1-${i}`}
          cx={cx}
          cy={cy}
          r={1.5}
          fill={strokeColor}
          opacity={strokeOpacity * 1.5}
        />
      ))}
    </svg>
  )
}

/**
 * Seed of Life — simpler pattern for background use (6 circles + center)
 */
export const SeedOfLife: React.FC<{
  size?: number
  className?: string
  strokeColor?: string
  strokeOpacity?: number
}> = ({
  size = 800,
  className = '',
  strokeColor = '#a855f7',
  strokeOpacity = 0.04,
}) => {
  const vb = r * 2.2
  const strokeW = 0.8

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-vb} ${-vb} ${vb * 2} ${vb * 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx={0} cy={0} r={r} stroke={strokeColor} strokeOpacity={strokeOpacity} strokeWidth={strokeW} />
      {ring1.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} stroke={strokeColor} strokeOpacity={strokeOpacity} strokeWidth={strokeW} />
      ))}
      <circle cx={0} cy={0} r={r * 1.99} stroke={strokeColor} strokeOpacity={strokeOpacity * 0.5} strokeWidth={strokeW * 0.6} />
    </svg>
  )
}

export default FlowerOfLife
