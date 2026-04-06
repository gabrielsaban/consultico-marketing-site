# Consultico Website

A Next.js marketing site for Consultico. The app uses a shared global shell, a composed homepage, and placeholder service routes that can be expanded as needed.

## Stack

- **Next.js 15.5** - React framework with App Router
- **React 19** - UI library with Server Components
- **TypeScript 5** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling with PostCSS
- **Framer Motion 12** - Animation library for interactive components
- **Lenis 1.1** - Smooth scroll library for enhanced UX

## Run Locally

```bash
npm install
npm run dev
npx tsc --noEmit
npm run lint
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/              # App Router entrypoints, layout, metadata routes
├── home/             # Homepage composition and homepage-only sections
├── components/       # Reusable UI and shared shell pieces
├── hooks/            # Reusable client-side behavior
└── fonts/            # Local brand fonts

archive/
├── components/       # Historical component snapshots
├── docs/             # Archived reference docs
├── hooks/            # Historical hooks
└── sections/         # Historical section snapshots

public/
├── brand/            # Logo and brand assets
└── icons/            # Social and UI icons
```

## Current Structure Notes

- `src/app/layout.tsx` owns the shared shell: fonts, metadata, preloader, effects layer, nav, top bar, page frame, and footer wiring.
- `src/app/page.tsx` stays thin and hands homepage composition off to `src/home/__ComposedPage.tsx`.
- Service pages in `src/app/*/page.tsx` currently act as lightweight route placeholders.
- The practical layout baseline is a `1600px` container with mobile-first spacing and `clamp()` typography.

## Configuration Files

- **next.config.ts** - Next.js configuration
- **tsconfig.json** - TypeScript compiler options
- **eslint.config.mjs** - Linting rules
- **postcss.config.mjs** - PostCSS with Tailwind plugin
- **AGENTS.md** - local working rules for coding agents, intentionally Git-ignored

## To-Do

- [X] Add social links
- [X] Add dark mode
- [X] Add working interactive map
- [X] Redirect CTAs to sections, footer buttons to relevant pages
- [X] Add more scroll-in animations (e.g. stat number bump, smooth pops)
- [X] Add animated site entry screen
- [ ] Fix dark-mode bugs
- [ ] Retouch hero spacing
- [ ] Develop ThinkFirst page
- [ ] Develop careers page
- [ ] Develop service pages
- [ ] Add CMS for projects, reviews, staff & resumes
- [ ] Make webinar registration & contact form functional
- [ ] Ensure full mobile responsive design
