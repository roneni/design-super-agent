# Common Design Failures

## Purpose
Named anti-patterns that the agent should recognize and flag immediately. These are the most common design failures across all domains.

## Layout Failures

### "The Squeeze"
Everything packed together with minimal spacing. Content feels claustrophobic. Fix: establish a spacing system (8px base) and enforce minimum padding.

### "The Scatter"
Elements positioned randomly without alignment logic. Fix: use a grid system and align every element to at least one edge or center line.

### "The Stretch"
Content stretched to fill available width without max-width. Text lines become 100+ characters. Fix: constrain content width (max 720px for text, 1200-1440px for layouts).

### "The Cliff"
Important content or actions below the fold with no visual indicator to scroll. Fix: ensure the fold cuts through content (showing partial elements) rather than creating a clean break.

## Typography Failures

### "The Shout"
Everything bold, large, or uppercase. Nothing stands out because everything screams. Fix: establish 3-4 clear hierarchy levels with progressive weight reduction.

### "The Mumble"
Important text in small, light, low-contrast styles. Users can't find what matters. Fix: primary text should be at least 16px, dark on light (or vice versa), with adequate weight.

### "The Novel"
Massive blocks of text with no visual breaks: no headings, no bullet points, no images. Fix: break content every 3-4 paragraphs with a heading, image, or section divider.

## Color Failures

### "The Fog"
Everything in similar mid-tone values — no contrast, no depth, no hierarchy. Fix: ensure at least 60:30:10 ratio (dominant:secondary:accent) with clear value separation.

### "The Carnival"
Too many competing bright colors. Looks festive but unreadable. Fix: limit saturated colors to accents (≤10% of area), use neutrals for most surfaces.

### "The Void"
All dark or all light with no variation — monotone. Fix: use at least 2 surface levels (e.g., dark + darker, or white + light gray) plus one accent.

## Interaction Failures

### "The Mystery Meat"
Interactive elements with no visible affordance. Users don't know what's clickable. Fix: buttons should look like buttons (fill or outline + text), links should be visually distinct.

### "The Trap"
Modals, pop-ups, or overlays that are hard to dismiss — tiny close button, no outside-click-to-close, no escape key. Fix: multiple dismiss paths, prominent close button.

### "The Maze"
Navigation structure so complex or hidden that users can't find their way. Fix: flat navigation with max 7±2 top-level items, clear current-page indicator.

## Overall Failures

### "The Template"
Design that looks like an unmodified template — generic stock photos, Lorem Ipsum, default colors. Fix: customize every visual decision to match the project's specific identity.

### "The Frankenstein"
Different sections look like they were designed by different people. Inconsistent colors, fonts, spacing. Fix: define a design system (even a small one) and apply it consistently.

### "The Clone"
Slavishly copying a well-known product's design (Apple, Stripe, Linear) without adapting it to the brand. Fix: use references for principles and patterns, but express the project's unique identity.

### "The AI Look" / AI Slop / Vibe Coding Aesthetic

**THIS IS THE #1 ANTI-PATTERN IN 2025-2026.** It became a viral meme on Twitter/X reaching trends
with millions of views — a NEGATIVE trend. Every vibe-coded site looks identical. The design
community now has a name for it: "AI Slop."

**The visual fingerprint (recognize ALL of these):**
- Purple-to-cyan glowing gradients as background (the single most memed element)
- Glass-morphism cards with backdrop-blur on dark gray backgrounds
- Rounded corners on everything (border-radius: 16-24px)
- Soft drop shadows with blue/purple tint
- Dark mode by default with no design justification
- Generic "modern and sleek" aesthetic that says nothing about the brand
- Overlapping translucent cards floating in void
- Geometric orbs, bokeh circles, or abstract blob shapes
- Inter or similar neutral sans-serif with no typographic personality
- Generic tech-startup copy: "Revolutionize your workflow" / "Powered by AI"

**Why it happens:** AI models average the internet. The internet in 2024-2025 got flooded with
Vercel/Stripe/Linear clones. Models trained on this data default to a purple-glowing-glass-card
aesthetic whenever asked for "modern design." It's the mean of the internet, and the mean is
mediocre.

