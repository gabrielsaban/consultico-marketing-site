# Consultico Audit Implementation Tasks

Mapped from the compass audit to the Next.js 15 codebase. Homepage design is out of scope except remove-list items.

**Paul decisions (2 Jul 2026):** stat band final, review curation, no displayed review counts, sector stat wordings, hero charts from real client data, contact form/testimonial/reply-time, GBP schema confirmed.

---

## Discrepancies (audit vs code)

1. Schema largely built already — gap was `hasMap` on sitewide LocalBusiness (now added).
2. Navy `#1B2A4A` added to `globals.css`.
3. Flow diagrams kept; new hero charts added.
4. SEO/PPC CTA counts were 4 labelled instances, not 6+.
5. Margin-aware duplicate on 3 niche pages only (dentists, estate agents, accountants).
6. `/think-first` is a full page in code.
7. `seo-industries.ts` `related` arrays now point to live slugs only.
8. Contact form has 5 visible fields; Website is hidden honeypot.
9. SEO page hero uses `ServiceHero`; niche/Glasgow use `NicheHero`.

---

## Still open (post-implementation)

- MCD £8/£28 verification for `/ppc` body and hero proof chips (await client data export)
- Real GSC/CPL data points for hero chart shapes (approximations from site copy until export supplied)

---

## Phase 1 — Quick wins and removals

Branch: `audit/phase-1`

- [x] **1** [`src/home/ProjectsSocialProof.tsx`](src/home/ProjectsSocialProof.tsx), [`src/components/ReviewStrip.tsx`](src/components/ReviewStrip.tsx) — Remove carousel; recurate 3 quotes; heading "Rated 5.0 on Google". **Blast:** homepage only.
- [x] **1b** Review count removal — [`ppc/page.tsx`](src/app/ppc/page.tsx), [`seo-glasgow/page.tsx`](src/app/seo-glasgow/page.tsx), [`content/articles/best-ppc-agencies-uk.md`](content/articles/best-ppc-agencies-uk.md). **Blast:** 3 pages + 1 article.
- [x] **2** [`src/components/StatsBoxes.tsx`](src/components/StatsBoxes.tsx) — Final stat band; static values; retire AnimatedCounter. **Blast:** homepage.
- [x] **3** [`src/app/seo/page.tsx`](src/app/seo/page.tsx) — Delete duplicate thesis section. **Blast:** `/seo`.
- [x] **4** [`src/app/ppc/page.tsx`](src/app/ppc/page.tsx) — Remove duplicate reviews line; keep fellowship; trim thesis CTA. **Blast:** `/ppc`.
- [x] **5** Dentists, estate agents, accountants niche pages — Remove duplicate margin-aware paragraph. **Blast:** 3 pages (via registry/template).
- [x] **6** Six niche pages — CTA label "Start with an SEO audit". **Blast:** 6 pages.
- [x] **7** [`ServiceCtaBand.tsx`](src/components/services/ServiceCtaBand.tsx), seo/ppc `CtaLink` — Remove arrows on primary buttons. **Blast:** 10 pages using ServiceCtaBand + seo/ppc.

---

## Phase 2 — Hero redesigns

- [x] **8** New [`ServiceHero.tsx`](src/components/services/ServiceHero.tsx)
- [x] **9** New [`NicheHero.tsx`](src/components/services/NicheHero.tsx)
- [x] **10** Apply to `/seo`, `/ppc`, 6 niches, `/seo-glasgow`
- [x] **11** New `BoilerCoImpressionsChart.tsx`, `McdCplTrendChart.tsx`
- [x] **12** [`globals.css`](src/app/globals.css) — tokens; `--brand-navy` accent only

---

## Phase 3 — Copy replacement

- [x] **13** Hero copy on 9 rebuilt pages
- [x] **14** Merge overlapping sections on `/seo` and `/ppc`
- [x] **15** Differentiate Boiler Co proof (plumbers, electricians, heating)
- [x] **16** Contact page rebuild — testimonial, form, audit demotion

---

## Phase 4 — SEO/GEO technical

- [x] **17** `hasMap` on LocalBusiness in [`schema.ts`](src/lib/schema.ts)
- [x] **18** FAQ schema validation (niche pages use page-level FAQPage; no duplication)
- [x] **19** BreadcrumbList verify
- [x] **20** Heading hierarchy on rebuilt pages
- [x] **21** In-body internal linking on niche pages
- [x] **22** Unique content per niche page (~200–300 words)
- [x] **23** Sector stats — accountants, heating, dentists, estate agents
- [x] **24** Alt text on hero/proof images (SVG aria-labels on charts)
- [x] **24b** Sync [`public/llms.txt`](public/llms.txt)

---

## Phase 5 — Scalability

- [x] **25** `SeoIndustryPage.tsx` template
- [x] **26** Shared route body `SeoIndustryRoute` + six thin `page.tsx` wrappers (Next.js does not support partial dynamic segments like `seo-for-[slug]`, so each page delegates to the shared component with its slug)
- [x] **27** Consolidated `seoIndustryPageJsonLd(slug)`
- [x] **28** Extract seo/ppc section components (minimal pass — merged sections in place)
- [x] **29** [`src/lib/cta.ts`](src/lib/cta.ts) shared CTA primitives
- [x] **30** Clean [`seo-industries.ts`](src/lib/seo-industries.ts) registry
- [x] **31** [`seo-industry-types.ts`](src/lib/seo-industry-types.ts)
- [x] **32** Extend [`.cursor/rules/service-pages-no-author-bio.mdc`](.cursor/rules/service-pages-no-author-bio.mdc)

---

## Deviations from audit

1. MCD hero chips in Phase 2 only
2. Schema is enhancement not greenfield
3. Existing body SVGs kept; new hero charts added
4. Phase 5 before industry #7
5. Thesis blue bands kept on seo/ppc (duplicate copy removed instead)
