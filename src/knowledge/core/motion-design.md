# Motion Design

## Purpose
Motion is communication. Every animation should answer the question: "What does this motion TELL the user?" If the answer is "nothing — it just looks cool," the motion is decoration and likely harmful.

---

## Disney's 12 Principles Adapted for UI

### 1. Squash & Stretch → Scale Transform
- In animation: objects deform to show weight and elasticity. In UI: elements scale up/down to show interaction
- Button press: `transform: scale(0.95)` on :active, then back to scale(1). Simulates physical compression
- Card hover: `transform: scale(1.02)` — subtle "lifting" toward the user
- Modal entrance: start at `scale(0.9) opacity(0)`, animate to `scale(1) opacity(1)` — the slight size change makes it feel like it "grew" into existence rather than just appearing

### 2. Anticipation → Hover/Focus States
- In animation: a character crouches before jumping. In UI: elements signal what's about to happen
- Button hover: color shift or shadow increase BEFORE the click. Tells the user "this is about to do something"
- Drag handles: cursor change + slight lift on grab. Tells the user "this is movable"
- Swipe hints: a card that slightly peeks from the edge, signaling "swipe to reveal more"

### 3. Staging → Scroll Reveal Sequencing
- In animation: composition draws attention to the key action. In UI: elements enter the viewport in a deliberate order
- Section reveals: heading appears first (50ms), then subheading (150ms), then content (250ms), then CTA (350ms). The stagger creates a reading sequence
- Don't reveal everything simultaneously — it reads as "flash." Don't stagger too much — it reads as "slow"
- Hero staging: background first (already visible), then text slides up, then CTA fades in. 3 beats, 300ms total

### 4. Straight Ahead / Pose to Pose → CSS vs Spring Physics
- Straight ahead: each frame calculated sequentially (CSS keyframe animations). Predictable, controllable
- Pose to pose: define start and end, interpolation handles the middle (spring physics / Framer Motion springs). More natural, organic feel
- Use CSS transitions for simple state changes (hover, focus). Use spring physics for complex interactions (drag, page transitions, list reordering)

### 5. Follow Through → Overshoot/Bounce Easing
- In animation: parts of an object continue moving after it stops. In UI: elements overshoot their target and settle back
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot on entrance animations. The element slides past its final position and bounces back
- Use sparingly: appropriate for playful, energetic interfaces. Inappropriate for serious, data-heavy contexts
- Toast notifications: slide in with slight overshoot (10% past final position), then settle. Communicates "arrived!"

### 6. Slow In / Slow Out → Easing Functions
- Linear motion feels robotic and unnatural. ALL UI motion should use easing
- **ease-out** (`cubic-bezier(0, 0, 0.2, 1)`): Fast start, slow finish. Use for ENTRANCES — elements arriving on screen
- **ease-in** (`cubic-bezier(0.4, 0, 1, 1)`): Slow start, fast finish. Use for EXITS — elements leaving the screen
- **ease-in-out** (`cubic-bezier(0.4, 0, 0.2, 1)`): Slow both ends. Use for elements moving WITHIN the screen (repositioning, expanding)
- Never use linear for UI motion. Exception: infinite ambient animations (rotating logos, loading spinners, cosmic background drift) where constant speed feels intentional

### 7. Arcs → Curved Motion Paths
- Real objects move in arcs, not straight lines. UI elements that move in curves feel more natural
- CSS: `offset-path: path('M 0 0 Q 100 -50 200 0')` for curved motion
- Practical use: dropdown menus that arc slightly as they expand, elements that follow a circular path during transitions
- Use rarely in standard UI — arcs add personality but also complexity. Save for hero moments

### 8. Secondary Action → Ripple Effects
- In animation: a secondary motion supports the primary one. In UI: feedback effects that accompany the main action
- Material Design ripple: touch point generates an expanding circle. The ripple is secondary to the actual action (navigation, selection)
- Button click: primary action = page navigation. Secondary = button color pulse + ripple. The secondary reinforces "your click was received"
- Icon animation: when "favoriting" an item, the heart fills (primary) and small particles burst outward (secondary). The particles celebrate the action

