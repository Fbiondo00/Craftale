/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for optimized deployment
  output: 'standalone',
  
  // Webpack configuration to exclude canvas from client bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent canvas from being bundled on client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  
  images: {
    // Use modern remotePatterns instead of deprecated domains
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      }
    ],
    // Use both AVIF and WebP - Next.js automatically handles fallbacks
    // AVIF for modern browsers, WebP for broader compatibility
    formats: ['image/avif', 'image/webp'],
    // Remove SVG settings since we now have proper images
    // dangerouslyAllowSVG: true,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  eslint: {
    ignoreDuringBuilds: true, // Allows builds even if there are ESLint errors or warnings
  },
  
  // Optimize for performance and SEO
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  
  // Enable compression
  compress: true,
  
  
  // Enable output file tracing for optimized builds
  outputFileTracingRoot: process.cwd(),
  
  // Security headers for production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 