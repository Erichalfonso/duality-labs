import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { caseStudies } from '@/lib/case-studies'

const SITE_UPDATED = new Date('2026-05-01')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dualitylabs.ai'

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const caseStudyPages = caseStudies.map((c) => ({
    url: `${baseUrl}/case-studies/${c.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [
    {
      url: baseUrl,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/ai-ml`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/custom-software`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/data-infrastructure`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/real-estate`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...caseStudyPages,
    ...posts,
  ]
}
