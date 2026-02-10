'use client';

export default function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center pt-2 space-x-7 ${className}`}>
      <a
        aria-label="LinkedIn"
        href="https://www.linkedin.com/company/consultico-ltd/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
      >
        <span
          aria-hidden
          className="w-14 h-14"
          style={{
            backgroundColor: 'var(--brand-blue)',
            WebkitMaskImage: 'url(/icons/linkedin.svg)',
            maskImage: 'url(/icons/linkedin.svg)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            display: 'inline-block',
          }}
        />
      </a>
      <a
        aria-label="Instagram"
        href="https://www.instagram.com/consultico_marketing/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
      >
        <span
          aria-hidden
          className="w-14 h-14"
          style={{
            backgroundColor: 'var(--brand-blue)',
            WebkitMaskImage: 'url(/icons/instagram.svg)',
            maskImage: 'url(/icons/instagram.svg)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            display: 'inline-block',
          }}
        />
      </a>
      <a
        aria-label="Facebook"
        href="https://www.facebook.com/profile.php?id=61562303216944"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
      >
        <span
          aria-hidden
          className="w-14 h-14"
          style={{
            backgroundColor: 'var(--brand-blue)',
            WebkitMaskImage: 'url(/icons/facebook.svg)',
            maskImage: 'url(/icons/facebook.svg)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            display: 'inline-block',
          }}
        />
      </a>
    </div>
  );
}

