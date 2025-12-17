import { format } from 'date-fns'
import { BlogPost } from '@/lib/types'

interface BlogPostLayoutProps {
  post: BlogPost
  children: React.ReactNode
}

export default function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
  return (
    <article className="relative">
      {/* Header */}
      <header className="relative py-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to" />

        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
            Blog Post
          </div>
          <h1 className="text-[clamp(32px,5vw,48px)] font-medium leading-[1.15] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-text-secondary font-mono">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            {post.readingTime && (
              <>
                <span className="text-border">•</span>
                <span>{post.readingTime}</span>
              </>
            )}
            {post.author && (
              <>
                <span className="text-border">•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono bg-accent-light text-accent rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </article>
  )
}
