# Iteration Awareness

## Purpose
Iteration should be additive, not destructive. The biggest risk in design iteration is regression — fixing one thing while breaking something that was already working. This module teaches the agent to study existing work before modifying it, protect strong elements, and detect regression.

---

## Study Before Modifying

### The Director's First Duty
Before rebuilding or significantly modifying ANY existing design, the director must:

1. **Screenshot the current state** — visual record of what exists. This becomes the comparison reference
2. **Identify what works** — list specific elements that are successful:
   - Elements that contribute to the mood/brand
   - Elements that received positive user feedback
   - Signature elements that make the design recognizable
   - Elements that solve specific problems well (navigation, hierarchy, CTA placement)
3. **Identify what doesn't work** — list specific failures with evidence
4. **Declare protected elements** — elements from the "works" list that MUST survive the iteration. These are non-negotiable
5. **Plan the change** — the iteration should modify the failures while explicitly preserving the protected elements

### The Sacred Geometry Incident (Case Study)
- Previous version of psychedelic-universe.com had a rotating sacred geometry mandala in the hero section
- This element was a SIGNATURE — it communicated psytrance culture, created depth through multi-speed rotation, and was the "stop scrolling" moment
- During a rebuild, the new version buried sacred geometry in the About section at 12% opacity
- This was a catastrophic regression. The rebuild improved some things (layout, typography) but destroyed the most valuable element
- **The rule**: If a previous version has a strong element that fits the design language, PROTECT it. Don't tear down a load-bearing wall just because you're renovating the kitchen

---

## Regression Detection

### The Regression Trap
Regression occurs when fixing one problem introduces or reveals another:
- Improving typography → reveals that the color palette now feels weak (was hidden by bad typography)
- Fixing layout alignment → makes the spacing inconsistencies MORE visible (was masked by the misalignment)
- Adding motion design → steals focus from the CTA (was prominent when nothing moved)

### Regression Checklist
After EVERY iteration, compare the new version against the previous version:

1. **Protected elements**: Are all declared protected elements still present and effective?
2. **Hierarchy**: Is the visual hierarchy still clear? (New elements may have disrupted the scan path)
3. **Mood**: Does the design still evoke the same emotional tone? (Color/layout changes can shift mood unintentionally)
4. **Functionality**: Do all interactive elements still work? (Layout changes can break click targets, overflow states)
5. **Performance**: Does the design still load/render quickly? (Added animations or images may degrade performance)
6. **Responsive**: Do layout changes hold at all breakpoints? (A fix at desktop may break at mobile)

### Diff-Based Reviews
- Don't review the new version in isolation — review it AGAINST the previous version
- For visual designs: side-by-side screenshot comparison
- For code: `git diff` to see exactly what changed
- The question isn't "Is this good?" but "Is this BETTER THAN what we had, while losing NOTHING that was working?"

---

## When to Iterate vs Restart

### Iterate (Change < 50%)
- The core structure is sound — layout grid, component architecture, color foundation
- Problems are localized — specific sections, specific components, specific details
- The design has earned elements — things that work well and should be preserved
- Iteration is additive: polish existing work, fix specific failures, add missing elements

### Restart (Change > 50%)
- The fundamental approach is wrong — wrong genre, wrong mood, wrong target audience
- The layout structure doesn't support the content architecture
- More things need changing than preserving
- The brief has changed significantly since the original design
- But even when restarting: study the previous version for elements worth preserving. A restart doesn't mean "forget everything" — it means "rebuild the foundation but keep the gems"

### The 3-Iteration Rule
- If the SAME element has been rejected and revised 3 times without satisfactory improvement, the problem is likely STRUCTURAL, not cosmetic
- Structural problems can't be solved by iteration — they require a different approach
- Example: if the hero section has been revised 3 times and still doesn't feel right, the issue might not be the hero — it might be the page layout, the color palette, or the overall design direction that's making the hero fail

---

## Reference Anchoring

### Keep the Reference Visible
- During iteration, the reference material (mood board, exemplary sites, artist references) should remain accessible at every step
- The reference prevents "drift" — the gradual movement away from the original vision through accumulated small changes
- Each iteration should be compared to BOTH the previous version AND the original reference
- If the design is drifting away from the reference, check whether the drift is intentional (creative evolution) or accidental (losing the thread)

### The Two-Reference Method
1. **Floor reference**: The current version — the minimum quality level that must be maintained
2. **Ceiling reference**: The inspiration — the quality level being aspired toward
- Every iteration should move UPWARD from floor toward ceiling, never sideways (changing without improving) or downward (regressing)

---

## Encoding Iteration Awareness in the Workflow

### Phase 1 Addition (Understand)
Before planning ANY design change, the director must:
- "If previous versions exist, study them. Identify strong elements to preserve"
- Take screenshots of the current state
- List protected elements explicitly in the design brief

### Phase 4 Addition (Review)
After every sub-agent iteration, the director must:
- "Did we lose anything from the previous version that was working?"
- Compare new screenshot to previous screenshot
- Check all protected elements
- If regression detected: the fix for the new problem must NOT remove the regressed element. Both must be addressed simultaneously

### Design Principles
- **Preserve load-bearing elements**: Some design elements are structural — they carry emotional weight, brand identity, or functional importance that exceeds their visual presence. Don't remove them without understanding what they're supporting
- **Additive by default**: Prefer adding to the existing design over replacing. Adding a new section > rebuilding an existing one. Refining a color > swapping the palette
- **Name what you're changing**: Before modifying, state explicitly: "I am changing X because Y. I am preserving A, B, C." This forces intentionality and prevents accidental regression
- **The gem test**: Before removing any element, ask: "Is this a gem?" A gem is an element that contributes disproportionately to the design's quality — it may be small but it punches above its weight. The rotating sacred geometry was a gem. A standard text paragraph is not. Never discard gems without explicit justification
