import { defineConfig } from 'next';

// Next 15 configuration (App Router enabled by default)
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
};

export default nextConfig;
