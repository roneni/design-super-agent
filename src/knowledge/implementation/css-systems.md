# CSS Systems & Animation

## Purpose
How to implement visual designs in CSS. Covers Tailwind patterns, custom CSS for effects that Tailwind can't express, and animation systems.

---

## CSS Variable System

Define all design tokens as CSS variables. This is the bridge between the design brief and the implementation.

```css
:root {
  /* Colors */
  --bg: #0a0a0a;
  --bg-surface: #1a1a1a;
  --bg-elevated: #2a2a2a;
  --text: #f0f0f0;
  --text-muted: #a0a0b0;
  --accent: #22d3ee;
  --accent-2: #a855f7;

  /* Typography */
  --font-heading: 'Orbitron', sans-serif;
  --font-body: 'Inter', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Borders */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  --border: 1px solid rgba(255, 255, 255, 0.08);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.15), 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.2), 0 20px 48px rgba(0, 0, 0, 0.15);
  --shadow-glow: 0 0 20px rgba(34, 211, 238, 0.3);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
  --transition-slower: 600ms ease;
}
```

---

## Effects That Need Custom CSS

### Glow Effect
```css
.glow {
  box-shadow:
    0 0 15px rgba(34, 211, 238, 0.3),
    0 0 45px rgba(34, 211, 238, 0.1);
}

.glow-text {
  text-shadow:
    0 0 10px rgba(34, 211, 238, 0.5),
    0 0 40px rgba(34, 211, 238, 0.2);
}

/* Animated pulse glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 15px rgba(34, 211, 238, 0.3); }
  50% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.5); }
}
.pulse-glow {
  animation-name: pulse-glow;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, #22d3ee, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Noise/Grain Overlay
```css
.grain::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

### Glass/Frosted Card
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
}
```

### Gradient Border
```css
.gradient-border {
  position: relative;
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, #22d3ee, #a855f7);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  pointer-events: none;
}
```

### Gradient Section Transition
```css
/* Smooth transition between sections without hard borders */
.section-fade-out {
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}

/* Or use a pseudo-element gradient overlay */
.section-transition::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, var(--bg));
  pointer-events: none;
}
```

### Animated Background Gradient
```css
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(-45deg, #0a0a2e, #1a0a2e, #0a1a2e, #0a2e1a);
  background-size: 400% 400%;
  animation-name: gradient-shift;
  animation-duration: 30s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}
```

### Star Field Background (CSS only)
```css
.stars {
  background-image:
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 130px 80px, #fff, transparent),
    radial-gradient(2px 2px at 160px 20px, rgba(255,255,255,0.7), transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
}
```

---

## Responsive Patterns

### Fluid Typography (no breakpoints needed)
```css
h1 { font-size: clamp(2.25rem, 5vw, 4.5rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); }
```

### Container Query Cards
```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
```

### Mobile-First Media Queries
```css
/* Mobile styles first (default) */
.grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## Animation Performance Rules

1. **Only animate `transform` and `opacity`** — these are GPU-composited. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`
2. **Use `will-change` sparingly** — only on elements that WILL animate, not "just in case"
3. **`animation-fill-mode: forwards`** — use when the animation should hold its end state
4. **Never use `animation` shorthand mixed with individual properties** — always use longhand:
   ```css
   /* WRONG */
   .el { animation: fade 0.3s; animation-delay: 0.5s; }

   /* RIGHT */
   .el {
     animation-name: fade;
     animation-duration: 0.3s;
     animation-delay: 0.5s;
     animation-timing-function: ease-out;
     animation-fill-mode: forwards;
   }
   ```
5. **Respect reduced motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
