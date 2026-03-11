# Accessibility

## Principles

### Foundation
- Accessibility is not optional — it's a quality marker. Inaccessible design is broken design
- WCAG 2.1 AA is the baseline standard. AAA is aspirational for critical content
- Color must never be the sole indicator of state, error, or meaning
- All interactive elements must be reachable and operable via keyboard
- Motion and animation must respect prefers-reduced-motion
- Text must be resizable to 200% without loss of content or functionality
- Touch targets on mobile must be at least 44x44px (Apple HIG) or 48x48dp (Material)
- Screen reader users navigate by landmarks, headings, and links — structure matters

### APCA Contrast Model (Advanced)
- WCAG 2.x uses a simple luminance ratio (4.5:1 for text, 3:1 for large text). This model has known issues: it overpredicts contrast for dark-on-light and underpredicts for light-on-dark
- **APCA (Accessible Perceptual Contrast Algorithm)** is the next-generation model used by WCAG 3.0 draft. It accounts for:
  - Polarity sensitivity: light text on dark backgrounds needs MORE measured contrast than dark on light to achieve the same PERCEIVED contrast
  - Size and weight: smaller text needs higher contrast values. A 14px font at weight 400 needs Lc 75+, while a 32px font at weight 700 needs only Lc 45+
  - Font smoothing: antialiased text on macOS renders thinner than on Windows — account for this by avoiding weights below 300 for body text on dark backgrounds
- Practical APCA thresholds: Body text (14-16px, weight 400) needs Lc 75+. Large heading (32px+, weight 700) needs Lc 45+. Non-text elements need Lc 30+
- APCA is directional: `contrast(text, background)` gives a different number than `contrast(background, text)`. Always measure text-on-background, not the reverse
- For now, design to WCAG 2.1 AA minimums (4.5:1 / 3:1) as legal baseline, but use APCA as the quality ceiling — it produces more perceptually accurate results

