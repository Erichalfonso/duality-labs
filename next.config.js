/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    // Retired landing page; send old links and search results to the homepage.
    return [
      { source: '/real-estate', destination: '/', permanent: true },
      { source: '/blog/ai-transforming-real-estate', destination: '/blog', permanent: true },
      { source: '/blog/welcome-to-blog', destination: '/blog', permanent: true },
    ]
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }]
  },
  experimental: {
    mdxRs: true,
  },
}

module.exports = nextConfig
