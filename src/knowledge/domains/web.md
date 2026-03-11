# Web Design Conventions

## Principles

### Core Web Standards
- The fold still matters: the most critical content and CTA must be visible without scrolling
- Navigation should be immediately findable — top bar (desktop) or hamburger (mobile) are expected
- Page load perception matters: above-fold content should render within 1.5 seconds
- Responsive design is mandatory — designs must work from 320px to 1920px+
- Standard breakpoints: 320-480 (mobile), 481-768 (tablet), 769-1024 (small desktop), 1025-1440 (desktop), 1441+ (large)
- Maximum content width: 1200-1440px. Beyond that, whitespace or expanded gutters
- Footer is expected to contain: contact info, legal links, social links, secondary navigation
- Users expect links to be visually distinct from regular text (color, underline, or both)

### Progressive Enhancement
- Core content and functionality must work without JavaScript. JS enhances, it doesn't gatekeep
- HTML first: semantic structure that makes sense without CSS. Headings, lists, links, paragraphs
- CSS second: visual design that enhances the HTML structure. Layout, color, typography
- JS third: interactivity that enhances the CSS+HTML foundation. Animations, dynamic content, API calls
- For critical content (articles, product info, pricing): server-render or static-generate. Don't rely on client-side data fetching for content that search engines and accessibility tools need

### Core Web Vitals as Design Decisions
- **LCP (Largest Contentful Paint)**: < 2.5s. The largest visible element (usually hero image or heading) must paint fast. Design implication: optimize hero images, consider SVG or CSS-only heroes, use `loading="eager"` on above-fold images, set explicit `width`/`height` to prevent layout shift
- **FID/INP (Interaction to Next Paint)**: < 200ms. First interaction must respond instantly. Design implication: don't block the main thread with heavy animations on load. Defer non-essential JS. Don't animate on scroll until the user starts scrolling
- **CLS (Cumulative Layout Shift)**: < 0.1. No content should shift after initial render. Design implication: all images need explicit dimensions. Fonts should use `font-display: swap` with a size-matched fallback. No late-loading ads or banners that push content down
- **Design trade-offs**: A beautiful 4MB hero image with a complex gradient mesh animation WILL hurt LCP and FID. The design must balance beauty with performance. First rule: make the fast version beautiful, don't try to make the beautiful version fast

### SEO-Driven Design Decisions
- H1 is for the page's primary topic — one per page. H2 for sections. H3 for subsections. This isn't just accessibility — it's how search engines understand page structure
- Meta descriptions inform the search snippet. The page's visual design should reflect what the meta description promises — if the snippet says "pricing," the page should show pricing above the fold
- Image alt text isn't just for screen readers — it's indexed content. Alt text should describe the image's function in context, not just its appearance
- Internal linking: the navigation structure IS the site's information architecture. Search engines follow links to understand content relationships

### Scroll Patterns
- **Infinite scroll**: Suitable for feeds, galleries, social content. MUST have: URL updates per section, back-button support, footer accessibility (move footer to sidebar or menu). NOT suitable for: e-commerce (users need pagination to feel progress), content sites (users need to find specific items)
- **Pagination**: Suitable for search results, product listings, data tables. Clear current page indicator, reasonable items per page (10-25), fast page transitions
- **Load more button**: Hybrid of infinite scroll and pagination. Shows a button to load more items. Better than infinite scroll for performance and user control
- **Full-page sections**: scroll-snap sections that fill the viewport. Use `scroll-snap-type: y mandatory`. Suitable for: storytelling pages, portfolio showcases, product presentations. NOT suitable for: content-heavy pages, mobile (swipe conflicts)

### Web-Specific Interaction Patterns
- **Hover states**: Essential on desktop, non-existent on mobile. Design hover as progressive enhancement — the design must work without hover
- **Right-click context menus**: Custom context menus are usually unwelcome (users expect browser default). Exception: creative tools, design apps
- **Keyboard shortcuts**: For power users in web apps. Cmd+K command palette is the standard pattern. Always discoverable (list shortcuts in help menu)
- **Deep linking**: Every meaningful state should have a URL. Filters, search results, tab selections, modal content — if a user might want to share it, it needs a URL
- **Browser back button**: MUST work correctly. SPA navigation must update the history stack. Modal open/close should NOT affect history (user expects "back" to go to previous page, not close modal)

## Quality Criteria
- FAIL: No visible navigation or unclear how to move between pages/sections
- FAIL: Content wider than viewport causing horizontal scroll
- FAIL: Fixed/sticky elements covering more than 15% of viewport height
- FAIL: CTA button below the fold with no visual cue to scroll
- FAIL: Hero section without a clear heading and action — just a large image
- FAIL: Links indistinguishable from body text (same color, no underline, no hover effect)
- FAIL: Forms without validation feedback (inline errors near the field, not just a top banner)
- FAIL: Images without explicit width/height causing layout shift on load
- FAIL: Pop-ups or modals appearing before user has engaged with content
- FAIL: CLS > 0.1 due to late-loading elements pushing content down
- FAIL: Hero image > 500KB without lazy-loading or format optimization
- FAIL: Single-page app with broken back button behavior
- FAIL: Infinite scroll with no way to reach the footer
- PASS: Clear primary navigation visible on all pages
- PASS: Hero section has heading, subheading, and primary CTA above the fold
- PASS: Consistent header/footer across all pages
- PASS: Links have visible hover/focus states
- PASS: Forms have clear labels, validation, and success states
- PASS: Loading states for async content (skeletons, spinners)
- PASS: All images have explicit dimensions and use modern formats (WebP/AVIF with fallbacks)
- PASS: LCP < 2.5s, CLS < 0.1 on representative pages

## Layout Patterns
- **Hero + content**: Full-width hero with CTA, followed by content sections — most common landing page
- **Dashboard**: Sidebar navigation + main content area with cards/widgets
- **Blog/article**: Narrow content column (max 680px) with optional sidebar
- **E-commerce**: Grid of product cards with filters, header with search/cart
- **SaaS marketing**: Hero → features → social proof → pricing → CTA
- **Documentation**: Fixed sidebar table of contents + scrollable content area + optional right sidebar for on-page navigation
- **Gallery/portfolio**: Masonry or grid layout with lightbox detail view
