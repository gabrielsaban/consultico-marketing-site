# Mobile Enhancements Plan

This file now tracks current status for mobile work: what’s DONE and what’s NEXT. It complements the desktop-responsive work already implemented.

## Status at a Glance
- ✅ Done (affects mobile too)
  - Typography scaled with clamps in hero; many headings/body sizes standardized across sections
  - Stats section supports stacked/grid layouts; spacing scales down cleanly
  - Team grid scales (2 → 3 → 4 cols at large screens) with responsive text sizes
  - Mission & Values card uses auto-height; responsive title/body sizes; internal scroll removed in typical narrow widths
  - Keyword carousel: responsive item sizes and dot spacing; statically centered container; edge fade only on very large screens (prevents zoom-out artifacts)
  - Custom cursor disabled on touch/coarse pointers and when `prefers-reduced-motion`
  - AnimatedText degrades to non-animated when `prefers-reduced-motion`
  - General containers/paddings standardized; `scroll-mt-*` added to sections; base left padding set to `pl-0 md:pl-16`

- 🚧 Still to implement (mobile-first)
  - Mobile navigation drawer (hamburger): accessible top bar, focus trap, ESC/overlay close, body scroll lock, `aria-expanded`/`aria-controls`
  - Hide left vertical rail on mobile (`hidden md:flex`) and ensure content offset handled by `md:pl-16`
  - Hero mobile layout: stack brand, headlines, socials, and CTA in flow; ensure no absolute positioning conflicts; tune clamps for small screens
  - Keyword carousel on touch: pause on tap (not hover); optional performance mode (2 lines) on small devices
  - Dot-matrix background: reduce density or disable on small screens; respect reduced-motion by stopping RAF
  - Lenis smooth scrolling: skip initializing on touch devices; confirm anchor offsets remain correct
  - ImageFilledText: disable hover wobble on touch and reduced-motion; confirm background-size clamp for small widths
  - Accessibility polish: visible focus rings on all interactive elements; Mission/Values arrow buttons keyboard-accessible and labelled; CTA/links target sizes ≥44px
  - Full mobile QA matrix (see below) and adjustments from findings

This document lists the implementation work for phones and small tablets (≤ 768px). It separates mobile-specific work so desktop/laptop responsive tasks can proceed in parallel.

## Navigation
- Replace left vertical rail with a mobile top bar + hamburger menu
  - Fixed top bar (~64px), brand at left, hamburger at right
  - Slide-in drawer (full-height) with large tap targets for: home, projects, services, about, contact
  - Keyboard/focus handling: focus trap inside drawer, initial focus on first link, ESC closes, click outside closes
  - ARIA: `aria-expanded`, `aria-controls`, `role="dialog"`/`aria-modal` if modal-based
  - Body scroll lock when open
  - Sections get `scroll-mt-20` (or matching top bar height)
- Visibility rules
  - Hide left rail on mobile: `hidden md:flex` (PENDING)
  - Remove left padding on page container: `pl-0 md:pl-16` (DONE)

## Typography and layout
- Use clamp for large headings to prevent overflow (PARTIAL: applied to hero and key sections; continue auditing)
- Avoid `whitespace-nowrap` on mobile so lines wrap naturally (DONE where relevant)
- Reduce horizontal paddings/gaps: `px-4 sm:px-6`, `gap-4 sm:gap-6` (DONE in core sections; continue auditing)
- Constrain long-copy widths with `max-w-prose` or `max-w-[65ch]` (PARTIAL)

## Hero
- Reposition absolute elements into a simpler flow for small screens (PENDING)
  - Hero headline becomes stacked, centered; social icons move below the text
  - CTA sits directly below hero copy, not overlapping
- Fix non-standard Tailwind classes using valid arbitrary values (DONE)
  - `top-18` → `top-[4.5rem]`, `left-7/9` → `left-1/2` + `-translate-x-1/2`, `w-15 h-15` → `w-[3.75rem] h-[3.75rem]`

## Keyword Carousel
- Responsive text size (DONE)
- Reduce dot spacing on small screens (DONE)
- Static centered container with large-screen edge fade to avoid zoom artifacts (DONE)
- Touch behavior: pause on tap, not hover; test for `pointer: coarse` (PENDING)
- Performance: consider reducing to 2 lines or lowering speed on small devices (PENDING/OPTIONAL)

## Stats Section
- Column stack and responsive 1→2→4 grid (DONE)
- Reduce counter font sizes via responsive classes (DONE)
- Disable hover scale on touch (`pointer: coarse`) / motion-reduce (DONE)

## About Section
- Paragraphs responsive with comfortable `leading-relaxed` (DONE in key areas; continue auditing)
- Team grid: `grid-cols-2` with responsive gaps and text sizes (DONE)
- Mission & Values carousel (PARTIAL)
  - Auto-height; text scales down at small widths (DONE)
  - Consider moving controls below content or to dots on mobile; ensure ≥44px targets (PENDING)
  - Ensure arrows keyboard accessible with `aria-label` (PENDING)

## ImageFilledText
- Clamp text size and ensure image background scales without overflow (PARTIAL)
- Disable hover wobble on touch (`pointer: coarse`) and when `prefers-reduced-motion` (PENDING)

## AnimatedText
- Consider lighter animation mode on mobile: per-line/per-paragraph fade instead of per-word (DONE via reduced-motion; mobile-specific mode still optional)
- Ensure smooth wrap and avoid layout jank (DONE)

## Custom Cursor
- Disable entirely on touch/coarse pointers and when `prefers-reduced-motion` (DONE)
  - Fall back to the native cursor; do not render cursor elements

## Dot Matrix Background
- Reduce density and animation cost on small screens (PENDING)
  - Increase `dotSpacing`, reduce `dotOpacity`, or disable below a threshold
- Respect `prefers-reduced-motion` and stop the RAF loop when disabled (PENDING)

## Lenis Smooth Scrolling
- Skip initializing Lenis on touch devices; rely on native scroll (PENDING)
- If enabled, ensure it doesn’t conflict with anchor offsets and section `scroll-mt` (PENDING)

## Accessibility
- Ensure visible focus styles for all interactive elements (PENDING)
- Drawer: trap focus, ESC to close, return focus to hamburger on close (PENDING)
- Buttons/controls minimum size: 44×44px; sufficient contrast and spacing (PARTIAL; arrow buttons pending)

## Testing Matrix
- Viewports: 320, 360, 390, 414, 430, 480, 600, 768
- Browsers: Mobile Chrome, Safari (iOS), Firefox Android
- Verify: no horizontal scroll, performant animation, accessible navigation, readable typography, tappable controls

## Acceptance Criteria
- Mobile nav drawer is accessible and performant
- No horizontal overflow across targeted widths
- Hero, carousel, and long-copy sections readable and not clipped
- Heavy desktop-only effects (custom cursor, dense background) are disabled or simplified

---

## Next Sprint (mobile-focused)
- Implement mobile top bar + drawer, hide left rail on mobile
- Convert hero to flow layout on mobile; tune clamps
- Disable dot matrix and skip Lenis init on touch
- Add touch pause-and-resume for KeywordCarousel
- Add focus-visible styles and arrow button A11y; ensure ≥44px targets
- Mobile QA pass against the matrix and fix any remaining overflow or performance issues
