# Cross-Cultural Design

## Purpose
Design communicates through cultural codes. A color, shape, layout, or icon that means one thing in one culture can mean the opposite in another. The agent must recognize when a design's cultural assumptions might not transfer across audiences.

---

## Color Meaning Across Cultures

### Red
- **Western**: Danger, urgency, passion, love, stop, error
- **East Asian**: Luck, prosperity, celebration, happiness (red envelopes in Chinese New Year)
- **South Asian**: Purity, fertility, bridal color (Indian weddings)
- **Middle East**: Danger, caution (similar to Western)
- **Design implication**: Using red for error states works globally, but using red for "negative" financial metrics may feel auspicious in East Asian contexts. Consider pairing red with down arrows or minus signs for clarity

### White
- **Western**: Purity, cleanliness, weddings, hospitals, minimalism
- **East Asian**: Death, mourning, funerals (traditional context — modern tech culture uses white as in Western design)
- **Design implication**: White-background designs are now universally understood in digital contexts. The cultural association with mourning affects physical products more than digital

### Green
- **Western**: Nature, success, go/proceed, money (US), environmental
- **Islamic cultures**: Sacred, associated with paradise and the Prophet
- **Design implication**: Green as "success" color is near-universal in digital. Green as primary brand color should consider that it carries spiritual weight in Islamic contexts

### Purple
- **Western**: Royalty, luxury, creativity, sometimes mourning
- **Buddhist cultures**: Spirituality, high spiritual attainment
- **Design implication**: Purple as luxury color transfers well. Purple in psytrance/spiritual contexts connects with both Western and Buddhist associations — it's a naturally cross-cultural choice for spiritual design

### Gold/Yellow
- **Western**: Wealth, premium, sometimes caution (yellow)
- **East Asian**: Imperial, sacred (golden roofs, golden Buddha)
- **Hindu**: Sacred (turmeric, gold ornaments in temples)
- **Design implication**: Gold as premium/spiritual accent works cross-culturally. Gold in psytrance/spiritual design has deep cross-cultural resonance

---

## Right-to-Left (RTL) Layouts

### Key Principles
- Arabic, Hebrew, Urdu, Farsi read right-to-left. The entire layout must mirror
- Navigation flows from right to left. Logo goes top-RIGHT. Back arrow points RIGHT
- Content flows: text right-aligned, lists right-aligned, progress bars fill right-to-left
- Images with directional content (arrows, people facing a direction, sequential steps) may need to be mirrored

### Implementation
- CSS `direction: rtl` on the root element flips flex direction, text alignment, and more
- Use CSS logical properties: `margin-inline-start` instead of `margin-left`, `padding-inline-end` instead of `padding-right`
- `text-align: start` instead of `text-align: left`
- Icons that imply direction (arrows, chevrons, progress) need to be mirrored. Icons that are symmetric (search, settings, bell) do not

### What NOT to Mirror
- Phone numbers (always LTR): +1-555-0123
- Dates in numeric format: 2024-03-15
- Code snippets: always LTR
- Brand logos: never mirror (even if they contain text)
- Clocks: always clockwise

### Bidirectional Text
- When LTR content (English brand names, URLs, code) appears within RTL text, the browser handles embedding automatically with the Unicode Bidi algorithm
- BUT: ensure proper `dir` attributes on elements. `<bdi>` tag for isolating bidirectional text. `<span dir="ltr">` for forcing direction

---

## Icon and Symbol Sensitivity

### Hand Gestures
- **Thumbs up**: Positive in most cultures. Offensive in some Middle Eastern, West African, and South American cultures. Use checkmarks instead for universal approval
- **OK sign (👌)**: Offensive in Brazil, Turkey, and some European countries. Avoid in international designs
- **Pointing finger**: Can be rude in some cultures. Use arrows instead of pointing hands for directional cues

### Animal Symbols
- **Dog**: Companion/loyalty in Western culture. Unclean in some Islamic cultures. Avoid dog mascots for global products targeting Muslim audiences
- **Owl**: Wisdom in Western culture. Bad luck or death in some South Asian and Middle Eastern cultures
- **Cow**: Common livestock in Western culture. Sacred in Hinduism. Avoid cow imagery in food apps targeting Indian audiences

