# Consultico Website

High-performance marketing website showcasing digital marketing services, built with modern web technologies and optimized for all screen sizes.

## Tech Stack

- **Next.js 15.4** - React framework with App Router
- **React 19** - UI library with Server Components
- **TypeScript 5** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling with PostCSS
- **Framer Motion 12** - Animation library for interactive components
- **Lenis 1.1** - Smooth scroll library for enhanced UX

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with fonts & metadata
│   ├── page.tsx      # Homepage (composed sections)
│   ├── globals.css   # Global styles & Tailwind imports
│   └── landing/      # Alternative landing page
├── sections/         # Main page sections (Home, About, Services, etc.)
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks (Lenis scroll, polar carousel)
├── types/            # TypeScript type definitions
└── fonts/            # Custom font files

public/
├── brand/            # Logo, brand assets
└── icons/            # Icon assets
```

## Design System

### Brand Colors
- **Primary Blue**: `brand-blue` - Main brand color for CTAs, accents, dividers
- **Backgrounds**: `gray-50`, `brand-silk` - Soft grey sections with shadows
- **Text**: `gray-700`, `gray-600` - Hierarchy through color weight

### Typography
- **Headings**: Futura font family, fluid sizing via `clamp()`
- **Body**: Helvetica font family, responsive scaling
- **Scale**: `clamp(minRem, vw, maxRem)` for fluid responsive text

### Spacing & Layout
- **Container**: Max-width 1600px (prevents ultrawide blow-up)
- **Padding**: Mobile-first progression
  - Mobile: `px-4`
  - Tablet: `sm:px-6`, `md:px-[5vw]`
  - Desktop: `lg:px-[7.5vw]`
- **Sections**: `py-16 md:py-20 lg:py-24` (consistent vertical rhythm)

## Responsive Design

**Design Philosophy:**
- **Target**: 1080p (1920x1080) as primary design resolution
- **Testing**: 375px, 768px, 1080p, 1440p, 4K
- **Mobile Traffic**: 60-70% of users (mobile-first approach)
- **Max Content Width**: 1400px prevents layout issues on ultrawide displays
- **Fluid Typography**: `clamp()` ensures readable text at all sizes
- **Breakpoints**: Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

## Key Features

### Performance
- Server-side rendering with React 19 Server Components
- Optimized image loading
- Minimal client-side JavaScript
- Fast page transitions

### Animations
- Framer Motion for interactive hover states
- Smooth scroll with Lenis
- Carousel components (projects, reviews, keywords)
- Animated statistics counters
- Custom cursor effects

### UX Enhancements
- Smooth scrolling throughout site
- Route-aware navigation with active states
- Interactive service selection bubbles
- Auto-playing testimonial carousel
- Responsive contact forms with validation

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation support
- Focus states on all interactive elements

## Configuration Files

- **next.config.ts** - Next.js configuration
- **tailwind.config.js** - Tailwind customization (brand colors, fonts)
- **tsconfig.json** - TypeScript compiler options
- **eslint.config.mjs** - Linting rules
- **postcss.config.mjs** - PostCSS with Tailwind plugin

## To-Do

- [X] Add social links
- [X] Add dark mode
- [ ] Retouch hero spacing
- [ ] Redirect CTAs to sections, footer buttons to relevant pages
- [ ] Add CMS for projects, reviews, staff & resumes
- [ ] Add more scroll-in animations (e.g. stat number bump, smooth pops)
- [ ] Make webinar registration & contact form functional
- [ ] Add working interactive map
- [ ] Develop ThinkFirst page
- [ ] Develop careers page
- [ ] Develop service pages
- [ ] Ensure full mobile responsive design
