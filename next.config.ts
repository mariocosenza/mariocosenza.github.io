import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (mariocosenza.github.io is a user page, so basePath is "/")
  output: "export",
  images: {
    // No image optimizer on static export
    unoptimized: true,
  },
  // Generate trailing slashes for clean URLs on GitHub Pages
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
