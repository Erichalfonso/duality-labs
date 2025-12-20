import Nav from '@/components/nav'
import PageHeader from '@/components/page-header'
import BlogCard from '@/components/blog-card'
import Footer from '@/components/footer'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Duality Labs',
  description: 'Insights on AI, automation, and building software systems.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="Blog"
          title="Insights & updates"
          description="Thoughts on AI, automation, and building software systems that scale."
        />

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
            {posts.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-text-secondary font-mono text-xs sm:text-sm">
                  No posts yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
