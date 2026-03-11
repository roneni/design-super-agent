# Branding & Identity Systems

## Principles

### Core Brand System
- A brand is a system of consistent decisions: color, typography, voice, spacing, imagery style
- Brand recognition comes from repetition — consistency across touchpoints builds familiarity
- A strong brand has constraints: specific colors, specific fonts, specific imagery guidelines
- Logo needs clear space (exclusion zone) — typically 1x the logo's height on all sides
- Brand colors have hierarchy: primary (1 color), secondary (1-2 colors), accent (1 color), neutrals (3-5)
- Typography is part of the brand: specific fonts for headings and body, with defined sizes
- Photography/illustration style must be defined: candid vs posed, warm vs cool, abstract vs literal
- Tone of voice affects visual design: playful brands use rounded shapes, serious brands use sharp geometry
- Dark mode is a brand extension, not a separate brand — same palette adapted, not replaced

### Brand Architecture
- **Monolithic brand**: One master brand across all products (Apple, Google). Every touchpoint shares the same visual identity. Strongest brand cohesion, hardest to accommodate diverse products
- **Endorsed brand**: Sub-brands with visible parent brand (Marriott → Courtyard by Marriott). Sub-brands have their own identity but share a visual DNA with the parent
- **House of brands**: Independent brands under a parent company (Procter & Gamble → Tide, Pampers, Gillette). Each brand has its own complete identity. No visual connection required
- **Design implication**: Before designing, understand the brand architecture. A monolithic brand page MUST look like every other page. An endorsed brand page has more creative freedom but must include parent brand elements

### Identity System Components
- **Primary logo**: The full logo (mark + wordmark). Used when space allows and brand recognition is important
- **Logo mark**: The icon/symbol alone. Used in small spaces (favicons, app icons, social avatars)
- **Wordmark**: The name in the brand typeface, without the icon. Used when the context makes the icon redundant
- **Color system**: Primary, secondary, accent, neutral, semantic (success, warning, error, info). Each color has: hex, RGB, HSL, Pantone (for print), and light/dark mode variants
- **Type system**: Heading font (family, weights, sizes), body font (family, weights, sizes), mono font (if applicable). Line heights, letter spacing, and text styles defined for all contexts
- **Iconography**: Style (outlined, filled, dual-tone), size grid (16, 20, 24, 32px), stroke width, corner radius. Custom icon set or specified library (Lucide, Phosphor, Heroicons)
- **Photography direction**: Color treatment (warm, cool, neutral), composition style (close-up, environmental, abstract), subject guidelines (real people vs illustration, diverse, specific demographics)
- **Voice and tone**: How the brand speaks. Formal vs casual, technical vs accessible, confident vs humble. This directly affects: heading copy length, CTA button text, error messages, empty states
- **Motion principles**: Brand-specific animation style (snappy vs smooth, minimal vs expressive), signature transitions, loading patterns

### Brand Guidelines Structure
A complete brand guidelines document includes:
1. **Brand story**: Mission, values, personality (informs all visual decisions)
2. **Logo usage**: Versions, clear space, minimum sizes, placement rules, what NOT to do
3. **Color palette**: Complete swatches with values for all contexts (screen, print, material)
4. **Typography**: Font stack, type scale, line heights, spacing
5. **Imagery**: Photography/illustration direction, treatments, do's and don'ts
6. **Layout**: Grid system, spacing system, page templates
7. **Components**: Buttons, forms, cards, navigation — with all states
8. **Voice and tone**: Writing guidelines, example copy for different contexts
9. **Motion**: Animation principles, timing, easing curves

### Cross-Touchpoint Consistency
- **Web → Mobile**: Same color system, same type families (adapted sizes), same component patterns (adapted to touch). The user should FEEL the same brand even though the interface adapts
- **Web → Email**: Simplified design system (email HTML is limited). Key brand elements: colors, logo, typography (fallback to web-safe fonts)
- **Web → Print**: Color conversion (RGB → CMYK/Pantone). Typography may differ (screen fonts → print fonts). Layout adapts to fixed dimensions
- **Web → Social**: Avatar consistency (logo mark across platforms). Post templates that feel like the brand. Color and typography in graphics
- **The test**: Show someone 5 touchpoints (website, app, email, social, print) without logos. Can they tell they're from the same brand? If yes, the identity system is working

## Quality Criteria
- FAIL: Using brand colors inconsistently — e.g., primary blue in some CTAs, different blue in others
- FAIL: Logo without adequate clear space — other elements crowding the logo
- FAIL: Mixing brand fonts with non-brand fonts without clear rationale
- FAIL: Photography style inconsistent across the design — some photos warm, some cold, some filtered
- FAIL: Brand accent color used for non-accent purposes (large backgrounds, body text)
- FAIL: Dark mode that simply inverts colors instead of adapting the palette
- FAIL: Component styling that conflicts with brand personality (sharp-cornered buttons on a playful, rounded brand)
- FAIL: Different visual language on different pages of the same site
- FAIL: Brand color used for semantic purposes (brand blue = interactive AND informational — confusing)
- PASS: All colors traceable to the brand palette (no rogue colors)
- PASS: Consistent typography scale derived from brand fonts
- PASS: Imagery follows a consistent style guide (all photos same treatment)
- PASS: Logo placement follows brand guidelines for size and clear space
- PASS: Visual tone matches verbal tone — playful copy with playful design, serious with serious
- PASS: Cross-touchpoint consistency — web, mobile, and social feel like the same brand
- PASS: Semantic colors (success, error, warning) exist alongside but distinct from brand colors

## Anti-patterns
- "Generic bootstrap": Using default framework styling with no brand personality
- "Logo soup": Multiple logos, badges, and marks competing for attention
- "Brand schizophrenia": Different visual language in different sections of the same page
- "Trendy overwrite": Replacing distinctive brand elements with generic trending styles (glassmorphism, etc.)
- "Color collision": Brand primary color identical to semantic colors (brand blue = link blue = info blue — which is which?)
- "The rebrand amnesia": New brand guidelines that abandon everything that made the previous brand recognizable, losing accumulated brand equity
