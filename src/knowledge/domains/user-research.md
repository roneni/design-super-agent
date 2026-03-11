# User Research Awareness

## Purpose
Design doesn't happen in a vacuum — it serves users. The agent must understand basic user research principles to make informed design decisions, even without direct user access. This module covers persona-informed design, user journey awareness, and heuristic evaluation.

---

## Persona-Informed Design

### What Personas Provide
- Personas represent user archetypes — not real people, but composite models of real user groups
- Each persona defines: goals, frustrations, technical proficiency, context of use, and priorities
- Personas prevent "designing for yourself" — the designer's preferences may differ from the user's needs

### Design Implications by Expertise Level
- **Novice users**: Need clear onboarding, visible labels on everything, step-by-step guidance, generous error recovery. Prioritize discoverability over efficiency
- **Intermediate users**: Need shortcuts alongside guided paths. Appreciate tooltips and progressive disclosure. Want efficiency without being overwhelmed
- **Expert users**: Need keyboard shortcuts, dense information display, customization options, minimal chrome. They'll learn complex interfaces if the payoff is efficiency
- **Design decision**: Know your primary persona's expertise level before choosing information density, navigation complexity, and onboarding depth

### Context of Use
- **Desktop at work**: Focused, multi-tasking, large screen, keyboard + mouse, multiple tabs, sessions of 30min-8hrs
- **Mobile on the go**: Distracted, single-task, small screen, touch, variable connectivity, sessions of 30s-5min
- **Mobile at home**: Relaxed, browsing, medium attention, sessions of 5-30min
- **Design decision**: Match the interaction model to the primary context. Dashboard for desktop-at-work. Quick-action cards for mobile-on-the-go. Content feed for mobile-at-home

---

## User Journey Awareness

### The Five Stages
1. **Awareness**: User discovers the product. Design focus: hero section, value proposition, brand impression. The user asks: "What is this?"
2. **Consideration**: User evaluates the product. Design focus: features, comparisons, social proof, pricing. The user asks: "Is this for me?"
3. **Conversion**: User takes action (sign up, purchase, subscribe). Design focus: frictionless forms, clear CTAs, trust signals. The user asks: "How do I get it?"
4. **Retention**: User returns and uses the product. Design focus: onboarding, dashboard, notification management. The user asks: "How do I use it?"
5. **Advocacy**: User recommends the product. Design focus: sharing features, referral programs, community. The user asks: "How do I tell others?"

### Design for Journey Stage
- Landing pages serve stages 1-3. The design should follow the objection-answering sequence: What → Why → How → Buy
- Product interfaces serve stage 4. The design should minimize friction for repeated tasks
- Community/sharing features serve stage 5. Make it easy and rewarding to share

---

## Nielsen's 10 Usability Heuristics

### Quick Reference for Design Reviews
1. **Visibility of system status**: The system should always keep users informed about what's going on. Loading states, progress indicators, current location
2. **Match between system and real world**: Speak the users' language. Use real-world metaphors (shopping "cart," file "folder"). Avoid jargon
3. **User control and freedom**: Provide undo, redo, cancel, and escape routes. Users make mistakes — let them recover without penalty
4. **Consistency and standards**: Follow platform conventions. If every other app uses a bottom tab bar, use a bottom tab bar. Don't reinvent established patterns
5. **Error prevention**: Design to prevent errors before they happen. Confirmation dialogs for destructive actions, constraints on input (date pickers instead of text fields), disabled states for invalid actions
6. **Recognition rather than recall**: Show options and information rather than requiring users to remember from previous screens. Dropdown instead of text input for known options. Recent items visible
7. **Flexibility and efficiency of use**: Shortcuts for experts that don't slow down novices. Keyboard shortcuts, customizable workflows, saved preferences
8. **Aesthetic and minimalist design**: Every extra element competes with the relevant ones and diminishes their visibility. Remove what doesn't serve a purpose
9. **Help users recognize, diagnose, and recover from errors**: Error messages in plain language, specific about what went wrong, suggesting how to fix it
10. **Help and documentation**: Searchable help, contextual tooltips, onboarding tours for complex features

---

## Information Architecture Basics

### Card Sorting
- Organize content into groups that make sense to USERS, not to the organization
- Common mistake: organizing navigation by department (Sales, Engineering, Marketing) instead of by user task (Buy, Build, Learn)

### Navigation Depth
- Ideal: important content within 3 clicks/taps. Maximum: 5
- Flat > deep. 7 top-level categories with 5 items each > 3 categories with 12 items each
- Users who can SEE all options (flat) find things faster than users who must REMEMBER which category contains what they want (deep)

### Labeling
- Navigation labels should be specific and action-oriented: "Get Started" not "Resources," "View Pricing" not "Plans"
- If a label needs a description to be understood, it's the wrong label
- Test: Can a new user guess what they'll find behind each navigation label? If not, relabel

---

## Designing for Different Goals

### Conversion-Focused Design
- Clear value proposition above the fold. One primary CTA per viewport
- Remove distractions: minimal navigation on landing pages, no sidebar, no unrelated content
- Social proof near conversion points (testimonials above pricing, logos near sign-up)
- Urgency without manipulation: "Start free trial" not "LAST CHANCE!! 24 HOURS ONLY!!"
- Friction reduction: fewer form fields, social login options, guest checkout

### Retention-Focused Design
- Onboarding that teaches by doing (guided tasks, not tutorials)
- Habit hooks: variable rewards (new content daily), investment (customization), triggers (notifications)
- Progress visibility: streaks, completion percentages, level indicators
- Re-engagement: well-designed empty states that invite action, "welcome back" patterns

---

## Quality Criteria
- FAIL: Design optimized for the designer's preferences, not the target user's needs
- FAIL: Expert-level information density for a novice audience (or vice versa)
- FAIL: Navigation organized by internal company structure, not user tasks
- FAIL: Critical user journey interrupted by non-essential elements (pop-ups during checkout)
- FAIL: Error messages that blame the user ("You entered the wrong password") instead of helping ("Incorrect password. Reset it?")
- FAIL: No loading state, no progress indicator — system status invisible
- PASS: Design decisions traced to persona/audience needs, not aesthetic preference alone
- PASS: Primary user journey (awareness → conversion) has clear, uninterrupted flow
- PASS: Navigation labels are task-oriented and self-explanatory
- PASS: Nielsen's heuristics satisfied — system status visible, errors recoverable, consistency maintained
- PASS: Information depth appropriate for context (landing page ≠ dashboard ≠ documentation)
