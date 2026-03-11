# Interaction Design

## Purpose
Interaction design defines how users and interfaces communicate. Every interaction is a conversation: the user acts, the interface responds. Good interaction design makes this conversation clear, immediate, and predictable.

---

## Component States

Every interactive component exists in multiple states. Missing states create confusion.

### The 9 Essential States
1. **Default**: The resting state. Must clearly communicate "this is interactive" through visual affordance (color, shape, cursor)
2. **Hover**: Desktop only. Confirms interactivity. Typical: background color shift, shadow increase, subtle scale. Duration: 150ms ease-out
3. **Focus**: Keyboard navigation indicator. MUST be visible — never `outline: none` without replacement. Use `outline: 2px solid var(--focus-color)` with `outline-offset: 2px`. Focus MUST be distinct from hover
4. **Active/Pressed**: The moment of activation. Button: `scale(0.97)` + darker background. Duration: under 100ms — should feel instant
5. **Disabled**: Cannot interact. Visual: 40-50% opacity, `cursor: not-allowed`. MUST still be visible (not hidden). Tooltip on hover explaining WHY it's disabled is ideal
6. **Loading**: Action initiated, awaiting response. Replace button text with spinner or skeleton. NEVER leave the user wondering if their click registered. Disable re-clicking during load
7. **Error**: Something went wrong. Red border + red text message below the element. Include WHAT went wrong and HOW to fix it. Never just "Error" or "Invalid"
8. **Success**: Action completed successfully. Green checkmark, brief text confirmation. Can be temporary (fade after 3s) or persistent (stays until next action)
9. **Empty**: No content to display. Never show a blank void. Show an illustration + helpful message + CTA ("No results found. Try adjusting your filters or [clear all filters]")

### State Transition Rules
- **Allowed transitions**: Default → Hover → Active → Loading → Success/Error → Default
- **Keyboard path**: Default → Focus → Active → Loading → Success/Error → Default
- **Cannot skip Loading**: If an action is async, the Loading state MUST appear. Going from Active directly to Success looks like nothing happened
- **Error recovery**: Error state must provide a path back to Default (clear error, retry action, or modify input)
- **Disabled is a dead end**: Disabled elements cannot transition to any other state until the disabling condition is resolved. They CAN show a tooltip on hover explaining why

---

## Feedback Loops

### The 100ms Rule
- Every user action needs visible feedback within 100ms
- Under 100ms: perceived as instant. Feedback can be the state change itself (button press visual)
- 100-1000ms: perceived as fast. Show the result or a brief loading indicator
- 1-10s: perceived as a wait. Show progress (spinner, progress bar, skeleton). Provide cancel option for actions over 5s
- Over 10s: perceived as broken. MUST show progress percentage or time estimate. Provide cancel AND "run in background" options

### Types of Feedback
- **Visual**: Color change, animation, icon swap, text update. Most common, works for all users
- **Structural**: Element appears/disappears, layout shifts, content replaces. Use for navigation, adding/removing items
- **Textual**: Success/error messages, toast notifications, inline validation. Use for results of actions
- **Motion**: Bounce, shake, pulse, slide. Use sparingly for emphasis (error shake, success bounce)
- **Audio**: Click sounds, success chimes. ONLY with user opt-in. Never default. Consider deafness
- **Haptic**: Vibration on mobile. Subtle confirmation on toggle switches, stronger on errors. Use `navigator.vibrate()`

---

## Microinteractions (Dan Saffer Framework)

### The 4 Parts
1. **Trigger**: What initiates the interaction. Can be user-initiated (click, tap, swipe, voice) or system-initiated (notification, timer, geofence, data change)
2. **Rules**: The logic that determines what happens. "If the user swipes right on a card, mark it as liked and move to the next card." Rules are invisible to the user but define the experience
3. **Feedback**: The visible/audible response. The rules execute silently — feedback makes the result visible. "Heart icon fills red, card slides right off screen, next card slides in from left"
4. **Loops & Modes**: Long-term behavior. Does the interaction change over time? First-time use might show a tutorial tooltip. After 10 uses, skip the tooltip. A notification bell might show a badge count that updates

### Microinteraction Examples
- **Toggle switch**: Trigger=tap → Rules=toggle boolean state → Feedback=thumb slides, color changes, haptic tick → Loop=state persists until next tap
- **Pull to refresh**: Trigger=pull down → Rules=if pulled past threshold, refresh → Feedback=spinner appears, content updates → Loop=resets when finger released
- **Like button**: Trigger=tap → Rules=toggle like state, update count → Feedback=heart fills, count animates, particle burst → Loop=can unlike, changes persist
- **Password strength**: Trigger=typing → Rules=evaluate against criteria → Feedback=strength bar fills, color changes, criteria check/uncheck → Loop=updates on each keystroke

---

## Affordances and Signifiers

### Affordances
- An affordance is what an object CAN do. A button affords pressing. A slider affords dragging. A text field affords typing
- **Perceived affordance** matters more than actual affordance. If a button looks flat and unclickable, it has poor perceived affordance even though it functions
- Digital interfaces have NO physical affordances — everything is perceived. This means EVERY interactive element must explicitly signal its interactivity

### Signifiers
- Signifiers are the visual cues that communicate affordances: cursor changes, shadows, borders, icons, labels
- **Button signifiers**: filled/outlined shape, shadow/elevation, cursor: pointer, color contrast with background, text label, icon
- **Link signifiers**: color (traditionally blue), underline, cursor: pointer. At minimum, 2 of these 3
- **Draggable signifiers**: grip dots (⠿), cursor: grab/grabbing, slight elevation on grab
- **Scrollable signifiers**: scrollbar visibility, gradient fade at edges, partial content visible beyond boundary
- **Expandable signifiers**: chevron icon (▸/▾), "Show more" text, truncated content with ellipsis

