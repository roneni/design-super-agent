# Typography

## Principles

### Type Anatomy and Why It Matters
- **x-height**: The height of lowercase letters (measured from baseline to top of 'x'). Fonts with large x-height (Inter, Roboto) are more readable at small sizes. Fonts with small x-height (Garamond, Didot) feel more elegant but need larger sizes
- **Counters**: The enclosed or partially enclosed spaces within letters (the hole in 'o', 'e', 'a'). Open counters = better legibility at small sizes. Closed/narrow counters = more distinctive at display sizes
- **Ascenders and descenders**: Letters like 'h' and 'p' that extend above x-height or below baseline. Long ascenders/descenders need more line-height. Short ones allow tighter leading
- **Stroke contrast**: The difference between thick and thin strokes. High contrast (Bodoni, Didot) = dramatic, editorial, formal. Low contrast (Futura, Helvetica) = stable, modern, neutral
- **Terminals**: How strokes end. Ball terminals (Bodoni) = classic. Flat/angled cuts (Futura) = geometric. Tapered (Garamond) = organic. This subtlety affects perceived warmth
- Why anatomy matters for pairing: pair fonts with CONTRASTING anatomy — different stroke contrast, different x-height proportions, different terminal styles. Two fonts with similar anatomy fight rather than complement

### Optical vs Mathematical Sizing
- Mathematical: setting all elements to the exact same pixel value. Optical: adjusting until they LOOK the same size
- Round letters (O, C, G, S) must overshoot the baseline and cap-height slightly to appear the same size as flat letters (H, I, E). Good fonts do this automatically, but you still need to account for it in layout
- Icons next to text: a 16px icon next to 16px text usually looks smaller. Size the icon 2-4px larger for optical alignment
- Centered text in a button: mathematical center looks too low because of descender space. Shift text up 1-2px or add 1-2px more padding-bottom than padding-top
- ALL CAPS text appears larger than mixed case at the same font size. Reduce font-size by 1-2px for optical equivalence, or increase letter-spacing by +0.05em to +0.1em to compensate for the visual density

### Type Scales
- A type scale creates rhythm: use a mathematical ratio between sizes
- **Minor third (1.2)**: Subtle steps — 12, 14.4, 17.3, 20.7, 24.9. Good for dense UIs, dashboards
- **Major third (1.25)**: Standard web — 12, 15, 18.75, 23.4, 29.3. Most versatile
- **Perfect fourth (1.333)**: Clear hierarchy — 12, 16, 21.3, 28.4, 37.9. Good for editorial, marketing
- **Perfect fifth (1.5)**: Dramatic jumps — 12, 18, 27, 40.5, 60.75. Hero-heavy landing pages, posters
- **Golden ratio (1.618)**: Maximum drama — 12, 19.4, 31.4, 50.8, 82.1. Use only for very sparse, typographic layouts
- Pick ONE ratio and derive ALL sizes from it. Mixing ratios creates "why does this size exist?" confusion
- Practical web scale (major third): 12px (caption), 14px (small), 16px (body), 20px (h4), 24px (h3), 30px (h2), 36px (h1), 48px (display), 64px (hero)

### Core Rules
- Typography is the backbone of visual hierarchy — size, weight, and spacing establish reading order
- Maximum 2 font families per design: one for headings, one for body. More than 2 creates visual noise. Exception: a third monospace font for code/data contexts
- Line height (leading) for body text: 1.4-1.6x the font size. Tighter for headings (1.1-1.3x). Larger text needs proportionally less line-height
- Line length for readability: 45-75 characters per line. Over 80 chars causes eye fatigue. Under 30 chars causes too many line breaks
- Letter spacing: headings can be tighter (-0.01 to -0.03em); body should be at default or slightly loose. ALL CAPS always needs positive tracking (+0.05em minimum)
- Font weight contrast between heading and body should be at least 2 steps (e.g., 700 heading, 400 body)
- Serif fonts convey tradition, authority, editorial quality. Sans-serif conveys modernity, clarity, tech
- Monospace fonts signal code, data, technical content — never use for body text in marketing

