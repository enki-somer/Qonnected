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
  output: "standalone",
};

export default nextConfig;
