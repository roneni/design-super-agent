# Mood-to-Visual Translation

## Purpose
When a user says "make it feel warm" or "I want a premium vibe," this module translates abstract mood words into specific, actionable design decisions. This is the corridor-narrowing function — each mood word eliminates options and guides toward a specific visual direction.

---

## How Mood Mapping Works

A mood word activates a cluster of visual decisions:
- **Color temperature** (warm ↔ cool)
- **Contrast level** (high ↔ low)
- **Saturation** (vibrant ↔ muted)
- **Shape language** (organic ↔ geometric)
- **Spacing** (dense ↔ airy)
- **Typography** (decorative ↔ neutral)
- **Texture** (rich ↔ flat)
- **Motion** (dynamic ↔ still)

---

## Warm
- Colors: Shift toward amber, orange, terracotta, warm browns. Avoid pure blue/cyan
- Backgrounds: Tint toward warm (#1a1210 instead of #1a1a1a for dark; #faf8f5 instead of #fafafa for light)
- Typography: Humanist or serif fonts. Avoid geometric/technical fonts
- Shapes: Soft corners, organic curves. border-radius: 12-16px
- Imagery: Golden hour lighting, natural textures (wood, stone, fabric), candlelight, sunset
- Spacing: Generous but not excessive — comfortable, like a well-furnished room
- Texture: Subtle grain, paper texture, warm shadows (shadow color tinted warm)
- **Palette suggestion:** Obsidian Fire, Desert Sunset, or Terracotta from palettes.md
- **Font suggestion:** Fraunces + Work Sans, or Bricolage Grotesque + Nunito Sans

## Cool
- Colors: Blues, teals, slate grays. Pure white backgrounds
- Backgrounds: Neutral or blue-tinted (#f8fafc instead of #fafafa)
- Typography: Geometric sans-serifs. Inter, Geist, Space Grotesk
- Shapes: Sharp corners or very slight rounding. border-radius: 4-8px
- Imagery: Steel, glass, water, ice, clean surfaces, blue-hour lighting
- Spacing: Precise, grid-aligned, mathematical
- Texture: Flat or subtle glass effects. No grain, no warmth
- **Palette suggestion:** Arctic Mint, Monochrome Steel, or Paper White
- **Font suggestion:** Inter + Inter, or Space Grotesk + DM Sans

## Premium / Luxury
- Colors: Deep, dark backgrounds. Gold (#c4a77d), champagne, rich jewel tones. Never bright primaries
- Contrast: Medium-high. Text is light but not pure white — use #f0ebe0 for warmth
- Typography: High-contrast serifs (Playfair Display, Instrument Serif). Large heading sizes. Generous letter-spacing on uppercase labels
- Shapes: Sharp or subtly rounded. No playful shapes
- Spacing: Very generous. Whitespace signals that you can afford to "waste" space
- Imagery: Professional photography, dark mood lighting, detail shots, textures (leather, marble, silk)
- Texture: Subtle. Maybe a fine grain or very soft shadow. Never heavy textures
- Motion: Slow, deliberate. Ease-in-out transitions at 0.4-0.6s
- **Palette suggestion:** Ink & Parchment, Stone & Sage, or custom dark with gold accents
- **Font suggestion:** Instrument Serif + Instrument Sans, or Cormorant Garamond + Montserrat

## Playful / Fun
- Colors: High saturation, multiple accent colors allowed (but still max 3). Yellows, pinks, purples
- Contrast: High. Bold colors on white or bright backgrounds
- Typography: Rounded fonts, bold weights. Cabinet Grotesk, Outfit. Can use slightly larger than standard sizes
- Shapes: Very rounded corners (border-radius: 16-24px). Circles, blobs, wavy edges
- Spacing: Comfortable but not overly generous — playful is energetic, not sparse
- Imagery: Illustrations preferred over photography. Bright, flat-style illustrations. People smiling
- Texture: Flat with maybe subtle patterns. Dots, squiggles, confetti as decorative elements
- Motion: Bouncy easing (spring animations). Quick transitions (0.2-0.3s). Hover effects encouraged
- **Palette suggestion:** Electric Pop, Sunrise Gradient
- **Font suggestion:** Cabinet Grotesk + DM Sans, or Outfit + Source Sans 3

## Professional / Corporate
- Colors: Navy (#1e3a5f), slate, neutral grays. Single accent color (blue or teal)
- Contrast: Medium. Nothing extreme. Comfortable readability
- Typography: Clean sans-serifs at standard sizes. Inter, Source Sans. No display fonts for headings — just weight/size variation
- Shapes: Subtle rounding (border-radius: 6-8px). Rectangular cards, clean tables
- Spacing: Consistent, grid-based. Not too tight, not too airy. 8px spacing system
- Imagery: Professional photography with consistent treatment. Avoid illustration unless the brand specifically uses it
- Texture: None. Flat surfaces, subtle borders, minimal shadows
- Motion: Minimal. Functional transitions only (0.15-0.2s). No decorative animation
- **Palette suggestion:** Paper White with navy accent
- **Font suggestion:** Inter + Inter, or Source Sans 3 + Source Sans 3

## Psychedelic / Trippy
- Colors: Highly saturated complementary pairs. Purple + cyan, magenta + green. Neon accents on near-black
- Contrast: Extreme. Either near-black backgrounds or full-saturation color fields
- Typography: Geometric/futuristic display fonts for headings (Orbitron, Space Mono). Clean sans for body
- Shapes: Organic, flowing, asymmetric. No rigid grids. Blobs, waves, fractals
- Spacing: Variable — dense in some areas, spacious in others. Asymmetric
- Imagery: AI-generated cosmic/fractal art, sacred geometry, mandala patterns, aurora-like gradients
- Texture: Rich. Gradient overlays, glow effects (box-shadow with color), grain, noise
- Motion: Slow morphing backgrounds, subtle pulse animations, parallax. Respect prefers-reduced-motion
- **Palette suggestion:** Midnight Nebula, Neon Tokyo, or Obsidian Fire
- **Font suggestion:** Orbitron + Inter, or Syne + Inter

## Minimal / Zen
- Colors: Near-monochrome. One very muted accent. White or very light backgrounds
- Contrast: Low to medium. Soft grays, not stark black
- Typography: Thin weights (300-400). Generous letter-spacing. Smaller sizes than usual
- Shapes: Clean geometry. Circles and lines. Minimal borders — use spacing instead
- Spacing: Extremely generous. "Ma" (Japanese concept of meaningful empty space). Let elements breathe
- Imagery: Single, high-quality images with lots of negative space. No clutter. Photography preferred over illustration
- Texture: None. Pure flat surfaces. Maybe a single subtle line or divider
- Motion: Near-zero. Maybe a very slow fade-in on scroll. No attention-grabbing animation
- **Palette suggestion:** Custom — #fafafa background, #333 text, one muted accent
- **Font suggestion:** Inter Light + Inter, or a single weight of a quality sans-serif

## Dark & Moody
- Colors: Near-black backgrounds with very subtle surface elevation. Muted, desaturated accents
- Contrast: Medium. Text is off-white (#e0e0e0), not pure white. Accents are desaturated
- Typography: Medium-weight sans-serifs. Not too bold, not too light. Comfortable for extended dark-mode reading
- Shapes: Subtle borders (1px, rgba white 10%). Cards slightly elevated from background
- Spacing: Medium to generous. Dark UIs need more spacing than light ones — helps reduce visual density
- Imagery: Dark photography, shadows, silhouettes, night scenes. Low-key lighting
- Texture: Subtle grain or noise overlay (opacity 3-5%). Soft inner shadows on cards
- Motion: Slow, subtle. No harsh flashes of light or bright animations
- **Palette suggestion:** Deep Space or custom dark
- **Font suggestion:** Inter + Inter, or Geist + Geist

## Retro / Vintage
- Colors: Desaturated, "aged" versions of primaries. Mustard yellow, olive green, burnt orange, dusty rose
- Contrast: Medium. Nothing too sharp — vintage feels like it's been through a warm filter
- Typography: Slab serifs (Roboto Slab, Zilla Slab) or rounded sans-serifs. Chunky weights
- Shapes: Rounded rectangles, pill shapes, badge/stamp-like containers
- Imagery: Halftone patterns, duotone filters, retro illustrations, vintage photography treatment
- Texture: Paper grain, halftone dots, subtle noise. Worn edges
- Motion: Minimal. Maybe a typewriter-like text reveal. Nothing that feels modern/smooth
- **Palette suggestion:** Custom with desaturated earth tones
- **Font suggestion:** Slab serif + geometric sans-serif

---

## Combining Moods

Moods can combine, but some combinations conflict:

**Compatible combinations:**
- Warm + Premium = Luxury hospitality, fine dining, artisan spirits
- Cool + Professional = Enterprise SaaS, fintech, B2B tools
- Psychedelic + Warm = Outdoor festival culture (Ozora, Boom)
- Minimal + Premium = High-end fashion, architectural design
- Dark + Cool = Developer tools, terminal aesthetics, hacker culture

**Conflicting combinations (avoid):**
- Playful + Premium = Mixed signals (pick one)
- Minimal + Psychedelic = Contradictory visual languages
- Retro + Cool = Historical warmth vs modern coldness
- Professional + Psychedelic = Context mismatch

When moods conflict, ask the user which direction to prioritize. Don't try to blend incompatible aesthetics.
