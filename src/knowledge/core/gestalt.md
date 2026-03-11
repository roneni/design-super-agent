# Gestalt Principles

## Principles

### Proximity
- Elements close together are perceived as a group. Distance = separation
- This is the MOST powerful grouping principle — it overrides color, shape, and size
- **CSS/layout application**: Form label spacing. The label must be closer to its input than to the previous input. If label-to-input gap is 4px, input-to-next-label gap must be at least 16px (4x ratio minimum)
- **Card layouts**: Padding inside a card (16-24px) must be LESS than the gap between cards (24-48px). Otherwise, inter-card space feels like intra-card space and grouping breaks down
- **Section spacing**: Between related elements within a section (16-32px) must be noticeably less than between sections (48-120px). A 2x minimum ratio; 3x is better
- **Navigation**: Group related nav items with tighter spacing, separate groups with wider gaps or dividers. Don't space all items equally unless they're all equivalent

### Similarity
- Elements sharing visual properties (color, shape, size) are grouped mentally
- The more properties shared, the stronger the grouping: same color + same size + same shape = unmistakably grouped
- **CSS/layout application**: All cards in a grid should have identical border-radius, shadow, and padding. ONE card with different styling will be perceived as different in PURPOSE, not just appearance
- **Interactive elements**: All clickable elements should share a visual treatment (fill color, cursor change, hover effect). If some buttons are filled and others are outlined, the outlined ones feel "less clickable"
- **Status indicators**: Use color + shape + position for similarity grouping. A red dot in the same position on each card = consistent status pattern. Different dot positions per card = visual noise

### Continuity
- The eye follows smooth lines and curves, connecting elements along a path
- **CSS/layout application**: Elements arranged along an invisible line (even if not touching) feel connected. A vertical list of left-aligned items creates continuity along the left edge
- **Scroll flows**: Content that follows a path (e.g., timeline with alternating left/right, or a curved infographic) leverages continuity to guide the eye
- Use borders, lines, or background color strips to reinforce continuity when element spacing alone isn't enough

### Closure
- The mind fills in missing parts to perceive complete shapes — don't overdefine
- **CSS/layout application**: A card doesn't need a visible border on ALL sides if it has a background fill and padding — the eye completes the container
- Progress indicators: partial circles, dashed lines, or partially filled bars. The brain completes the shape and understands "in progress"
- Logo design: Negative space logos (FedEx arrow, NBC peacock) use closure to create shapes that feel more discovered than designed — making them memorable

### Figure-Ground
- Every visual field has foreground elements and background — make the distinction clear
- **CSS/layout application**: Cards need CLEAR figure-ground separation from their container: use background color difference (at least 5% lightness shift), OR shadow (`box-shadow: 0 1px 3px rgba(0,0,0,0.1)`), OR border (1px solid with at least 10% contrast)
- **Modals and overlays**: The overlay background (backdrop) MUST dim or blur the content behind it. Without this, the modal merges with the page. `background: rgba(0,0,0,0.5)` minimum, or use `backdrop-filter: blur(4px)`
- **Dark mode figure-ground**: In dark mode, cards are LIGHTER than background (reversed from light mode). Surface elevation: background #0a0a0a → card #1a1a1a → raised #2a2a2a. Each level is 10-15% lighter
- Reversible figure-ground (Escher-style) can be used deliberately in creative contexts but causes confusion in functional UI

### Common Region
- Elements within a shared boundary (card, box, section) are perceived as a group
- **CSS/layout application**: A `<fieldset>` or a card wrapping form elements creates grouping even without proximity. Background color blocks (`<section>` with distinct fill) group all contents
- Nested common regions: a card (region) inside a section (region) creates hierarchy. But limit nesting to 2-3 levels — deeper nesting creates "box inception" confusion
- Alternatives to visible borders: background color shift, shadow boundary, or even a heading that spans the group width all create perceived boundaries

### Common Fate
- Elements moving in the same direction are perceived as related (for animations)
- **CSS/layout application**: Staggered entrance animations — elements that animate in together (same timing, same direction) are grouped. Elements with different animation timing/direction feel separate
- Loading skeletons: shimmer animations should move in the same direction across all skeleton elements on a card — this reinforces that they're parts of one loading item
- List reordering: items that animate to their new positions feel like "the same group rearranging." Items that instantly teleport feel like "a different list replaced the old one"

### Pragnanz (Law of Simplicity)
- The mind perceives the simplest possible interpretation of visual input
- Given ambiguous shapes, the brain defaults to the most regular, symmetrical, ordered interpretation
- **Design implication**: If your layout can be interpreted two ways, simplify until there's only one reading. If a user has to THINK about where one group ends and another begins, the grouping has failed
- Complex dashboards need explicit grouping (background regions, dividers, spacing) because the data alone may be ambiguous

### Past Experience
- Perception is influenced by prior encounters. Users EXPECT certain visual patterns to mean certain things
- Blue underlined text = link. Red = error/danger. Green = success. Toggle with dot = on/off switch
- Breaking these conventions is possible but expensive — you must teach the new pattern, and many users won't learn it
- **Design implication**: When possible, leverage existing expectations. A search icon (magnifying glass) in the top-right corner is instantly understood. A custom icon for search requires a label

### Conflicting Principles: Proximity vs Similarity
- When principles conflict, proximity WINS in most cases
- Example: a grid of items where some are blue and some are red, but blue and red items are interleaved in rows. Users group by ROW (proximity) not by COLOR (similarity)
- To override this: make the similarity signal MUCH stronger (double the color saturation, add a shape change), or add common region boundaries around the similarity groups
- In navigation: items close together are grouped even if they have different icons (proximity). To group by icon similarity, you need to also add section headers or dividers (common region reinforcing similarity)

## Quality Criteria
- FAIL: Related items spaced far apart while unrelated items are adjacent — confuses grouping
- FAIL: Cards or containers with no clear boundary (no background, border, or shadow) — unclear grouping
- FAIL: Interactive elements that look like static decoration (e.g., clickable text with no visual affordance)
- FAIL: Static elements that look interactive (underlined non-link text, button-shaped decorations)
- FAIL: Figure and ground have insufficient contrast — content merges with background
- FAIL: Labels physically distant from the thing they label — unclear which label belongs to which element
- FAIL: Form label closer to the PREVIOUS input than to its own input
- FAIL: Card internal padding >= card-to-card gap — groups merge into one undifferentiated mass
- FAIL: Modal without backdrop dimming — figure-ground distinction lost
- PASS: Related form fields grouped visually with consistent spacing
- PASS: Navigation items grouped and visually distinct from content
- PASS: Cards with clear boundaries (background fill, shadow, or border)
- PASS: Consistent visual treatment for all elements of the same type (all buttons look alike)
- PASS: Clear figure-ground: content obviously sits on/above the background
- PASS: Proximity ratios maintained: intra-group spacing < inter-group spacing by at least 2x

## Anti-patterns
- "Scattered family": Related controls spread across the page with unrelated items between them
- "Ghost buttons": Interactive elements with no visual affordance — users don't know they can click
- "False affordance": Non-interactive elements styled like buttons or links
- "Merger": Content blending into its background due to insufficient contrast or boundaries
- "Orphan label": A label positioned ambiguously between two elements — which does it belong to?
- "Box inception": 4+ levels of nested containers (card in section in panel in page) — the nesting creates visual complexity that overwhelms the content
- "Gestalt contradiction": Using proximity to suggest one grouping but color to suggest a different grouping, with neither clearly dominant — the brain oscillates between interpretations
