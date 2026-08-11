import type { MetadataRoute } from 'next';
import { publicPaths } from '@/lib/routes';

const siteUrl = 'https://mistfallhunter.co';
const nonIndexable = new Set(['/privacy', '/terms', '/contact']);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicPaths
    .filter((path) => !nonIndexable.has(path))
    .map((path) => ({
      url: path === '/' ? siteUrl : `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: path === '/' ? 1 : 0.8,
    }));
}
