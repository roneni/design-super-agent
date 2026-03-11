import { MetatronsCube } from '../ui/SacredGeometry'

export function GeometryDivider() {
  return (
    <div style={{
      height: '200px',
      background: 'linear-gradient(to bottom, #1a1210 0%, var(--bg-deep) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Top line */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'var(--border-subtle)',
        position: 'absolute',
        top: '60px',
      }} aria-hidden="true" />

      {/* Geometry + center element */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        width: '100%',
        maxWidth: '1200px',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          flex: 1,
          height: '1px',
          background: 'var(--border-subtle)',
        }} aria-hidden="true" />
        <div style={{ opacity: 0.3, flexShrink: 0 }}>
          <MetatronsCube size={120} color="var(--accent-purple)" />
        </div>
        <div style={{
          flex: 1,
          height: '1px',
          background: 'var(--border-subtle)',
        }} aria-hidden="true" />
      </div>

      {/* Bottom line */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'var(--border-subtle)',
        position: 'absolute',
        bottom: '52px',
      }} aria-hidden="true" />

      {/* Label */}
      <p
        className="font-orbitron"
        style={{
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--accent-cyan)',
          marginTop: '16px',
        }}
      >
        THE MARKETPLACE
      </p>
    </div>
  )
}
