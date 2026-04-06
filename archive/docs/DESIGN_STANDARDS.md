# Design Standards & Conventions

> **Purpose:** Ensure consistency across implementations and provide context for AI-assisted development.

## 🎨 Design Principles

### Viewport Strategy
- **Primary target:** 1080p (1920x1080) - design here first
- **Test at:** 375px (mobile), 768px (tablet), 1440p (2560x1440), 4K (3840x2160)
- **Max content width:** 1400px (prevents ultrawide blow-up)
- **Philosophy:** Content-centric, not viewport-centric
- **Mobile consideration:** All desktop patterns must include mobile breakpoints from day 1

### Typography
- **Approach:** Fluid scaling with clamp()
- **Pattern:** `text-[clamp(minRem, Xvw, maxRem)]`
- **Example:** `text-[clamp(1rem,1.4vw,1.25rem)]`
- **Avoid:** Pure VW units (`text-[1.5vw]`) - these don't cap
- **Custom classes:** `.text-d-64`, `.text-b-18` are fixed px - acceptable for specific use cases

### Spacing
- **Outside containers:** Use Tailwind defaults (px-4, px-6, px-8)
- **Inside containers:** VW-based for fluid feel (`px-[5vw]`)
- **Vertical:** Use Tailwind scale (py-8, py-16, py-24)
- **Gaps:** Responsive (`gap-6 lg:gap-8 xl:gap-12`)

---

## 🏗️ Component Patterns

### Container Component
**Location:** `src/components/Container.tsx`

**Usage:**
```tsx
<Container>
  {/* Section content */}
</Container>
```

**Spec:**
- Max-width: 1400px
- Padding: `px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw]` (mobile-first: 16px → 24px → fluid)
- Centered: `mx-auto`
- Customizable via className prop
- **Mobile rationale:** Fixed px on small screens prevents content cramping

**Do NOT:**
- Add padding directly to sections - use Container
- Use `w-full pl-[7.5vw]` pattern - Container handles this
- Nest Containers inside Containers

### Section Wrapper Pattern
```tsx
<section id="services" className="min-h-screen scroll-mt-24">
  <Container>
    {/* Content */}
  </Container>
</section>
```

### Grid Pattern
**Preferred (Full Mobile-First Spec):**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-12">
```
**Note:** Always start with `grid-cols-1` and provide gap for each breakpoint

**Avoid:**
```tsx
// Missing mobile breakpoint - will show all columns on phones!
<div className="grid grid-cols-3 gap-12">

// Fractional grids - unpredictable at all sizes
<div style={{ gridTemplateColumns: '221fr 212fr 254fr 306fr' }}>
```

---

## 🎯 Responsive Breakpoints

### Tailwind Defaults
- `sm:` 640px (mobile landscape, small tablets)
- `md:` 768px (tablets)
- `lg:` 1024px (small desktops, laptops)
- `xl:` 1280px (desktops)
- `2xl:` 1536px (large desktops)

### Custom (if needed)
- Consider adding `1440px` breakpoint if issues persist
- Add to Tailwind config: `screens: { '1440': '1440px' }`

### Usage Guidelines
- **Always provide base (mobile-first):** `text-base md:text-lg xl:text-xl`
- **Don't skip breakpoints:** If you use xl, provide md/lg intermediate steps
- **Test gaps between breakpoints:** 1280-1536px is a large jump (xl to 2xl)

---

## 🚫 Anti-Patterns

### ❌ Don't Do This
```tsx
// Pure VW text (doesn't cap)
<p className="text-[1.5vw]">

// Grids without mobile breakpoint (BROKEN ON PHONES)
<div className="grid grid-cols-3 gap-12">

// Fractional grids (unpredictable)
<div style={{ gridTemplateColumns: '1fr 1.5fr 2fr' }}>

// Individual section padding (inconsistent)
<div className="pl-[7.5vw] pr-[7.5vw]">

// Gap disappearing at breakpoints
<div className="gap-[6vw] 2xl:gap-[0vw]">

