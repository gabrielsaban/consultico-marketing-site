'use client';

import Container from '@/components/Container';

interface Stat {
  value: string;
  name: string;
  info: string;
}

const stats: Stat[] = [
  {
    value: '1134%',
    name: 'Visibility increase',
    info: 'Using SEO for search engine results.',
  },
  {
    value: '2000%',
    name: 'More daily traffic',
    info: 'For our SEO clients, curated over 8 quarters',
  },
  {
    value: '50x',
    name: 'Return on ad spend',
    info: 'Adding new life to PPC client lead generation.',
  },
  {
    value: '£1.2M',
    name: "Increase in clients' work",
    info: "Increase in our clients' quotes resulting from our work.",
  },
];

export default function StatsBoxes() {
  return (
    <Container className="py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-17">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-brand-silk rounded-lg p-6 shadow-[inset_0_0_6px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[12rem] xl:h-[12rem] 2xl:h-[15rem]"
          >
            {/* Stat Value */}
            <h3 className="font-futura font-bold text-[clamp(2rem,2.5vw,3rem)] text-brand-blue">
              {stat.value}
            </h3>

            {/* Stat Name */}
            <h4 className="font-helvetica font-medium text-[clamp(1.125rem,1.4vw,1.75rem)] text-black">
              {stat.name}
            </h4>

            {/* Stat Info */}
            <p className="font-helvetica leading-tight text-[clamp(0.875rem,1vw,1.25rem)] pt-2 text-black">
              {stat.info}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}