### 9-12. Additional Principles
- **Timing**: Controls the weight/feel of motion. See timing reference below
- **Exaggeration**: In UI, subtle exaggeration (slightly more bounce, slightly more scale) adds personality without feeling broken
- **Solid Drawing → Consistent Transform Origins**: All similar elements should animate from the same origin point. Cards from center, modals from trigger position, tooltips from anchor point
- **Appeal → Delight**: Motion should make the interface feel alive, not mechanical. Small personality touches (a loading icon that winks, a success checkmark that draws itself) create emotional connection

---

## Timing & Easing Reference Table

| Category | Duration | Easing | Examples |
|----------|----------|--------|----------|
| Micro-interaction | 100-150ms | ease-out | Button hover, toggle switch, checkbox |
| Small transition | 150-250ms | ease-out | Dropdown open, tooltip appear, tab switch |
| Medium transition | 250-400ms | ease-in-out | Modal open/close, sidebar expand, accordion |
| Page transition | 300-500ms | ease-in-out | Route change, page-level content swap |
| Emphasis/attention | 400-600ms | ease-out then settle | Success animation, error shake, notification |
| Ambient/decorative | 10-60s | linear | Background drift, particle float, gradient shift |
| Spring physics | Variable | spring(1, 80, 10) | Drag-and-drop, pull-to-refresh, sheet dismiss |

### The 100ms Rule
- Users perceive responses under 100ms as INSTANT. Under 100ms = no animation needed, just snap
- 100-300ms is perceived as "fast." This is the sweet spot for most UI transitions
- 300-1000ms is perceived as "an animation." Acceptable for intentional moments (modal open, page transition)
- Over 1000ms is perceived as "slow." Only acceptable for loading states or intentional dramatic effect
- If an action MUST take over 300ms, provide progress feedback (skeleton, progress bar, spinner)

---

## Animation Taxonomy

### Entrance Animations
- **Fade in**: `opacity: 0 → 1`. Most subtle. Use when the element isn't spatially "coming from" anywhere
- **Slide in**: `transform: translateY(20px) → translateY(0)` + fade. Element arrives from a direction. The direction should be meaningful (from bottom = "new," from side = "related content")
- **Scale in**: `transform: scale(0.9) → scale(1)` + fade. Element grows into existence. Use for modals, popovers, things that "expand" from a point
- **Reveal**: `clip-path` or `overflow: hidden` with height animation. Content uncovered progressively. Use for accordions, expanding sections

### Exit Animations
- Exits should be FASTER than entrances (70-80% of entrance duration). Users have already processed the element — lingering exit feels slow
- Exit in the REVERSE direction of entrance, OR fade out. An element that slid in from the bottom should slide out to the bottom, not the top
- For destructive actions (delete, dismiss): faster exit (100-150ms) confirms decisiveness. For navigation: normal exit speed

### Emphasis Animations
- **Shake**: `translateX(-5px, 5px, -3px, 3px, 0)` over 400ms. Error/invalid input. Use once — repeated shaking is aggressive
- **Pulse**: `scale(1, 1.05, 1)` over 600ms. "Look at me" — for notifications, badges, new items. Use `animation-iteration-count: 2` max
- **Glow**: `box-shadow` intensity pulse. Subtle attention draw without layout shift. Good for cosmic/psytrance contexts

---

## Choreography

### Stagger Patterns
- Elements in a group should enter with a stagger delay: each item starts 30-80ms after the previous
- `animation-delay: calc(var(--index) * 50ms)` — creates a wave effect
- Stagger direction matters: top-to-bottom for lists, left-to-right for card grids, center-outward for emphasis
- Maximum total stagger duration: 500ms. Beyond that, the last items feel forgotten. If you have 20 items, use faster stagger (20ms) or stagger only the first 6-8, then let the rest appear together

