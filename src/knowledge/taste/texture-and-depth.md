# Texture & Depth

## Purpose
How to create visual richness beyond flat colors. Texture, shadows, gradients, overlays, and depth effects that separate polished design from generic flat UI. These are the finishing touches that make a design feel crafted rather than generated.

---

## Shadows

### Layered Shadows (Elevation System)
Instead of one shadow, use multiple layers for natural-looking depth:

**Level 1 — Subtle lift (cards, inputs)**
```css
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
```

**Level 2 — Medium elevation (dropdowns, popovers)**
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);
```

**Level 3 — High elevation (modals, floating panels)**
```css
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 20px 48px rgba(0, 0, 0, 0.1);
```

### Colored Shadows
Match shadow color to the element for a glow effect:
```css
/* Accent button glow */
box-shadow: 0 4px 14px rgba(var(--accent-rgb), 0.4);

/* Neon glow (for dark themes) */
box-shadow: 0 0 20px rgba(34, 211, 238, 0.3), 0 0 60px rgba(34, 211, 238, 0.1);
```

### Dark Mode Shadows
Shadows on dark backgrounds need different treatment:
- Use rgba(0, 0, 0, 0.3-0.5) instead of 0.05-0.1
- Add a 1px top border in rgba(255, 255, 255, 0.05) to simulate light catch
- Or skip shadows entirely and use border + background color differences for elevation

---

## Gradients

### Gradient Types and When to Use Them

**Linear gradient — directional flow**
```css
/* Hero background: warm to cool */
background: linear-gradient(135deg, #1a0a2e 0%, #0a1a2e 50%, #0a2e1a 100%);

/* Section divider: fade to background */
background: linear-gradient(180deg, transparent 0%, var(--bg-primary) 100%);
```

**Radial gradient — focal point / light source**
```css
/* Subtle glow behind a heading */
background: radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%);

/* Hero spotlight effect */
background: radial-gradient(circle at 30% 40%, rgba(34, 211, 238, 0.2) 0%, transparent 50%);
```

**Conic gradient — unusual effects**
```css
/* Rotating halo / loading ring */
background: conic-gradient(from 0deg, #7c3aed, #22d3ee, #ec4899, #7c3aed);
```

### Gradient Rules
- FAIL: Gradient spanning more than 3 colors without a logical progression (warm→cool or light→dark)
- FAIL: Visible banding in gradients — add a subtle noise overlay to fix
- FAIL: Text directly on a multi-color gradient without a semi-transparent overlay for readability
- PASS: Gradients that follow natural light behavior (lighter at the source, darker away)
- PASS: Monochrome gradients (same hue, different lightness) for depth without complexity

---

## Noise & Grain

### Film Grain Effect
Adds organic texture to flat backgrounds. Especially effective on dark themes and gradient backgrounds.

```css
/* Noise overlay via SVG filter */
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* inline noise SVG */
  opacity: 0.03; /* Very subtle — 3-5% max */
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

### When to Use Grain
- Dark gradient backgrounds (breaks up banding, adds warmth)
- Hero sections with solid color backgrounds (adds tactile quality)
- Photo overlays (creates vintage/film feel)
- **Never** on data-dense UI (tables, forms, dashboards) — it reduces readability

---

## Glass / Frosted Effects

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
```

### When Glass Works
- Navigation bars over scrolling content
- Cards on top of gradient/image backgrounds
- Floating panels and popovers
- Modal overlays

### When Glass Fails
- On solid-color backgrounds (nothing to blur = just a tinted box)
- When overused — if everything is glass, nothing has visual weight
- On text-heavy content — the blur behind text reduces readability
- Performance: backdrop-filter is GPU-intensive. Avoid on mobile for large areas

---

## Borders and Dividers

### Border Styles by Context

**Subtle structure (light theme)**
```css
border: 1px solid rgba(0, 0, 0, 0.08);
```

**Subtle structure (dark theme)**
```css
border: 1px solid rgba(255, 255, 255, 0.08);
```

**Active/focused element**
```css
border: 2px solid var(--accent-color);
/* Or ring style: */
outline: 2px solid var(--accent-color);
outline-offset: 2px;
```

### Gradient Borders
```css
.gradient-border {
  border: 1px solid transparent;
  background: linear-gradient(var(--bg), var(--bg)) padding-box,
              linear-gradient(135deg, #7c3aed, #22d3ee) border-box;
}
```

### When to Skip Borders
- Use background color difference instead (card on slightly different surface)
- Use shadow instead (elevation implies separation)
- Use spacing instead (proximity principle — grouped elements don't need borders)

---

## Background Patterns

### Dot Grid
```css
background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
background-size: 24px 24px;
```

### Subtle Grid Lines
```css
background-image:
  linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
background-size: 48px 48px;
```

### When to Use Patterns
- Empty areas that need visual interest without content
- Behind hero sections to add depth
- Dashboard backgrounds to add subtle structure
- **Always at very low opacity (3-8%).** If you notice the pattern before the content, it's too strong

---

## Depth Hierarchy Cheat Sheet

From back to front:
1. **Background** — solid color or subtle gradient
2. **Pattern/texture layer** — dots, grid, grain at 3-5% opacity
3. **Surface** — cards, panels (slightly different background + shadow level 1)
4. **Elevated surface** — dropdowns, popovers (shadow level 2)
5. **Modal/overlay** — backdrop blur + shadow level 3
6. **Toast/notification** — highest elevation, strongest shadow

Each layer should be distinguishable from adjacent layers without being dramatically different. The total range from deepest background to highest element should feel like 3-4 subtle steps, not a dramatic cliff.
