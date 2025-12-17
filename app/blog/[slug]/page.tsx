import { notFound } from 'next/navigation'
import Nav from '@/components/nav'
import BlogPostLayout from '@/components/blog-post-layout'
import Footer from '@/components/footer'
import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Duality Labs`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Dynamically import the MDX content
  const MDXContent = (await import(`@/content/posts/${slug}.mdx`)).default

  return (
    <>
      <Nav />
      <main>
        <BlogPostLayout post={post}>
          <MDXContent />
        </BlogPostLayout>
      </main>
      <Footer />
    </>
  )
}
