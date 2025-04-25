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
    functionTimeout: 60, // Increased from 30 to 60 seconds to handle the deletion process
  }
};

export default nextConfig;
