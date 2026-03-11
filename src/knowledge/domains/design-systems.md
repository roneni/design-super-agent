# Design Systems

## Purpose
A design system is a collection of reusable components, tokens, and guidelines that enable consistent, scalable design across products and teams. It's the bridge between design and code — a shared language that eliminates ambiguity.

---

## Design Tokens

### Token Hierarchy (3-Tier Model)
1. **Global tokens**: Raw values with no semantic meaning. `color.blue.500: #3b82f6`, `spacing.16: 16px`, `font.size.14: 14px`. These are the PALETTE — every possible value
2. **Alias tokens**: Semantic meaning mapped to global tokens. `color.interactive: color.blue.500`, `spacing.component-gap: spacing.16`, `font.body: font.size.14`. These carry INTENT — what the value MEANS
3. **Component tokens**: Specific to a component. `button.background: color.interactive`, `button.padding-x: spacing.component-gap`, `button.font-size: font.body`. These enable THEMING — change `color.interactive` and all buttons update

### Token Types
- **Color**: Background, foreground, border, shadow, overlay. Light mode AND dark mode values
- **Spacing**: Padding, margin, gap. Typically a scale: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
- **Typography**: Font family, font size, font weight, line height, letter spacing. Combined into text styles: body-sm, body-md, body-lg, heading-sm, heading-md, heading-lg, display
- **Border**: Width (1px, 2px), radius (0, 2, 4, 8, 12, 16, 9999 for pill), color
- **Shadow**: Elevation levels (sm, md, lg, xl). Each level = specific box-shadow values
- **Motion**: Duration (fast: 100ms, normal: 200ms, slow: 300ms), easing (ease-in, ease-out, ease-in-out, spring)
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Z-index**: Layering scale: base (0), dropdown (10), sticky (20), overlay (30), modal (40), popover (50), toast (60)

### Token-to-Code Pipeline
- Design tokens defined in JSON → consumed by style tools
- CSS Custom Properties: `--color-interactive: #3b82f6;` referenced as `var(--color-interactive)`
- Tailwind config: tokens mapped to `theme.extend.colors`, `theme.extend.spacing`, etc.
- Design tools (Figma, Pencil): tokens synced via plugin or design system library
- The SINGLE SOURCE OF TRUTH is the token file. Everything else derives from it

---

## Component API Design

### Component Anatomy
Every component has:
- **Variants**: Visual styles (primary, secondary, ghost, destructive). One variant = one visual treatment
- **Sizes**: sm, md, lg (sometimes xs, xl). Affects padding, font-size, icon-size, min-height
- **States**: default, hover, focus, active, disabled, loading, error. See interaction-design.md
- **Slots**: Content areas (icon, label, description, badge). Not all slots are required
- **Props**: Configuration (variant, size, disabled, loading, full-width, etc.)

### Component Naming
- Use clear, semantic names: `Button`, `Card`, `Input`, `Badge`, `Avatar`, `Dialog`, `Toast`
- Variant names should describe INTENT, not appearance: `destructive` not `red`, `ghost` not `borderless`
- Size names should be relative: `sm`, `md`, `lg` — not pixel values

### Component Composition Rules
- Prefer composition over configuration: `<Card><CardHeader/><CardBody/><CardFooter/></Card>` over `<Card header="..." body="..." footer="..." />`
- Components should be self-contained — they shouldn't know about their parent's layout. A `Button` shouldn't have a margin; the parent layout applies the margin
- Compound components (Dialog, Table, Select) use context to share state between parts

---

## Variant Management

### Color Variants
- **Primary**: Brand color. Used for primary CTAs, active states, selected indicators
- **Secondary**: Neutral, lower emphasis. Used for secondary actions, borders, subtle backgrounds
- **Ghost/Tertiary**: Minimal visual weight. Used for text-level actions, navigation links, inline controls
- **Destructive**: Red/danger color. Used ONLY for irreversible actions (delete, remove, cancel subscription)
- **Success/Warning/Info**: Semantic variants for status communication

### The Variant Explosion Problem
- 5 variants × 3 sizes × 9 states = 135 combinations. This must be manageable
- Solution: tokens handle the math. Define variant colors and size scales as tokens, then states are derived: `hover = darken(base, 10%)`, `active = darken(base, 15%)`, `disabled = opacity(base, 40%)`
- Only DESIGN the exceptions — most state derivatives are mechanical