### Orchestration
- Related animations should feel coordinated, like musicians in an orchestra
- A modal opening: backdrop fades in (0-200ms) → modal scales in (100-350ms) → content fades in (250-400ms). Each waits for the previous to START (not finish), creating overlap
- A section reveal: heading (0ms) → divider line draws (100ms) → cards stagger in (200-500ms) → CTA fades (400ms). The reveal tells a story: "here's the topic → here's the content → here's what to do"

---

## Scroll-Driven Animation Patterns
- **Scroll-triggered entrance**: Elements animate when they enter the viewport. Use `IntersectionObserver` with `threshold: 0.2` (trigger when 20% visible). CSS: `animation-timeline: view()` (native scroll-driven animations)
- **Scroll-linked progress**: Elements animate proportionally to scroll position. Progress bars, parallax backgrounds, shrinking headers. Use `animation-timeline: scroll()` or `ScrollTimeline` API
- **Scroll snapping**: `scroll-snap-type: y mandatory` for full-page sections. Use `mandatory` for slideshow-like experiences, `proximity` for gentle snapping
- Avoid scroll hijacking (replacing native scroll with custom physics). It breaks accessibility, confuses users, and often performs poorly

---

## Motion as Communication: What Motion MEANS

| Motion | Meaning | Example |
|--------|---------|---------|
| Slide in from right | New content / forward navigation | Next page, next step |
| Slide in from left | Previous content / back navigation | Previous page, undo |
| Slide in from bottom | New item / addition | New notification, added item |
| Fade in | Appearance / materialization | Content loading in, modal backdrop |
| Fade out | Disappearance / gone | Dismissed notification, deleted item |
| Scale up | Selection / emphasis | Selected card, opened item |
| Scale down | Deselection / minimizing | Closed item, de-emphasized |
| Rotate | Processing / loading | Loading spinner, refresh indicator |
| Shake | Error / invalid | Wrong password, invalid input |
| Bounce | Arrival / success | New message, completed task |

---

## Performance

### The 60fps Budget
- Smooth animation = 60 frames per second = 16.67ms per frame
- Only animate properties that trigger compositing (GPU-accelerated): `transform`, `opacity`, `filter`
- NEVER animate: `width`, `height`, `top`, `left`, `margin`, `padding`, `border` — these trigger layout recalculation and WILL jank
- Use `will-change: transform` to promote elements to their own compositing layer BEFORE animation starts. But don't apply it to more than ~10 elements — each layer costs GPU memory

### GPU Compositing
- `transform: translateZ(0)` or `will-change: transform` promotes to GPU layer
- `transform: translate3d()` is GPU-accelerated. `top/left` with `position: absolute` is NOT
- For animated backgrounds: use a pseudo-element (::before, ::after) with the background, positioned absolutely, and animate the pseudo-element's transform. This separates the background animation from the content layer

### Reducing Motion
- Always provide `@media (prefers-reduced-motion: reduce)` alternatives
- Reduced motion doesn't mean NO motion — it means simpler, shorter, non-vestibular motion
- Pattern: keep opacity transitions (safe), remove transform animations (potentially triggering), eliminate parallax and scroll-linked motion

---

## Cosmic / Psytrance Motion Design

Ambient and immersive motion patterns specific to cosmic and psychedelic design contexts. These patterns create the hypnotic, meditative quality that defines the psytrance visual experience.

### Sacred Geometry Rotation
- **Speed**: Slow continuous rotation — 60-120 seconds per full revolution. This speed is below conscious attention threshold; viewers feel the motion subconsciously
- **Counter-rotation**: Multiple concentric layers rotating in opposite directions. Outer ring clockwise (90s), inner ring counter-clockwise (120s), center element clockwise (60s). The speed differential creates mesmerizing depth
- **Implementation**: `animation: rotate 90s linear infinite` on each layer with different durations and directions
- **Scaling**: Sacred geometry can pulse subtly while rotating — `animation: rotateAndPulse 90s linear infinite` combining rotation with `scale(1, 1.03, 1)` over 6-8 second sub-cycle
- **Opacity breathing**: Layers can fade in/out slightly (0.8 → 1.0 → 0.8) on 10-15s cycles, creating a "living" quality

