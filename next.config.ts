import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Required by the installed OpenNext adapter: it reads manifests from .next/standalone.
  output: 'standalone',
};
export default nextConfig;
