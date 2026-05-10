export type ServiceCard = {
  slug: string
  name: string
  href?: string
  result: string
  benefit: string
}

export const serviceCards: ServiceCard[] = [
  {
    slug: 'data-infrastructure',
    name: 'AI Automation',
    result: '40+ hrs/week reclaimed',
    benefit: 'AI Agents that work while you sleep.',
  },
  {
    slug: 'custom-software',
    name: 'Custom Software',
    result: 'Replaces $60k+/yr in SaaS',
    benefit: 'Tools built around your team, not their roadmap.',
  },
  {
    slug: 'ai-ml',
    name: 'Machine Learning',
    result: '98%+ accuracy on classification',
    benefit: 'Decisions in milliseconds, at scale.',
  },
  {
    slug: 'data-platform',
    name: 'Data Infrastructure',
    href: '/services',
    result: 'Reports in seconds, not days',
    benefit: 'Every team gets answers, not waitlists.',
  },
  {
    slug: 'web-app-dev',
    name: 'Web & App Development',
    href: 'https://duality-webdev-portfolio.vercel.app',
    result: '30%+ avg conversion lift',
    benefit: 'Sub-1s loads. Built to convert.',
  },
]
