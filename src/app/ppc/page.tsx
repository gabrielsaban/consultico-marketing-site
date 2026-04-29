import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';

export default function PpcPage() {
  return (
    <section className="min-h-screen relative pb-16 md:pb-20 lg:pb-24">
      <ServiceDesktopHeader />
      <Container className="pt-[11rem] md:pt-[13rem] lg:pt-[14rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] gap-10 lg:gap-16 items-start">
          <div>
            <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-futura font-bold text-brand-blue mb-4">
              PPC
            </h1>
            <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-2xl">
              Placeholder summary for PPC services. This page will outline how paid search and paid social campaigns are planned, launched, optimised, and measured against clear commercial goals.
            </p>
          </div>

          <div className="w-full aspect-square bg-brand-silk dark:bg-gray-900 rounded-[10px]" />
        </div>
      </Container>
    </section>
  );
}
