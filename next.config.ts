import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SWC is the default compiler in Next.js; webpack is explicitly selected via CLI flags.
  reactStrictMode: true,
  webpack: config => {
    // Extend webpack configuration here when needed.
    return config;
  },
};

export default nextConfig;
