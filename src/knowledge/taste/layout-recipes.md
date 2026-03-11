# Layout Recipes

## Purpose
Specific, implementable layout patterns with dimensions, spacing values, and structure. Not theory — construction blueprints the agent can translate directly into code or .pen operations.

---

## Hero Sections

### Full-Bleed Hero with Centered CTA
```
┌──────────────────────────────────────────────────┐
│ [Nav: logo left, links right, sticky]            │
│                                                  │
│              [Heading 48-72px bold]               │
│          [Subheading 18-24px, max-w 600px]       │
│                                                  │
│              [CTA Button]  [Secondary]           │
│                                                  │
│ Background: full-width image or gradient         │
│ Height: 100vh or 80vh                            │
└──────────────────────────────────────────────────┘
```
- Container: max-width 1200px, centered, padding 0 24px
- Heading: font-size clamp(36px, 5vw, 72px)
- Subheading: max-width 600px, margin 0 auto, opacity 0.8
- CTA: padding 16px 32px, font-size 16px, font-weight 600
- Background: object-fit cover, optional gradient overlay for text readability
- Vertical centering: flexbox with min-height 80vh

### Split Hero (Image + Text)
```
┌──────────────────────────────────────────────────┐
│ [Nav]                                            │
├────────────────────┬─────────────────────────────┤
│                    │                             │
│  [Heading]         │     [Hero Image/           │
│  [Subtext]         │      Product Shot]         │
│  [CTA]             │                             │
│                    │                             │
├────────────────────┴─────────────────────────────┤
```
- Grid: 2 columns, 1fr 1fr (or 5fr 7fr for more image space)
- Gap: 48-64px
- Text side: vertically centered, padding-right 48px
- Image side: overflow hidden for edge-to-edge feel
- On mobile: stack vertically, image first (or image behind text with overlay)

### Hero with Scroll Indicator
Same as Full-Bleed but add:
- Scroll indicator: animated chevron or "Scroll" text at bottom
- Position: absolute bottom 32px, centered
- Animation: translateY bounce, 2s infinite
- The fold should cut through the NEXT section's content — show 50-100px of what's below

---

## Content Sections

### Feature Grid (3 columns)
```
┌──────────────────────────────────────────────────┐
│           [Section Heading, centered]            │
│        [Section subtext, max-w 600px]            │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ [Icon]   │  │ [Icon]   │  │ [Icon]   │      │
│  │ [Title]  │  │ [Title]  │  │ [Title]  │      │
│  │ [Text]   │  │ [Text]   │  │ [Text]   │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└──────────────────────────────────────────────────┘
```
- Container: max-width 1200px, padding 80px 24px
- Grid: 3 columns, gap 32px. On tablet: 2 columns. On mobile: 1 column
- Cards: padding 32px. No border unless using a card style. Aligned top
- Icon: 48px, accent color
- Title: font-size 20px, font-weight 600, margin-top 16px
- Text: font-size 16px, line-height 1.6, color secondary

### Alternating Feature Rows
```
┌──────────────────────────────────────────────────┐
│  ┌─────────────────┬────────────────────────┐   │
│  │   [Image/       │  [Title]               │   │
│  │    Screenshot]  │  [Description]         │   │
│  │                 │  [Link →]              │   │
│  └─────────────────┴────────────────────────┘   │
│                                                  │
│  ┌────────────────────┬─────────────────────┐   │
│  │  [Title]           │   [Image/           │   │
│  │  [Description]     │    Screenshot]      │   │
│  │  [Link →]          │                     │   │
│  └────────────────────┴─────────────────────┘   │
└──────────────────────────────────────────────────┘
```
- Grid: 2 columns, gap 64px, align center
- Alternate: even rows reverse order (CSS grid: direction or order property)
- Section padding: 80-120px vertical
- Image: border-radius 8-12px, subtle shadow
- On mobile: stack, image always on top

### Metrics/Stats Bar
```
┌──────────────────────────────────────────────────┐
│   10K+          99.9%          50ms          24/7 │
│  Customers    Uptime     Response     Support    │
└──────────────────────────────────────────────────┘
```
- Grid: 4 columns, gap 0, border between items (1px solid border-color)
- Number: font-size 36-48px, font-weight 700
- Label: font-size 14px, text-transform uppercase, letter-spacing 0.05em, color secondary
- Padding: 48px 0
- Background: slightly different from surrounding sections (surface color)

---

## Navigation

### Top Nav Bar
```
┌──────────────────────────────────────────────────┐
│ [Logo]         [Link] [Link] [Link]    [CTA Btn] │
└──────────────────────────────────────────────────┘
```
- Height: 64px. Position: sticky top 0
- Container: max-width 1200px, justify-content space-between
- Links: font-size 14-15px, font-weight 500
- Background: transparent on hero, then blur backdrop (backdrop-filter: blur(12px)) on scroll
- Z-index: 50
- Mobile: hamburger menu at 768px breakpoint

### Sidebar Navigation (Dashboard)
```
┌─────────┬────────────────────────────────────────┐
│ [Logo]  │  [Page Title]              [Profile]   │
│         │                                        │
│ [Nav]   │  ┌─────────────────────────────────┐  │
│ [Nav]   │  │                                 │  │
│ [Nav ●] │  │         Main Content            │  │
│ [Nav]   │  │                                 │  │
│         │  └─────────────────────────────────┘  │
│         │                                        │
│ [─────] │                                        │
│ [Settings]│                                      │
└─────────┴────────────────────────────────────────┘
```
- Sidebar: width 240px (expanded), 64px (collapsed). Transition: 0.2s
- Active indicator: left border 3px solid accent, or filled background
- Section dividers between nav groups
- Settings/profile at bottom (flex: end)
- Main content: padding 32px, overflow-y auto

---

## Card Layouts

### Equal-Height Card Grid
- Grid: auto-fill, minmax(300px, 1fr), gap 24px
- Card: padding 24px, border-radius 12px, background surface, border 1px solid border-color
- Card image: aspect-ratio 16/9, object-fit cover, border-radius 8px (inside card)
- Card title: font-size 18px, font-weight 600
- Card text: font-size 14px, line-height 1.5, color secondary, 2-3 lines max
- Card footer: margin-top auto (pushes to bottom with flexbox), font-size 14px

### Testimonial Cards
- Grid: 3 columns, gap 24px, masonry-style if supported
- Card: padding 32px, quote marks as large decorative element (font-size 48px, opacity 0.2)
- Quote text: font-size 16px, font-style italic
- Author: font-size 14px, font-weight 600, with small avatar (40px circle)
- Rating: star icons, 16px, accent color

---

## Spacing Reference

### Vertical Rhythm
- Between sections: 80-120px
- Between heading and content: 24-32px
- Between content blocks within a section: 48-64px
- Between list items: 16-24px
- Between related elements (label + input): 8px
- Inside cards: 24-32px padding

### Horizontal
- Page margins: 24px (mobile), 48px (tablet), auto with max-width (desktop)
- Max content width: 1200px (general), 720px (article/text), 1440px (dashboard)
- Grid gap: 24-32px (cards), 48-64px (feature rows)

### Responsive Breakpoints
```
sm: 640px    (large phones in landscape)
md: 768px    (tablets)
lg: 1024px   (small desktops / tablets landscape)
xl: 1280px   (desktops)
2xl: 1536px  (large desktops)
```
