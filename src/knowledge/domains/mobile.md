# Mobile Design Conventions

## Principles

### Touch Fundamentals
- Thumb zone: bottom 1/3 of screen is easiest to reach. Primary actions belong there
- Touch targets: minimum 44x44pt (iOS) or 48x48dp (Android). Spacing between targets: 8px minimum
- One primary action per screen. If there are multiple, use hierarchy to make one dominant
- Bottom navigation for 3-5 top-level destinations. Tab bar is the standard pattern
- Pull-to-refresh is expected for feed/list content
- Swipe gestures should complement, not replace, visible buttons — discoverability matters
- Content-first: minimize chrome (nav, headers, toolbars) to maximize content area
- Avoid hover states — there is no hover on touch devices. All states must be tap-based
- System fonts (SF Pro on iOS, Roboto on Android) are readable and feel native

### iOS vs Android Design Differences
- **Navigation**: iOS uses bottom tab bars and swipe-back. Android uses bottom navigation, top app bar with drawer, and system back button/gesture
- **Typography**: iOS = SF Pro (San Francisco), dynamic type support expected. Android = Roboto, but Material 3 allows custom fonts. iOS uses larger, bolder heading styles. Android is slightly more compact
- **Spacing**: iOS uses 16px standard margins, 8px compact. Android Material uses 16dp margins with 4dp grid
- **Modals and sheets**: iOS = bottom sheets with grabber handle, alerts with rounded corners. Android = bottom sheets (Material), dialogs with sharp corners (Material 2) or rounded (Material 3)
- **Status bar**: iOS = content extends behind status bar, `safe-area-inset-top`. Android = status bar has its own color, content below it (Material) or can draw behind it (edge-to-edge)
- **Buttons**: iOS = rounded rect with minimum 44pt height, label-style or filled. Android = rounded with minimum 48dp height, FAB (Floating Action Button) for primary action
- **Design decision**: For cross-platform apps, pick a NEUTRAL design language that works on both (Material 3 with customization, or a custom system). Don't make an iOS-native design run on Android or vice versa — it will feel foreign

### Gesture Vocabulary
- **Tap**: Primary selection/activation. The "click" of mobile
- **Long press**: Secondary actions, context menus. Duration: 500ms+ to activate. Provide haptic feedback at activation
- **Swipe horizontal**: Navigate (forward/back), reveal actions (swipe-to-delete, swipe-to-archive), carousel navigation
- **Swipe vertical**: Scroll (native), pull-to-refresh (down from top), dismiss (down on sheets/modals)
- **Pinch**: Zoom in/out. Expected on images and maps. Not for UI elements
- **Two-finger rotate**: Rotate content. Expected only in map and image editing contexts
- **Edge swipe**: System gesture (back navigation on both iOS and Android). DO NOT override edge swipe — it breaks the OS and frustrates users

### Navigation Patterns In Depth
- **Tab bar (bottom)**: 3-5 destinations. Icons + labels. Active state clearly distinct. Current tab tappable to scroll-to-top. This is the PRIMARY navigation pattern for most apps
- **Stack navigation**: Push/pop screens on a stack. Back button or swipe-back to return. Use for drill-down content (list → detail → sub-detail). Maintain scroll position when returning
- **Drawer**: Side panel for secondary navigation. Pull from left edge or hamburger icon. Good for 6+ navigation items. Bad for primary destinations (hidden by default = low discoverability)
- **Search as navigation**: For content-rich apps (Spotify, YouTube), search IS a primary navigation method. Prominent search bar or tab
- **Navigation hierarchy**: Tab bar (primary, persistent) → stack within each tab (secondary, contextual) → modals for creation/editing (tertiary, focused). Never nest more than 3 levels of stack navigation

### Safe Areas and Device Considerations
- **Notches and dynamic islands**: `env(safe-area-inset-top)` — don't place interactive elements behind the notch
- **Home indicator (iPhone)**: `env(safe-area-inset-bottom)` — bottom navigation must clear the 34pt home indicator area
- **Android navigation bar**: 3-button nav (48dp) or gesture bar (varying sizes). Use `WindowInsets` API to handle
- **Keyboard avoidance**: When the keyboard opens, the focused input must be visible. Content above the keyboard should scroll, not be hidden. Bottom-fixed elements (tab bar, CTA) should move above the keyboard or be hidden
- **Orientation**: Support portrait as primary. Landscape is optional for most apps (essential for media players, games, certain tools). If supporting both, test that layout adapts — not just stretches
- **Dark mode**: Both iOS and Android have system dark mode. Apps should respect `prefers-color-scheme` at minimum. Ideally: user toggle + respect system setting

### Haptic Feedback
- iOS: `UIImpactFeedbackGenerator` (light, medium, heavy), `UISelectionFeedbackGenerator` (subtle tick), `UINotificationFeedbackGenerator` (success, warning, error)
- Android: `HapticFeedbackConstants` — similar categories
- **When to use haptics**: Toggle switches (tick), selections (tick), errors (warning buzz), success (success pattern), destructive actions (heavy tap before confirmation). Haptic feedback should CONFIRM, not ANNOUNCE
- **When NOT to use haptics**: Scrolling, typing (unless keyboard app), navigation between screens, every button tap (too much). Overuse causes "haptic fatigue" — the user turns off vibration entirely

## Quality Criteria
- FAIL: Touch targets smaller than 44x44px
- FAIL: Tap targets closer than 8px apart with no visual separation
- FAIL: Horizontal scrolling of main content (horizontal scroll is only acceptable for carousels/galleries)
- FAIL: Fixed header + fixed footer consuming more than 25% of viewport
- FAIL: Text input fields smaller than 44px tall
- FAIL: Modal/popup that cannot be dismissed easily (no close button, no tap-outside-to-close)
- FAIL: Important actions only accessible through gestures with no visible alternative
- FAIL: Font size below 12px (11pt) for any readable text
- FAIL: Forms that don't use appropriate keyboard types (email fields not showing @ keyboard)
- FAIL: Content hidden behind notch or home indicator area
- FAIL: Edge swipe gesture overridden, preventing system back navigation
- FAIL: Bottom navigation with more than 5 items or fewer than 3
- FAIL: No haptic feedback on toggle switches or destructive actions
- PASS: Primary action in the bottom third of the screen (thumb zone)
- PASS: Clear back/navigation pattern consistent throughout the app
- PASS: Loading indicators for any action taking more than 300ms
- PASS: Text legible without pinch-to-zoom
- PASS: Content adapts to both portrait and landscape orientations
- PASS: Bottom sheet or action sheet for contextual options
- PASS: Safe areas respected on notched/dynamic island devices
- PASS: System dark mode respected with appropriate palette adaptation

## Anti-patterns
- "Desktop shrink": Literal desktop layout shrunk to mobile size — unreadable and unusable
- "Hamburger everything": Hiding all navigation behind a hamburger menu, including primary actions
- "Scroll hijacking": Taking over native scroll behavior with custom momentum or snapping
- "Tiny X": Close buttons smaller than 30px on mobile — impossible to tap accurately
- "Bottom bar collision": App bottom nav + system gesture bar + banner = 150px of chrome at the bottom
- "Keyboard hider": Important content or the active input disappears behind the keyboard with no way to see it
