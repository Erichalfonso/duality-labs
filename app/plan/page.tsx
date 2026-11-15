import PlanFunnel from '@/components/plan-funnel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Free AI Roadmap',
  description: 'Answer 6 short questions and get an AI roadmap made for your accounting or bookkeeping firm.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/plan',
  },
  // Ad landing page: kept out of search so the traffic numbers stay clean.
  robots: { index: false, follow: false },
}

export default function PlanPage() {
  return <PlanFunnel />
}
