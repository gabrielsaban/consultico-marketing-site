'use client'

import Link from 'next/link'
import HeroCTA from '@/components/HeroCTA'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex items-center">
      {/* Corner arrow to enter main site */}
      <Link
        href="/"
        aria-label="Enter main site"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white text-2xl leading-none shadow-md hover:bg-brand-blue transition-colors"
      >
        →
      </Link>

      <div className="relative z-10 mx-auto px-6 sm:px-6 lg:px-8 w-full">
        <div className="max-w-[1280px] mx-auto text-center pt-12 md:pt-21 lg:pt-18 pb-16 md:pb-24 lg:pb-28">
          {/* Consultico logo */}
          <div className="mb-10">
            <h1 className="text-d-48 font-bold font-futura">
              <span className="text-brand-blue">Consult</span>
              <span className="text-brand-blue">ico</span>
            </h1>
          </div>

          {/* Hook / qualifier (smaller, bold, keep width) */}
          <div className="relative mx-auto w-full max-w-6xl rounded-2xl border-2 bg-white px-4 py-3 md:py-4 shadow-[0_0_18px_rgba(59,130,246,0.12)]" style={{ borderColor: 'var(--blue-primary)' }}>
            {/* Blue down arrows (no triangles), vertically centered */}
            <div aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 select-none pointer-events-none">
              <svg width="28" height="24" viewBox="0 0 28 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4v12m-5-5 5 5 5-5" fill="none" stroke="var(--blue-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div aria-hidden className="absolute right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none">
              <svg width="28" height="24" viewBox="0 0 28 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4v12m-5-5 5 5 5-5" fill="none" stroke="var(--blue-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-gray-800 font-helvetica font-extrabold leading-tight text-xl sm:text-2xl md:text-3xl">
                IF YOU WANT MORE LEADS, HIGHER ROI, AND PREDICTABLE GROWTH
              </h1>
            </div>
          </div>

          {/* Divider between hook and pitch */}
          <div className="mx-auto mt-5 h-[2px] max-w-6xl bg-gradient-to-r from-transparent via-brand-blue to-transparent" />

          {/* Immediate sales vision/pitch (regular, key terms blue/bold) */}
          <p className="mt-4 md:mt-6 text-gray-800 font-helvetica-light leading-[1.05] text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-6xl mx-auto">
            Build a <span className="text-blue-primary font-futura font-extrabold">£12,000/month business</span> that compounds - 
            <span className="text-blue-primary font-futura font-extrabold"> attract</span>,
            <span> </span>
            <span className="text-blue-primary font-futura font-extrabold">convert</span>, and
            <span> </span>
            <span className="text-blue-primary font-futura font-extrabold">retain</span> customers without guesswork...
          </p>

          {/* VSL placeholder */}
          <div className="mt-10 md:mt-14">
            <div className="mx-auto w-full max-w-6xl">
              <div className="rounded-t-2xl bg-brand-blue text-white text-center text-sm sm:text-base font-helvetica py-3 font-semibold tracking-wide shadow-sm">
                CLICK BELOW TO SEE HOW WE WORK
              </div>
              <div className="relative w-full aspect-video rounded-b-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm overflow-hidden">
                <video
                  className="h-full w-full object-cover"
                  controls
                  muted
                  playsInline
                  poster="/pexels-owenbarker-1118341.jpg"
                >
                  {/* Drop your VSL source(s) here */}
                  {/* <source src="/vsl.mp4" type="video/mp4" /> */}
                </video>
              </div>
            </div>
            <div className="mt-3 text-center text-sm text-gray-500 font-helvetica-light">
              Placeholder subtext
            </div>
          </div>

          {/* Application form placeholder (same width as video) */}
          <div className="mt-10">
            <div className="relative mx-auto w-full max-w-6xl rounded-2xl border-2 bg-white shadow-sm p-8 min-h-[640px]" style={{ borderColor: 'var(--blue-primary)' }}>
              <div className="text-center text-gray-700 font-helvetica">Application Form Placeholder</div>
            </div>
          </div>

          {/* Success stories grid */}
          <section className="mt-14 md:mt-20">
            <div className="mx-auto w-full max-w-6xl">
              <h2 className="text-blue-primary font-futura font-extrabold text-2xl sm:text-3xl md:text-4xl text-center mb-8">
                Our Success Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm overflow-hidden aspect-video">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      muted
                      playsInline
                      poster="/pexels-owenbarker-1118341.jpg"
                    >
                      {/* Placeholder for success story video i */}
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* More Examples - 3 column testimonials */}
          <section className="mt-16 md:mt-24">
            <div className="mx-auto w-full max-w-6xl">
              <h2 className="text-blue-primary font-futura font-extrabold text-2xl sm:text-3xl md:text-4xl text-center mb-8">
                More Examples
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-9">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                    <div className="w-full aspect-[4/5] rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.08)]" />
                    <div className="mt-8 text-d-24 font-semibold text-gray-900 font-helvetica">Business Name Placeholder</div>
                    <div className="mt-5 text-sm text-gray-700 font-helvetica-light space-y-4">
                      <p>Short paragraph about how we helped this client achieve measurable results and improvements.</p>
                      <p>Additional context describing the challenge, our approach, and the outcome in brief.</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                {/* CTA centered */}
                <div className="flex justify-center">
                  <HeroCTA text="Get in touch" inline position="stats" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}


