import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during builds
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Increase function timeout
  serverRuntimeConfig: {
    functionTimeout: 30, // 30 seconds (this is the maximum for some serverless platforms)
  }
};

export default nextConfig;
