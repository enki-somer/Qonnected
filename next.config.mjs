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
    remotePatterns: [],
    unoptimized: false,
    domains: [],
  },
};

export default nextConfig;
