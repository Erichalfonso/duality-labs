export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
  published?: boolean
  readingTime?: string
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

export interface BlogMetadata {
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
  published?: boolean
}
