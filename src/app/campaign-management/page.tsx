import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';

export default function CampaignManagementPage() {
  return (
    <section className="min-h-screen relative pb-16 md:pb-20 lg:pb-24">
      <ServiceDesktopHeader />
      <Container className="pt-[11rem] md:pt-[13rem] lg:pt-[14rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] gap-10 lg:gap-16 items-start">
          <div>
            <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-futura font-bold text-brand-blue mb-4">
              Campaign Management
            </h1>
            <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-2xl">
              Placeholder summary for campaign management services. This page will explain how campaigns are coordinated, monitored, refined, and reported across the channels that matter most.
            </p>
          </div>

          <div className="w-full aspect-square bg-brand-silk dark:bg-gray-900 rounded-[10px]" />
        </div>
      </Container>
    </section>
  );
}
