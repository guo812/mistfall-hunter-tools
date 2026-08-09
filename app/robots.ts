import type { MetadataRoute } from 'next';

// 10R12 release: public crawling enabled; sitemap advertised; no path-level disallow.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://mistfallhunter.co/sitemap.xml',
  };
}
