# Genre Deep Dives

## Purpose
Expands on visual-languages.md with actionable depth. Each genre includes specific CSS/design token values, not just descriptions. When the agent identifies a genre match, it should be able to immediately produce design decisions without guessing.

---

## Psytrance / Festival Culture

### The Visual DNA
This isn't generic "EDM" or "nightclub." Psytrance visual culture comes from outdoor trance festivals: Ozora (Hungary), Boom (Portugal), ZNA Gathering (Portugal), Hadra (France), Universo Paralello (Brazil). The aesthetic is cosmic-meets-earthly: starfields above, dust and fire below.

### Key Visual Elements
- **Color:** Deep backgrounds (#0a0a0a to #0d0d1a). UV-reactive accent spectrum: cyan (#22d3ee), electric violet (#7c3aed), magenta (#ec4899). But also WARM earth tones for contrast — the best psytrance visuals aren't all neon. They mix cosmic cold with Goa warmth: sunset oranges (#f97316), burnt amber (#d97706), deep terra cotta (#b45309)
- **Typography:** Geometric/futuristic headings (Orbitron, Space Grotesk, or custom lettering). Clean sans-serif body (Inter). ALL CAPS for nav labels and section titles. Generous tracking on uppercase text (+0.05em to +0.1em)
- **Imagery:** Sacred geometry (Sri Yantra, Flower of Life, Metatron's Cube), fractals (Mandelbrot, Julia sets), cosmic landscapes (nebulae, aurora), organic psychedelic patterns (Alex Grey-inspired). Never stock photos of clubs or DJs — always cosmic/natural/abstract
- **Layout:** Full-bleed hero sections. Asymmetric, flowing — not rigid grids. Sections that morph into each other (gradient transitions between sections, not hard lines). Content width maxes at 1200px but backgrounds bleed edge-to-edge
- **Texture:** Glow effects (box-shadow: 0 0 30px rgba(accent, 0.3)). Subtle noise/grain overlays (opacity 3-5%). Gradient meshes as backgrounds. Star particle effects (CSS or canvas)
- **Motion:** Slow, hypnotic. Background animations at 20-60s duration. Subtle pulse on accent elements. Parallax scrolling on cosmic backgrounds. Always respect prefers-reduced-motion
- **Audio context:** Many psytrance sites have audio players. The bottom 60-80px of viewport should be kept clear for a persistent player bar

### Common Mistakes
- Making it look like a techno club (cold steel, laser beams, industrial) — psytrance is OUTDOOR and ORGANIC
- Using stock photos of crowds with their hands up — this reads as generic EDM
- Oversaturated gradients everywhere — use gradients deliberately, not as wallpaper
- Forgetting the earthy/warm dimension — pure neon-on-black is cyberpunk, not psytrance
- Making the background too busy — the cosmic imagery should be atmospheric, not attention-competing

### CSS Reference Values
```
--bg-primary: #0a0a0a;
--bg-surface: #1a1a1a;
--bg-elevated: #2a2a2a;
--accent-cyan: #22d3ee;
--accent-purple: #a855f7;
--accent-magenta: #ec4899;
--accent-warm: #f97316;
--text-primary: #f0f0f0;
--text-secondary: #a0a0b0;
--glow-cyan: 0 0 20px rgba(34, 211, 238, 0.3);
--glow-purple: 0 0 20px rgba(168, 85, 247, 0.3);
--font-heading: 'Orbitron', sans-serif;
--font-body: 'Inter', sans-serif;
--border-radius: 8px;
--spacing-unit: 8px;
```

---

## SaaS / Dashboard

### The Visual DNA
Information-dense but not overwhelming. Every pixel serves a purpose. The design must work at 8 hours of daily use — nothing should cause visual fatigue. References: Linear, Vercel, Stripe Dashboard, Notion.

### Key Visual Elements
- **Color:** Neutral base (white or very dark). Single accent color for interactive elements. Gray scale with at least 5 distinct values for hierarchy. Status colors: green (success), yellow (warning), red (error), blue (info) — never used decoratively
- **Typography:** System-style sans-serif at standard sizes. 13-14px for data/tables, 14-16px for body, 18-24px for section headings, 24-32px for page titles. Monospace for numbers in data contexts
- **Layout:** Sidebar navigation (240-280px wide, collapsible). Top bar with breadcrumbs/search. Main content area with cards. 8px grid system. Maximum content width matters less — dashboards often go full-width
- **Components:** Data tables with sorting/filtering, metric cards with sparklines, dropdown menus, command palette (Cmd+K), toast notifications, modal dialogs, form inputs with clear states (default/focus/error/disabled)
- **Texture:** Minimal. Subtle borders (1px solid #e5e5e5), very light shadows (0 1px 3px rgba(0,0,0,0.1)). No gradients except maybe a subtle one on the sidebar
- **Motion:** Functional only. 150ms transitions on hover/focus. No decorative animation. Loading skeletons for async content. Smooth scroll-to-section
- **Density:** Medium. Not cramped, but not spacious. 16-24px gaps between cards, 12-16px padding inside cards, 8px between form elements

### Common Mistakes
- Making it too "designed" — dashboards should be invisible. Users notice the data, not the design
- Too many colors — 3+ accent colors create confusion about what's interactive vs decorative
- Inconsistent component styling — every button, input, and card must look identical to its siblings
- Tiny text — data-heavy doesn't mean small text. 13px minimum, with clear hierarchy
- No empty states — what does a card look like with no data? A table with no rows?

---

## E-commerce / Product

### The Visual DNA
Product is hero. Design exists to sell, not to impress. Every element either builds trust, removes friction, or drives toward purchase. References: Apple Store, Aesop, Mr Porter, Glossier.

### Key Visual Elements
- **Color:** Clean, neutral backgrounds. Product photography dominates the color. Brand accent used only for CTAs (Add to Cart, Buy Now). Never compete with product colors
- **Typography:** Clean, readable. Body at 16px minimum. Product names prominent (18-20px, medium weight). Price displayed clearly (never hidden or small). Review stars visible
- **Layout:** Grid of product cards (2-4 columns). Clear filter/sort sidebar. Product page: large image gallery (left) + details (right). Sticky Add to Cart on mobile
- **Photography:** Consistent aspect ratios (3:4 or 1:1 for product grids). Clean backgrounds (white or lifestyle). Multiple angles. Zoom capability. Consistent lighting across all products
- **Trust signals:** Reviews, ratings, shipping info, return policy, security badges — all visible without scrolling
- **Texture:** Minimal. Product photography is the texture. Very subtle shadows on cards. Clean borders
- **Motion:** Product image gallery transitions. Add-to-cart confirmation animation. Smooth filtering/sorting transitions

### Common Mistakes
- Design overshadowing product — ornate backgrounds, decorative elements competing with product images
- CTA buttons that don't look like buttons (ghost buttons for primary actions)
- Price not immediately visible
- Inconsistent product photography (different backgrounds, lighting, angles)
- No clear path from browse → product → purchase

---

## Portfolio / Creative

### The Visual DNA
The work IS the design. Portfolio sites exist to showcase creative output. The website's design should enhance the work without competing with it. References: personal sites of top designers, photography portfolios, architecture firms.

### Key Visual Elements
- **Color:** Near-monochrome. Black/white/gray with minimal accent. The showcased work provides all the color
- **Typography:** Distinctive heading font that becomes part of the personal brand. Can be more experimental than other genres. Body still needs readability
- **Layout:** Large, full-width project images. Case study format: context → process → outcome. Grid of project thumbnails. Minimal navigation — maybe just logo + work + about + contact
- **Imagery:** The portfolio pieces themselves. Presented large, high-quality, with appropriate context (device mockups for digital, gallery shots for physical)
- **Texture:** Minimal to none. The work is the texture
- **Motion:** Page transitions between projects (smooth, not jarring). Hover effects on project thumbnails (subtle scale or overlay). Scroll-triggered image reveals. Cursor effects (optional, don't overdo)

### Common Mistakes
- The portfolio site design overshadowing the work it contains
- Too many projects — curate ruthlessly (8-12 best pieces, not 40)
- Missing context — just images with no explanation of the problem, process, or outcome
- Slow loading — large unoptimized images killing the experience
- Generic template feel — a creative professional's site should itself demonstrate creativity

---

## Landing Page / Marketing

### The Visual DNA
Single goal: convert visitors. Every section must answer a question or overcome an objection. The visual design creates trust and urgency without feeling manipulative. References: Stripe, Linear, Notion, Arc Browser.

### Key Visual Elements
- **Color:** Brand palette with one high-contrast CTA color. The CTA color should appear nowhere else on the page except call-to-action buttons
- **Typography:** Large, confident headings (48-72px). Clear subheadings (20-24px). Body at 18px for readability. Short paragraphs (2-3 sentences max)
- **Layout structure:**
  1. Hero: headline + subheadline + CTA + visual (above fold)
  2. Social proof: logos, testimonials, or metrics
  3. Features/benefits: 3-4 key points with visuals
  4. How it works: step-by-step with illustrations
  5. More social proof: detailed testimonials or case studies
  6. Pricing (if applicable)
  7. FAQ
  8. Final CTA (repeat of hero CTA)
  9. Footer
- **Imagery:** Product screenshots in device mockups, abstract illustrations, or lifestyle photography that represents the target user
- **Texture:** Subtle gradients, soft shadows, maybe a background pattern or noise. More visual richness than a dashboard, less than a creative portfolio
- **Motion:** Scroll-triggered animations (elements fading/sliding in). Subtle hover effects on cards and buttons. Maybe a hero animation or video

### Common Mistakes
- No clear CTA above the fold
- CTA button that doesn't look clickable (low contrast, ghost button)
- Wall of text in any section — landing pages are scanned, not read
- Feature-focused instead of benefit-focused ("We have X" instead of "You get Y")
- Missing social proof — no testimonials, logos, or metrics

---

## Wellness / Health / Mindfulness

### The Visual DNA
Calm is the mission. Every visual element should lower the viewer's heart rate, not raise it. The design communicates safety, gentleness, and intentional slowness. References: Calm, Headspace, Ritual, Hims/Hers.

### Key Visual Elements
- **Color:** Soft pastels with high lightness (L:85-95%). Sage green (#94a89a), dusty rose (#d4a0a0), soft lavender (#b8b0d0), warm cream (#f5f0e8), sky blue (#a8c8e0). NEVER pure saturated colors. The palette should feel like a watercolor wash
- **Typography:** Rounded sans-serifs (Nunito, Quicksand, DM Sans) or soft humanist serifs (Lora, Merriweather). Large body text (18-20px). Generous line height (1.7-1.8x). Gentle headings — rarely bold, often medium weight
- **Layout:** Spacious. Sections have 80-120px vertical padding. Content width narrow (640-800px). Generous margins. The breathing room IS the design
- **Imagery:** Soft photography — nature, meditation, calm activities. Muted post-processing (reduced contrast, warm tint). Illustration style: organic, flowing, minimal detail. Never: high-contrast photography, urban scenes, cluttered compositions
- **Texture:** Soft gradients (10-15% opacity), organic blob shapes as background elements, very subtle shadows (0 2px 8px rgba(0,0,0,0.05)). No hard edges
- **Motion:** Slow fades (400-600ms), gentle float animations (3-5s cycle, 2-3px movement). Breathing rhythm (8s cycle). NEVER: fast transitions, bouncy effects, jarring entrances

### Common Mistakes
- Using pure white backgrounds (too harsh — use warm off-white #faf8f5 to #f5f0e8)
- Saturated green (wellness ≠ neon green; it's SAGE green, MUTED green)
- CTA buttons that are too aggressive (big, bold, saturated) — use soft-filled buttons with rounded corners
- Overcrowding content — if it doesn't feel like you can breathe, the design fails its purpose

### CSS Reference Values
```
--bg-primary: #faf8f5;
--bg-surface: #f0ede8;
--accent-sage: #94a89a;
--accent-rose: #d4a0a0;
--accent-lavender: #b8b0d0;
--text-primary: #2d2d2d;
--text-secondary: #6b6b6b;
--font-heading: 'DM Sans', sans-serif;
--font-body: 'Nunito', sans-serif;
--border-radius: 16px;
```

---

## Fintech / Banking

### The Visual DNA
Trust is everything. The design must feel trustworthy, competent, and precise BEFORE anything else. Users are trusting you with their money — every design decision should reinforce security and reliability. References: Mercury, Wise, Revolut, Stripe Dashboard.

### Key Visual Elements
- **Color:** Conservative. Navy (#1a2744), dark teal (#0d4a4a), deep emerald (#1a4a3a) as primary. White/light gray backgrounds. Accent used sparingly — often a vibrant blue (#2563eb) or green (#059669) for positive states. NEVER: playful colors, gradients, experimental palettes
- **Typography:** Clean, precise sans-serifs (Inter, SF Pro, Söhne). Monospace for account numbers, amounts, transaction IDs (JetBrains Mono, SF Mono). Numbers are the HERO — they should be large, clear, and use tabular figures
- **Layout:** Dense but organized. Card-based dashboards. Clear data hierarchy: account balance (largest), recent transactions (table), category breakdowns (charts). Consistent 8px grid. Maximum content width for readability
- **Imagery:** Minimal. Data IS the content. When imagery is used: abstract geometric patterns (trust, stability), NOT lifestyle photography (feels salesy). Icons over illustrations
- **Texture:** Minimal to none. Subtle borders (1px #e5e7eb), very light shadows. No gradients, no noise, no grain. CLEAN
- **Motion:** Functional only. Number counter animations (counting up to final value), smooth sorting/filtering transitions. Loading skeletons for financial data. NEVER: decorative animation

### Common Mistakes
- Making it look like a consumer app (rounded, playful, illustrated) — fintech needs to feel like a TOOL
- Using green for non-financial-positive contexts (green = money gained, not "success" in general)
- Showing financial data without clear formatting (commas, currency symbols, decimal alignment)
- Small text for important numbers — account balance should be the largest element on the screen

### CSS Reference Values
```
--bg-primary: #ffffff;
--bg-surface: #f8fafc;
--bg-elevated: #ffffff;
--accent-primary: #1a2744;
--accent-interactive: #2563eb;
--accent-positive: #059669;
--accent-negative: #dc2626;
--text-primary: #0f172a;
--text-secondary: #64748b;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--border-radius: 8px;
```

---

## Education / Learning

### The Visual DNA
Learning is hard. The design's job is to make it feel possible, even fun. Gamification elements, progress tracking, warm encouragement, and clear structure. References: Duolingo, Khan Academy, Brilliant, Codecademy.

### Key Visual Elements
- **Color:** Warm and inviting. Primary often a cheerful green (#22c55e — Duolingo), orange (#f97316 — Khan Academy), or blue (#3b82f6). Warm backgrounds (#fff8f0 to #fef3c7). Progress uses green/gold. Errors are gentle (amber warning, not harsh red)
- **Typography:** Friendly, rounded sans-serif (Nunito Sans, Poppins, DM Sans) for a welcoming feel. Clear hierarchy for instructional content: lesson title (bold, 24-28px), content heading (semibold, 20px), body (regular, 16-18px), caption/hint (regular, 14px, muted)
- **Layout:** Progressive disclosure. Content revealed step by step, not all at once. Cards for lessons/modules. Progress bars everywhere (course progress, lesson progress, daily streak). Clean sidebar for navigation, main area for content
- **Imagery:** Heavy illustration usage — custom, warm, slightly naive style. Characters/mascots (Duolingo's owl). Abstract illustrations for concepts. Photography only for real-world context (cooking lessons, science experiments)
- **Texture:** Playful but controlled. Rounded corners (12-16px), soft shadows, occasional confetti/celebration effects. Background patterns using subtle shapes
- **Motion:** Gamification motion: celebration animations on correct answers, progress bar fills, streak flames, XP counters. Smooth transitions between steps. Character reactions (mascot animations)

### Common Mistakes
- Making it feel like a children's app (too many icons, too bright, too playful) for adult learners
- Dense instructional text with no visual breaks — learning content needs MORE whitespace than marketing
- No progress feedback — learners need constant reinforcement that they're moving forward
- Punishing error states — red X and wrong-answer buzzer. Better: gentle correction with explanation

### CSS Reference Values
```
--bg-primary: #ffffff;
--bg-warm: #fff8f0;
--accent-primary: #22c55e;
--accent-secondary: #f97316;
--accent-gold: #eab308;
--text-primary: #1e293b;
--text-secondary: #64748b;
--font-heading: 'Nunito Sans', sans-serif;
--font-body: 'Nunito Sans', sans-serif;
--border-radius: 12px;
```

---

## Media / Editorial / News

### The Visual DNA
Content is king. Typography, reading experience, and content hierarchy define the design. The design exists to serve the article, not the other way around. References: The Verge, Vox, New York Times, Bloomberg, Axios.

### Key Visual Elements
- **Color:** Near-monochrome base: black text on white background. Brand accent used sparingly (section indicators, links, featured content frames). Each section/vertical may have its own accent color (tech = blue, culture = purple, politics = red)
- **Typography:** THE critical element. Strong editorial typefaces: serif for headlines (New York, Freight Display, Playfair Display), sans-serif for body (Charter, Source Serif 4 for serif body; Inter, Graphik for sans). LARGE text: body at 18-21px, line-height 1.7-1.8, max-width 680px. Pull quotes at 28-36px
- **Layout:** Article format: narrow column (640-720px) for body text. Optional sidebar for related content. Header with section navigation. Sticky header for navigation that minimizes on scroll. Grid layouts for article listings (2-3 column masonry or structured grid)
- **Imagery:** Photography-forward. Large, full-width hero images for feature stories. Consistent aspect ratios in grids (16:9 or 3:2). Image credits visible. Infographics and data visualizations for explainer content
- **Texture:** Minimal. The typography IS the texture. Occasional divider lines (1px #e5e5e5) between sections. No decorative elements competing with content
- **Motion:** Minimal. Smooth scroll, reading progress bar (top of viewport). Image lazy loading with fade. NEVER: animations that interrupt reading flow

### Common Mistakes
- Body text below 16px or above 80 characters per line — immediate readability failure
- Ads or banners breaking the content flow every 2 paragraphs
- Related content widgets more prominent than the article itself
- Hero images without proper art direction (square photo cropped to 16:9 loses the subject's head)

### CSS Reference Values
```
--bg-primary: #ffffff;
--text-primary: #1a1a1a;
--text-secondary: #525252;
--accent-link: #1a73e8;
--font-heading: 'Playfair Display', serif;
--font-body: 'Source Serif 4', serif;
--font-ui: 'Inter', sans-serif;
--max-content-width: 680px;
--border-radius: 4px;
```

---

## Neo-Brutalist / Creative Agency

### The Visual DNA
The antidote to AI Slop. Neo-brutalism is unapologetic, graphic, and impossible to confuse with
a template. It references punk zines, retro posters, and Bauhaus. The aesthetic is deliberately
rough, bold, and high-contrast — the opposite of the smooth purple-gradient default. References:
Gumroad.com, Figma marketing pages, Notion circa 2020.

### Key Visual Elements
- **Color:** Stark white or cream backgrounds (#f4f4f0). Bright, aggressive accent colors:
  neon pink (#FF6B9D), lime green (#BFFF00), electric yellow (#FFE500), hot orange (#FF5722).
  NEVER gradients as backgrounds. SOLID fills only. Black (#000000) as primary structure color
- **Typography:** Massive, bold, commanding. Display fonts: Anton, Space Grotesk Black,
  Clash Display, Archivo Black. Body: Inter or Space Grotesk Regular at 16-18px. ALL CAPS for
  section labels. Numbered sections (01, 02, 03) — the numbering IS a design element
- **Layout:** Rigid grids with VISIBLE thick black borders (border-2 border-black or thicker).
  Cards sit ON a surface, not floating in void. Asymmetric layouts where one column dominates.
  Marquee/ticker scrolling text for skills or statements
- **Shadows:** Solid black offset blocks — NOT blurred soft shadows. Example:
  `shadow: 4px 4px 0px 0px rgba(0,0,0,1)` or `shadow: 6px 6px 0px 0px #FF6B9D`
- **Corners:** SHARP. border-radius: 0 or 2px maximum. The sharpness is the statement.
  Exception: images can be circular or pill-shaped as deliberate contrast
- **Hover states:** Bold and immediate. Invert colors (black → accent, white → black).
  Scale shifts (1.02-1.05). Solid shadow grows on hover. Background color swaps instantly
  (no transition or transition: 100ms max)
- **Texture:** None. Flat is the point. If anything, a subtle dot grid pattern (4-8px dots at
  3% opacity) as background nod to print design. NEVER blur, NEVER glass, NEVER gradient mesh

### Common Mistakes
- Softening it with rounded corners and soft shadows (defeats the entire point)
- Using too many accent colors simultaneously (pick ONE primary accent, ONE secondary)
- Making it look "broken" — brutalism is INTENTIONALLY structured, not actually messy
- Forgetting readability — bold doesn't mean illegible. Body text must be clean and readable
- Mixing brutalist elements with glass-morphism — these are opposite design languages

### CSS Reference Values
```
--bg-primary: #f4f4f0;
--bg-surface: #ffffff;
--border-color: #000000;
--border-width: 2px;
--accent-primary: #FF6B9D;
--accent-secondary: #BFFF00;
--text-primary: #000000;
--text-secondary: #555555;
--shadow-offset: 4px 4px 0px 0px rgba(0,0,0,1);
--shadow-hover: 6px 6px 0px 0px rgba(0,0,0,1);
--font-heading: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--border-radius: 0px;
```

---

## Elegant Brutalism (Hybrid Style)

### The Visual DNA
A fusion of Neo-Brutalist structure (Gumroad) with luxury-grade animation (Aesop). The visual
bones are bold, graphic, and unapologetic. The motion is slow, cinematic, and buttery smooth.
This combination creates "expensive punk" — structural wildness executed with premium polish.
It's extremely effective for portfolio sites and creative agencies.

### Key Visual Elements
- **Structure (from Neo-Brutalism):** Thick black borders, solid offset shadows, flat accent
  colors, sharp corners, visible grid, numbered sections, massive display typography
- **Motion (from Luxury/Aesop):** Framer Motion or equivalent. Slow fade-ins (600-800ms).
  Gentle upward glides as elements enter viewport (translate-y: 20px → 0, ease-out).
  Smooth image reveals (clip-path or opacity). Staggered children (50-100ms delay between
  siblings). NEVER bouncy, NEVER aggressive. The animation contradicts the visual boldness —
  this TENSION is the magic
- **Color:** Warm off-white base (#f4f4f0) + black structure + ONE vibrant accent. The warm
  background softens the brutalist edges just enough to feel intentional, not hostile
- **Typography:** Bold headings animate in with smooth opacity + slight y-translate. Body text
  appears with a simple fade. Text animations are slow (400-600ms) and use ease-out curves
- **Scroll behavior:** Sections reveal with scroll-triggered animations. Each section entrance
  is a mini-event. But the reveal is gentle — no jarring jump-ins, no spring physics

### The Key Principle
The structure says "I'm bold and different." The motion says "I'm refined and considered."
Together they communicate: "I have strong opinions AND the craft to execute them beautifully."
This is the ideal message for a developer/designer portfolio.

### When to Use This
- Developer portfolios (shows both design taste AND technical skill with animations)
- Creative agency sites
- Personal brand sites where standing out matters
- Any brief that says "modern but not generic" or "unique but professional"

### When NOT to Use This
- Corporate / enterprise sites (too unconventional)
- E-commerce (the bold styling competes with products)
- Dashboard / SaaS tools (users need invisible UI, not bold UI)
- Wellness / calm contexts (the brutalist elements create tension, not calm)
