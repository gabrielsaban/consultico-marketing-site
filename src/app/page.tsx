'use client';

import HeroSection from '@/components/HeroSection';
import KeywordCarousel from '@/components/KeywordCarousel';
import HeroCTA from '@/components/HeroCTA';
import ServiceCard from '@/components/ServiceCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import AnimatedLine from '@/components/AnimatedLine';
import AnimatedText from '@/components/AnimatedText';
import ProjectsGrid from '@/components/ProjectsGrid';
import BlogCarousel from '@/components/BlogCarousel';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Home() {
  // Ref for the marketing section
  const marketingRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: marketingRef,
    offset: ["start center", "end center"]
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Scroll-linked transforms to rise from screen bottom to target position
  const statsSectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: statsProgress } = useScroll({
    target: statsSectionRef,
    offset: ["start 110%", "start 40%"],
  });
  const springConfig = { stiffness: 80, damping: 24, mass: 0.8 } as const;
  const statsY = useSpring(useTransform(statsProgress, [0, 1], ["40vh", "0vh"]), springConfig);
  const statsOpacity = useSpring(useTransform(statsProgress, [0, 1], [0, 1]), springConfig);
  const ctaY = useSpring(useTransform(statsProgress, [0, 1], ["50vh", "0vh"]), springConfig);
  const ctaOpacity = useSpring(useTransform(statsProgress, [0.15, 1], [0, 1]), springConfig);

  // About section parallax transparency
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start 95%", "end 5%"],
  });
  // Wallpaper overlay: obvious fade into full white, then fade out
  const aboutOverlayOpacity = useTransform(
    aboutProgress,
    [0, 0.45, 0.55, 1],
    [0, 1, 1, 0]
  );
  const aboutContentY = useTransform(aboutProgress, [0, 1], ["12vh", "0vh"]);

  // Mission & Values carousel state
  const [missionIndex, setMissionIndex] = useState(0);
  const missionSlides: { title: string; paragraphs: string[] }[] = [
    {
      title: 'Partners in Business',
      paragraphs: [
        "At Consultico, we treat our clients as long-term partners, no short-term one-and-dones. Our involvement doesn’t stop once a task is checked off or a deliverable is sent. We immerse ourselves fully in the work and carry the weight of each commitment with seriousness and care. That means working beyond the brief, staying available when it matters most, and consistently offering value that exceeds expectation. We believe that meaningful results only come from relationships built on trust, effort, and ongoing collaboration.",
        "We do not operate transactionally, and we never treat our work as a series of isolated jobs. We show up with consistency, dedication, and the willingness to push through complexity when it arises. If that means working through weekends or revisiting something until it’s right, we do it without hesitation. Our clients can expect a warm partnership that puts their business first and treats their challenges as our own, from the first meeting to the final result.",
      ],
    },
    {
      title: 'Experts in Quality Marketing',
      paragraphs: [
        "Quality is not a layer we apply at the end of a project, but a principle that guides the way we think, create, and deliver from the very beginning. We treat marketing as both a strategic discipline and a craft, requiring attention to context, fluency in audience behaviour, and a commitment to thoughtful execution. Our clients rely on us not only for sharp ideas and clear thinking, but for the care we bring to every stage of the process, from initial research through to refinement and delivery.",
        "We keep our ongoing client base small to keep true to quality over quantity. We do not measure success by how quickly something is shipped. Instead, we take the time to understand the full scope of each challenge by interrogating the details to arrive at solutions that are precise and purposeful. This commitment to quality is embedded in how we work with data, how we communicate a brand’s voice, and how we evaluate the impact of our efforts once they’re in the world.",
      ],
    },
    {
      title: 'Committed to Satisfaction',
      paragraphs: [
        "We see client satisfaction as an active responsibility rather than a passive outcome. It is built through reliability, mutual respect, and the assurance that every concern will be heard and every objective will be taken seriously. We work with a deliberate focus on making our clients feel confident in both the process and the result, knowing that trust is earned through consistent performance and thoughtful engagement.",
        "Moreover, we treat feedback as an essential part of maintaining clarity and alignment throughout a project rather than an optional final step. Our team remains accessible, flexible, and open to dialogue always, especially when direction evolves or pressure increases. We take care to understand the individual preferences of each client and adjust our approach to suit the way they work, while still upholding the standards we set for quality and professionalism.",
      ],
    },
  ];
  const handleMissionPrev = () => setMissionIndex((i) => (i - 1 + missionSlides.length) % missionSlides.length);
  const handleMissionNext = () => setMissionIndex((i) => (i + 1) % missionSlides.length);

  return (
    <main className="min-h-screen">
      <section id="home" className="min-h-screen">
        <HeroSection />
      
        {/* Marketing made for you section */}
        <section className="py-30" ref={marketingRef}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] relative">
          <div className="text-left md:text-right md:ml-auto md:max-w-[87%]">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-primary mb-8 font-futura whitespace-normal xl:whitespace-nowrap">
              Marketing made for you
            </h3>
            <AnimatedText 
              paragraphs={[
                "Marketing works best when it’s customised to your business. Our digital marketing consultants build tailored strategies for you.",
                "To make your brand excel, we focus on the type of customers you want and exactly how to get there. Our methods are done-for-you meaning we take what your business stands for without stepping on your toes.",
                "We use our specialised marketing process to build your business a lead generation framework that doesn’t rely on guesswork."
              ]}
              className="text-lg sm:text-xl md:text-[1.35rem] lg:text-[1.5rem] xl:text-[1.65rem] 2xl:text-[1.8rem] text-gray-700 font-helvetica-light tracking-normal"
              highlightWords={["tailored strategies", "done-for-you", "specialised marketing process"]}
            />
          </div>
          {/* Animated thick blue vertical line on the right of the content */}
          <motion.div
            className="hidden lg:block absolute right-0 top-[6.25rem] bottom-1 w-0.5 bg-blue-primary opacity-60"
            style={{ left: '100%', scaleY: lineScale, transformOrigin: 'top' }}
          />
        </div>
        </section>

        {/* Stats block (part of home) */}
        <section className="py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px]">
          <div className="text-center mb-16">


            {/* Scroll-linked rise from bottom */}
            <div ref={statsSectionRef}>
              <motion.div
                style={{ y: statsY, opacity: statsOpacity }}
                className="
                  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
                  items-start 
                  justify-items-center
                  gap-10 lg:gap-12 xl:gap-16
                  mb-16
                  mx-auto
                "
              >
                  {[
                  { value: '1134%',    label: 'Visibility Increase',       note: 'Using SEO for search engine results.' },
                  { value: '200,000%', label: 'More Daily Traffic',         note: 'For our SEO clients, curated over 2 years.' },
                  { value: '50x',      label: 'Return on Ad Spend',         note: 'Bringing new life to PPC client lead generation.' },
                  { value: '£1.2M',    label: "Increase in Clients’ Work", note: "Increase in our clients’ quotes resulting from our work." },
                ].map((stat) => (
                  <div
                    key={stat.label}
                      className="w-full max-w-[320px] text-center transition-transform duration-300 p-4 rounded-lg hover:scale-105 motion-reduce:hover:scale-100"
                  >
                    <AnimatedCounter value={stat.value} duration={2} />
                    <div className="text-xl text-gray-600 font-helvetica mb-6">
                      {stat.label}
                    </div>
                    <AnimatedLine />
                    <div className="text-sm text-gray-500 font-helvetica">
                      {stat.note}
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div style={{ y: ctaY, opacity: ctaOpacity }} className="flex justify-center w-full">
                <HeroCTA text="Browse Services" width="230px" hoverWidth="280px" position="stats" targetId="services" />
              </motion.div>
            </div>
            </div>
        </div>
        </section>

        {/* Keyword Carousel section */}
         <section className="py-20">
          <KeywordCarousel />
        </section>
      </section>

      {/* Services section (now before projects) */}
      <section id="services" className="relative scroll-mt-24 py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px]">
          {/* Intro */}
          <div className="text-center md:max-w-3xl lg:max-w-4xl mx-auto">
            <h2 className="text-blue-primary font-futura text-4xl md:text-5xl lg:text-6xl font-extrabold">
              Start with a Marketing Health Report
            </h2>
            <p className="mt-5 text-gray-700 text-base md:text-lg lg:text-xl font-helvetica-light">
              Every client begins with a one-off audit. In half a day, we review your site, SEO, ads, and funnel, then give you a clear action plan. From there, you can choose what services to unlock.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
              <HeroCTA text="Book My Health Report" width="clamp(300px, 32vmin, 560px)" hoverWidth="clamp(340px, 36vmin, 620px)" position="stats" targetId="contact" inline />
              <HeroCTA text="Book a Free Assessment" width="clamp(300px, 32vmin, 560px)" hoverWidth="clamp(340px, 36vmin, 620px)" position="stats" targetId="contact" variant="secondary" inline />
            </div>
          </div>

          {/* Two-tier grid */}
          <div className="mt-16 space-y-10">
            {/* Tier 1: Featured */}
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

            {/* Heading before services grid */}
            <div className="pt-4 md:pt-6 lg:pt-20">
              <h3 className="text-blue-primary font-futura text-2xl md:text-3xl lg:text-4xl font-bold text-center">Our Services</h3>
            </div>

            {/* Tier 2: Services unlocked after report */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <ServiceCard
                title="SEO Growth Plan"
                outcome="Grow visibility and organic clicks month on month."
                provider="Consultico"
                priceFrom="£X"
                ctaLabel="Access Portal"
                unlockNote
              />
              <ServiceCard
                title="Paid Ads"
                outcome="Drive targeted leads via Google & Meta."
                provider="Consultico"
                priceFrom="£X"
                ctaLabel="Access Portal"
                unlockNote
              />
              <ServiceCard
                title="Web Refresh"
                outcome="Tighten site structure and improve performance."
                provider="Trusted Partner"
                priceFrom="£X"
                ctaLabel="Access Portal"
                unlockNote
              />
              <ServiceCard
                title="Brand Pack"
                outcome="Clarify your brand voice and visuals."
                provider="Trusted Partner"
                priceFrom="£X"
                ctaLabel="Access Portal"
                unlockNote
              />
              <ServiceCard
                title="Email Marketing"
                outcome="Nurture and convert your audience with lifecycle flows."
                provider="Consultico"
                priceFrom="£X"
                ctaLabel="Access Portal"
                unlockNote
              />
              <ServiceCard
                title="Analytics Setup"
                outcome="Get GA4 and tracking configured for clear insights."
                provider="Consultico"
                priceFrom="£X"
                ctaLabel="Access Portal"
                unlockNote
              />
            </div>
            {/* Zig-zag pillars (alternating, slight overlap for tighter stagger) */}
            <div className="pt-24 md:pt-32 lg:pt-40">
              <h3 className="text-blue-primary font-futura text-2xl md:text-3xl lg:text-5xl font-bold mb-6 md:mb-8 lg:mb-20 text-left">
                See how we make your brand heard...
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-24 gap-y-12 md:gap-y-24 lg:gap-y-28">
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
                    ? 'md:mt-32 lg:mt-56' // push right items a touch further down
                    : index > 0
                      ? 'md:-mt-24 lg:-mt-28' // pull left items up slightly less for lower start
                      : '';
                  return (
                    <div key={pillar.title} className={`${baseCol} ${offsetClass}`}>
                      <h3 className="text-blue-primary font-futura text-2xl md:text-3xl font-bold mb-1">{pillar.title}</h3>
                      {('subheading' in pillar) && (
                        <div className="text-blue-primary font-helvetica text-sm md:text-base mb-3">{(pillar as any).subheading}</div>
                      )}
                      <div className="text-gray-700 font-helvetica-light text-sm md:text-base mb-4 space-y-3">
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

      {/* Projects section */}
      <section id="projects" className="scroll-mt-24">
        <ProjectsGrid />
        {/* Blogs + Testimonials two-column block */}
        <div className="mt-24 md:mt-28 lg:mt-32 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,900px)_1fr] gap-10 lg:gap-16 items-start">
            {/* Left: Our Blogs (large square, left-aligned) */}
            <div className="justify-self-start">
              <h2 className="text-left text-blue-primary font-futura text-4xl md:text-5xl lg:text-6xl font-extrabold">Our Blogs</h2>
              <BlogCarousel centered={false} className="w-full max-w-[900px]" />
            </div>
            {/* Right: Testimonies as right-aligned column list, no heading */}
            <div className="justify-self-end w-full max-w-[900px]">
              <TestimonialsCarousel className="w-full" />
            </div>
          </div>
        </div>
      </section>


      
      <section
        id="about"
        ref={aboutSectionRef}
        className="relative min-h-screen overflow-hidden scroll-mt-24"
      >
        <motion.div aria-hidden className="absolute inset-0 bg-white z-0" style={{ opacity: aboutOverlayOpacity }} />
        <motion.div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px]" style={{ y: aboutContentY }}>
          {/* Headline */}
          <div className="mb-8">
            <h2 className="leading-[0.95] text-blue-primary font-futura text-6xl md:text-7xl lg:text-8xl font-bold">
              About <span className="font-extrabold">us</span>
            </h2>
          </div>

          {/* Intro paragraph */}
          <div className="max-w-3xl text-gray-700 text-xl md:text-2xl font-helvetica-light space-y-6 mb-24 md:mb-28">
            <p>
              In business, nobody can afford to operate a full marketing strategy themselves. That’s where we come in! We are your specialised marketing department, helping you design new and innovative ways to bring more customers straight to you.
            </p>
            <p>
              We help your company say what it needs to say to have your market better understand what you and your company stand for. Through this, your business will stick in the mind of current and potential customers, ensuring your brand is the go-to.
            </p>
          </div>

          {/* Sections container: Left subheading, Right content, with dividers */}
          <div className="space-y-0">
            {/* Section 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-16 md:py-20">
              <div className="md:col-span-5">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-primary font-futura">
                  <motion.span
                    initial={{ fontWeight: 600 }}
                    whileInView={{ fontWeight: 800 }}
                    viewport={{ once: true, margin: '-25% 0% -25% 0%' }}
                    transition={{ duration: 0.4 }}
                  >
                    Hope
                  </motion.span>{" "}
                  isn&rsquo;t a business strategy
                </h3>
              </div>
              <motion.div
                className="md:col-span-7"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20% 0% -20% 0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="text-gray-700 text-lg md:text-xl font-helvetica-light space-y-4">
                  <p>
                    We don’t make decisions based on gut feelings or wishful thinking. If something’s not working, we say so. If your message is muddled or your identity confused, we’ll bring it forward and make sure it’s solved.
                  </p>
                  <p>
                    We believe marketing should be clear and structured from the base and up. That means asking tricky questions, finding the real fumbles, and solving for substance instead of just making the surface pretty. Our team takes a logic-first approach and never relies on gut feeling, because that works and won’t waste your time with half measures.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0% -20% 0%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="py-3 md:py-4"
            >
              <div className="h-[1px] bg-blue-primary"></div>
              <div className="h-[1px] bg-blue-primary/60 mt-1"></div>
            </motion.div>

            {/* Section 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-16 md:py-20">
              <div className="md:col-span-5">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-primary font-futura">
                  Making your brand{' '}
                  <motion.span
                    initial={{ fontWeight: 600 }}
                    whileInView={{ fontWeight: 800 }}
                    viewport={{ once: true, margin: '-25% 0% -25% 0%' }}
                    transition={{ duration: 0.4 }}
                  >
                    heard
                  </motion.span>
                </h3>
              </div>
              <motion.div
                className="md:col-span-7"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20% 0% -20% 0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="text-gray-700 text-lg md:text-xl font-helvetica-light space-y-4">
                  <p>
                    The average person sees between 4,000 and 10,000 brands a day and most of them go completely unnoticed. You scroll, swipe, and close the tab. You see no reason for you to buy into the brand. You’ve forgotten it already.
                  </p>
                  <p>
                    We treat marketing like strategy, not decoration. That means we don’t rely on safe templates or pre-packed campaigns. We understand how busy the markets are and know how to cut the noise to ensure you’re heard, and this requires our brand tailoring from the inside out.
                  </p>
                  <p>
                    Everything we accomplish is designed to carry weight, not just decorate brands.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0% -20% 0%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="py-3 md:py-4"
            >
              <div className="h-[1px] bg-blue-primary"></div>
              <div className="h-[1px] bg-blue-primary/60 mt-1"></div>
            </motion.div>

            {/* Section 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-16 md:py-20">
              <div className="md:col-span-5">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-primary font-futura">
                  Our dedication to{' '}
                  <motion.span
                    initial={{ fontWeight: 600 }}
                    whileInView={{ fontWeight: 800 }}
                    viewport={{ once: true, margin: '-25% 0% -25% 0%' }}
                    transition={{ duration: 0.4 }}
                  >
                    students
                  </motion.span>
                </h3>
              </div>
              <motion.div
                className="md:col-span-7"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20% 0% -20% 0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="text-gray-700 text-lg md:text-xl font-helvetica-light space-y-4">
                  <p>
                    We build our work around students because they are already the sharpest marketers of this generation. As digital natives, they move most fluently between online and offline spaces, understanding platforms, trends, and behaviour without needing translation.
                  </p>
                  <p>
                    Students bring new perspectives and the best insights. Innovative communication in a saturated, shifting landscape is the only way for modern marketing success. Their ideas aren’t limited by old templates or outdated assumptions.
                  </p>
                  <p>
                    We give students real responsibility because we trust their thinking. Their work shapes our identity and drives the strategies we deliver. This is why we rely on students.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Our team */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch pt-28 md:pt-32 pb-16 md:pb-20">
              {/* Team grid (left) */}
              <motion.div
                className="md:col-span-8 order-2 md:order-1"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20% 0% -20% 0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 min-[1600px]:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="rounded-2xl ring-1 ring-gray-300/80 bg-white/40 p-4 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-300" />
                        <div className="mt-3">
                          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">Name Placeholder</div>
                          <div className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base text-gray-500">Role Placeholder</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right-aligned subheading */}
              <div className="md:col-span-4 order-1 md:order-2 flex flex-col items-end">
                <h2 className="leading-[0.95] text-blue-primary font-futura text-5xl md:text-6xl lg:text-7xl font-bold text-right">
                  Our <span className="font-extrabold">team</span>
                </h2>
                <p className="text-right text-gray-700 text-lg md:text-xl font-helvetica-light mt-4 pl-6 md:pl-10">
                  Our fantastic head staff who make the marketing dream come true.
                </p>
                <div className="mt-auto pt-8">
                  <HeroCTA text="Drop Us A Line" width="230px" hoverWidth="280px" position="team" targetId="contact" />
                </div>
              </div>
            </div>

            {/* Our Mission & Values */}
            <div className="pt-24 md:pt-28">
              <h2 className="text-center text-blue-primary font-futura text-5xl md:text-6xl font-extrabold">Our Mission &amp; Values</h2>
              <div className="relative left-1/2 -translate-x-1/2 transform w-[94vw] max-w-[1600px] mt-12 px-2 md:px-6">
                <button
                  aria-label="Previous"
                  onClick={handleMissionPrev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 shadow-sm"
                >
                  ‹
                </button>
                <button
                  aria-label="Next"
                  onClick={handleMissionNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 shadow-sm"
                >
                  ›
                </button>

                <div className="px-4 md:px-10 lg:px-16">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={missionIndex}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm shadow-sm p-10 md:p-16 grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-stretch h-[520px] md:h-[560px] lg:h-[600px]"
                    >
                      <div className="flex flex-col h-full">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-primary mb-4 md:mb-6 lg:mb-8">{missionSlides[missionIndex].title}</h3>
                        <div className="flex-1 flex items-start md:items-center overflow-hidden">
                          <div className="text-gray-700 text-[0.95rem] sm:text-base md:text-[1.05rem] lg:text-lg xl:text-[1.15rem] font-helvetica-light space-y-4 md:space-y-5 lg:space-y-6 max-w-2xl leading-relaxed break-words pb-2 pr-1 overflow-auto">
                            {missionSlides[missionIndex].paragraphs.map((p, idx) => (
                              <p key={idx}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-[220px] md:h-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-300" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      
      
      <section id="contact" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <div className="text-center mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px]">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Contact</h2>
          <p className="text-lg text-gray-600">Contact section coming soon...</p>
        </div>
      </section>
    </main>
  );
}
