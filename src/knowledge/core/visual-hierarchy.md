# Visual Hierarchy

## Principles

### Core Hierarchy Signals (Ranked by Strength)
- Hierarchy determines reading order: users scan, they don't read. Guide their scan path
- **1. Size**: The strongest hierarchy signal — bigger = more important. A 48px heading dominates a 16px paragraph absolutely
- **2. Contrast** (color, value, saturation): High contrast draws the eye. A bright element on a muted page wins attention
- **3. Position**: Top-left is seen first (in LTR layouts). Above the fold matters more. Central elements get attention
- **4. Isolation** (whitespace around an element): Increases perceived importance. An element with 80px margins feels more important than one with 16px margins
- **5. Color saturation**: The most saturated element on a page becomes the focal point. One bright CTA on a desaturated page = clear hierarchy
- **6. Motion/animation**: Draws the eye — use very sparingly or it steals focus from everything. Motion overrides ALL other hierarchy signals
- **7. Grouping through proximity**: Elements near each other are perceived as related and as one "weight unit"
- **8. Repetition with variation**: Consistent patterns with one "break" element create focal points. A grid of gray cards with one blue card = instant focus

### F-Pattern and Z-Pattern (with research data)
- **F-pattern**: Users scan text-heavy pages in an F shape (Nielsen Norman Group eye-tracking studies). First horizontal scan across the top, second shorter horizontal scan lower, then a vertical scan down the left. Implications:
  - Place the most important content in the first two lines
  - Left-align text for F-pattern compatibility
  - First words of headings and paragraphs carry disproportionate weight
  - Heat map data: top-left quadrant gets 70% of fixation time on text-heavy pages
- **Z-pattern**: For sparse, visual pages (hero sections, landing pages). Eye moves: top-left → top-right → bottom-left → bottom-right. Implications:
  - Logo in top-left (start of Z)
  - CTA or key message in top-right (first Z turn) or bottom-right (end of Z)
  - Supporting content along the diagonal
  - Hero sections should place the headline top-left and the CTA button bottom-right (or centered below)
- **Layer cake pattern**: For mobile — users scan headings (the "layers") and skip body text (the "cake"). Make headings descriptive enough to convey meaning independently

### The Squint Test
- Squint at the design until it blurs, or view it at 25% zoom
- At this blurred view, you should still be able to:
  1. Identify the primary focal point (it should be obvious even blurred)
  2. See the scan path (what comes second, third)
  3. Distinguish groups from each other
  4. Tell the header from the content from the footer
- If the blurred view is uniform gray mush, your hierarchy has failed — every element is competing equally
- The squint test catches hierarchy failures that detailed review misses because it strips away content and reveals pure visual structure

### Hierarchy in Dark Mode
- Dark mode changes hierarchy tools. In light mode, darker = more prominent. In dark mode, LIGHTER = more prominent
- Text hierarchy in dark mode: primary text #f0f0f0, secondary #a0a0a0, tertiary #666666. The lightness gradient creates hierarchy
- In dark mode, saturated accent colors become STRONGER focal points than in light mode (they glow). Use less saturated accents or reduce their area
- Shadows barely work in dark mode — use border or background lightness for elevation instead
- White or very light elements on dark backgrounds have extreme visual weight — use them sparingly and only for the most important elements

### Multi-CTA Layouts
- When a page has multiple calls-to-action (common in SaaS pricing, feature comparisons):
  - **Primary CTA**: Filled button, brand accent color, largest size. Only ONE per viewport
  - **Secondary CTA**: Outlined button or lower-contrast fill. Can appear alongside primary
  - **Tertiary CTA**: Text link style, no fill or outline. For "learn more," "see details"
- If two CTAs must appear side-by-side: one filled (primary action) and one outlined (secondary). NEVER two filled buttons in different colors — the brain can't decide which matters more
- Pricing page exception: the "recommended" plan can have a filled CTA while others have outlined CTAs. The recommended plan card should also be visually elevated (border, scale, or background color change)
- Navigation CTAs: "Sign Up" (filled, accent color) vs "Log In" (text or outlined, neutral). The business wants sign-ups more than logins — hierarchy should reflect business priorities

### Information Density and Hierarchy
- **Low density** (landing pages, portfolios): Hierarchy through size and whitespace. Few elements, each given room to breathe. 1-3 focal points per viewport
- **Medium density** (blog, e-commerce): Hierarchy through grouping and alignment. More elements, organized into clear sections. 3-6 focal points per viewport
- **High density** (dashboards, data apps): Hierarchy through color coding and position. Many elements, organized by function. Focus on reducing noise rather than creating focal points. Use subtle color and weight changes, not size (everything needs to be readable at similar sizes)

## Quality Criteria
- FAIL: Cannot identify the primary action/CTA within 3 seconds of viewing the page
- FAIL: Multiple elements competing for "primary" status — more than one large, bold, colorful item
- FAIL: Secondary content styled as prominently as primary content
- FAIL: Navigation or chrome elements more visually prominent than the main content
- FAIL: Important actions (CTA buttons) in muted colors while decorative elements use bright colors
- FAIL: Everything at the same visual weight — flat hierarchy makes everything feel unimportant
- FAIL: Two filled CTA buttons in different colors side by side — creates "decision paralysis"
- FAIL: F-pattern page with critical content only on the right side (low-attention zone)
- FAIL: Mobile page where headings don't stand alone — users scanning headings can't understand the page
- PASS: Single clear focal point per section/screen
- PASS: CTAs are the most visually prominent interactive element
- PASS: Supporting text is clearly subordinate to headings
- PASS: Visual weight distribution creates a natural scan path through the content
- PASS: Information density decreases from top to bottom (most critical info first)
- PASS: Squint test: hierarchy visible at 25% zoom / blurred view
- PASS: CTA hierarchy clear: primary (filled, bright) > secondary (outlined) > tertiary (text link)

## Anti-patterns
- "Democracy of elements": Every element equally sized, weighted, and colored — nothing stands out
- "Buried CTA": The most important action hidden or styled like body text
- "Decoration over function": Ornamental elements more prominent than actionable ones
- "Reverse hierarchy": Supporting details more prominent than the main message
- "Attention split": Two equally prominent focal points creating visual confusion
- "Motion thief": Animated decoration stealing focus from the actual content or CTA
- "Dark mode wash": All text the same brightness in dark mode — no hierarchy between primary, secondary, and tertiary text
