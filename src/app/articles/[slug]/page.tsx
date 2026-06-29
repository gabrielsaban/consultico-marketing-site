import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ArticleAuthor from '@/components/articles/ArticleAuthor';
import ArticleCta from '@/components/articles/ArticleCta';
import ArticleProse from '@/components/articles/ArticleProse';
import ArticleReadingPanel from '@/components/articles/ArticleReadingPanel';
import ArticleSidebar from '@/components/articles/ArticleSidebar';
import { formatArticleDate } from '@/lib/articles/format';
import { resolveArticleCta } from '@/lib/articles/cta';
import { hasDedicatedArticleImage } from '@/lib/articles/display';
import { getArticleBySlug, getRelatedArticles } from '@/lib/articles/loader';
import { articlePageJsonLd, serializeJsonLd } from '@/lib/schema';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getAllArticles } = await import('@/lib/articles/loader');
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article not found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
    },
    twitter: {
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const exploreArticles = getRelatedArticles(slug, 4);
  const cta = resolveArticleCta(article);
  const jsonLd = articlePageJsonLd(article);
  const showHeroImage = hasDedicatedArticleImage(article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <main className="min-h-screen">
        <section className="relative bg-brand-silk pb-12 dark:bg-gray-950 md:pb-16">
          <ServiceDesktopHeader />
          <Container className="relative z-10 pt-[11rem] md:pt-[13rem] lg:pt-[14rem]">
            <nav
              aria-label="Breadcrumb"
              className="mx-auto mb-6 max-w-6xl font-helvetica text-[0.875rem] text-gray-600 dark:text-gray-400"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-brand-blue">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/articles" className="hover:text-brand-blue">
                    Articles
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-800 dark:text-gray-200">{article.title}</li>
              </ol>
            </nav>

            <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10">
              <ArticleReadingPanel>
                <article>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-brand-blue px-2.5 py-0.5 text-[0.7rem] font-helvetica font-medium uppercase tracking-wide text-brand-blue">
                      {article.category}
                    </span>
                    <span className="font-helvetica text-[0.875rem] text-gray-500 dark:text-gray-400">
                      {article.readTime}
                    </span>
                  </div>

                  <h1 className="mb-5 font-futura text-[clamp(2rem,3.5vw,2.75rem)] font-bold leading-[1.12] text-brand-blue">
                    {article.title}
                  </h1>

                  <p className="mb-8 font-helvetica-light text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
                    {article.excerpt}
                  </p>

                  <ArticleAuthor article={article} />

                  {showHeroImage && article.image && (
                    <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
                      <Image
                        src={article.image}
                        alt={article.imageAlt ?? article.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                  )}

                  <ArticleProse content={article.content} />

                  <p className="mt-8 border-t border-gray-200 pt-6 font-helvetica text-[0.875rem] text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    Published {formatArticleDate(article.date)}
                    {article.updated && article.updated !== article.date
                      ? ` · Updated ${formatArticleDate(article.updated)}`
                      : ''}
                  </p>
                </article>
              </ArticleReadingPanel>

              <ArticleSidebar
                exploreArticles={exploreArticles}
                cta={cta}
                currentCategory={article.category}
                className="xl:sticky xl:top-28"
              />
            </div>
          </Container>
        </section>

        <ArticleCta
          variant="light"
          title={cta.title}
          body={cta.body}
          href={cta.href}
          buttonLabel={cta.label}
        />
      </main>
    </>
  );
}
