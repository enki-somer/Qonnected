/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "@/*": ["./*"],
      },
    },
    // Enable modern JavaScript optimization
    optimizePackageImports: ["framer-motion", "@heroicons/react"],
  },
  // Optimize images
  images: {
    unoptimized: false, // Enable Next.js image optimization
    deviceSizes: [640, 750, 828, 1080, 1200], // Optimize for common device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Optimize for common image sizes
    formats: ["image/webp"], // Prefer WebP format
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
    remotePatterns: [],
    domains: [],
  },
  // Enable compression
  compress: true,
  // Enable React strict mode for better performance and debugging
  reactStrictMode: true,
  // Optimize fonts
  optimizeFonts: true,
  // Environment variables
  env: {
    NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID,
    NETLIFY_ADMIN_TOKEN: process.env.NETLIFY_ADMIN_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NETLIFY_SITE_ID + ".netlify.app",
  },
  // Configure modern JavaScript output
  swcMinify: true, // Use SWC for minification
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console in production
  },
  // Improve chunking strategy
  webpack: (config, { isServer }) => {
    // Optimize client-side chunks
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 50000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: "framework",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
            priority: 40,
            enforce: true,
          },
          commons: {
            name: "commons",
            chunks: "all",
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const match = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              );
              // Provide a fallback name if match is null
              if (!match) return "lib.unknown";
              const packageName = match[1];
              return `lib.${packageName.replace("@", "")}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