### Cognitive Accessibility
- **Cognitive load**: Users with ADHD, dyslexia, or cognitive disabilities need reduced visual complexity. One idea per section. Short sentences. Clear navigation
- **Predictability**: Interactive elements should behave consistently. If clicking a card in one section opens a modal, clicking a similar card in another section shouldn't navigate to a new page
- **Error recovery**: Allow users to undo actions. Provide clear error messages with HOW to fix (not just "invalid input" — say "Password must be at least 8 characters")
- **Reading level**: Important content should be understandable at an 8th-grade reading level. Use plain language. Avoid jargon unless the audience is specialized
- **Chunking**: Break content into small, manageable groups (Miller's law: 7±2 items). Long lists need categories. Long forms need sections
- **Time pressure**: Never time out critical actions without warning. If a session will expire, warn at least 60 seconds before and allow extension
- **Attention management**: Avoid unexpected content changes (auto-updating feeds, carousels that auto-advance). If content updates, do it outside the user's current focus area

### Motion Accessibility (Beyond prefers-reduced-motion)
- `prefers-reduced-motion: reduce` means REDUCE, not eliminate. Users who set this preference may still want subtle transitions (opacity fades, color changes). They want to avoid: parallax, scroll-jacking, spring animations, decorative motion, auto-playing video
- Three tiers of motion sensitivity:
  - **Vestibular triggers** (highest risk): parallax scrolling, zoom effects, spinning/rotating elements, elements moving along curved paths. MUST be disabled with prefers-reduced-motion
  - **Distraction triggers** (medium risk): auto-playing animations, blinking/flashing, progress bars with motion. SHOULD be reduced to a static state or simple fade
  - **Functional transitions** (lowest risk): hover state changes, focus indicators, page transitions. Can be kept but shortened (reduce duration to 50-100ms)
- Implementation pattern:
  ```css
  /* Default: full animation */
  .hero { animation: float 6s ease-in-out infinite; }
  /* Reduced: static or minimal */
  @media (prefers-reduced-motion: reduce) {
    .hero { animation: none; }
  }
  ```
- WCAG 2.3.3: No animation lasts more than 5 seconds without a pause mechanism. WCAG 2.3.1: Nothing flashes more than 3 times per second

### Accessible Color Palettes
- Design palettes that work for all forms of color vision:
  - **Protanopia** (red-blind, ~1% of males): red and green are indistinguishable. Never use red vs green as the only distinction (e.g., success vs error states)
  - **Deuteranopia** (green-blind, ~5% of males): similar to protanopia. Green/red/orange/brown merge
  - **Tritanopia** (blue-blind, rare): blue and yellow are confounded
- Safe color pairs that work for all types: blue + orange, blue + red, purple + yellow/gold, teal + coral
- Always double-encode with icons, text labels, or patterns in addition to color: checkmark + green, X + red, warning triangle + yellow
- Test palettes with a color blindness simulator (Chrome DevTools has one built in: Rendering > Emulate vision deficiencies)
- For data visualization: use ColorBrewer scales which are designed for color-blind safety. Avoid rainbow/jet color maps

### ARIA Patterns
- **Landmarks**: `<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>` — screen readers use these to jump between page sections. Every page needs at least `<main>`. Only ONE `<main>` per page
- **Live regions**: `aria-live="polite"` for non-urgent updates (notifications, chat messages). `aria-live="assertive"` for critical alerts (errors, system warnings). `role="status"` for live status text
- **Disclosure pattern**: `aria-expanded="true/false"` on the trigger, content toggled via hidden/visible. Use for accordions, dropdowns, collapsible sections
- **Dialog pattern**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title. Focus must be trapped inside the dialog until dismissed. Return focus to trigger element on close
- **Tab pattern**: `role="tablist"` on the container, `role="tab"` on tabs, `role="tabpanel"` on panels. Arrow keys navigate between tabs, Tab key moves into the panel content
- **Heading hierarchy**: h1 → h2 → h3, never skip levels. Screen reader users navigate by heading level — a jump from h2 to h4 makes them think they missed a section
- **Skip navigation**: First focusable element should be a "Skip to main content" link. Especially important for pages with complex headers

### Form Accessibility
- Every input MUST have a visible label (not just placeholder). Labels positioned above or to the left of the input
- Error messages: connected to the input via `aria-describedby`. Displayed near the input (below or to the right), not in a banner at the top
- Required fields: marked with `aria-required="true"` AND a visual indicator (asterisk or "Required" text). Don't rely on color alone
- Autocomplete attributes (`autocomplete="email"`, `autocomplete="name"`) help browsers and password managers fill fields correctly
- Group related fields with `<fieldset>` and `<legend>` — radio groups, checkbox groups, address fields

## Quality Criteria
- FAIL: Text-background contrast ratio below 4.5:1 for normal text (WCAG AA)
- FAIL: Text-background contrast ratio below 3:1 for large text (18px bold / 24px regular)
- FAIL: Non-text contrast (icons, borders, form controls) below 3:1 against background
- FAIL: Interactive elements smaller than 44x44px touch target on mobile
- FAIL: Form inputs without visible labels (placeholder text alone is not a label)
- FAIL: Error states communicated only through color change (e.g., red border with no text/icon)
- FAIL: Auto-playing video or audio with no way to pause
- FAIL: Content that disappears or changes when zoomed to 200%
- FAIL: Focus indicators removed or invisible (outline: none without replacement)
- FAIL: Images conveying information without alt text
- FAIL: Animation exceeding 5 seconds with no pause mechanism
- FAIL: Content flashing more than 3 times per second
- FAIL: Heading levels skipped (h2 → h4 with no h3)
- FAIL: Modal without focus trapping — Tab key escapes behind the modal
- FAIL: Red/green as only distinction between states (error/success)
- PASS: All text meets WCAG AA contrast ratios
- PASS: Clear focus indicators on all interactive elements
- PASS: Error messages include text explanation, not just color
- PASS: Logical heading hierarchy (h1 → h2 → h3, no skipped levels)
- PASS: Form labels visible and programmatically associated with inputs
- PASS: Sufficient spacing between interactive elements to prevent mis-taps
- PASS: prefers-reduced-motion respected — vestibular triggers eliminated, functional transitions reduced
- PASS: Color choices validated against color blindness simulators
- PASS: Skip navigation link present on pages with complex headers

## Anti-patterns
- "Aesthetic over access": Removing focus outlines, using low-contrast text for "clean" look
- "Placeholder-only forms": Inputs with placeholder text as the only label — disappears on focus
- "Tiny tap targets": Small icons or links that are nearly impossible to tap on mobile
- "Color-only status": Green for success, red for error, with no text or icon backup
- "Motion sickness": Aggressive parallax, auto-scrolling, or constant animation with no opt-out
- "Keyboard trap": Focus enters a component (modal, widget) and Tab key cannot escape
- "Heading salad": Headings chosen for visual size instead of document structure — h3 used because it "looks right" not because it's the correct level
- "ARIA overload": Adding aria-label to everything instead of using semantic HTML elements. The first rule of ARIA: don't use ARIA if a native HTML element achieves the same result
