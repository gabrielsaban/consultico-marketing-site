import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/articles/loader';

export const alt = 'Consultico article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.title ?? 'Consultico Articles';
  const category = article?.category ?? 'Articles';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(145deg, #f2f2f2 0%, #ffffff 45%, #e8f3ff 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: 28,
            fontWeight: 700,
            color: '#007BFF',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Consultico · {category}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#141414',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, color: '#4b5563' }}>consultico.co.uk/articles</div>
      </div>
    ),
    { ...size }
  );
}
