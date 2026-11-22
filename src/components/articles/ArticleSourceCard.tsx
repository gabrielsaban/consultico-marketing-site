import type { ArticleSource } from '@/lib/articles/types';

/**
 * Credits what an Insight is responding to, above the prose, so the reader
 * knows whose idea is being discussed before they read the reaction to it.
 */
export default function ArticleSourceCard({ source }: { source: ArticleSource }) {
  return (
    <aside className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <p className="mb-1 font-helvetica text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
        Responding to
      </p>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-futura text-[1rem] font-bold text-brand-blue hover:underline"
      >
        {source.title}
      </a>
      <p className="mt-0.5 font-helvetica text-[0.875rem] text-gray-600 dark:text-gray-400">
        by {source.creator}
      </p>
    </aside>
  );
}