### Micro-typography
- **Hanging punctuation**: Quotation marks and bullets at line start should hang outside the text margin for clean optical alignment
- **Orphans and widows**: A single word on the last line of a paragraph (widow) or a single line of a paragraph at the top of a new column/page (orphan). Both look sloppy — adjust text or width to prevent
- **Ligatures**: Connected letter pairs (fi, fl, ff). Enable via `font-feature-settings: "liga" 1`. Adds polish in editorial contexts
- **Tabular vs proportional figures**: Use tabular (monospaced) numbers for columns, tables, prices, countdowns — so digits align vertically. Use proportional numbers for body text
- **Smart quotes**: Use curly quotes ("") not straight quotes (""). CSS: `quotes: "\201C" "\201D" "\2018" "\2019"`
- **Em dashes, en dashes, hyphens**: Hyphen (-) for compound words. En dash (–) for ranges (1–10). Em dash (—) for parenthetical breaks. Using hyphens for all three is a quality signal failure
- **Whitespace characters**: Use thin spaces around em dashes. Use non-breaking spaces before units (100 km, not 100\nkm)

### Variable Fonts
- Variable fonts contain an entire family in one file — weight, width, optical size, slant as continuous axes
- Performance: one variable font file replaces 6-10 static font files. Significant load time reduction
- Animation: weight, width, and other axes can be animated smoothly via CSS transitions
- Optical size axis (opsz): automatically adjusts letterforms for the size they're rendered at — thinner strokes at large sizes, thicker at small. Inter, Roboto Flex, and Source Sans 3 support this
- Use `font-variation-settings` or the standard properties (`font-weight`, `font-stretch`, `font-style`) which map to axes
- Grade axis: adjusts weight without changing the width of characters — useful for dark mode (increase grade slightly to compensate for the halation of light text on dark backgrounds)

## Quality Criteria
- FAIL: More than 3 font families in a single design
- FAIL: Body text below 14px on web or 12pt on mobile — too small for comfortable reading
- FAIL: Line length exceeding 80 characters per line on any text block
- FAIL: Insufficient line height (below 1.3x) on body text longer than 2 lines
- FAIL: Heading and body text at the same size or weight — destroys hierarchy
- FAIL: ALL CAPS text longer than 3 words in body content (nav labels and buttons are acceptable)
- FAIL: Centered text blocks longer than 3 lines — hard to find line beginnings
- FAIL: More than 4 distinct text sizes on a single screen — indicates no type scale
- FAIL: Decorative/display font used for body text — unreadable at small sizes
- FAIL: Straight quotes in visible content instead of smart/curly quotes
- FAIL: Mixing tabular and proportional figures in a data table
- FAIL: No type scale — sizes appear arbitrary (14px here, 17px there, 22px elsewhere)
- PASS: Clear type scale with consistent ratios between sizes
- PASS: Strong visual distinction between heading levels (size, weight, or color)
- PASS: Body text at 16-18px with 1.5x line height on web
- PASS: Font pairing with contrasting characteristics (e.g., geometric sans + humanist serif)
- PASS: Consistent text alignment throughout a section (don't mix left, center, right)
- PASS: ALL CAPS text with increased letter-spacing (+0.05em or more)
- PASS: Variable font used with optical size axis for multi-size type systems

## Anti-patterns
- "Font zoo": 4+ different fonts fighting for attention
- "Wall of text": No size variation, every text element the same size and weight
- "Whisper text": Critical information in tiny, low-contrast text
- "Scream heading": Oversized heading that dominates at the expense of content
- "Comic Sans syndrome": Using playful/casual fonts in professional contexts (or vice versa)
- "Weight abuse": Using bold for everything, which makes nothing bold. Or ultra-thin weights for body text (below 300 weight, readability collapses)
- "Tracking crimes": Negative letter-spacing on body text (unreadable) or no extra tracking on ALL CAPS (feels cramped)
