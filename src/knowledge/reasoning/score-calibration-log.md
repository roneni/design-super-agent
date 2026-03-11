# Score Calibration Log

## Purpose
This log records the gap between the director's self-assessment and the user's actual verdict.
Before self-scoring any design, the director MUST consult this log and adjust for known bias.

---

## Historical Calibration Data

| Date | Brief | Director Score | User Score | Delta | Root Cause |
|------|-------|---------------|------------|-------|------------|
| 2026-03-06 | Cosmic festivals v1 | 82-85 | ~40 | -42 | Zero images generated. CSS-only spreadsheet. Director reviewed code not visuals |
| 2026-03-06 | Cosmic festivals v2 | 83-87 | 72-78 | -10 | Only 2 images at 512px (too small for hero). Only 2/5 planned images generated. Director overvalued architecture, underweighted visual impact |
| 2026-03-06 | Voyage Beyond | APPROVE (no score) | 74-78 | n/a | Director switched to binary verdicts. Overseer scored 74-78, user concurred. 4 images at 1536x1024. Progress: proper resolution, correct image count, honest assessment aligned |

---

## Known Biases

### Bias 1: Code Quality ≠ Design Quality
The director consistently scores higher when the code is clean, well-structured TypeScript with proper patterns.
Clean code is necessary but NOT sufficient. A perfectly structured component tree with CSS gradients is still a spreadsheet.
**Correction:** Subtract 5-10 points if your score is influenced by code architecture rather than visual evidence.

### Bias 2: "Architecture for Exceptional" ≠ Exceptional
Having the right structure (image refs, layered z-index, animation hooks) scores as if the visual result already exists.
A hero section that REFERENCES a 512px image is not the same as a hero with a stunning 1920px cinematic background.
**Correction:** Score based on what the USER will see at full viewport, not what the code describes.

### Bias 3: Self-Generous Rounding
When a design falls between tiers (e.g., 78-82), the director rounds UP into the next tier name.
78 is Professional, not "low Exceptional." 82 is barely Exceptional, not "solid Exceptional."
**Correction:** When uncertain, round DOWN. The user will tell you if you're being too harsh. They will never tell you if you're being too generous — they'll just lose trust.

---

## Calibration Rule

Before any final score, ask:
1. What would a stranger with no context think of this page in the first 3 seconds?
2. Would this page make someone screenshot it and share it? (If no: not Exceptional)
3. Am I scoring what EXISTS or what COULD exist with the architecture in place?
4. Check this log: my historical average overestimate is ~10 points. Subtract accordingly.
