import ReactMarkdown from 'react-markdown';

interface ArticleProseProps {
  content: string;
}

export default function ArticleProse({ content }: ArticleProseProps) {
  return (
    <div className="article-prose">
      <ReactMarkdown
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
            <a href={href} className="font-medium text-brand-blue underline-offset-2 hover:underline">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-brand-blue pl-5 font-helvetica-light italic text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
