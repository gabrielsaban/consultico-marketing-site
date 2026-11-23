import type { Metadata } from 'next';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { pageMeta } from '@/lib/seo';
import ApplyForm from './ApplyForm';

export const metadata: Metadata = pageMeta({
  title: 'Apply to work with us',
  description:
    'Apply to work with Consultico. Five short steps about your brand and your goals, and we reply within one working day to book a call.',
  path: '/apply',
});

export default function ApplyPage() {
  return (
    <main className="relative bg-brand-silk dark:bg-gray-950">
      <ServiceDesktopHeader />
      <section className="pt-28 pb-16 md:pt-[12rem] md:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h1 className="font-futura text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.01em] text-[#1B2A4A] dark:text-white">
              Apply to work with us
            </h1>
            <p className="mt-4 font-helvetica-light text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.6] text-gray-700 dark:text-gray-300">
              We take on a small number of brands at a time, so we can give each one real attention. Five short steps, about
              two minutes.
            </p>
            <div className="mt-10">
              <ApplyForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
