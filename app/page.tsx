import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Results from '@/components/results'
import ProductSpotlight from '@/components/product-spotlight'
import TrustedBy from '@/components/trusted-by'
import CaseStudiesPreview from '@/components/case-studies-preview'
import HowWeWork from '@/components/how-we-work'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.dualitylabs.ai',
  },
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Results />
        <ProductSpotlight />
        <CaseStudiesPreview />
        <HowWeWork />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
