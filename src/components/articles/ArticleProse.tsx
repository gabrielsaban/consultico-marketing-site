import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ArticleSponsoredPlacement } from '@/lib/articles/types';

interface ArticleProseProps {
  content: string;
  /** Paid placements declared in frontmatter. Their links must not pass PageRank. */
  sponsored?: ArticleSponsoredPlacement[];
}

export default function ArticleProse({ content, sponsored }: ArticleProseProps) {
  const sponsoredHrefs = new Set((sponsored ?? []).flatMap((p) => p.urls));

  // Google requires paid links to be qualified. Getting this wrong is a link
  // scheme violation, and the manual action lands on us rather than on the
  // advertiser, so it is derived from data instead of remembered per article.
  const relFor = (href?: string) => {
    if (!href || !/^https?:/i.test(href)) return undefined;
    return sponsoredHrefs.has(href) ? 'sponsored noopener' : 'noopener';
  };

  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mb-4 mt-10 font-futura text-[clamp(1.35rem,2vw,1.75rem)] font-bold text-brand-blue first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-8 font-futura text-[clamp(1.15rem,1.6vw,1.35rem)] font-bold text-gray-900 dark:text-gray-100">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-5 font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-6 list-disc space-y-2 pl-6 font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.7] text-gray-800 dark:text-gray-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 list-decimal space-y-2 pl-6 font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.7] text-gray-800 dark:text-gray-200">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => (
            <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              rel={relFor(href)}
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-brand-blue pl-5 font-helvetica-light italic text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="mb-6 overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left text-[0.9rem]">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 bg-brand-silk px-3 py-2 font-helvetica font-semibold dark:border-gray-700 dark:bg-gray-800">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 px-3 py-2 font-helvetica-light dark:border-gray-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
