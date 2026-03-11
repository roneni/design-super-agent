# Corridor Narrowing

## Purpose
The systematic process of transforming a vague creative brief into a narrow corridor of specific, valid design decisions. This is the core creative reasoning method. Every design task starts with infinite possibilities and must arrive at ONE coherent direction before any execution begins.

---

## The Problem
A brief like "design a psytrance portal" has millions of valid interpretations. Executing without narrowing first produces generic, uncommitted design — the "template look." The agent must narrow BEFORE delegating any work to sub-agents.

## The Process

### Phase 1: Signal Extraction
Read the brief and extract every signal — explicit and implied.

**Explicit signals** — things directly stated:
- Subject/topic ("psytrance portal")
- Specific requests ("dark mode", "use our logo", "mobile-first")
- Named references ("like Linear but warmer")
- Constraints ("must include audio player", "budget is small")

**Implied signals** — things the subject inherently carries:
- Cultural context (psytrance → outdoor festivals → nocturnal → global community → countercultural)
- Audience expectations (psytrance fans expect: cosmic imagery, sacred geometry, UV-reactive colors, non-corporate feel)
- Functional requirements (music portal → playback, discovery, event listings)
- Quality expectations (based on the reference sites or competitive landscape)

**Ask yourself:** What would the TARGET USER be disappointed NOT to see? That's the most important implied signal.

### Phase 2: Elimination Rounds

Each round eliminates a large percentage of the possibility space.

**Round 1 — Domain elimination (eliminates ~70%)**
What type of design is this?
- Website / web app / mobile app / dashboard / marketing / branding
- This eliminates entire categories of layout patterns, component libraries, and conventions

**Round 2 — Mood elimination (eliminates ~80% of remaining)**
What should this FEEL like? Map to mood-mapping.md.
- Warm or cool?
- Premium or accessible?
- Energetic or calm?
- Serious or playful?
- Dark or light?
- Each mood word eliminates incompatible palettes, fonts, layouts, textures

**Round 3 — Genre/culture elimination (eliminates ~80% of remaining)**
What visual language does this belong to?
- Map to genre-deep-dives.md and visual-languages.md
- "Psytrance" → psychedelic/counterculture visual language → specific color families, typography choices, imagery styles
- This eliminates fonts that don't fit, palettes that don't match, layouts that feel wrong

**Round 4 — Reference calibration (eliminates ~50% of remaining)**
If references are provided:
- Study them deeply (WebFetch)
- Extract what makes them work — not what they look like, but WHY they feel right
- Note what the reference does that the brief's genre typically doesn't — this is the client's unique taste
- The reference tells you which END of the corridor the client prefers

**After 4 rounds:** You should be left with a narrow set of options — maybe 2-3 valid palettes, 2-3 font pairings, 1-2 layout approaches. This is the corridor.

### Phase 3: Commitment
Pick ONE option from each decision category. Commit fully. Document WHY.

A design with 100% commitment to a B+ direction always beats a design with 50% commitment to an A+ direction. Consistency and conviction are more important than perfection of individual choices.

---

## Decision Categories

For every design, these decisions must be made BEFORE any sub-agent work begins:

### 1. Color Palette
- Select from palettes.md or derive a custom palette
- Name it (for consistent reference in corrections)
- Define: background, surface, elevated, text-primary, text-secondary, accent-1, accent-2, border
- Decide: will this use gradients? Glow effects? If yes, define them

### 2. Typography
- Select from font-pairings.md or define custom pairing
- Heading font + weight + sizes (h1 through h4)
- Body font + weight + size + line-height
- Special text treatments (nav labels, captions, code)
- Decide: will headings be uppercase? What letter-spacing?

### 3. Layout Structure
- Select from layout-recipes.md or define custom layout
- Page sections in order (hero → features → social proof → CTA → footer)
- Navigation pattern (top bar, sidebar, hamburger)
- Content max-width
- Spacing system (8px base? 4px base?)

### 4. Imagery Direction
- What kind of images? (photography, illustration, abstract, AI-generated, none)
- Image style keywords for generation prompts
- Color treatment of images (match palette? duotone? full color?)
- Aspect ratios for different contexts (hero, cards, thumbnails)

### 5. Texture & Depth
- How much visual richness? (flat, subtle depth, rich texture)
- Shadow style (none, subtle, layered, colored glow)
- Background treatment (solid, gradient, pattern, image)
- Special effects (grain, glass, blur, noise)

### 6. Motion & Interaction
- Animation philosophy (none, functional only, expressive)
- Transition speed (fast 150ms, medium 300ms, slow 500ms+)
- Scroll behavior (standard, smooth, parallax)
- Hover effects (none, subtle, playful)

---

## Output: The Internal Design Brief

Before delegating to any sub-agent, the director must produce an internal design brief. This is not shown to the user — it's the agent's own plan.

```
DESIGN BRIEF
=============
Project: [name from the user's brief]
Domain: [web/mobile/dashboard/landing]
Mood: [primary mood + secondary mood]
Visual language: [genre from genre-deep-dives.md]

PALETTE: [name from palettes.md or "custom"]
  Background: #____
  Surface: #____
  Text primary: #____
  Text secondary: #____
  Accent 1: #____
  Accent 2: #____

TYPOGRAPHY:
  Heading: [font] [weight]
  Body: [font] [weight] [size]

LAYOUT:
  Structure: [hero → sections...]
  Max width: ____px
  Spacing base: ____px

IMAGERY:
  Style: [keywords]
  Generation model: [flux-2-pro / ideogram / etc]
  Color treatment: [full color / duotone / monochrome]

TEXTURE:
  Depth style: [flat / subtle / rich]
  Shadow: [style]
  Background: [treatment]

MOTION:
  Level: [none / functional / expressive]
  Speed: [fast / medium / slow]

REFERENCE CALIBRATION:
  Studied: [URL]
  Key takeaway: [what makes it work]
  Gap from reference: [what the current design lacks]

FIRST INSTRUCTION TO SUB-AGENT:
  [Specific, actionable first step]
```

---

## Example: Narrowing "Psytrance Portal"

**Phase 1 — Signal Extraction:**
- Explicit: psytrance, portal (music discovery/community hub)
- Implied: nocturnal culture, outdoor festivals (Ozora/Boom), sacred geometry, cosmic imagery, countercultural, global community, audio playback

**Phase 2 — Elimination:**
- Round 1 (domain): Website → music portal. Eliminates dashboard, mobile app, branding
- Round 2 (mood): Dark, psychedelic, warm (not cold). Eliminates all light palettes, corporate fonts, minimal layouts
- Round 3 (genre): Psytrance/festival culture. Eliminates Swiss, Scandinavian, Material, Flat, Brutalist, SaaS. Keeps: Psychedelic + some Art Deco elements
- Round 4 (reference): Study psychedelic-universe.com → key insight: it's not JUST neon-on-black. There's a warm, earthy Goa section with sunset oranges. The site balances cosmic cold with earthly warmth

**Phase 3 — Commitment:**
- Palette: Midnight Nebula base BUT with Obsidian Fire warm accents for transition sections
- Typography: Orbitron (heading) + Inter (body)
- Layout: Full-bleed hero, flowing sections with gradient transitions, persistent bottom audio player
- Imagery: AI-generated cosmic landscapes with sacred geometry, warm earthy tones for Goa sections
- Texture: Glow effects, noise grain, gradient mesh backgrounds
- Motion: Slow morphing backgrounds, subtle parallax, respect prefers-reduced-motion

**Result:** The corridor is now ~1% of where we started. Every decision is traceable to a signal from the brief.
