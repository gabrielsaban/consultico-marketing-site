import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';

export default function SocialMediaPage() {
  return (
    <section className="min-h-screen relative pb-16 md:pb-20 lg:pb-24">
      <ServiceDesktopHeader />
      <Container className="pt-[11rem] md:pt-[13rem] lg:pt-[14rem]">
        <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-futura font-bold text-brand-blue mb-4">
          Social Media
        </h1>
        <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-2xl">
          Page coming soon.
        </p>
      </Container>
    </section>
  );
}
