import { ImageResponse } from 'next/og';
import { copyByPath } from '@/lib/copy';
import { getRoute, publicPaths } from '@/lib/routes';
import { trustPages } from '@/lib/trust-pages';


function routePath(input: string | null) {
  if (!input || !input.startsWith('/') || !publicPaths.includes(input)) return '/';
  return input;
}

export async function GET(request: Request) {
  const path = routePath(new URL(request.url).searchParams.get('path'));
  const route = getRoute(path) || getRoute('/');
  const copy = copyByPath[path];
  const trust = trustPages[path];
  const title = copy?.h1 || trust?.h1 || route?.h1 || 'Mistfall Hunter Tools';
  const eyebrow = route?.kind === 'tool' ? 'FREE DECISION TOOL' : route?.kind === 'content' ? 'MISTFALL HUNTER GUIDE' : 'UNOFFICIAL FAN RESOURCE';
  const description = (copy?.directAnswer || trust?.meta || route?.answer || 'Free Mistfall Hunter tools and guides.').slice(0, 170);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #070a12 0%, #111a2b 55%, #231b0c 100%)',
          color: '#f6f1df', display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
          padding: '64px 72px', position: 'relative', fontFamily: 'serif',
        }}
      >
        <div style={{ position: 'absolute', top: -155, right: -80, width: 450, height: 450, borderRadius: 9999, border: '2px solid #c99a3d', opacity: 0.24 }} />
        <div style={{ position: 'absolute', bottom: -220, left: 260, width: 650, height: 410, borderRadius: 9999, background: '#9d6a18', opacity: 0.12 }} />
        <div style={{ color: '#e2b35c', display: 'flex', fontFamily: 'sans-serif', fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>{eyebrow}</div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginTop: 28, maxWidth: 960 }}>{title}</div>
        <div style={{ color: '#d4d8e1', display: 'flex', fontFamily: 'sans-serif', fontSize: 29, lineHeight: 1.35, marginTop: 28, maxWidth: 930 }}>{description}</div>
        <div style={{ alignItems: 'center', borderTop: '1px solid #8f6a2d', color: '#e2b35c', display: 'flex', fontFamily: 'sans-serif', fontSize: 23, fontWeight: 700, letterSpacing: 2, marginTop: 'auto', paddingTop: 26 }}>MISTFALLHUNTER.CO&nbsp;&nbsp;•&nbsp;&nbsp;TOOLS · BUILDS · GUIDES</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
