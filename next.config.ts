// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',  // Ensures canvas dependency is handled
      },
    },
  },
  // Optionally add more configuration here if necessary
};

export default nextConfig;
