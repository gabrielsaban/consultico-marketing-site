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

## 🛠️ Development Roadmap

### 🔹 Phase 2: Homepage Layout
- [ ] Build homepage layout based on Figma design
  - [ ] Sticky vertical navigation bar with section links
  - [ ] Full-width scrollable hero section with image and stats
  - [ ] Service list section with tags and CTA
  - [ ] Client carousel (projects section)
  - [ ] Testimonial slider section
  - [ ] Animated stat counters
  - [ ] Meet the Team grid
  - [ ] FAQ section with dropdowns
  - [ ] Footer with return-to-top button
- [ ] Structure sections into modular components (`components/sections/`)

### 🔹 Phase 3: Animation & UX Polish
- [ ] Install and configure Framer Motion
- [ ] Animate scroll transitions between sections
- [ ] Add hover/entry animations (buttons, cards, sliders)
- [ ] Smooth scroll and snap-to-section behavior
- [ ] Add scroll-based return-to-top button

### 🔹 Phase 4: Responsive Design & Accessibility
- [ ] Make all sections responsive across mobile/tablet/desktop
- [ ] Ensure semantic HTML and heading structure
- [ ] Add accessible alt tags, labels, and ARIA attributes
- [ ] Keyboard navigation and focus ring visibility

### 🔹 Phase 5: Headless CMS Integration (WordPress)
- [ ] Set up WordPress instance as headless CMS
- [ ] Connect to WP REST API or WPGraphQL
- [ ] Fetch dynamic content: Projects, Testimonials, Team Members, FAQs
- [ ] Create reusable CMS fetch layer (`lib/wordpress.ts`)
- [ ] Add type safety with TS interfaces in `/types/`

### 🔹 Phase 6: Final Polish & Deployment
- [ ] Configure SEO metadata and OpenGraph tags
- [ ] Optimize images and font loading
- [ ] Add analytics (e.g. Vercel, Plausible, or GA)
- [ ] Deploy to Vercel with production domain
- [ ] Configure preview deployments and environment variables

### 🔹 Phase 7: Testing & QA (Optional)
- [ ] Add basic unit tests for components (Jest, React Testing Library)
- [ ] Visual regression testing (e.g. with Playwright or Chromatic)
- [ ] Lighthouse audits for accessibility and performance
- [ ] Manual QA on desktop/tablet/mobile

## 📁 Project Structure

```text
consultico-site/
├── public/                 # Static assets (images, icons, etc.)
├── src/
│   ├── app/                # Next.js App Router entry (pages, layout)
│   ├── components/         # Reusable UI components (Navbar, Footer, etc.)
│   ├── lib/                # Utilities and CMS fetch logic
│   ├── types/              # TypeScript types and interfaces
│   └── styles/             # Global and custom styles
├── .gitignore
├── README.md
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```