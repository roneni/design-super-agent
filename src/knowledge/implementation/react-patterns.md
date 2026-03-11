# React Component Patterns

## Purpose
How to structure React components for design-driven projects. Clean, composable, ready for the designs the director specifies.

---

## Component Architecture

### Atomic Structure
Organize by abstraction level:

```
components/
├── ui/          # Atoms: Button, Badge, Avatar, Input, Icon
├── layout/      # Organisms: Header, Footer, Container, Section
└── sections/    # Templates: Hero, Features, Testimonials, Pricing
```

### Component Template
Every component follows this pattern:

```tsx
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle?: string
  ctaText: string
  ctaHref: string
  backgroundImage?: string
  className?: string
}

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  backgroundImage,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[80vh] flex items-center justify-center',
        className,
      )}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {/* Gradient overlay for text readability */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <a
          href={ctaHref}
          className="mt-8 inline-block px-8 py-4 bg-accent-cyan text-background font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </a>
      </div>
    </section>
  )
}
```

### Key Rules
1. **Always accept `className` prop** — allows parent components to add styles
2. **Use `cn()` for merging** — handles Tailwind conflicts
3. **Props over hardcoded values** — text, colors, sizes should be props or CSS variables
4. **Semantic HTML** — `section`, `nav`, `main`, `article`, `aside`, not `div` for everything
5. **Accessibility built-in** — `alt` on images, `aria-label` on icon buttons, `role` where needed

---

## Common Component Recipes

### Responsive Container
```tsx
export function Container({
  children,
  className,
  maxWidth = 'max-w-7xl', // 1280px
}: {
  children: React.ReactNode
  className?: string
  maxWidth?: string
}) {
  return (
    <div className={cn(maxWidth, 'mx-auto px-6 md:px-8', className)}>
      {children}
    </div>
  )
}
```

### Section with Background Variants
```tsx
type SectionVariant = 'default' | 'surface' | 'dark' | 'accent'

export function Section({
  children,
  variant = 'default',
  className,
  id,
}: {
  children: React.ReactNode
  variant?: SectionVariant
  className?: string
  id?: string
}) {
  const variants: Record<SectionVariant, string> = {
    default: 'bg-background',
    surface: 'bg-surface',
    dark: 'bg-black',
    accent: 'bg-accent-cyan/5',
  }

  return (
    <section id={id} className={cn('py-20 md:py-28', variants[variant], className)}>
      <Container>{children}</Container>
    </section>
  )
}
```

### Feature Card
```tsx
export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-xl bg-surface border border-white/5 hover:border-white/10 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  )
}
```

### Navigation with Scroll Blur
```tsx
'use client' // Next.js only

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent',
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-heading text-xl font-bold">
          Brand
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#about" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            About
          </a>
          <a
            href="#cta"
            className="text-sm px-4 py-2 bg-accent-cyan text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  )
}
```

---

## Animation Patterns

### Scroll Reveal (Framer Motion)
```tsx
import { motion } from 'framer-motion'

export function FadeInOnScroll({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

### Staggered Children
```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function StaggeredGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {React.Children.map(children, child => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  )
}
```

### Respect Reduced Motion
```tsx
import { useReducedMotion } from 'framer-motion'

export function AnimatedHero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { backgroundPosition: ['0% 0%', '100% 100%'] }}
      transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse' }}
    />
  )
}
```

---

## Performance Rules

1. **Images:** Always use `loading="lazy"` for below-fold images. Set explicit `width` and `height` to prevent layout shift. Use WebP format
2. **Fonts:** Preload critical fonts. Use `font-display: swap` to prevent invisible text
3. **Components:** Keep page-level components lean. Heavy components should be lazy-loaded:
   ```tsx
   const HeavySection = lazy(() => import('./sections/HeavySection'))
   ```
4. **CSS:** Tailwind purges unused classes in production. Don't construct class names dynamically with string templates (`bg-${color}-500` won't work — use a map instead)
5. **Bundle size:** Check with `npx vite-bundle-visualizer` after build. Flag anything over 50KB that isn't a framework
