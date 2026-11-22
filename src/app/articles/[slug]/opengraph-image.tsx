import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/articles/loader';
import { SITE_ORIGIN } from '@/lib/schema';

export const alt = 'Consultico article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.title ?? 'Consultico Articles';
  const category = article?.category ?? 'Articles';
  // Updates are shared on LinkedIn by the person who wrote them, so the preview
  // carries their face and name. Everything else keeps the plain card.
  const isUpdate = article?.category === 'Updates';
  const label = isUpdate && article?.kind ? `${category} · ${article.kind}` : category;
  const author = article?.author;

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
          Consultico · {label}
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
        {isUpdate && author ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <img
              src={`${SITE_ORIGIN}${author.image}`}
              width={96}
              height={96}
              alt=""
              style={{ borderRadius: '48px', objectFit: 'cover', border: '3px solid #007BFF' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#141414' }}>{author.name}</div>
              <div style={{ fontSize: 26, color: '#4b5563' }}>{author.role}</div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 28, color: '#4b5563' }}>consultico.co.uk/articles</div>
        )}
      </div>
    ),
    { ...size }
  );
}
