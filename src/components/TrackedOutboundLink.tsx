'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackOutboundClick } from '@/lib/tracking';

type TrackedOutboundLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  ctaLocation: string;
  children: ReactNode;
};

export default function TrackedOutboundLink({
  href,
  ctaLocation,
  onClick,
  children,
  ...props
}: TrackedOutboundLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        trackOutboundClick({ linkUrl: href, ctaLocation });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
