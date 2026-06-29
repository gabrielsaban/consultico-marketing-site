import Link from 'next/link';
import Container from '@/components/Container';

interface ArticleCtaProps {
  variant?: 'dark' | 'light' | 'inline';
  title?: string;
  body?: string;
  href?: string;
  buttonLabel?: string;
}

export default function ArticleCta({
  variant = 'dark',
  title = 'Want clarity before you spend?',
  body = 'Think First maps your channels, economics, and growth path before you commit budget to SEO, PPC, or web.',
  href = '/think-first',
  buttonLabel = 'Explore Think First',
}: ArticleCtaProps) {
  if (variant === 'inline') {
    return (
      <div className="my-10 rounded-2xl border border-brand-blue/20 bg-brand-silk p-6 md:p-8 dark:border-brand-blue/30 dark:bg-gray-900">
        <h3 className="mb-3 font-futura text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold text-brand-blue">
          {title}
        </h3>
        <p className="mb-5 max-w-2xl font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
          {body}
        </p>
        <Link
          href={href}
          className="inline-flex items-center font-helvetica text-[0.95rem] font-medium text-brand-blue hover:underline"
        >
          {buttonLabel} →
        </Link>
      </div>
    );
  }

  if (variant === 'light') {
    return (
      <section className="py-16 md:py-20 lg:py-24 bg-brand-blue text-white">
        <Container>
          <h2 className="mb-5 max-w-[20ch] font-futura text-[clamp(1.6rem,2.6vw,2.8rem)] font-bold leading-[1.14]">
            {title}
          </h2>
          <p className="mb-6 max-w-3xl font-helvetica-light text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.6] text-white/90">
            {body}
          </p>
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-helvetica text-[clamp(1rem,1.2vw,1.125rem)] font-medium text-brand-blue transition-colors duration-200 hover:bg-gray-100"
          >
            {buttonLabel}
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-brand-black py-16 text-white md:py-20 lg:py-24">
      <Container>
        <h2 className="mb-5 max-w-[20ch] font-futura text-[clamp(1.6rem,2.4vw,2.5rem)] font-bold leading-[1.14]">
          {title}
        </h2>
        <p className="mb-6 max-w-3xl font-helvetica-light text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6] text-white/85">
          {body}
        </p>
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.2vw,1.125rem)] font-medium text-white transition-colors duration-200 hover:bg-brand-blue/90"
        >
          {buttonLabel}
        </Link>
      </Container>
    </section>
  );
}
