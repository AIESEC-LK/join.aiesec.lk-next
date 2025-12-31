import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
