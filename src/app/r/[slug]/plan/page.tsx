import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { loadForRequest } from '@/lib/reports/load-for-request';
import { unlockPath, reportPath } from '@/lib/reports/store';
import { PlanBoard } from '@/components/playbook/PlanBoard';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Everything to do, in one place, with a link back to what justifies each one. */
export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await loadForRequest(slug);

  if (result.kind === 'missing') notFound();
  if (result.kind === 'locked') redirect(unlockPath(slug));
  // A legacy report has no plan surface; send it to its own renderer.
  if (result.kind === 'report') redirect(reportPath(slug));

  return <PlanBoard pb={result.doc} />;
}
