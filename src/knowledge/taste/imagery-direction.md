# Imagery Direction

## Purpose
How to write effective image generation prompts for different design contexts. The gap between "make a hero image" and actually getting a usable result is the PROMPT. This module teaches the agent to compose prompts that produce design-ready imagery — not generic AI art.

---

## Prompt Architecture

Every effective image prompt has 5 layers:

1. **Subject** — What is in the image
2. **Style** — How it's rendered (photorealistic, illustration, abstract)
3. **Mood/Atmosphere** — The emotional quality (dramatic, serene, energetic)
4. **Composition** — How elements are arranged (negative space, focal point, framing)
5. **Technical** — Resolution, aspect ratio, color specifications

### Template
```
[Subject description], [style keywords], [mood/lighting], [composition notes], [color specifications], [negative prompt]
```

---

## Prompts by Design Context

### Hero Background (Website)
Hero images need NEGATIVE SPACE for text overlay. This is the most common mistake — generating a beautiful image that's unusable because there's no clean area for the heading.

**Good prompt structure:**
```
[Scene description] with large area of [dark/light] negative space on [left/center/right] for text overlay, [style], [mood], [colors matching brand palette], cinematic wide angle, 16:9 aspect ratio
```

**Example — Psytrance portal:**
```
Cosmic nebula landscape with sacred geometry patterns floating in deep space, large dark area in center-left for text overlay, psychedelic digital art style, mystical and expansive atmosphere, dominant colors deep purple #1a0a2e and electric cyan #22d3ee with magenta #ec4899 accents, ultra-wide cinematic composition, 16:9
```

**Negative prompt:**
```
text, words, letters, watermark, signature, blurry, low quality, oversaturated, stock photo, generic, centered subject blocking text area
```

### Section Background (Subtle)
Section backgrounds should be ATMOSPHERIC, not attention-grabbing. They set mood without competing with content.

**Good prompt structure:**
```
Abstract [texture/pattern] background, subtle and atmospheric, [color palette], suitable as website section background, low visual complexity, smooth gradients
```

**Example — Warm transition section:**
```
Abstract warm gradient atmosphere with subtle organic flowing shapes, amber and deep orange tones transitioning to dark earth tones, painterly texture with soft edges, low complexity suitable as a website background, no focal point, colors #f97316 amber blending into #1a1210 dark brown
```

### Product/Card Images (Consistent Set)
When generating multiple images for a card grid, CONSISTENCY is critical. Same style, lighting, and color treatment.

**Include in every prompt in the set:**
```
[Specific style], [specific lighting], [specific background], consistent with series, [aspect ratio]
```

**Example — Event card thumbnails:**
```
[Event-specific scene], digital art style with neon glow effects on dark background #0a0a0a, dramatic side lighting, sacred geometry border elements, rich saturated colors, square composition, 1:1 aspect ratio, consistent series style
```

### Icons and Symbols
For icons, simplicity is everything. Generate at larger sizes and reduce.

```
Simple [subject] icon, flat design, single color [hex value] on transparent background, minimal detail, clean lines, vector art style, centered, square composition
```

**For SVG generation (Recraft v3 SVG):** The prompt can be simpler because the model is designed for this:
```
[Subject] icon, minimal, clean line art, single stroke weight
```

### Abstract/Decorative Elements
Blobs, waves, geometric patterns used as design elements.

```
Abstract [shape type] decorative element, [colors from brand palette], soft edges, suitable for layering over dark background, transparent or dark background, no text, purely decorative
```

---

## Style Keywords Reference

### Photorealistic
```
photorealistic, professional photography, studio lighting, 85mm lens, shallow depth of field, high resolution, 8K
```

### Digital Art / Illustration
```
digital art, illustration style, clean edges, vibrant colors, stylized, concept art, artstation quality
```

### Psychedelic / Cosmic
```
psychedelic art, sacred geometry, fractal patterns, cosmic, nebula, neon glow, UV-reactive colors, Alex Grey inspired, visionary art
```

### Minimalist
```
minimalist, simple shapes, negative space, clean composition, limited palette, geometric, less is more
```

### Retro / Vintage
```
retro style, vintage aesthetic, halftone texture, muted colors, 70s color palette, grain texture, nostalgic
```

### Watercolor / Organic
```
watercolor style, organic textures, soft edges, natural pigments, flowing, painterly, hand-crafted feel
```

---

## Color Control in Prompts

### Specifying Colors
Image generators respond to color descriptions better than hex values, but include both:

```
dominant deep purple (around #1a0a2e) with electric cyan (#22d3ee) accents and touches of hot pink (#ec4899)
```

### Color Mood Words
- "Warm" → generators produce amber, orange, gold tones
- "Cool" → blue, teal, slate
- "Neon" → high saturation, glow effects
- "Muted" → desaturated, dusty, vintage feel
- "Earth tones" → brown, olive, terracotta, sand
- "Jewel tones" → deep emerald, sapphire, ruby, amethyst

### Lighting Words
- "Golden hour" → warm, directional, long shadows
- "Blue hour" → cool, twilight, atmospheric
- "Dramatic" → high contrast, strong shadows, chiaroscuro
- "Soft" → diffused, even, no harsh shadows
- "Neon" → colored light sources, glow, reflections
- "Cinematic" → film-quality lighting, color graded, depth

---

## Common Prompt Failures

### "Make it beautiful"
Meaningless to a generator. Be specific: WHAT is beautiful about it? The lighting? The composition? The colors?

### Forgetting negative space
Every hero image prompt should explicitly request space for text. Otherwise you get a centered, busy image with no usable area.

### Style mixing
"Watercolor cyberpunk minimalist" — these styles conflict. Pick one dominant style, use others as subtle modifiers at most.

### Overcrowded prompts
More keywords ≠ better results. After ~50 words, generators start ignoring or conflicting keywords. Keep prompts focused.

### Ignoring aspect ratio
A prompt for a banner (16:9) generates differently than a square (1:1). Always specify aspect ratio. Generate in the final aspect ratio, don't crop later.

---

## Iteration Strategy

Image generation rarely produces a perfect result on the first try. Plan for 2-3 iterations:

1. **First pass:** Get the general concept right (subject, style, mood)
2. **Second pass:** Refine — adjust colors, composition, specific elements. Use Flux Kontext to edit the first result
3. **Third pass:** Polish — fix any artifacts, adjust for web integration (darkness for text overlay, color correction to match palette)

For Flux Kontext (edit-by-prompt):
```
Make the background darker on the left side for text readability. Increase the cyan glow on the geometric patterns. Remove the bright spot in the upper right.
```

This iterative approach mirrors how the design super agent's review loop works — generate, review, correct, repeat.
