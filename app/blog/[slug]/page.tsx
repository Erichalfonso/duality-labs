import { notFound } from 'next/navigation'
import Nav from '@/components/nav'
import BlogPostLayout from '@/components/blog-post-layout'
import Footer from '@/components/footer'
import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import { markdownToHtml } from '@/lib/mdx'
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

  const html = await markdownToHtml(post.content)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author || 'Duality Labs',
      url: 'https://www.dualitylabs.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Duality Labs',
      url: 'https://www.dualitylabs.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.dualitylabs.ai/icon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.dualitylabs.ai/blog/${slug}`,
    },
    ...(post.tags && { keywords: post.tags.join(', ') }),
  }

  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <BlogPostLayout post={post}>
          <div
            className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-li:text-text-secondary prose-blockquote:border-accent prose-blockquote:text-text-secondary prose-hr:border-border prose-table:text-sm prose-th:text-text prose-td:text-text-secondary"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </BlogPostLayout>
      </main>
      <Footer />
    </>
  )
}
