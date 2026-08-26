import Link from 'next/link';
import type { ReactNode } from 'react';

interface SponsoredDisclosureProps {
  /** The disclosure prose itself, authored in the article markdown. */
  children: ReactNode;
}

/**
 * The paid-placement disclosure, collapsed to a single line.
 *
 * The word "Sponsored" stays visible unconditionally: that is the part the CAP
 * Code cares about, so it is never the part behind a toggle. Only the detail of
 * who paid and what they did and did not get a say over sits inside the panel.
 *
 * Built on <details> rather than state, so it works with JavaScript off and the
 * disclosure is in the DOM for crawlers either way. Hiding it behind a click
 * would read as concealment, which is exactly what the disclosure exists to
 * avoid.
 */
export default function SponsoredDisclosure({ children }: SponsoredDisclosureProps) {
  return (
    <details className="group my-6">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 font-helvetica-light text-[0.82rem] text-gray-500 transition-colors dark:text-gray-400 [&::-webkit-details-marker]:hidden">
        <span>Sponsored,</span>
        <span className="text-brand-blue underline-offset-2 group-hover:underline">
          <span className="group-open:hidden">see more</span>
          <span className="hidden group-open:inline">see less</span>
        </span>
      </summary>

      <div className="mt-3 rounded-lg border border-gray-200 bg-brand-silk/70 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/60">
        <div className="[&_p:last-child]:mb-0 [&_p]:mb-3 [&_p]:text-[0.9rem] [&_p]:leading-[1.65]">
          {children}
        </div>

        <Link
          href="/sponsored-placements"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-2 font-helvetica text-[0.8rem] font-semibold text-white transition-opacity hover:opacity-90"
        >
          How placements work
          <span aria-hidden="true">&rsaquo;</span>
        </Link>
      </div>
    </details>
  );
}
