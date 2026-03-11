# Composition & Layout

## Principles

### Visual Weight Theory
- Every element has "visual weight" — the degree to which it attracts the eye
- Factors that increase visual weight: larger size, higher contrast, warmer color, higher saturation, irregular shape, isolation (surrounded by whitespace), motion/animation, human faces, text content
- A composition is "balanced" when the visual weight feels evenly distributed, NOT when elements are symmetrically placed. A small, bright red element can balance a large, muted gray area
- Center of visual gravity: where the cumulative weight of all elements "pulls" the viewer's eye. In a good composition, this center is near the geometric center OR intentionally offset for dynamic tension
- Heavy elements at the top feel unstable/dramatic (top-heavy). Heavy elements at the bottom feel grounded/stable. Choose based on the emotional intent

### Dynamic vs Static Composition
- **Static composition**: Symmetrical, centered, horizontal/vertical emphasis. Communicates stability, authority, permanence. Use for: institutions, luxury brands, government, corporate
- **Dynamic composition**: Asymmetrical, diagonal lines, off-center focal points, varying element sizes. Communicates energy, modernity, creativity. Use for: startups, creative agencies, music, events
- **Diagonal lines** create movement and energy — even subtle 2-5 degree rotations add dynamism. But diagonal text is almost never appropriate for readability
- **Circular composition**: Elements arranged in or around a circular flow. Creates continuity, community, wholeness. Use for: spiritual, wellness, community-focused designs
- The grid provides static structure; breaking the grid creates dynamic moments. Best designs do BOTH — establish the grid, then break it in one controlled place for the focal point

### Negative Space as Active Element
- Negative space (whitespace) is not "empty" — it is an active design element that shapes the positive space
- Micro whitespace: padding within components (8-16px). Controls readability and touch-target comfort
- Macro whitespace: margins between sections (48-120px). Controls pacing and breathing room
- Negative space communicates: luxury (lots of space = "we don't need to fill it"), confidence, focus
- Reducing negative space communicates: urgency, density, information-richness, affordability
- The FedEx arrow: negative space can form intentional shapes. At master level, the space BETWEEN elements is designed as carefully as the elements themselves
- Active negative space: deliberately shaped whitespace that guides the eye (e.g., a column of space between two content areas that your eye follows downward)

### Viewport-Relative Composition
- Web compositions must work at multiple viewport sizes — a fixed-pixel composition will break
- **Full-bleed heroes**: 100vw x 100vh (or 100svh on mobile to account for browser chrome). Content centered both axes. Max-width on text (600-800px) to prevent line length issues on ultrawide
- **Content sections**: max-width 1200-1440px, centered with auto margins. Internal padding: 5-8vw on sides to maintain breathing room on all screens
- **Section height**: avoid fixed heights. Use padding (80-120px vertical) to create consistent rhythm. Content determines height; padding determines rhythm
- **Viewport breakpoints and composition shifts**: the composition should evolve, not just shrink. A 3-column layout becomes 2-column on tablet, 1-column on mobile. The COMPOSITION changes, not just the size
- **Safe areas**: on mobile, account for notches (env(safe-area-inset-*)), bottom bars, and status bars. On desktop, account for scrollbars (use `scrollbar-gutter: stable` to prevent layout shift)

### Scroll Rhythm
- A well-designed page has a scroll RHYTHM — alternating between dense and sparse, between light and dark, between text and image
- **Section pacing**: Hero (high impact, sparse) → Feature grid (medium density) → Testimonial (sparse, breathing room) → Feature detail (medium) → CTA (high impact, sparse). The rhythm is: HIGH-MED-LOW-MED-HIGH
- **Scroll cues**: at every screen boundary, content should be partially visible to signal "there's more." Never let a viewport boundary coincide with a section boundary (The Cliff anti-pattern)
- **Parallax depth**: background elements scroll slower, foreground elements scroll faster. Creates depth. Use sparingly — excessive parallax causes motion sickness. Max: 2 parallax layers
- **Section transitions**: hard horizontal lines between sections feel rigid. Better: gradient fades, overlapping elements, or shared background colors that span section boundaries
- **Vertical rhythm**: establish a baseline grid (e.g., 8px) and ensure all spacing is a multiple. This creates a subconscious "rightness" even if users can't articulate why

### Core Layout Rules
- Every composition needs a clear entry point — the first thing the eye sees
- Visual flow follows reading patterns: F-pattern for text-heavy pages, Z-pattern for hero sections
- Rule of thirds: place key elements at intersection points of a 3x3 grid for natural balance
- Golden ratio (1:1.618) creates pleasing proportions for width/height relationships
- Whitespace is not empty — it's active. It separates groups, creates breathing room, and directs focus
- Grid systems create alignment and consistency. 4, 8, or 12-column grids are standard
- Alignment is the strongest silent organizer — misaligned elements feel broken
- Symmetry conveys stability and formality; asymmetry conveys dynamism and modernity
- Every element should have a clear relationship to at least one other element (alignment, proximity, or visual connection)

## Quality Criteria
- FAIL: Elements that appear randomly placed with no alignment to a grid or other elements
- FAIL: Content touching the edges of its container with no padding — feels cramped
- FAIL: Inconsistent spacing between similar elements (e.g., cards with varying gaps)
- FAIL: Orphaned elements — a single item visually disconnected from all groups
- FAIL: Content exceeding 1440px wide without max-width constraint — creates uncomfortably long lines
- FAIL: No visual entry point — everything competes equally for attention
- FAIL: Dense layout with no whitespace — creates visual fatigue
- FAIL: Inconsistent padding/margins — 16px here, 23px there, 12px elsewhere
- FAIL: Section boundary perfectly aligned with viewport boundary — creates "The Cliff" (no scroll cue)
- FAIL: More than 2 parallax layers — creates visual noise and motion sickness risk
- FAIL: Fixed-height sections that clip content at certain viewport sizes
- PASS: Consistent spacing system (4px/8px base unit)
- PASS: Clear visual hierarchy from primary → secondary → tertiary content
- PASS: Adequate padding inside containers (minimum 16px on web, 12px on mobile)
- PASS: Responsive considerations — content reflows sensibly at different widths
- PASS: Breathing room around text blocks — not wall-to-wall text
- PASS: Scroll rhythm alternates between dense/sparse, creating pacing
- PASS: Negative space is intentional and shaped, not accidental leftover area

## Anti-patterns
- "Tetris layout": Every pixel filled, zero whitespace, claustrophobic
- "Floating island": Important element isolated with no visual connection to anything
- "Alignment salad": Left-aligned here, centered there, right-aligned randomly
- "Spacing roulette": Every gap between elements is a different size for no reason
- "The void": Excessive whitespace that makes content feel lost and disconnected
- "Pixel-perfect symmetry trap": Forcing symmetry where content naturally isn't symmetric — looks rigid and artificial
- "The Cliff": Section ends exactly at viewport edge with no visual cue that content continues below
- "Scroll hijack": Overriding native scroll behavior with custom physics — disorients users and breaks accessibility
