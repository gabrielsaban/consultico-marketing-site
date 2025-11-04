'use client';

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
    <div className="w-full pl-[7.5rem] pr-[7.5rem] py-24">
      <div 
        className="grid xl:gap-12 2xl:gap-17"
        style={{
          gridTemplateColumns: '221fr 212fr 254fr 306fr',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-brand-silk rounded-lg p-6 shadow-[inset_0_0_6px_rgba(0,0,0,0.1)] flex flex-col justify-between xl:h-[12rem] 2xl:h-[15rem]"
          >
            {/* Stat Value */}
            <h3 className="font-futura font-bold text-[36px] xl:text-[40px] 2xl:text-[48px] text-brand-blue">
              {stat.value}
            </h3>

            {/* Stat Name */}
            <h4 className="font-helvetica font-medium text-[18px] xl:text-[22px] 2xl:text-[28px] text-black">
              {stat.name}
            </h4>

            {/* Stat Info */}
            <p className="font-helvetica leading-tight text-[14px] xl:text-[16px] 2xl:text-[20px] pt-2 2xl:pr-6 text-black">
              {stat.info}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

