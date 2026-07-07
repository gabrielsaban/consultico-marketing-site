import Container from '@/components/Container';

interface Stat {
  headline: string;
  label: string;
  variant: 'numeric' | 'phrase';
}

const stats: Stat[] = [
  {
    headline: '3×',
    label: 'Organic clicks in 14 months',
    variant: 'numeric',
  },
  {
    headline: '90 days',
    label: 'A full diary from organic search with paid ads paused - The Boiler Co',
    variant: 'phrase',
  },
  {
    headline: '5.0★',
    label: 'Rated on Google',
    variant: 'numeric',
  },
  {
    headline: '40+',
    label: 'Page-one rankings for our clients',
    variant: 'numeric',
  },
];

export default function StatsBoxes() {
  return (
    <Container className="py-14 sm:py-20 lg:py-24">
      <div className="grid grid-cols-1 gap-6 min-[600px]:grid-cols-2 xl:grid-cols-4 min-[600px]:gap-8 lg:gap-10 xl:gap-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-h-[9.75rem] flex-col min-[600px]:min-h-[12rem] xl:min-h-[12rem]"
          >
            <div
              className={`mb-4 font-bold font-futura text-brand-blue ${
                stat.variant === 'numeric'
                  ? 'text-[clamp(2rem,9vw,3rem)] min-[600px]:text-5xl md:text-6xl'
                  : 'text-[clamp(1.35rem,4vw,1.75rem)] min-[600px]:text-2xl md:text-3xl leading-tight'
              }`}
            >
              {stat.headline}
            </div>

            <div className="mb-3 h-[2px] w-full flex-shrink-0 bg-brand-blue min-[600px]:mb-4" />

            <p className="mb-1.5 font-helvetica font-medium text-[clamp(0.95rem,3.8vw,1.125rem)] leading-tight text-brand-black min-[600px]:mb-2 min-[600px]:text-[clamp(1rem,1.4vw,1.25rem)] dark:text-gray-100">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
