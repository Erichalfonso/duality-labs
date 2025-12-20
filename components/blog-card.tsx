import Link from 'next/link'
import { format } from 'date-fns'
import { BlogPost } from '@/lib/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group relative h-full p-4 sm:p-6 rounded-lg border border-card-border bg-card-bg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative z-10">
          {/* Metadata */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-[10px] sm:text-xs text-text-secondary font-mono">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMM d, yyyy')}
            </time>
            {post.readingTime && (
              <>
                <span className="text-border">•</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-medium mb-2 tracking-tight group-hover:text-accent transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed mb-3 sm:mb-4">
            {post.description}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[10px] sm:text-xs font-mono bg-accent-light text-accent rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
