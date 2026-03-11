# Font Pairings

## Purpose
Tested typographic combinations with context on why they work, what mood they create, and when to use them. A font pairing is not just two fonts — it's a relationship between heading personality and body readability.

---

## The Pairing Principle
The best pairings create **contrast with harmony**: different enough to establish hierarchy, similar enough to feel like they belong together. Contrast comes from structure (geometric vs humanist), weight (bold vs light), or style (serif vs sans-serif). Harmony comes from shared proportions, x-height, or historical era.

---

## Modern & Clean

### Inter + Inter
- Heading: Inter 700 (bold), Body: Inter 400 (regular)
- **Why it works:** Single-family pairing. Inter was designed for screens with adjustable optical sizing. Using weight alone for hierarchy is the safest, most consistent choice.
- **Best for:** SaaS products, dashboards, documentation, any UI-heavy application
- **Signature:** Set headings with slight negative letter-spacing (-0.02em) and body at default. The weight contrast does the work.

### Geist + Geist
- Heading: Geist Sans 700, Body: Geist Sans 400
- **Why it works:** Vercel's system font. Clean, geometric, optimized for code-adjacent contexts. Monospace variant (Geist Mono) available for code blocks.
- **Best for:** Developer tools, tech products, modern SaaS

### Satoshi + Inter
- Heading: Satoshi 900 (black), Body: Inter 400
- **Why it works:** Satoshi has geometric personality with slightly quirky letter shapes (look at the 'a' and 'g'). Inter provides neutral readability. The contrast is subtle — both are geometric sans-serifs, but Satoshi has character.
- **Best for:** Startups, creative tools, modern brands that want personality without eccentricity

### Space Grotesk + DM Sans
- Heading: Space Grotesk 700, Body: DM Sans 400
- **Why it works:** Space Grotesk has distinctive mono-linear strokes and unique character shapes. DM Sans is warm and readable. Both are geometric but Space Grotesk adds technical flair.
- **Best for:** Tech companies, fintech, crypto, aerospace, data products

---

## Editorial & Sophisticated

### Playfair Display + Source Sans 3
- Heading: Playfair Display 700, Body: Source Sans 3 400
- **Why it works:** Classic serif-meets-sans pairing. Playfair's high contrast (thick/thin strokes) creates drama in headings. Source Sans provides clean, humanist readability for body text.
- **Best for:** Editorial, magazines, luxury brands, restaurants, fashion

### Fraunces + Work Sans
- Heading: Fraunces 800 (variable soft/wonky axis), Body: Work Sans 400
- **Why it works:** Fraunces is an "old-style soft serif" with optical personality — slightly quirky, warm, approachable luxury. Work Sans is neutral enough to not compete.
- **Best for:** Premium food/beverage, artisan brands, boutique hotels, lifestyle editorial

### Instrument Serif + Instrument Sans
- Heading: Instrument Serif 400 (it only needs regular weight — it's dramatic by nature), Body: Instrument Sans 400
- **Why it works:** Same family, designed as a pair. The serif is high-contrast and elegant; the sans is crisp and modern. Zero risk of clash.
- **Best for:** Galleries, fashion, architecture, design studios, portfolio sites

### Cormorant Garamond + Montserrat
- Heading: Cormorant Garamond 600, Body: Montserrat 400
- **Why it works:** Cormorant is an elegant, high-contrast display serif inspired by Garamond but designed for screens. Montserrat's geometric structure provides clean contrast. The combination reads as "classical culture meets modern clarity."
- **Best for:** Museums, classical music, wine, luxury retail, wedding/events

---

## Bold & Expressive

### Orbitron + Inter
- Heading: Orbitron 700, Body: Inter 400
- **Why it works:** Orbitron is a geometric, futuristic display font with sharp, angular forms. It screams sci-fi/tech/space. Inter provides grounding readability. The extreme contrast between Orbitron's personality and Inter's neutrality makes both stronger.
- **Best for:** Psytrance/electronic music, gaming, sci-fi, space technology, cyberpunk
- **Warning:** Orbitron is unreadable below 18px. Heading-only.

### Clash Display + General Sans
- Heading: Clash Display 700, Body: General Sans 400
- **Why it works:** Clash Display has ultra-wide proportions and geometric quirks that make headings feel bold and contemporary. General Sans provides warmth and readability.
- **Best for:** Creative agencies, portfolio sites, fashion, music, youth culture

### Syne + Inter
- Heading: Syne 700-800, Body: Inter 400
- **Why it works:** Syne has unusual letter construction — the 'e' is distinctive, the 'y' is unique. It reads as artistic and intentional. Not for everyone, which is the point — it has a strong opinion.
- **Best for:** Art galleries, experimental design, creative studios, underground culture

### Space Mono + Space Grotesk
- Heading: Space Mono 700, Body: Space Grotesk 400
- **Why it works:** Both from the Space family. Mono headings add technical/hacker aesthetic. Grotesk body is readable. The monospace heading is unusual and attention-grabbing.
- **Best for:** Developer portfolios, hacker culture, terminal aesthetics, code-adjacent brands

---

## Warm & Approachable

### Cabinet Grotesk + DM Sans
- Heading: Cabinet Grotesk 800, Body: DM Sans 400
- **Why it works:** Cabinet Grotesk's rounded terminals and wide proportions feel friendly and bold. DM Sans matches the warmth while staying readable.
- **Best for:** Consumer apps, food delivery, social platforms, community tools

### Bricolage Grotesque + Nunito Sans
- Heading: Bricolage Grotesque 700, Body: Nunito Sans 400
- **Why it works:** Bricolage has a handcrafted, slightly imperfect quality — like a skilled sign painter. Nunito Sans is round and friendly. Together they feel human-made.
- **Best for:** Artisan brands, organic food, craft businesses, community platforms, children's products

### Outfit + Source Sans 3
- Heading: Outfit 700, Body: Source Sans 3 400
- **Why it works:** Outfit is geometric with softened edges — modern but not cold. Source Sans adds professionalism. Friendly enough for consumers, serious enough for business.
- **Best for:** Startups, productivity tools, health/wellness, education

---

## Rules for Font Pairing

1. **Max 2 families.** If you think you need 3, you don't — you need better hierarchy with 2.
2. **Heading font can have personality. Body font must be neutral.** Nobody reads a novel in a display font.
3. **Match x-height.** If heading and body fonts have wildly different x-heights, sizes look inconsistent even when they're mathematically correct.
4. **Never pair two personality fonts.** Two decorative fonts fight each other. One leads, one supports.
5. **Variable fonts are superior.** One file, all weights. Use them when available — Inter, Fraunces, Space Grotesk are all variable.
6. **Test at actual sizes.** A heading font that looks great at 48px might be ugly at 24px. A body font must be readable at 16px.
7. **Check Google Fonts or Fontsource.** Both are free, CDN-delivered, and cover all the fonts listed here.