### Religious Symbols
- **Cross, Star of David, Crescent, Om**: Never use as decorative elements. They are sacred symbols
- **Lotus flower**: Generally safe as a design element (beauty, purity across cultures), but be aware of its religious significance in Buddhism and Hinduism
- **Sacred geometry**: Carries spiritual significance across cultures. Using it in psytrance/spiritual context is appropriate. Using it in a fast-food app is inappropriate

### Universal Symbols
- Safe for global use: magnifying glass (search), house (home), gear (settings), bell (notifications), envelope (email), calendar, clock, lock
- These have been established through 20+ years of digital convention and are now culturally transcendent

---

## Information Density Expectations

### High-Density Cultures (East Asian, particularly Chinese, Japanese)
- Users expect MORE information on screen simultaneously
- Chinese web design: dense grids, smaller text, more links, more data per viewport
- Whitespace may feel "empty" or "wasted" — the Western association of whitespace = premium doesn't transfer directly
- Design adaptation: tighter spacing, smaller base font sizes (14px instead of 16px), more items per grid row

### Low-Density Cultures (Northern European, Scandinavian)
- Users expect MORE whitespace, cleaner layouts, fewer elements
- Scandinavian design: generous spacing, minimal text, imagery-forward
- Dense layouts feel "cluttered" or "untrustworthy"
- Design adaptation: generous spacing (16-20px body text), wider margins, fewer items per section

### Adaptive Strategy
- Start with moderate density (Western web standard)
- For East Asian audiences: increase information density by 20-30% (smaller type, tighter spacing, more items per row)
- For Northern European audiences: decrease density by 10-20% (larger type, wider spacing, fewer items)
- Always test with native users when designing for a specific culture

---

## Non-Latin Typography

### CJK (Chinese, Japanese, Korean)
- Characters are logographic/syllabic, not alphabetic. Each character occupies a square space
- No uppercase/lowercase distinction — hierarchy must come from size, weight, and color alone
- Line breaking: CJK text can break between any characters (no need for word-level breaking). BUT: don't break between specific character combinations (punctuation at line start, etc.)
- Font considerations: CJK fonts are LARGE (10,000+ characters vs 200+ in Latin). Subsetting is critical for web performance. Use `font-display: swap` and load CJK fonts asynchronously
- Mixing scripts: Latin text in CJK context often needs slightly different sizing (Latin at 0.9x the CJK font size for optical balance)

### Arabic Script
- Connected cursive script — letters change shape based on position in word (initial, medial, final, isolated)
- No uppercase/lowercase — hierarchy through size, weight, and color
- Diacritical marks (vowel markers) add vertical space — increase line-height to 1.8-2.0x for Arabic text
- Font choice: Noto Sans Arabic (Google) for clarity, Amiri for traditional/editorial, IBM Plex Arabic for modern

### Devanagari (Hindi, Sanskrit, Nepali)
- The horizontal headline (shirorekha) connects letters along the top — visually denser than Latin
- Needs larger font size than Latin for equal readability (typically 2-4px larger)
- Font choice: Noto Sans Devanagari, Mukta, Poppins (has Devanagari support)

---

## Quality Criteria
- FAIL: RTL layout that doesn't mirror the navigation, alignment, and directional elements
- FAIL: Hand gesture icons in global products (thumbs up, OK sign) without considering cultural meaning
- FAIL: Religious symbols used as decorative elements
- FAIL: CJK text rendered in a Latin-only font (shows boxes or substitution characters)
- FAIL: Dense layout forced on a culture that expects spaciousness (or vice versa) without user testing
- FAIL: Color used for meaning without considering cross-cultural interpretation (red = bad globally isn't true)
- PASS: CSS logical properties used instead of directional (start/end instead of left/right)
- PASS: Iconography uses universally understood symbols for core navigation
- PASS: Typography accounts for script-specific needs (CJK font loading, Arabic line-height, Devanagari sizing)
- PASS: Color meaning supplemented with icons/text (not color alone) for cross-cultural clarity
