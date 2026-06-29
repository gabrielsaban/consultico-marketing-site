import type { ReactNode } from 'react';

interface ArticleReadingPanelProps {
  children: ReactNode;
  className?: string;
}

export default function ArticleReadingPanel({ children, className = '' }: ArticleReadingPanelProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200/90 bg-white px-6 py-8 shadow-[0_8px_32px_rgba(20,20,20,0.08)] md:px-10 md:py-12 lg:rounded-3xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}
