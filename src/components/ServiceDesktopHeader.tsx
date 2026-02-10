import Image from 'next/image';
import SocialIcons from '@/components/SocialIcons';

export default function ServiceDesktopHeader() {
  return (
    <div className="relative">
      <div className="absolute top-[3.25rem] left-4 sm:left-6 md:left-[5vw] lg:left-[7.5vw] hidden md:block">
        <Image
          src="/brand/logo_main.svg"
          alt="Consultico"
          width={420}
          height={120}
          className="block w-[min(36vw,520px)] h-auto"
          priority
        />
      </div>
      <div className="absolute top-16 right-4 sm:right-6 md:right-[5vw] lg:right-[7.5vw] hidden md:flex space-x-4 xl:space-x-6">
        <SocialIcons className="[&>a>img]:w-[clamp(2rem,4.5vmin,2.75rem)] [&>a>img]:h-[clamp(2rem,4.5vmin,2.75rem)]" />
      </div>
    </div>
  );
}
