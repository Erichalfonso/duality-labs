import Nav from '@/components/nav'
import Services from '@/components/services'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI, ML & Custom Software Development Services',
  description: 'Custom software engineering, AI agent development, LLM fine-tuning, ML pipelines, and data infrastructure services. Miami-based agency serving growing businesses nationwide.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <Services />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