**Why it's lethal:** Users immediately recognize AI-generated design. It signals "this was built
in 5 minutes with a chatbot." It destroys credibility, uniqueness, and trust. A portfolio site
with AI Slop aesthetics tells recruiters the developer has no design taste.

**The fix — Intentional Design Recipes (use one, commit fully):**

1. **Neo-Brutalist / Creative Agency**: Pure black & white with ONE blinding accent (e.g., #00FF00).
   Massive aggressive typography (Anton, Space Grotesk). Thick solid borders. Solid black offset
   shadows instead of soft blurs. Sharp corners. Numbered columns (01, 02, 03). Marquee text.
   NO: soft shadows, gradients, rounded corners.
   Reference: Gumroad.com, Figma marketing pages.

2. **Warm Organic / Boutique**: Warm off-white backgrounds (#f5f5f0). Classic serif fonts
   (Cormorant Garamond, Libre Baskerville). Earth-tone accents — olive green, muted terracotta.
   Pill-shaped images. Large soft rounded corners on images only.
   NO: dark mode, neon colors, techy monospace fonts.
   Reference: Aesop.com, Kinfolk.com.

3. **Technical Dashboard / Mission Control**: Visible grid borders (celebrate structure, don't hide
   it). Monospace fonts (JetBrains Mono) for data + italic serif headers to humanize. Muted colors:
   ink black and paper gray. Inverted hover states (black turns white).
   NO: floating cards, glowing effects, massive hero images.
   Reference: Stripe API docs, Linear.app, GitHub dashboard.

4. **Editorial / Magazine**: Massive display typography (20% of screen width) with tight line spacing.
   High contrast between enormous titles and tiny uppercase micro-labels with wide letter spacing.
   Dynamic/skewed layouts.
   NO: standard 3-column card grids, generic "Hi, I'm a developer" centered text.
   Reference: SSENSE.com, New York Times features.

**Hybrid approach — "Elegant Brutalism":** Combine Gumroad's bold structure (thick borders, solid
shadows, aggressive color) with Aesop's buttery-smooth animations (Framer Motion slow cinematic
fade-ins, gentle upward glides on scroll, smooth image reveals). Structure of punk rock, motion of
a luxury brand. This is an extremely effective combination for portfolio sites.

**Anti-AI-Slop mandate for all designs:**
When generating any website, the agent MUST explicitly constrain against AI Slop:
- NO purple/cyan/blue glowing gradients unless the brief SPECIFICALLY requests them
- NO generic glass-morphism or excessive backdrop-blur
- NO standard dark-mode cards on dark-gray background as default
- Choose an intentional aesthetic from genre-deep-dives and COMMIT to it
- Every color, font, and layout choice must serve the specific brand, not the average of the internet

---

## Motion Failures

### "The Seizure"
Multiple elements animating simultaneously with different timings, speeds, and directions. The screen feels like it's vibrating. Fix: choreograph animations with staggered timing and consistent direction. Maximum 2-3 elements animating at once.

### "The Lag"
Animations that are too slow (>800ms for simple transitions). Every click feels like wading through molasses. Fix: micro-interactions 100-200ms, medium transitions 200-400ms. If it feels slow, it IS slow.

### "The Distraction"
Decorative animation that steals attention from the content or CTA. Animated backgrounds, spinning logos, bouncing icons — all competing with the user's task. Fix: animate content, not decoration. The thing that moves should be the thing that matters.

### "The Jank"
Animations that stutter, skip frames, or cause layout shifts. Usually from animating layout properties (width, height, top, left) instead of compositor properties (transform, opacity). Fix: only animate transform and opacity. Use `will-change` sparingly.

### "The Loop"
Infinite attention-grabbing animation (pulsing badges, rotating icons, flashing elements) that never stops. After 5 seconds, it becomes anxiety-inducing. Fix: animate once, twice, or three times — then stop. Use `animation-iteration-count: 3`.

