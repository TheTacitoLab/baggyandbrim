import { ImageResponse } from 'next/og';

// Shared OG image renderer (build spec 18.4). Ink surface, page title, hairline
// rule. next/og uses inline styles only; every element with children sets
// display:flex as satori requires.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

export function renderBrandOg({
  eyebrow,
  title,
  footer = 'baggyandbrim.com',
}: {
  eyebrow?: string;
  title: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#11110F',
          color: '#F7F6F1',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(247,246,241,0.7)',
          }}
        >
          {eyebrow ?? 'Baggy & Brim'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 1, background: 'rgba(247,246,241,0.22)', marginBottom: 32 }} />
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 44 ? 60 : 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', marginTop: 32, fontSize: 26, color: 'rgba(247,246,241,0.7)' }}>
            {footer}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
