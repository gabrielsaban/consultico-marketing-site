import type { Metadata } from 'next';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ArticleCategoryFilter from '@/components/articles/ArticleCategoryFilter';
import ArticleCta from '@/components/articles/ArticleCta';
import { getAllArticles } from '@/lib/articles/loader';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Practical writing on strategy, SEO, and growth from Consultico. No filler, no generic agency advice.',
  alternates: { canonical: '/articles' },
  openGraph: {
    title: 'Articles | Consultico',
    description:
      'Practical writing on strategy, SEO, and growth from Consultico. No filler, no generic agency advice.',
    url: '/articles',
    images: ['/og.jpg'],
  },
  twitter: {
    title: 'Articles | Consultico',
    description:
      'Practical writing on strategy, SEO, and growth from Consultico. No filler, no generic agency advice.',
    images: ['/og.jpg'],
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen">
      <section className="relative pb-16 md:pb-20 lg:pb-24">
        <ServiceDesktopHeader />
        <div className="dot-grid-premium section-mask absolute inset-0 -z-10" aria-hidden="true" />

        <Container className="pt-[11rem] md:pt-[13rem] lg:pt-[14rem]">
          <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            From Consultico
          </p>
          <h1 className="mb-4 font-futura text-[clamp(2rem,4vw,3.5rem)] font-bold text-brand-blue">
            Articles
          </h1>
          <p className="mb-12 max-w-2xl font-helvetica-light text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 md:mb-16">
            Practical writing on strategy, SEO, and growth. No filler, no generic agency advice.
          </p>

          <ArticleCategoryFilter articles={articles} />
        </Container>
      </section>

      <ArticleCta
        title="Want a plan before you publish?"
        body="Think First maps your channels, economics, and growth path before you commit budget to SEO, PPC, or web."
        buttonLabel="Explore Think First"
      />
    </main>
  );
}
