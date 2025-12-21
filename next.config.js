/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Remote patterns kept for backward compatibility if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.pollinations.ai',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize image formats for better performance
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable image optimization for local images
    minimumCacheTTL: 60,
    // Disable static image import optimization warnings
    dangerouslyAllowSVG: false,
    // For Netlify: disable optimization since images are already optimized (WebP)
    // This ensures images load directly from public folder without API route issues
    unoptimized: process.env.NODE_ENV === 'production',
    // For Netlify: ensure images are optimized correctly
    // The Netlify Next.js plugin handles image optimization
    loader: 'default',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
      ],
    },
  ],
};

module.exports = nextConfig;

