import ServiceCard from '@/components/ServiceCard';
import ServicesDial, { type Service as DialService } from '@/components/ServicesDial';
import HeroCTA from '@/components/HeroCTA';

const servicesDialData: DialService[] = [
  { id: 'seo', title: 'SEO Growth Plan', outcome: 'Grow visibility and organic clicks month on month.', provider: 'Consultico', priceFrom: '£X', ctaLabel: 'Access Portal', unlockNote: true, href: '#contact' },
  { id: 'paid-ads', title: 'Paid Ads', outcome: 'Drive targeted leads via Google & Meta.', provider: 'Consultico', priceFrom: '£X', ctaLabel: 'Access Portal', unlockNote: true, href: '#contact' },
  { id: 'web-refresh', title: 'Web Refresh', outcome: 'Tighten site structure and improve performance.', provider: 'Trusted Partner', priceFrom: '£X', ctaLabel: 'Access Portal', unlockNote: true, href: '#contact' },
  { id: 'brand-pack', title: 'Brand Pack', outcome: 'Clarify your brand voice and visuals.', provider: 'Trusted Partner', priceFrom: '£X', ctaLabel: 'Access Portal', unlockNote: true, href: '#contact' },
  { id: 'email', title: 'Email Marketing', outcome: 'Nurture and convert your audience with lifecycle flows.', provider: 'Consultico', priceFrom: '£X', ctaLabel: 'Access Portal', unlockNote: true, href: '#contact' },
  { id: 'analytics', title: 'Analytics Setup', outcome: 'Get GA4 and tracking configured for clear insights.', provider: 'Consultico', priceFrom: '£X', ctaLabel: 'Access Portal', unlockNote: true, href: '#contact' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px]">
        <div className="text-center md:max-w-3xl lg:max-w-4xl mx-auto px-5">
          <h2 className="text-blue-primary font-futura text-d-40 md:text-d-48 font-extrabold">
            Start with a Marketing Health Report
          </h2>
          <p className="mt-5 text-gray-700 text-b-16 md:text-b-18 font-helvetica-light">
            Every client begins with a one-off audit. In half a day, we review your site, SEO, ads, and funnel, then give you a clear action plan. From there, you can choose what services to unlock.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <HeroCTA text="Book My Health Report" width="clamp(300px, 32vmin, 560px)" hoverWidth="clamp(340px, 36vmin, 620px)" position="stats" targetId="contact" inline />
            <HeroCTA text="Book a Free Assessment" width="clamp(300px, 32vmin, 560px)" hoverWidth="clamp(340px, 36vmin, 620px)" position="stats" targetId="contact" variant="secondary" inline />
          </div>
        </div>

        <div className="mt-20 md:mt-28 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <ServiceCard
              featured
              title="Marketing Health Report"
              subtitle="Your starting point with Consultico"
              bullets={[
                'Technical site check',
                'SEO baseline',
                'Ads snapshot',
                '90-day roadmap',
                'Competitor snapshot',
                'Analytics sanity check',
              ]}
              bonusText="Includes free 12-month access to our private Skool community (£480 value)"
              ctaLabel="Get Started"
              href="#contact"
              className="lg:col-start-2 lg:col-span-10 xl:col-start-2 xl:col-span-10 w-full"
            />
          </div>

          <div className="mt-16 md:mt-36">
            <ServicesDial services={servicesDialData} />
          </div>

          <div className="pt-16 md:pt-32 lg:pt-40 px-5">
            <h3 className="text-blue-primary font-futura text-d-40 md:text-d-30 lg:text-d-40 font-bold mb-8 md:mb-8 lg:mb-20 text-left">
              See how we make your brand heard...
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-24 gap-y-10 md:gap-y-24 lg:gap-y-28 text-b-16">
              {[
                {
                  title: 'Build a recognisable identity',
                  subheading: 'Branding & Content Creation',
                  paragraphs: [
                    'Your brand is more than a logo — it’s how people recognise and trust you. We create consistent visuals, tone, and content that reflect your identity across every channel.',
                    'From logos to video, we ensure your brand looks sharp, feels authentic, and connects with the right audience.',
                  ],
                },
                {
                  title: 'Websites with purpose',
                  subheading: 'Design & Development',
                  paragraphs: [
                    'A website should be more than a placeholder. We design and build sites that are intuitive, visually strong, and strategically crafted to persuade and convert.',
                    'Whether it’s a refresh or a full build, your online hub becomes a growth engine, not just an address.',
                  ],
                },
                {
                  title: 'Be discoverable everywhere',
                  subheading: 'SEO & Social Media',
                  paragraphs: [
                    'Visibility is everything. We optimise your site for search engines and adapt to AI-driven search, while also managing creative, algorithm-aware social strategies.',
                    'From backlinks to TikTok storefronts, we help you show up, rank higher, and turn attention into customers.',
                  ],
                },
                {
                  title: 'Stay ahead of the curve',
                  subheading: 'Marketing Strategy',
                  paragraphs: [
                    'Good marketing isn’t reactive — it’s proactive. We deliver long-term direction backed by research, positioning, and campaign planning.',
                    'With clear priorities and data-driven forecasting, we keep your brand in front of trends and ahead of competitors.',
                  ],
                },
              ].map((pillar, index) => {
                const isRight = index % 2 === 1;
                const baseCol = isRight ? 'md:col-start-2' : 'md:col-start-1';
                const offsetClass = isRight
                  ? 'md:mt-32 lg:mt-56'
                  : index > 0
                    ? 'md:-mt-24 lg:-mt-28'
                    : '';
                return (
                  <div key={pillar.title} className={`${baseCol} ${offsetClass}`}>
                    <h3 className="text-blue-primary font-futura text-d-24 md:text-d-30 font-bold mb-1">{pillar.title}</h3>
                    <div className="text-blue-primary font-helvetica text-b-16 mb-3">{pillar.subheading}</div>
                    <div className="text-gray-700 font-helvetica-light text-b-16 md:text-b-18 mb-4 space-y-3 pr-1">
                      {pillar.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <div className="w-full h-56 md:h-72 lg:h-[22rem] rounded-xl bg-gray-200 border border-gray-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


