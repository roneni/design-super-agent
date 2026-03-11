# Project Scaffolding

## Purpose
How to set up web projects from scratch. The code-generator must be able to create a fully working project structure, install dependencies, and have it build-ready before writing any design code.

---

## Framework Selection

Choose based on the project requirements:

### Vite + React (default for most projects)
Best for: Single-page apps, portfolio sites, marketing sites, creative projects
```bash
npm create vite@latest project-name -- --template react-ts
cd project-name
npm install
```

### Next.js (for SSR/SEO-critical projects)
Best for: Content-heavy sites, blogs, e-commerce, SEO-critical landing pages
```bash
npx create-next-app@latest project-name --typescript --tailwind --eslint --app --src-dir
cd project-name
```

### Astro (for content/marketing sites)
Best for: Static marketing sites, blogs, documentation, maximum performance
```bash
npm create astro@latest project-name -- --template basics --typescript strict
cd project-name
```

---

## Standard Project Structure

### React/Vite Project
```
project-name/
├── public/
│   ├── images/           # Generated images, logos, favicons
│   └── fonts/            # Custom font files (if not using CDN)
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable primitives (Button, Card, Input)
│   │   ├── layout/       # Header, Footer, Sidebar, Container
│   │   └── sections/     # Page sections (Hero, Features, Pricing)
│   ├── pages/            # Full page components
│   ├── styles/
│   │   └── globals.css   # Tailwind imports, CSS variables, base styles
│   ├── lib/
│   │   └── utils.ts      # Shared utilities (cn function, etc.)
│   ├── assets/           # Imported assets (SVGs, images used in components)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### Next.js App Router Project
```
project-name/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout (fonts, metadata, global styles)
│   │   ├── page.tsx       # Home page
│   │   ├── globals.css
│   │   └── [other-pages]/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── sections/
│   └── lib/
│       └── utils.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Essential Dependencies

### Always install:
```bash
# Tailwind CSS v4 (the new way)
npm install tailwindcss @tailwindcss/vite

# Or Tailwind CSS v3 (stable)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Common additions:
```bash
# Animations
npm install framer-motion

# Utility for className merging
npm install clsx tailwind-merge

# Icons
npm install lucide-react

# Fonts (Google Fonts via fontsource)
npm install @fontsource-variable/inter
npm install @fontsource/orbitron  # or any specific font

# If using shadcn/ui components
npx shadcn@latest init
npx shadcn@latest add button card dialog
```

---

## Tailwind v4 Setup (Current Standard)

Tailwind v4 uses CSS-first configuration instead of `tailwind.config.ts`:

### globals.css
```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-elevated: #2a2a2a;
  --color-text-primary: #f0f0f0;
  --color-text-secondary: #a0a0b0;
  --color-accent-cyan: #22d3ee;
  --color-accent-purple: #a855f7;
  --color-accent-magenta: #ec4899;

  /* Fonts */
  --font-heading: 'Orbitron', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing */
  --spacing-section: 5rem;
  --spacing-container: 1.5rem;

  /* Border radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

/* Base styles */
body {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-body);
}
```

### Vite plugin (vite.config.ts)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## Tailwind v3 Setup (Fallback)

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#1a1a1a',
        // ... brand colors
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## Font Setup

### Via fontsource (recommended — self-hosted, no GDPR issues)
```typescript
// main.tsx or layout.tsx
import '@fontsource-variable/inter'
import '@fontsource/orbitron/700.css'
```

### Via Google Fonts CDN (simpler but external dependency)
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
```

### Next.js (built-in optimization)
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const orbitron = localFont({ src: '../fonts/Orbitron-Bold.woff2', variable: '--font-heading' })

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${orbitron.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Build Verification Checklist

After scaffolding, ALWAYS verify:

```bash
# 1. Does it build?
npm run build

# 2. Does it start?
npm run dev &
sleep 3

# 3. Does it render?
curl -s http://localhost:5173 | head -20  # Vite default port
# or
curl -s http://localhost:3000 | head -20  # Next.js default port

# 4. Kill the dev server
kill %1
```

Never move to component/design work until the scaffold builds and renders cleanly.

---

## Utility Functions

### cn() — className merger (create in src/lib/utils.ts)
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This is used everywhere for conditional and merged Tailwind classes:
```tsx
<div className={cn('bg-surface rounded-lg p-4', isActive && 'ring-2 ring-accent-cyan')}>
```
