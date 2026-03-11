# Color Theory

## Principles

### The Color Wheel and Relationships
- Complementary colors (opposite on wheel) create maximum contrast — use for emphasis, not for adjacent areas
- Analogous colors (adjacent on wheel) create harmony — ideal for backgrounds and surfaces
- Triadic colors (120 degrees apart) create vibrant tension — use sparingly for accents
- Split-complementary: one base + two colors adjacent to its complement — high contrast with more versatility than pure complementary
- Tetradic (double complementary): two complementary pairs — richest palette, hardest to balance. One color must dominate

### Color Perception Science
- **Simultaneous contrast**: A gray square on a red background appears greenish; on blue, it appears yellowish. Colors are not absolute — they shift based on what surrounds them. Always evaluate colors IN CONTEXT, never in isolation
- **Bezold effect**: Changing one color in a pattern can shift the perceived appearance of the entire composition. A dark outline makes enclosed colors appear darker; a light outline makes them lighter
- **Chromatic adaptation**: The eye adjusts to the dominant color temperature. After staring at a warm-toned hero, a neutral section will feel cool. Use this for section transitions
- **Color constancy**: The brain compensates for lighting changes — a "white" card on a dark background may need to be slightly tinted to FEEL white (e.g., #f8f9fa on dark, not #ffffff which feels harsh)
- **Metamerism**: Colors that match on screen may not match in print or under different lighting. For cross-media brands, specify Pantone or LAB values alongside hex

### HSL as the Designer's Model
- RGB is for machines. HSL (Hue, Saturation, Lightness) maps to how humans perceive color
- **Hue** (0-360): The color itself. Red=0, Yellow=60, Green=120, Cyan=180, Blue=240, Magenta=300
- **Saturation** (0-100%): Intensity. 0% = gray, 100% = purest tone. Most UI elements work at 40-70% saturation; 80%+ reads as "loud"
- **Lightness** (0-100%): 0% = black, 100% = white. Body text backgrounds: 95-100% (light mode) or 5-15% (dark mode). Surface variations: shift by 3-5% lightness increments
- To create cohesive palettes: fix the hue, then vary saturation and lightness. A single hue at S:80/L:50, S:60/L:70, S:40/L:90 gives you accent, secondary, and surface from ONE color
- To create perceived warmth/coolness without changing hue: shift saturation. Higher saturation = warmer feel, lower = cooler

### Temperature and Energy
- Warm colors (red, orange, yellow) advance visually and feel energetic; cool colors (blue, green, purple) recede and feel calm
- Saturation controls energy: high saturation = exciting/loud, low saturation = sophisticated/calm
- Color temperature sets mood: warm palettes feel inviting, cool palettes feel professional
- The most sophisticated palettes use a dominant temperature with small accents of the opposite. A cool blue UI with one warm amber CTA button creates a natural focal point

### The 60-30-10 Rule (with palette breakdowns)
- **60% — Dominant**: Background and large surfaces. Usually the most neutral color in your palette (white, near-black, or a very desaturated tint). Sets the overall mood
- **30% — Secondary**: Cards, sections, navigation, supporting areas. Clearly related to the dominant but distinct. In a blue palette: dominant might be #f0f4ff, secondary might be #dbeafe
- **10% — Accent**: CTAs, interactive elements, highlights, badges. The most saturated color. This is where brand identity lives
- Breakdown for dark UIs: 60% dark surfaces (#0a0a0a–#1a1a2e), 30% elevated surfaces (#1f1f33–#2a2a4a), 10% glowing accents
- Breakdown for light UIs: 60% white/near-white (#ffffff–#f5f5f5), 30% light gray surfaces (#e5e7eb–#f3f4f6), 10% brand color
- Violating 60-30-10 is sometimes correct (e.g., editorial sites with full-bleed images, immersive experiences) — but you must KNOW the rule to break it intentionally

### Dark Mode Adaptation
- Dark mode is NOT just inverting colors. You must redesign the palette
- Reduce saturation by 10-20% in dark mode — saturated colors on dark backgrounds vibrate and cause eye strain
- Elevate surfaces with LIGHTNESS, not shadow. In light mode, cards float via shadow. In dark mode, cards are lighter than the background (#1a1a1a card on #0a0a0a background)
- Borders become more important in dark mode — they define edges that shadows can't
- White text on dark backgrounds: use #e0e0e0 to #f0f0f0, not pure #ffffff which creates too much contrast and causes halation (text appears to glow/blur)
- Background should never be pure #000000 for content areas — use #0a0a0a to #141414. Pure black is reserved for OLED or dramatic creative contexts (e.g., cosmic/psytrance)
- Accent colors need to pass WCAG AA (4.5:1) on dark surfaces too. Many brand blues that work on white fail on dark backgrounds — shift lighter or use a different tint

### Value (Lightness/Darkness)
- Value is the most important contrast dimension — a design should read correctly in grayscale
- If your hierarchy depends on hue differences alone, it will fail for colorblind users and in low-light conditions
- The "squint test" for value: squint at the design until it blurs. If the hierarchy is still visible, your value contrast is strong enough

## Quality Criteria
- FAIL: More than 3 unrelated hue families in a single composition
- FAIL: Text on background with contrast ratio below 4.5:1 (WCAG AA standard)
- FAIL: Text smaller than 18px bold / 24px regular on background with contrast below 3:1 (WCAG AA large text)
- FAIL: Pure saturated primaries (#FF0000, #00FF00, #0000FF) used for large fill areas — reads as amateur
- FAIL: Gradient that mixes warm and cool without a transition color — creates muddy middle tones
- FAIL: Using color as the ONLY means of conveying information (colorblind users cannot distinguish)
- FAIL: Adjacent elements with very similar but not identical colors — looks like a mistake, not a choice
- FAIL: Dark mode that uses pure #000000 backgrounds with pure #ffffff text — creates halation and eye strain
- FAIL: Accent color that doesn't meet WCAG AA contrast on its intended background
- FAIL: Palette with no clear dominant/secondary/accent hierarchy — "color soup"
- PASS: Cohesive palette derived from 1-2 base hues with tints, shades, and tones
- PASS: Accent color used for less than 10% of visual area to create focal points
- PASS: Consistent color semantics — same color means the same thing everywhere (e.g., blue = interactive)
- PASS: Neutral backgrounds (whites, grays, dark surfaces) with intentional color accents
- PASS: Dark mode palette that reduces saturation and avoids pure black/white
- PASS: Value contrast sufficient to read hierarchy in grayscale

## Anti-patterns
- "Rainbow vomit": Every element a different saturated color with no palette logic
- "Flat gray world": No color variation, everything is #333/#666/#999 — functional but lifeless
- "AI gradient": Oversaturated purple-to-cyan gradient — signature of AI-generated content
- "Christmas tree": Red and green together in a non-holiday context
- "Neon overload": Every accent is max saturation — nothing stands out because everything screams
- "Dirty pastels": Desaturated colors with poor value contrast — washed out and hard to read
- "Dark mode inversion": Simply inverting light mode colors instead of redesigning the palette — creates garish, uncomfortable results
- "Vibrating boundaries": Two saturated complementary colors placed adjacent at high saturation — creates optical vibration and is physically uncomfortable to view
