/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "@/*": ["./*"],
      },
    },
    appDir: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
    domains: ["qonnectedacademy.com", "res.cloudinary.com"],
    formats: ["image/webp"],
  },
  env: {
    NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID,
    NETLIFY_ADMIN_TOKEN: process.env.NETLIFY_ADMIN_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NETLIFY_SITE_ID + ".netlify.app",
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
