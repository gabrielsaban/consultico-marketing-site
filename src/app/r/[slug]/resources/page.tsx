import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { loadForRequest } from '@/lib/reports/load-for-request';
import { unlockPath, reportPath } from '@/lib/reports/store';
import { ResourceShelf } from '@/components/playbook/ResourceShelf';

export const metadata: Metadata = {
  // Absolute: the root layout's '%s | Consultico' template would otherwise put
  // the marketing site's name on a private page's tab and browser history.
  title: { absolute: 'Private playbook · Consultico' },
  robots: { index: false, follow: false },
};
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The reference material, on its own page rather than in a drawer.
 *
 * `?r=<id>` opens one full-width — the same one-thing-on-screen logic the
 * actions use. These are documents the client comes back to while doing the
 * work, so they need a URL, not a modal they have to reopen a playbook to find.
 */
export default async function ResourcesPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ r?: string }>;
}) {
  const { slug } = await params;
  const { r } = await searchParams;
  const result = await loadForRequest(slug);

  if (result.kind === 'missing') notFound();
  if (result.kind === 'locked') redirect(unlockPath(slug));
  if (result.kind === 'report') redirect(reportPath(slug));

  return <ResourceShelf pb={result.doc} resourceId={r} />;
}