---

## Interaction Failures

### "The Dead End"
Action completes with no visible feedback — user submits a form and nothing happens. No success message, no navigation, no visual change. Fix: every action needs visible feedback within 100ms.

### "The Infinite Load"
Spinner displayed indefinitely with no timeout, error handling, or cancellation option. Fix: timeout after 10s with error message and retry option. Show progress if possible.

### "The Silent Failure"
Error occurs but the interface shows nothing — or shows a cryptic error code. Data is lost. Fix: human-readable error messages near the action, with recovery path.

### "The Eager Validator"
Form shows "required" error the instant the user focuses a field, before they've typed anything. Fix: validate on blur (when the user leaves the field), not on focus or keystroke.

---

## Data Visualization Failures

### "The Pie Lie"
Pie chart with 10+ slices, one labeled "Other (73%)." The pie format fails completely when the interesting data is in a massive "other" category. Fix: bar chart, or pie with max 5 slices.

### "The Truncated Truth"
Y-axis starting at 95% instead of 0%, making a 1% difference look like a 20x change. Fix: Y-axis starts at 0 unless there's explicit justification, in which case the truncation must be visually indicated (axis break symbol).

### "The Rainbow Chart"
Using a full-spectrum color gradient for sequential data. Perceptual non-uniformity creates false patterns (the yellow band always looks like a peak). Fix: single-hue sequential palette from light to dark.

### "The 3D Disaster"
Any chart with 3D effects. Perspective distortion makes it impossible to compare values accurately. A bar that's 10% larger LOOKS 40% larger in 3D due to perspective. Fix: always 2D.

---

## Design System Failures

### "The Snowflake"
Every page has unique components that exist nowhere else. Buttons that look different on every page. Cards with varying padding, radius, and shadow on the same site. Fix: define a component library and use it everywhere.

### "The Over-system"
Design system so rigid that every legitimate edge case requires an override or hack. 200+ tokens for a 5-page site. Fix: design systems should be as simple as the product needs — no more, no less.

---

## Cosmic / Psychedelic Failures

### "The Rave Flyer"
Every element neon-colored on a black background. Electric blue heading, hot pink CTA, green border, cyan glow, magenta particles. Nothing stands out because everything is screaming in UV. Fix: 2-3 accent colors maximum, with clear hierarchy. Most of the design should be dark neutral, with accents used sparingly.

### "The Stock Nebula"
Generic purple-blue gradient background downloaded from a free stock site. No atmospheric depth, no foreground elements, no intentional color story. Fix: custom gradient with warm/cool tension, minimum 3 depth layers, intentional light sources.

### "The Sacred Geometry Stamp"
Flower of Life or Metatron's Cube pasted at full opacity on a dark background with no integration. The geometry sits ON TOP of the design rather than being woven INTO it. Fix: integrate sacred geometry as structural element (grid alignment, composition framework), use at 5-30% opacity, add rotation animation for depth.

### "The YouTube Thumbnail"
Cosmic design that uses aggressive, high-contrast, click-baity styling: massive glowing text, extreme lens flares, "TOP 10 GALAXY FACTS" energy. Fix: atmospheric subtlety over attention-grabbing intensity. The cosmos doesn't need to shout — its scale does the talking.

### "The CSS Pretender"
Using CSS gradients, box-shadows, and opacity to simulate visual atmosphere without actual imagery. The page looks like a dark-themed admin panel, not a visual experience. Fix: generate actual background imagery. CSS provides the polish layer ON TOP of imagery, not instead of it.

### "The Functional Default"
Treating a visual/immersive page as a data display problem. A festivals page that's really a searchable table with dark mode. Fix: frame the brief as "design a visual EXPERIENCE" not "display this DATA."

### "The Cold Dead Space"
All cool tones with no warm accent. The cosmic scene feels clinical, sterile, like a corporate screensaver. Missing the warmth that makes psytrance cosmic art inviting and mystical. Fix: add warm accents — amber starlight, golden dust, warm nebula cores, sunset horizon tones.
