# Consultico Site

High-performance marketing site built with:

- Next.js (App Router)
- Tailwind CSS
- TypeScript
- Framer Motion
- WordPress as a headless CMS (REST or GraphQL)
- Vercel Hosting

## Getting Started
```bash
npm install
npm run dev
```

### Responsive Design

**Design Philosophy:**
- Design target: 1080p (1920x1080), test at 375px, 768px, 1440p and 4K
- Max content width: 1400px (prevents layout blow-up on ultrawide)
- Typography: Fluid scaling via clamp() within capped containers
- Spacing: Mobile-first padding (px-4 → sm:px-6 → md:px-[5vw] → lg:px-[7.5vw])

## To-Do:
- Fix socialicon tablet positioning
- Add mobile version services list
- Make projects, stats, reviews 2-column on mobile
- Fix reviews quotations
