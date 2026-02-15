import Nav from '@/components/nav'
import Services from '@/components/services'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Duality Labs',
  description: 'AI automation, workflow optimization, and custom software solutions for growing businesses.',
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
