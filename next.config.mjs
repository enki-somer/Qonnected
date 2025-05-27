/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "@/*": ["./*"],
      },
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
    domains: [],
  },
};

export default nextConfig;
