import type { MetadataRoute } from 'next';
import { publicPaths } from '@/lib/routes';

const siteUrl = 'https://mistfallhunter.co';
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: path === '/' ? siteUrl : `${siteUrl}${path}`,
    lastModified: new Date('2026-08-09'),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
