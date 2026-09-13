// Google Preferred Sources: a signed-in reader can pick sites to see more of,
// and a chosen site "is more likely to appear in Top Stories" and "can be
// highlighted with a 'preferred' badge" in AI Mode and AI Overviews
// (developers.google.com/search/docs/appearance/preferred-sources, updated
// 2026-09-10). Consultico appears in the tool, confirmed 2026-09-13. Domain
// level only, so the link always names the bare domain, never an article.
const PREFERRED_SOURCE_URL = 'https://www.google.com/preferences/source?q=consultico.co.uk';

export default function PreferredSourceLink() {
  return (
    <p className="mt-6 font-helvetica-light text-[0.95rem] leading-[1.6] text-gray-700 dark:text-gray-300">
      Want to see more of us in Google?{' '}
      <a
        href={PREFERRED_SOURCE_URL}
        className="font-medium text-brand-blue underline-offset-2 hover:underline"
      >
        Add Consultico as a preferred source
      </a>
      .
    </p>
  );
}