---

## Theme Architecture

### Theme Structure
A theme is a set of token overrides:
```
base theme (light) → all alias tokens defined
dark theme → overrides alias tokens: backgrounds darken, text lightens, shadows change
brand theme → overrides color tokens: primary becomes brand color
high-contrast theme → overrides contrast ratios: borders become more visible, shadows stronger
```

### Multi-Brand Theming
- Global tokens stay the same (the design system's palette)
- Alias tokens change per brand: `color.interactive` points to brand A's blue or brand B's purple
- Component tokens don't change — they reference alias tokens, which are swapped per brand
- This means ONE component library serves multiple brands

### Dark Mode as Theme
- Dark mode is NOT a separate design — it's a theme override
- Token mapping: `color.background.primary: white → #0a0a0a`, `color.text.primary: #1a1a1a → #f0f0f0`
- Shadows become borders in dark mode (shadows don't work on dark backgrounds)
- Saturation reduces slightly in dark mode (vivid colors vibrate on dark backgrounds)
- Elevation reverses: in light mode, higher = more shadow. In dark mode, higher = lighter background

---

## Spacing System

### The 8px Grid
- Base unit: 8px. All spacing is a multiple: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80
- For finer control: 4px half-step allowed (4, 8, 12, 16, 20, 24...)
- For micro-spacing: 2px (borders, fine gaps between inline elements)
- The scale: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
- Use the scale for ALL spacing: padding, margin, gap, width, height, icon sizes, border-radius

### Spatial Relationships
- **Within components**: 8-16px padding, 4-8px gap between internal elements
- **Between sibling components**: 16-24px gap
- **Between sections**: 48-80px
- **Page margins**: 16px (mobile), 24-32px (tablet), 40-64px (desktop)
- Rule: **inner spacing < outer spacing**. Padding inside a card < gap between cards < section margin

---

## Icon System

### Icon Grid
- Design on a pixel grid: 16×16, 20×20, 24×24 are standard sizes
- Maintain consistent visual weight: a thin 24px icon and a chunky 24px icon feel like different systems
- Stroke width: pick ONE and use it everywhere. 1.5px is the current standard (Lucide, Heroicons outline)
- Corner radius: consistent across all icons. If your UI uses 8px border-radius, icon corners should suggest roundness too
- Optical sizing: at 16px, icons may need slightly thicker strokes to maintain visual weight. At 32px, slightly thinner

### Icon Libraries (Recommended)
- **Lucide**: Modern, clean, 1000+ icons, consistent 24px/1.5px stroke. Open source. React, Vue, Svelte bindings
- **Phosphor**: Flexible (6 weights from thin to duotone), 1000+ icons. Open source
- **Heroicons**: Tailwind's companion library. Outline and solid variants. 300+ icons
- **Custom icons**: Only when the library doesn't have what you need. Match the library's style exactly (same grid, stroke width, corner radius)

---

## Quality Criteria
- FAIL: Component uses hard-coded color values instead of tokens — breaks theming
- FAIL: Spacing values don't align to the spacing scale (17px, 23px, 37px)
- FAIL: Component has margin — layout spacing should be the parent's responsibility
- FAIL: Dark mode handled by inverting colors instead of theme token overrides
- FAIL: Icons from mixed libraries with inconsistent visual weight
- FAIL: Component variants named by appearance ("red-button") instead of intent ("destructive")
- FAIL: No size variants — components only exist at one size
- FAIL: Token hierarchy missing — component tokens reference raw values instead of alias tokens
- PASS: All colors reference design tokens, never raw hex values in components
- PASS: Spacing consistently follows the 8px (or 4px) grid
- PASS: Components are theme-aware — switching from light to dark updates correctly
- PASS: Icon system uses consistent stroke width and grid across all icons
- PASS: Token tiers clear: global → alias → component
- PASS: Design system documentation exists with usage examples for each component

## Anti-patterns
- "The Snowflake": Every page has unique components that exist nowhere else in the system
- "The Over-system": Design system so rigid that it can't accommodate legitimate edge cases. 200+ tokens for a 5-page site
- "Token soup": Hundreds of tokens with no hierarchy — `color-blue-light-muted-variant-2` that nobody can find
- "The Ghost System": Design system exists in documentation but isn't actually used by the product
- "Variant explosion": Every possible combination designed individually instead of using token-derived states
