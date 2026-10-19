/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    // Retired landing page; send old links and search results to the homepage.
    return [{ source: '/real-estate', destination: '/', permanent: true }]
  },
  experimental: {
    mdxRs: true,
  },
}

module.exports = nextConfig