### Particle Systems (Stars, Dust, Energy)
- **Density**: 200+ particles for cosmic density. Under 100 looks sparse. Over 500 risks performance issues
- **Implementation**: Canvas API or Three.js for performance. CSS-only particle systems cap at ~50 elements before jank
- **Particle variety**: Mix sizes (1-4px), opacities (0.3-1.0), and colors (white, pale blue, warm yellow). Monochrome particles feel artificial
- **Drift speed**: Particles drift slowly — 0.1-0.5px per frame. Faster = snowfall. Slower = suspended in space
- **Mouse interaction**: Particles that drift subtly away from the cursor (repulsion radius: 100-150px, force: gentle) create an immersive feeling without being distracting
- **Depth layers**: 2-3 particle layers at different sizes and speeds (large/slow = far, small/fast = near). Creates parallax without scroll-linking

### Nebula Drift
- CSS gradient animation with multiple layers at different speeds creates a slowly evolving cosmic atmosphere
- **Layer 1** (slowest, 60s): Large radial gradient representing the nebula core. Shifts position by 10-15% over the cycle
- **Layer 2** (medium, 40s): Secondary color cloud. Moves in a different direction
- **Layer 3** (fastest, 25s): Wisps and detail. Subtle opacity shift
- **Implementation**: Multiple `background` layers with `background-position` animated via keyframes. Each layer on its own timing
- **Performance**: Use `will-change: background-position` or animate a pseudo-element's `transform` instead of `background-position` for GPU acceleration

### Breathing / Pulsation
- Organic scale animation (3-5 second cycle) for orbs, glows, and energy elements
- Mirrors human breath rhythm — 4s inhale, 4s exhale = 8s cycle. The viewer's subconscious syncs with the rhythm
- **Implementation**: `animation: breathe 8s ease-in-out infinite` with `transform: scale(1, 1.06, 1)` + `opacity(0.8, 1, 0.8)`
- **Use for**: Hero background orbs, energy auras around headings, ambient glow effects
- **Coordination**: Multiple breathing elements should NOT synchronize — offset their animation-delay by 1-3 seconds to prevent mechanical "pumping"

### Scroll-Triggered Reveals
- Elements emerge from cosmic darkness as the user scrolls, like traveling through space
- **Pattern**: Element starts as invisible (opacity: 0, translateY: 30px), becomes visible as viewport intersection reaches 20%
- **Cosmic variant**: Elements emerge through a glow — start with box-shadow glow visible at 10% intersection, then the element itself fades in at 20%. The glow precedes the content, like a star brightening before a structure materializes
- **Section transitions**: As one section scrolls away, its opacity and blur increase (becoming distant). As the next section enters, it sharpens from blur (approaching). Creates the feeling of traveling THROUGH space, not scrolling a page

### Reactive Elements
- **Mouse parallax**: Background layers shift 1-3% based on mouse position. Creates a subtle "looking around" effect without full 3D
- **Gyroscope (mobile)**: On mobile, device tilt shifts background layers. Same subtle parallax as mouse but using `DeviceOrientationEvent`
- **Hover reveals**: Sacred geometry lines that glow brighter on hover. Stars that pulse when the cursor is near. Subtle, ambient interactivity
- **Scroll velocity response**: Particle speed increases slightly when scrolling fast, settles when scrolling stops. Creates a "momentum" feeling in the cosmic space

### Audio-Reactive Concepts (Static Design)
- A design that LOOKS like it could respond to music, even when no audio is playing:
- Waveform-inspired shapes: sine waves, frequency bars, oscilloscope patterns as decorative elements
- Rhythmic spacing: section transitions that follow a 4-beat pattern (like a 4/4 time signature)
- Bass-inspired scale: larger elements pulse subtly at bass-frequency speed (1-2 second cycles)
- Treble-inspired detail: fine particles or thin lines animate at higher frequency (0.25-0.5 second cycles)
- This creates a synesthetic quality — the design feels musical even in silence
