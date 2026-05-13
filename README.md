# Consultico Marketing Site

A strategy-led marketing website for Consultico, built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. The site combines a polished public brand experience with working lead capture, service pages, analytics, performance tracking, and reusable content sections.

## Highlights

- Composed homepage with hero, services, projects, reviews, team, map, and contact sections
- Service routes for SEO, PPC, web development, content creation, campaign management, and market strategy
- Resend-powered contact and webinar form flows
- Supabase-backed form session storage for drafts and submissions
- Contact form spam friction with a honeypot field and minimum submit time
- Vercel Analytics and Speed Insights wired globally
- Responsive, dark-mode aware interface using local brand fonts and Tailwind CSS

## Stack

- **Next.js 15** - App Router, metadata routes, API routes
- **React 19** - component UI and client interactions
- **TypeScript 5** - strict typing for app and server code
- **Tailwind CSS v4** - utility-first styling
- **Framer Motion** - interaction and section animation
- **Supabase REST** - form session persistence
- **Resend** - transactional email delivery
- **Vercel** - deployment, analytics, and speed insights

## Project Structure

```text
src/
├── app/          # App Router routes, API endpoints, metadata, layout shell
├── home/         # Homepage composition and homepage-only sections
├── components/   # Shared UI, navigation, effects, forms, modals, carousels
├── hooks/        # Reusable client-side behavior
├── lib/          # Shared domain and server helpers
└── fonts/        # Local brand fonts

public/
├── brand/        # Logo and brand assets
├── icons/        # Social and UI icons
├── projects/     # Project and case-study assets
└── team/         # Team portrait assets
```

## Architecture Notes

- `src/app/layout.tsx` owns the global shell: fonts, metadata, preloader, effects layer, nav, top bar, page frame, analytics, and footer wiring.
- `src/app/page.tsx` stays thin and delegates the homepage to `src/home/__ComposedPage.tsx`.
- Homepage-only section composition belongs in `src/home`.
- Reusable UI and interactive building blocks belong in `src/components`.
- Server-side form utilities live in `src/lib/server`.
- Route files should stay focused on route-specific behavior.

## Environment Variables

Create `.env.local` for local development.

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_TO_EMAIL=
WEBINAR_NOTIFY_EMAIL=
```

Notes:

- `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` can be used for server-side Supabase REST calls.
- `RESEND_FROM_EMAIL` must use a sender domain verified in Resend.
- `NEXT_PUBLIC_SITE_URL` is used by metadata, sitemap, and robots output.

## Forms

The contact form posts to `src/app/api/contact-form/route.ts`.

- Submitted emails are sent through Resend before Supabase persistence runs.
- Supabase save failures are logged and do not block successful contact email delivery.
- Draft submissions are saved when possible, but failures are non-blocking.
- Basic spam friction is handled with a hidden honeypot field and minimum submit time.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run build
npx eslint src/path/to/file.tsx
```

`npm run build` performs the production compile, lint pass, type check, static generation, and route analysis.

Known maintenance note: ESLint v9 reports that `.eslintignore` is deprecated. This is non-blocking and can be cleaned up by moving ignores into `eslint.config.mjs`.

## Content Sources

Some client-facing content is staged from source documents before implementation. Team bios and case studies should be treated as source material until their copy and assets are intentionally added to the active app.

Current implementation notes:

- Completed team bios are surfaced through the team card CV overlays.
- Case study copy should only be published once signed off and paired with suitable website presentation or assets.
