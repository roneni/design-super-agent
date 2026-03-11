# Review Methodology

## Purpose
How to evaluate a design result against both the knowledge base AND the user's intent. This is the method the director uses during the judge-iterate loop. It prevents both false approvals (accepting mediocre work) and infinite loops (rejecting everything endlessly).

---

## The Review Sequence

Every review follows this exact order. Do not skip steps.

### Step 1: First Impression (2 seconds)
Look at the screenshot for exactly 2 seconds of attention. Note your FIRST reactions:
- Where did your eye go first? (This reveals the focal point — is it the right one?)
- Did anything feel "off" immediately? (Trust this — visual discomfort is real signal)
- Could you tell what this page IS about? (If not, hierarchy has failed)
- Does it feel like it belongs to the genre/mood established in the design brief?

### Step 2: Structural Audit
Check the bones:
- Is there a clear visual hierarchy? (primary → secondary → tertiary)
- Is the layout aligned to a grid? (or intentionally breaking it?)
- Is spacing consistent? (same gap between same types of elements)
- Is there a clear entry point and scan path?
- On mobile: are tap targets adequate? Is content readable?

### Step 3: Knowledge Base Check
Run through ALL relevant knowledge modules (up to ~40 total):

**Core modules (always check):**
- **Color theory:** Palette cohesion, contrast ratios, accent usage, 60-30-10 ratio, dark mode adaptation, warm/cool balance
- **Typography:** Hierarchy, readability, pairing harmony, line length, type scale, micro-typography, optical sizing
- **Composition:** Alignment, whitespace, visual flow, scroll rhythm, negative space usage, viewport-relative composition
- **Visual hierarchy:** CTA prominence, reading order, squint test, multi-CTA handling, F/Z pattern
- **Gestalt:** Grouping, proximity ratios, figure-ground, similarity, common region, conflicting principles
- **Accessibility:** Contrast (WCAG AA + APCA), touch targets, labels, focus states, motion accessibility, cognitive accessibility, ARIA patterns
- **Motion design:** Timing values, easing curves, choreography, entrance/exit taxonomy, scroll-driven patterns, 60fps compliance, prefers-reduced-motion
- **Interaction design:** Component states (all 9), feedback loops, loading states, empty states, form patterns, affordances

**Domain modules (when applicable):**
- **Web:** Progressive enhancement, Core Web Vitals, SEO-driven decisions, scroll patterns, deep linking
- **Mobile:** Touch targets, gesture vocabulary, safe areas, iOS/Android differences, haptic feedback
- **Branding:** Identity consistency, cross-touchpoint cohesion, brand architecture
- **Design systems:** Token usage, spacing grid, component API, theme architecture, variant management
- **Data visualization:** Chart type selection, data-ink ratio, color-blind safety, table design
- **User research:** Persona fit, journey stage, Nielsen heuristics, information architecture

**Culture modules (always check):**
- **Visual languages:** Does the design speak a consistent visual language? Is it appropriate for the domain?
- **Design history:** Is the design drawing from a lineage intentionally?
- **Cross-cultural:** Are there cross-cultural assumptions? RTL considerations?
- **Psychedelic art history** (cosmic domain): Does the design show awareness of the visual lineage?

**Taste modules (always check):**
- **Artistic references** (cosmic domain): Does atmospheric depth reach the Whendell standard?
- **Taste calibration:** What quality tier is this? What specific improvements would reach the next tier?
- **Genre deep dive:** Does the design match the genre-specific expectations?
- **Exemplary sites:** Could this design sit alongside the exemplary sites in its genre?
- **Rule-breaking** (if applicable): Is the rule-breaking intentional, visible, and functional?

**Anti-patterns (always check):**
- **Common failures:** Scan for named anti-patterns including domain-specific ones (cosmic failures for psytrance)

**Reasoning modules:**
- **Iteration awareness:** If iterating, did we preserve protected elements? Any regression?

For each module, identify: PASS, FAIL, or NOT APPLICABLE.

### Step 3.1: Visual Asset Inventory
Before evaluating taste or quality tier, count the actual visual assets:
- How many AI-generated images are in the project?
- How many sections use imagery vs CSS-only?
- Does the ratio match the brief's visual ambition?

Domain-specific requirements:
- Cosmic/psytrance/festival: Hero MUST have generated background imagery
- Portfolio/artistic: Key showcase sections MUST have generated/curated imagery
- SaaS/dashboard/utility: CSS-only is acceptable

If brief demands "exceptional tier" and zero images exist:
REJECT. "CSS-only effects cannot reach target quality tier."