// Viewport-width hacks
<div style={{ width: '100vw' }}>
```

### ✅ Do This Instead
```tsx
// Clamped text
<p className="text-[clamp(1rem,1.5vw,1.25rem)]">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-12">

// Container pattern
<Container>
  <div className="content">

// Consistent gaps
<div className="gap-6 lg:gap-8 xl:gap-12">

// Proper width constraints
<Container>
  <div className="w-full">
```

---

## 📐 Component-Specific Rules

### HeroSection
- Uses 2-column grid on desktop
- Logo position: `top-[3.25rem] left-[7.5vw]` (inside Container if refactored)
- Social icons: Absolute positioned `top-16 right-[3.75vw]`
- **Known issue:** Grid gap logic needs fixing

### ServicesBubbleList
- Bubble buttons: `rounded-[74px]`
- Grid: `lg:grid-cols-[60%_auto] gap-[5vw] 2xl:gap-[9vw]` (needs xl step)
- **Known issue:** Preview text shrinks at 2xl (`xl:text-[1.25vw] 2xl:text-[0.9vw]`)

### StatsBoxes
- **Current:** Fractional grid (WRONG)
- **Should be:** `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`
- Fixed heights: `xl:h-[12rem] 2xl:h-[15rem]`

### Footer
- Full-width SVG image
- **Known issue:** Uses `width: '100vw'` inline style (causes scroll risk)
- Should use Container or calculated negative margin

---

## 🔄 Migration Checklist

When refactoring a component:
1. [ ] Remove individual `pl-[Xvw]` / `pr-[Xvw]` padding
2. [ ] Wrap content in `<Container>` (includes mobile padding)
3. [ ] Audit text sizes - convert VW to clamp()
4. [ ] Check grid patterns - MUST start with `grid-cols-1` then add md/lg/xl breakpoints
5. [ ] Verify gaps have full responsive variants: `gap-4 md:gap-6 lg:gap-8 xl:gap-12`
6. [ ] Test at 375px (mobile), 768px (tablet), 1080p, 1440p, 1920p viewports
7. [ ] Check for horizontal scroll at ALL sizes (shouldn't exist)
8. [ ] Verify touch targets on mobile (min 44x44px for buttons)

---

## 🎯 Implementation Strategy

### Desktop-First with Mobile-Aware Patterns

**Approach:** Design at 1080p, implement with mobile breakpoints from day 1

**Why this works:**
1. Desktop patterns establish the visual design
2. Mobile breakpoints are included from the start (not retrofitted)
3. Testing happens across all viewports at once
4. No need for multiple refactoring passes

**Pattern Example:**
```tsx
// ❌ Desktop-only (will break on mobile)
<div className="grid grid-cols-3 gap-12">

// ✅ Desktop-first, mobile-aware (works everywhere)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
```

**Key Principle:** Every desktop pattern MUST answer "what does this do on mobile?"

**Testing Flow:**
1. Design component at 1080p
2. Implement with full responsive spec (mobile → desktop)
3. Test at: 375px, 768px, 1080p, 1440p
4. Adjust if needed
5. Ship

See TESTING.md for comprehensive testing checklist.

---

## 💡 For AI Assistants

When asked to create/modify components:
1. **Always use Container** for section-level content
2. **Always use clamp() for fluid text** - never pure VW
3. **Always provide responsive grid columns** - avoid fractional
4. **Always test gap logic** - ensure xl breakpoint exists between lg and 2xl
5. **Reference this file** before implementing to ensure consistency

**Quick Reference:**
- Max content width: 1400px
- Container padding: `px-[5vw] lg:px-[7.5vw]`
- Text pattern: `text-[clamp(1rem,1.5vw,1.25rem)]`
- Grid pattern: `grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-12`
- Brand colors: `bg-brand-blue`, `bg-brand-silk`, `bg-brand-black`
- Fonts: `font-futura` (headings), `font-helvetica` (body)
