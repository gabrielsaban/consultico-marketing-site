import Image from 'next/image';
import Container from '@/components/Container';
import { SEO_LANDING_QUOTE } from '@/lib/seo-landing-content';

export default function SeoDiscoveryQuote() {
  return (
    <section className="relative bg-white pb-10 pt-8 dark:bg-gray-950 md:pb-14 md:pt-10" aria-labelledby="seo-quote-heading">
      <Container>
        <div className="relative mx-auto max-w-[55rem]">
          <div className="relative mx-auto aspect-[624/449] max-w-[39rem] overflow-hidden rounded-[1.25rem] md:rounded-b-none md:rounded-t-[1.25rem]">
            <Image
              src="/seo-landing/team-photo.png"
              alt="Consultico team working together around a laptop"
              fill
              className="object-cover object-[50%_35%] grayscale"
              sizes="(max-width: 768px) 100vw, 624px"
            />
          </div>

          <div className="relative z-10 mx-auto -mt-10 max-w-[55rem] md:-mt-16">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-brand-blue px-8 py-11 text-center text-white shadow-[0_22px_48px_rgba(0,123,255,0.28)] md:px-16 md:py-14">
              <div
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-black/10"
                aria-hidden="true"
              />
              <p className="relative font-helvetica text-[3.75rem] leading-none text-white/85" aria-hidden="true">
                ”
              </p>
              <h2
                id="seo-quote-heading"
                className="relative mx-auto mt-1 max-w-[26ch] font-helvetica text-[clamp(1.4rem,2.6vw,2.05rem)] font-bold leading-[1.25] tracking-[-0.02em]"
              >
                {SEO_LANDING_QUOTE}
              </h2>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
