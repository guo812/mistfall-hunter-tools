import type { MetadataRoute } from 'next';

// Temporary release safeguard: public access is available, but crawling remains
// disabled until the Privacy-page implementation is reconciled with production.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  };
}
