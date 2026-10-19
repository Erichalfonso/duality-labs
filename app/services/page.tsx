import Nav from '@/components/nav'
import Services from '@/components/services'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI, ML & Custom Software Development Services',
  description: 'Custom software, mobile apps, AI integration and consulting, and machine learning services from a Miami engineering studio serving businesses nationwide.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <h1 className="sr-only">Software, mobile, AI, and machine learning engineering services</h1>
        <Services />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
