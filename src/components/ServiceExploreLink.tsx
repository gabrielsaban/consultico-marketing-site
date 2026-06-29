import Link from 'next/link';

interface ServiceExploreLinkProps {
  href: string;
  label: string;
  className?: string;
}

function ArrowIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

export default function ServiceExploreLink({ href, label, className = '' }: ServiceExploreLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(0.95rem,1.1vw,1.05rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${className}`}
    >
      {label}
      <ArrowIcon />
    </Link>
  );
}
