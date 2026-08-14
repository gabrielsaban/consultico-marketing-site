import type { Metadata } from 'next';
import ComposedPage from '@/home/__ComposedPage';

// Articles can be scheduled with a future `date` (see src/lib/articles/loader.ts).
// Revalidate hourly so a scheduled article appears on its publish day without a rebuild.
export const revalidate = 3600;


export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return <ComposedPage />;
}