### Step 3.5: Taste Calibration Check
Compare the current design against the quality tier definitions from taste/taste-calibration:
- **Identify the current tier**: Stock (40-50), Competent (55-65), Professional (70-80), Exceptional (85-95), Masterclass (95-100)
- **For cosmic/psytrance domain**: Use the domain-specific tiers from taste/taste-calibration (Stock Cosmic, Competent Cosmic, etc.)
- **Gap to target**: What specific improvements would move the design to the next tier?
- **The "Whendell test" (cosmic domain)**: Would this design's atmospheric depth, color mastery, and compositional intention satisfy an artist at Whendell's level? Not copying — sharing the same level of visual intelligence. Whendell's work is IMAGERY — painted light, volumetric depth, luminous nebulae. CSS radial-gradient() is not paint. box-shadow glow is not volumetric light. A rotating SVG at 4% opacity is not sacred geometry in a cosmic scene. If the hero is pure CSS: automatic FAIL on Whendell test
- **The "one memorable moment" test**: Does the design have at least one element that would make someone stop scrolling?

### Step 4: Taste Check
Beyond the rules, does it have TASTE?
- Does the palette feel cohesive and intentional? (Not just "passes contrast" but "feels right")
- Do the fonts create the intended mood? (Not just "readable" but "evocative")
- Does the imagery match the visual language? (Not just "relevant" but "atmospheric")
- Are the textures and depth appropriate for the genre? (Not just "present" but "enhancing")
- Is there anything that feels generic, template-like, or AI-generated?

### Step 5: Reference Comparison
If references were provided:
- Does the design feel like it could be a sibling of the reference? (Same family, different individual)
- What is the single biggest gap between the current design and the reference's quality level?
- Is the gap a matter of execution (sub-agent can fix) or direction (needs re-narrowing)?

### Step 6: Verdict
Based on all steps, produce ONE verdict:

**APPROVE** if:
- No FAIL results from knowledge base checks
- Taste check passes (feels intentional, not generic)
- Reference gap is small or within acceptable range
- First impression was positive

**REJECT** if:
- Any FAIL result from knowledge base checks
- Taste check identifies generic/template quality
- Reference gap is large and fixable
- First impression identified a clear problem
- MUST include: which specific rules failed, what exactly is wrong (visible evidence), and a corrected instruction for the sub-agent

**ESCALATE** if:
- Same failure has been rejected 3 times without improvement
- The fix requires a tool capability the sub-agent doesn't have
- The brief itself may be the problem (contradictory requirements)
- Quality plateau — incremental fixes aren't closing the gap

---

## Writing Effective Rejections

A rejection is only useful if the sub-agent can act on it. Bad rejections cause loops.

### Bad Rejection (vague)
"The colors don't feel right. Make it better."

### Good Rejection (specific + actionable)
"FAIL: color-theory/palette-cohesion. The hero section uses #22d3ee cyan accent but the CTA button is #3b82f6 blue — these are close but not identical, creating a 'dirty' feel. Change the CTA to match the accent cyan #22d3ee. Also, the section background #1f1f1f is too light — it should be #141420 to match the Midnight Nebula palette's surface color."

### Rejection Template
```
FAIL: [knowledge-module]/[specific-rule]
EVIDENCE: [what I see in the screenshot that violates this]
FIX: [exact instruction — colors as hex, sizes as px, positions as descriptions]
PRIORITY: [critical / important / minor]
```

Always include at most 3 failures per rejection. If there are more, prioritize the most impactful ones. Fixing too many things at once increases the chance of regression.

---

## Avoiding Infinite Loops

### The Diminishing Returns Signal
If each iteration improves the design only marginally, you're approaching the ceiling of what automated iteration can achieve. Signs:
- Score improvement of less than 0.5 per iteration (if using internal scoring)
- Fixes for one issue introduce a new issue elsewhere
- The failures being caught are increasingly subjective rather than rule-based

**Action:** Approve if no hard FAIL rules are violated, even if taste improvements are possible. Perfect is the enemy of shipped.

### The Oscillation Signal
If fix A breaks thing B, then fixing B breaks A again — the sub-agent is stuck in a loop.

**Action:** Combine both fixes into a single, comprehensive instruction. Or step back and reconsider the design direction — maybe the underlying approach can't support both requirements simultaneously.

### The Tool Limitation Signal
If the sub-agent reports it can't implement a specific change (e.g., Pencil doesn't support that gradient type, or the font isn't available) — don't keep asking.

**Action:** Accept the limitation and find an alternative approach that achieves the same visual effect within the tool's capabilities.

---

## Quality Tiers

Not every project needs perfection. Calibrate your standards:

### Tier 1: Draft / Exploration
- Structural hierarchy: must be clear
- Colors: must be from the right family
- Typography: must be readable
- Everything else: acceptable if directionally correct
- **Use for:** First iteration, concept exploration, rapid prototyping

### Tier 2: Presentable
- All knowledge base rules pass
- Taste check: no generic/template feeling
- Spacing consistent throughout
- Images and content appropriate
- **Use for:** Client presentations, internal review, MVP launch

### Tier 3: Polished
- All of Tier 2 plus:
- Micro-interactions and hover states
- Responsive behavior verified
- Accessibility fully passes
- Reference gap minimal
- **Use for:** Production launch, portfolio-quality work

Default to Tier 2 unless the user specifies otherwise.
