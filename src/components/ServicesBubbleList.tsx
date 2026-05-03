'use client';

import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/Container';

interface Service {
  id: string;
  name: string;
  description: string[];
  highlights: string[];
  icon: string;
  // Temporarily dormant while launch keeps service detail on the homepage.
  futureSlug: string;
  image?: string;
}

const services: Service[] = [
  {
    id: 'strategy',
    name: 'Marketing Strategy',
    description: [
      'Most businesses spend money on marketing before they genuinely understand what their marketing is doing for them. How does your social media presence actually connect through to your website? Are you tracking which channels are driving revenue and which ones are quietly burning budget with nothing to show for it? Are you spending money wisely - or just spending it? These are the questions most business owners cannot answer with real confidence, and that is exactly the problem we are built to solve.',
      'Think First is our flagship strategy workshop - a structured process that maps out your entire marketing landscape before a single pound is committed to a campaign. Using our S.T.E.P. framework, we build a clear picture of where your marketing stands today, where the gaps are, and the most direct path to where you need to be. Every Consultico client relationship starts here, because without a clear strategy, everything else is guesswork.',
    ],
    highlights: ['tracking which channels are driving revenue', 'Think First', 'S.T.E.P. framework'],
    icon: 'compass',
    futureSlug: 'market-strategy',
    image: '/services/market_strategy.avif',
  },
  {
    id: 'ppc',
    name: 'PPC',
    description: [
      'When managed correctly, paid advertising across Google and Meta is one of the most powerful growth levers available to a consumer brand. The ability to reach exactly the right person - at the right moment, on the right platform - and measure every penny of return is genuinely transformative. The problem is that most brands either run ads without a proper strategy behind them, or hand their budget to platforms that are not incentivised to spend it efficiently. The result is wasted spend, inconsistent returns, and campaigns that never quite hit their potential.',
      'We manage Google and Meta ad accounts with a focus on margin-aware, data-driven performance. That means building campaigns around your actual unit economics - not just clicks and impressions - testing creative, refining audiences, and optimising continuously until the numbers stack up. We bring the same strategic clarity from Think First into every paid campaign we run: no campaign goes live without a clear understanding of what it is trying to do and how success will be measured.',
    ],
    highlights: ['Google and Meta', 'unit economics', 'how success will be measured'],
    icon: 'target',
    futureSlug: 'ppc',
    image: '/services/ppc.avif',
  },
  {
    id: 'content',
    name: 'Content Creation',
    description: [
      'Content creation and social media management are two different things, and understanding the distinction matters. Content creation is the process of producing the actual assets - the video scripts, ad copy, long-form articles, product copy, landing page content, and campaign creatives that fuel your marketing across every channel. It is the raw material your entire marketing ecosystem runs on. When it is done well, it earns attention, builds trust, and moves people through a funnel. When it is done poorly, it disappears into the noise.',
      'We produce content with a clear purpose behind every piece. That means starting with your audience, your funnel stage, and your business goals - then building content designed to perform. Whether you need ad scripts that convert, articles that rank and educate, or campaign assets that hold up across every platform, we treat content creation as a strategic function, not just a production task. Everything we produce is built to work as part of a broader system, not sit in isolation.',
    ],
    highlights: ['Content creation', 'actual assets', 'strategic function'],
    icon: 'sparkles',
    futureSlug: 'content-creation',
    image: '/services/content_creation.avif',
  },
  {
    id: 'seo',
    name: 'SEO',
    description: [
      'The best way to understand SEO versus PPC is through the difference between buying a building and renting one. Paid ads put you in front of people immediately - and the moment you stop paying, you disappear. The traffic is rented. SEO, by contrast, is an investment in a long-term asset. The work you put in today - technical fixes, quality content, authoritative backlinks - keeps delivering value for months and years after the initial effort. Your cost per lead decreases over time as your domain authority grows. That is how compounding works, and it is why the most successful businesses treat SEO as a core investment, not a line item to cut.',
      'We build SEO strategies that treat your website as the asset it should be. That starts with a full technical audit to identify anything holding your site back, followed by on-page optimisation, content development targeted at the terms your customers actually search for, and link building to strengthen your authority over time. SEO is not a quick win - but for brands serious about long-term growth, it is consistently one of the highest-returning investments in the entire marketing mix.',
    ],
    highlights: ['long-term asset', 'compounding', 'technical audit', 'long-term growth'],
    icon: 'trending-up',
    futureSlug: 'seo',
    image: '/services/seo.avif',
  },
  {
    id: 'web',
    name: 'Web Development',
    description: [
      'Your website is the hardest-working member of your team - or it should be. It is open every hour of every day, it speaks to every potential customer before anyone at your business does, and it either builds trust and converts or loses people in seconds. A well-built website is not a digital brochure. It is a conversion asset built around how people actually navigate, what they are looking for, and what it takes to move them from interest to action.',
      'We design and build websites that earn their place in your marketing stack. That means clean, fast-loading builds structured around the user journey, with every design decision tied to a clear conversion goal. SEO foundations are baked in from day one, not bolted on at the end - and everything is built to perform across every device and screen size. If your current website is not working as hard as your marketing, that is the problem we are here to fix.',
    ],
    highlights: ['hardest-working member of your team', 'conversion asset', 'SEO foundations'],
    icon: 'code',
    futureSlug: 'web-development',
    image: '/services/web_dev.avif',
  },
  {
    id: 'social',
    name: 'Social Media',
    description: [
      'Social media management is not the same as content creation. Content creation produces the assets - social media management is about what happens to those assets once they exist. A social media manager is the custodian of your brand voice across every platform: planning and scheduling posts, monitoring and responding to comments and messages, tracking what is resonating with your audience, and making sure everything that goes out is consistent with how your brand needs to be seen - every single day.',
      'We manage your social presence end-to-end, so you are not constantly context-switching between running your business and managing your feeds. That means a structured content calendar, platform-specific publishing, community engagement handled properly, and regular reporting on what is and is not working. Your job is to run your business. Our job is to make sure your social presence keeps showing up for it.',
    ],
    highlights: ['Social media management', 'brand voice', 'community engagement'],
    icon: 'share-2',
    futureSlug: 'social-media',
    image: '/services/social_media.avif',
  },
  {
    id: 'campaign',
    name: 'Campaign Management',
    description: [
      'Most marketing efforts involve a lot of moving parts - paid ads, content, email, social, seasonal campaigns, product launches, and everything else sitting in between. When those parts are not coordinated, the result is inconsistent messaging, duplicated effort, and results that are much harder to attribute than they should be. Campaign management is what ties it all together: a single, coordinated effort that plans, builds, launches, and optimises across every channel with a clear goal, a clear timeline, and a clear picture of what success looks like.',
      'We take the strategic foundation from Think First and turn it into live, coordinated campaign delivery. That means everything from initial planning and asset briefing right through to launch, performance monitoring, and ongoing optimisation. You get a team that owns the campaign from end to end - so nothing falls through the cracks, every pound is working toward the same objective, and your marketing is finally moving in one direction.',
    ],
    highlights: ['Campaign management', 'coordinated effort', 'coordinated campaign delivery'],
    icon: 'calendar-check',
    futureSlug: 'campaign-management',
    image: '/services/campaign.avif',
  },
  {
    id: 'podcasting',
    name: 'Podcasting',
    description: [
      'Podcasting has become one of the most powerful tools available to brands that want to build genuine authority - not just visibility. While other marketing channels can feel transient (an ad scrolled past, a post forgotten within the hour), a well-produced podcast creates a fundamentally different relationship with your audience. It earns an hour of someone\'s undivided attention during their commute, their workout, or their working day. That level of access is rare, and the brands that use it well consistently emerge as the most trusted voices in their space.',
      'We produce professional podcasts from concept to distribution - covering show strategy and format development, recording and post-production, publishing, and promotion. Every show we produce is built around a clear audience and a clear brand positioning: not audio content for the sake of it, but a show people genuinely want to come back to, designed to build trust and credibility with every episode.',
    ],
    highlights: ['Podcasting', 'genuine authority', 'concept to distribution', 'build trust and credibility'],
    icon: 'mic',
    futureSlug: 'podcasting',
    image: '/services/podcasting.avif',
  },
];

const ServiceIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const iconPaths: Record<string, React.JSX.Element> = {
    compass: (
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 12l4-4 4 4-4 4-4-4z" />
    ),
    target: (
      <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z" />
    ),
    sparkles: (
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6.34 6.34l2.83 2.83m5.66 5.66l2.83 2.83M6.34 17.66l2.83-2.83m5.66-5.66l2.83-2.83" />
    ),
    'trending-up': (
      <path d="M23 6l-9.5 9.5-5-5L1 18m22-12h-6m6 0v6" />
    ),
    code: (
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    ),
    'share-2': (
      <path d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zm12 7a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" />
    ),
    'calendar-check': (
      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM8.5 15.5l2 2 5-5" />
    ),
    mic: (
      <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zM19 11a7 7 0 01-14 0M12 18v4M8 22h8" />
    ),
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {iconPaths[icon] || iconPaths.compass}
    </svg>
  );
};

const ServicePreviewImage = ({ service }: { service: Service }) => {
  if (!service.image) {
    return <div className="h-full w-full bg-brand-silk dark:bg-gray-900" />;
  }

  return (
    <Image
      src={service.image}
      alt=""
      width={640}
      height={640}
      className="h-full w-full object-cover"
      sizes="(min-width: 900px) 34vw, 35vw"
    />
  );
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderHighlightedText = (text: string, highlights: string[]) => {
  if (!highlights.length) return text;

  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'gi');

  return text.split(pattern).map((part, index) => {
    const isHighlighted = highlights.some((highlight) => highlight.toLowerCase() === part.toLowerCase());

    return isHighlighted ? (
      <strong key={`${part}-${index}`} className="font-helvetica font-semibold text-brand-blue">
        {part}
      </strong>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
};

function MobileServicePreview({ service }: { service: Service }) {
  return (
    <motion.div
      layout
      initial={{ height: 0, opacity: 0, y: 8 }}
      animate={{ height: 'auto', opacity: 1, y: 0 }}
      exit={{ height: 0, opacity: 0, y: -4 }}
      transition={{
        height: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.16, ease: 'easeOut' },
        y: { duration: 0.2, ease: 'easeOut' },
        layout: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
      }}
      className="[@media(min-width:900px)]:hidden overflow-hidden"
    >
      <div className="grid grid-cols-1 [@media(min-width:600px)]:grid-cols-[minmax(7.5rem,35%)_1fr] gap-4 sm:gap-5 items-start px-2 sm:px-4 pt-5 sm:pt-6">
        <div className="hidden [@media(min-width:600px)]:block w-full aspect-square overflow-hidden bg-brand-silk dark:bg-gray-900 rounded-[10px]">
          <ServicePreviewImage service={service} />
        </div>
        <div className="min-w-0 self-stretch flex flex-col">
          <div className="space-y-3">
            {service.description.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[clamp(0.9rem,2.2vw,1rem)] leading-[1.58] text-gray-800 dark:text-gray-200 font-helvetica-light"
              >
                {renderHighlightedText(paragraph, service.highlights)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesBubbleList() {
  const [selectedService, setSelectedService] = useState<string>('strategy');
  const [previewService, setPreviewService] = useState<string>('strategy');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const selectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  const currentService = services.find((s) => s.id === selectedService) || services[0];
  const currentIndex = services.findIndex((s) => s.id === selectedService);
  const isTopThree = currentIndex < 3;

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === selectedService) return;
    if (selectionTimerRef.current) clearTimeout(selectionTimerRef.current);
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current);

    const isStackedLayout =
      typeof window !== 'undefined' && !window.matchMedia('(min-width: 900px)').matches;

    if (!isStackedLayout) {
      setSelectedService(serviceId);
      setPreviewService(serviceId);
      return;
    }

    setPreviewService('');
    selectionTimerRef.current = setTimeout(() => {
      setSelectedService(serviceId);
      previewTimerRef.current = setTimeout(() => {
        setPreviewService(serviceId);
      }, 90);
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (selectionTimerRef.current) clearTimeout(selectionTimerRef.current);
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    };
  }, []);

  return (
    <Container className="py-16">
      <div className="grid grid-cols-1 [@media(min-width:900px)]:grid-cols-[60%_auto] gap-8 [@media(min-width:900px)]:gap-12 xl:gap-16 2xl:gap-20 items-start [@media(min-width:900px)]:items-stretch">
        {/* Left Column - Service Bubbles */}
        <LayoutGroup id="services-bubble-list">
          <motion.div
            ref={sectionRef}
            className="flex flex-col gap-8"
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
            }}
          >
            {services.map((service, index) => {
              const isSelected = selectedService === service.id;
              const showInlinePreview = previewService === service.id && isSelected;
              const fromLeft = index % 2 === 0;
              return (
                <motion.div
                  key={service.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, x: fromLeft ? -30 : 30 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  transition={{ layout: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } }}
                >
                  <motion.button
                    layout
                    onClick={() => handleServiceSelect(service.id)}
                    className={`
                      w-full rounded-[74px] pl-6 sm:pl-8 md:pl-10 [@media(min-width:900px)]:pl-12 pr-4 sm:pr-5 py-4 sm:py-5
                      flex items-center justify-between
                      font-futura font-bold text-[clamp(1.25rem,2vw,2.25rem)]
                      transition-all duration-300
                      shadow-[inset_0_0_13px_rgba(0,0,0,0.11)]
                      ${
                        isSelected
                          ? 'bg-brand-blue text-white'
                          : 'bg-brand-silk text-brand-blue hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800'
                      }
                    `}
                    transition={{ layout: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } }}
                    whileHover={isSelected ? {} : { scale: 1.015, x: 6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <ServiceIcon
                        icon={service.icon}
                        className={`w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)] flex-shrink-0`}
                      />
                      <span>{service.name}</span>
                    </div>
                    <span className="text-[clamp(2rem,3vw,3rem)] leading-none opacity-40">
                      {isSelected ? '−' : '+'}
                    </span>
                  </motion.button>
                  <AnimatePresence mode="wait" initial={false}>
                    {showInlinePreview && (
                      <MobileServicePreview key={service.id} service={service} />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Right Column - Service Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedService}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden [@media(min-width:900px)]:flex flex-col gap-6 h-full min-h-[400px]"
          >
          {isTopThree ? (
            // Top 3: Info top, Image bottom
            <>
              <div className="space-y-4">
                {currentService.description.map((paragraph, index) => (
                  <motion.p
                    key={paragraph}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.08, duration: 0.3 }}
                    className="text-[clamp(0.94rem,1.05vw,1.06rem)] leading-[1.58] text-gray-800 dark:text-gray-200 font-helvetica-light"
                  >
                    {renderHighlightedText(paragraph, currentService.highlights)}
                  </motion.p>
                ))}
              </div>

              {/* Image Placeholder - Bottom */}
              <div className="w-full aspect-square overflow-hidden bg-brand-silk dark:bg-gray-900 rounded-[10px] mt-auto">
                <ServicePreviewImage service={currentService} />
              </div>
            </>
          ) : (
            // Latter services: Image top, info anchored to the bottom of the preview column
            <>
              {/* Image Placeholder - Top */}
              <div className="w-full aspect-square overflow-hidden bg-brand-silk dark:bg-gray-900 rounded-[10px]">
                <ServicePreviewImage service={currentService} />
              </div>

              <div className="mt-auto flex flex-col gap-6">
                {currentService.description.map((paragraph, index) => (
                  <motion.p
                    key={paragraph}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.08, duration: 0.3 }}
                    className="text-[clamp(0.94rem,1.05vw,1.06rem)] leading-[1.58] text-gray-800 dark:text-gray-200 font-helvetica-light"
                  >
                    {renderHighlightedText(paragraph, currentService.highlights)}
                  </motion.p>
                ))}
              </div>
            </>
          )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
}
