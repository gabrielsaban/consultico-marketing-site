// ARCHIVED: Full about section content moved to src/a_sections/AboutSection_archived.tsx

export default function AboutSection(): React.JSX.Element {
  return (
    <section id="about" className="min-h-screen mt-32 scroll-mt-24">
      {/* About Header Banner */}
      <div className="bg-brand-silk py-10 md:py-10 px-6 sm:px-12 lg:px-16 xl:px-36 rounded-bl-[140px] rounded-tr-[140px]">
        <h2 className="text-[32px] sm:text-[40px] md:text-[44px] lg:text-[50px] font-bold text-brand-blue font-futura text-center">
          We
        </h2>
      </div>
      
      <div className="text-center mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] pt-16">
        <p className="text-lg text-gray-600">About section coming soon...</p>
      </div>
    </section>
  );
}
