# Vision Interpretation

## Purpose
How to hear what the user MEANS, not just what they SAY. Users describe their vision in imprecise, emotional, metaphorical terms. The agent must translate human expression into design decisions without losing the intent.

---

## The Translation Problem

When a user says "I want it to feel like a Goa night under the stars," they're not giving a design spec. They're sharing a FEELING. The agent's job is to identify what visual elements produce that feeling:

- "Goa night" → warm outdoor air, palm trees, flickering fire → warm color temperature, organic shapes, amber/orange accents alongside cosmic
- "under the stars" → vast dark sky, pinpoints of light, sense of infinity → deep dark backgrounds, small bright accent points, generous negative space above content
- The COMBINATION → cosmic vastness + earthly warmth = the specific psytrance duality that separates it from generic cyberpunk or generic hippie

---

## Common User Expressions and Their Visual Translations

### Temperature Words
| User says | Design meaning |
|---|---|
| "warm" | Amber/orange spectrum, cream backgrounds, serif fonts, organic shapes, soft shadows with warm tint |
| "cool" | Blue/teal spectrum, pure white or slate backgrounds, geometric sans-serif, sharp corners |
| "hot" / "fiery" | Red/orange/yellow, high saturation, energetic layout, bold type, strong contrast |
| "icy" / "frozen" | Light blue/white, minimal, very clean, thin fonts, lots of whitespace |

### Energy Words
| User says | Design meaning |
|---|---|
| "calm" / "serene" | Muted colors, generous whitespace, thin font weights, slow or no animation, horizontal lines |
| "energetic" / "vibrant" | Saturated colors, tight spacing, bold weights, quick animations, diagonal or dynamic composition |
| "powerful" / "bold" | Large type, high contrast (black/white), heavy font weights, strong geometric shapes |
| "delicate" / "subtle" | Low contrast, thin lines, small type, lots of negative space, pastel or muted palette |

### Quality Words
| User says | Design meaning |
|---|---|
| "premium" / "luxury" | Dark backgrounds, gold/champagne accents, serif typography, extreme whitespace, slow motion |
| "clean" / "simple" | Single-accent-color palette, sans-serif, grid-aligned, minimal texture, no decoration |
| "rich" / "layered" | Multiple depth levels, gradients, textures, overlapping elements, gradient shadows |
| "raw" / "authentic" | Imperfect textures, hand-drawn elements, natural photography, visible structure |
| "professional" | Navy/gray palette, medium-weight sans-serif, consistent grid, no playful elements |
| "fun" / "playful" | Bright colors, rounded shapes, bouncy animations, illustrations over photography |

### Reference Words
| User says | Design meaning |
|---|---|
| "like Apple" | Product-centric, extreme whitespace, monochrome + product color, cinematic |
| "like Stripe" | Gradient hero, clean white content, code-as-social-proof, two-audience design |
| "like Linear" | Dark mode, purple gradients, precision, developer aesthetic |
| "like Notion" | Illustration-first, warm, approachable, simple |
| "modern" | Sans-serif, dark mode or clean white, subtle shadows, no decoration |
| "classic" / "timeless" | Serif headings, warm neutrals, editorial layout, restrained palette |
| "futuristic" | Geometric fonts, dark backgrounds, neon accents, glass effects, tech textures |

---

## Identifying Contradictions

Users sometimes express contradictory desires. The agent must recognize and resolve these:

### "I want it minimal but also rich"
**Resolution:** Rich in content quality, minimal in visual noise. Use one high-quality image per section with lots of whitespace. Quality over quantity.

### "Professional but not boring"
**Resolution:** Corporate structure (grid, consistent spacing, neutral fonts) with ONE point of personality — maybe a distinctive accent color, an unusual heading font, or subtle motion. Professional framework + one creative departure.

### "Dark and moody but also welcoming"
**Resolution:** Dark backgrounds but with WARM dark tones (#1a1210 not #1a1a1a), warm accent colors (amber, not cyan), round corners, friendly typography. Dark ≠ cold.

### "Simple but I want lots of features visible"
**Resolution:** This is a prioritization problem, not a design problem. Ask the user to rank features. Show top 3-4 prominently, others in secondary navigation or tabs. The design CAN'T be simple AND show everything.

### When Contradictions Can't Be Resolved
If the user's desires genuinely conflict (e.g., "psychedelic AND minimalist"), escalate. Ask:
"These two directions have different visual languages. Which is more important to you — the psychedelic energy or the minimalist clarity? I can lean 70/30 in either direction, but they can't be equal."

---

## Reading Between the Lines

### What users don't say matters
- If they don't mention mobile → they're thinking desktop-first, but you should still ensure responsive
- If they don't mention accessibility → they don't know about it, but you should still ensure WCAG AA
- If they don't mention animation → they probably want subtle animation, not none and not heavy
- If they say "I don't know what I want" → they'll know it when they see it. Generate 2-3 directions and let them react

### The "I'll know it when I see it" user
This is the most common case. Strategy:
1. Generate a DESIGN BRIEF (from corridor-narrowing.md) based on your best interpretation
2. Execute a first pass — fast, not perfect
3. Show it to the user and ask: "What feels right? What feels wrong?"
4. Their reaction narrows the corridor further
5. Iterate based on their emotional responses

### The "Make it pop" user
"Pop" means: the focal point isn't focal enough. The fix is CONTRAST:
- Make the CTA bigger, bolder, brighter
- Make everything ELSE more muted
- Increase size differential between heading and body
- Add more whitespace around the element that should "pop"

### The "It looks AI-generated" complaint
This means one or more of:
- Oversaturated purple-to-cyan gradient
- Too-perfect geometric patterns with no imperfection
- Generic stock-photo-quality imagery
- Every element polished to the same degree (real design has hierarchy of craft)
- Missing the human touch — something slightly imperfect, quirky, or unexpected

**Fix:** Introduce one unexpected element that a template wouldn't have. An unusual color in the palette. An asymmetric layout. A hand-crafted illustration. Something that says "a human chose this."

---

## The First Response

Before doing ANY design work, the agent should demonstrate understanding by restating the brief in design language:

**User says:** "I need a website for my psytrance festival. Think Ozora meets the cosmos."

**Agent should think:**
"Psytrance festival website. The Ozora reference tells me: outdoor, nature-integrated, warm earth tones mixed with cosmic. Not a club — a gathering in nature. The cosmos reference adds: deep space backgrounds, sacred geometry, vast dark skies. The combination of Ozora + cosmos = the specific aesthetic where earthly warmth and cosmic infinity coexist. This eliminates cold/clinical cyberpunk and hippie/rustic alike. I'm in the corridor of: warm cosmic — dark backgrounds with both neon AND earth tone accents."

This internal reasoning must happen BEFORE any tool calls or delegations.
