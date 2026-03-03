import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Lead Response for Real Estate Teams',
  description: 'Respond to real estate leads in under 60 seconds with AI-powered automation. Built for teams with 5+ agents who pay for leads. Duality Labs, Miami.',
  openGraph: {
    title: 'AI Lead Response for Real Estate Teams | Duality Labs',
    description: 'Respond to real estate leads in under 60 seconds with AI-powered automation. Stop losing deals to slow follow-ups.',
    type: 'website',
  },
}

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
