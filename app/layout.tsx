import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mistfallhunter.co'),
  title: 'Mistfall Hunter Tools, Builds & Tier List (Updated Aug 2026)',
  description: 'Free Mistfall Hunter tools and guides: class quiz, tier list, squad builder, loot finder, settings and deep guides.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  verification: { google: 'Dnjb2JemYHtDyQPbzM-RMpIkIINPtcF1unhsK5QrVvQ' },
  openGraph: { type: 'website', siteName: 'Mistfall Hunter Tools', images: [{ url: '/images/hero-main.png', width: 1200, height: 630, alt: 'Mistfall Hunter Tools' }] },
  twitter: { card: 'summary_large_image' },
};
export const revalidate = 60;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Dnjb2JemYHtDyQPbzM-RMpIkIINPtcF1unhsK5QrVvQ" />
        <meta name="msvalidate.01" content="2A456917B5F44DA906CE3003D77A9BA5" />
      </head>
      <body>
        {/* Plausible: project-specific privacy-friendly analytics loader, per owner-provided snippet. */}
        <Script async src="https://plausible.shipsolo.io/js/pa-g1oTQRLR5BQvExBGeJauh.js" strategy="afterInteractive" />
        <Script id="plausible-init" strategy="afterInteractive">{`
          window.plausible = window.plausible || function(){(plausible.q = plausible.q || []).push(arguments)};
          plausible.init = plausible.init || function(i){plausible.o = i || {}};
          plausible.init();
        `}</Script>
        {/* GA4: G-GJRSQJV4XE, loaded by default per owner decision 2026-08-10, opt-out via Privacy page */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GJRSQJV4XE" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GJRSQJV4XE');
        `}</Script>
        {/* Microsoft Clarity: loaded by default per owner decision 2026-08-10, opt-out via Privacy page */}
        {clarityId ? (
          <Script id="clarity-init" strategy="afterInteractive">{`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}</Script>
        ) : null}
        {children}
      </body>
    </html>
  );
}
