import type { Metadata } from 'next';
import ComposedPage from '@/home/__ComposedPage';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return <ComposedPage />;
}
