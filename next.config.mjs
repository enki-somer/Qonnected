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
  env: {
    NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID,
    NETLIFY_ADMIN_TOKEN: process.env.NETLIFY_ADMIN_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NETLIFY_SITE_ID + ".netlify.app",
  },
};

export default nextConfig;
