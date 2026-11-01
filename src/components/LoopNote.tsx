import Link from 'next/link';
import Container from '@/components/Container';
import { LOOP_HREF } from '@/lib/nav-services';

/**
 * A soft line to Loop at the end of a service page. The services are still
 * sold on their own, so this is a pointer, not a pitch (identity plan,
 * 2026-10-31).
 */
export default function LoopNote() {
  return (
    <section className="py-10 md:py-12">
      <Container>
        <p className="mx-auto max-w-3xl text-center font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.65] text-gray-700 dark:text-gray-300">
          Want more than one channel looked after? Loop, by Consultico, is an extra part of your marketing team that takes a fresh look every week.{' '}
          <Link href={LOOP_HREF} className="font-medium text-brand-blue underline-offset-2 hover:underline">
            See how Loop works
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
