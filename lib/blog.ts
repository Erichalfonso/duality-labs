import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost, BlogPostWithContent, BlogMetadata } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): BlogPost[] {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const metadata = data as BlogMetadata

      // Calculate reading time
      const stats = readingTime(content)

      return {
        slug,
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        author: metadata.author,
        tags: metadata.tags,
        published: metadata.published ?? true,
        readingTime: stats.text,
      } as BlogPost
    })
    // Filter unpublished posts in production
    .filter((post) => {
      if (process.env.NODE_ENV === 'production') {
        return post.published !== false
      }
      return true
    })
    // Sort by date descending
    .sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1
      } else {
        return -1
      }
    })

  return allPosts
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const metadata = data as BlogMetadata

    const stats = readingTime(content)

    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      date: metadata.date,
      author: metadata.author,
      tags: metadata.tags,
      published: metadata.published ?? true,
      readingTime: stats.text,
      content,
    }
  } catch (error) {
    return null
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}
