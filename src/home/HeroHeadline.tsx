export default function HeroHeadline() {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6">
      <h1 className="text-blue-primary font-futura font-[750] text-[clamp(1.65rem,4.55vmin,3.35rem)] [@media(max-height:800px)]:text-[clamp(1.9rem,5.3vmin,3.9rem)] 2xl:text-[clamp(2rem,3.9vw,4rem)] leading-[1.1] max-w-4xl">
        Digital marketing consultant in Glasgow
      </h1>
      <h2 className="text-blue-primary font-futura font-[750] text-[clamp(1.35rem,3.5vmin,2.5rem)] [@media(max-height:800px)]:text-[clamp(1.5rem,3.8vmin,2.75rem)] 2xl:text-[clamp(1.65rem,3.2vw,2.85rem)] leading-[1.15] max-w-4xl">
        We make your brand heard — strategy first, then SEO, paid media, and web for UK and US brands.
      </h2>
    </div>
  );
}
