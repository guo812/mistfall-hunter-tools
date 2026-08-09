import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mistfallhunter.co'),
  title: 'Mistfall Hunter Tools, Builds & Tier List (Updated Aug 2026)',
  description: 'Free Mistfall Hunter tools and guides: class quiz, tier list, squad builder, loot finder, settings and deep guides.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', siteName: 'Mistfall Hunter Tools', images: [{ url: '/images/hero-main.png', width: 1200, height: 630, alt: 'Mistfall Hunter Tools' }] },
  twitter: { card: 'summary_large_image' },
};
export const revalidate = 60;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