---

## Loading States

### Taxonomy
| Type | When to Use | Implementation |
|------|-------------|----------------|
| **Skeleton** | Content structure is known | Gray shapes matching expected content layout |
| **Spinner** | Compact, content structure unknown | Circular animation, centered. 24-32px for inline, 48px for full-page |
| **Progress bar** | Duration is known/estimable | Horizontal bar filling left-to-right. Include percentage or time |
| **Shimmer** | Content structure known, polish level high | Skeleton + sweeping light gradient animation |
| **Optimistic UI** | Action is very likely to succeed | Show success immediately, undo if fails |
| **Placeholder content** | First-time or empty state | Illustration + text explaining what will appear |

### Loading State Rules
- Never show a spinner for actions under 300ms — the spinner will flash and look broken. Use a 300ms delay before showing loading state
- Skeleton screens are preferred over spinners for content areas — they set user expectations for the layout
- Progress bars need to be HONEST. Fake progress (jumping from 10% to 90%) is worse than a spinner. If you can't measure progress, use an indeterminate progress bar
- Full-page loading: show the layout shell (header, sidebar, content area) immediately, then load content into the content area. Never show a blank page with a centered spinner

---

## Empty States

### What Empty States Need
- **Illustration or icon**: Visual that matches the context. A search with no results: magnifying glass with a question mark. A list with no items: empty box or to-do list
- **Headline**: Clear, concise explanation. "No messages yet" not "Error: 0 results"
- **Description**: Why it's empty and what to do. "When you receive messages, they'll appear here"
- **CTA**: Action to resolve the empty state. "Compose your first message" or "Import contacts"
- **Tone**: Friendly, not apologetic. Never "Sorry, nothing here" — make it feel like the start of something, not a dead end

### Empty State Contexts
- **First use**: Educational — explain the feature and invite first action
- **No results (search/filter)**: Suggest modifications — "Try different keywords" or "Clear filters"
- **Completed/cleared**: Celebratory — "All caught up!" with a happy illustration
- **Error**: Empathetic — "We couldn't load your messages. [Try again]"
- **Permission needed**: Explanatory — "Enable notifications to see alerts here. [Enable] [Not now]"

---

## Form Design Patterns

### Inline Validation
- Validate on blur (when user leaves the field), NOT on each keystroke (too aggressive)
- Exception: password strength can validate on keystroke because it's assistive, not punitive
- Show validation after the user has had a chance to enter a value — never show "required" error when the user tabs into a field for the first time
- Success validation (green checkmark) is optional but reduces anxiety for complex forms
- Error messages: red text below the field, 12-14px, associated via `aria-describedby`. Include the fix: "Email must include @" not just "Invalid email"

### Error Messaging Rules
- **Be specific**: "Password must be at least 8 characters" not "Invalid password"
- **Be human**: "We couldn't find an account with that email" not "Error 404: User not found"
- **Be close**: Error message directly below/beside the problematic field, not in a banner at the top of the form
- **Be persistent**: Error stays visible until the user fixes it. Don't auto-dismiss error messages
- **Be recoverable**: Always provide a path to fix the error. If the email is taken, suggest "Log in instead" or "Forgot password?"

### Multi-Step Forms
- Show progress: step indicator with numbered stages ("Step 2 of 4") or a progress bar
- Allow back-navigation: users should be able to go back and edit previous steps without losing data
- Validate per step: show errors for the current step only. Don't surprise users with step 1 errors when they reach step 4
- Summary before submit: for complex forms (checkout, applications), show a review page with all entered data and "Edit" links for each section
- Save progress: for long forms (job applications, insurance quotes), auto-save or allow manual save to prevent data loss

---

## Quality Criteria
- FAIL: Interactive element with no hover/focus state — user can't tell it's interactive
- FAIL: Button click with no visible feedback — user doesn't know if click registered
- FAIL: Loading state missing for async action — interface appears frozen
- FAIL: Error message that says only "Error" or "Invalid" with no guidance
- FAIL: Empty state showing a blank area with no explanation or CTA
- FAIL: Form validation on keystroke that shows errors before user finishes typing
- FAIL: Disabled element with no explanation of why it's disabled
- FAIL: Success state that looks identical to default state — user can't confirm action worked
- FAIL: Loading spinner that appears instantly for a fast action — creates a distracting flash
- PASS: All 9 component states implemented for primary interactive elements
- PASS: Feedback within 100ms for all user actions
- PASS: Loading states show content structure (skeleton) rather than generic spinner
- PASS: Error messages are specific, human-readable, and positioned near the error
- PASS: Empty states include illustration + explanation + CTA
- PASS: Multi-step forms show progress and allow back-navigation
- PASS: Disabled elements explain their disabled condition (tooltip or adjacent text)

## Anti-patterns
- "The Dead End": Action completes with no visible result — user doesn't know anything happened
- "The Infinite Load": Spinner shown indefinitely with no timeout, error handling, or cancellation
- "The Silent Failure": Error occurs but no message is shown — data is lost and user doesn't know why
- "The Eager Validator": Showing "field required" the instant a user tabs into an empty field, before they've had a chance to type
- "The Trap Door": Irreversible action (delete, send) with no confirmation step
- "The Ghost Click": Clickable area doesn't match visible element — user clicks the text but the hit area only covers the icon
- "The Phantom Toggle": Toggle switch that doesn't immediately reflect its state — user clicks, nothing happens for 2 seconds, then state changes
- "The Keyboard Hostage": Interface that can only be operated with a mouse — no Tab navigation, no Enter to submit, no Escape to close
