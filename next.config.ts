import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary's domain
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
};

export default nextConfig;
