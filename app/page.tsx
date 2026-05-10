import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Results from '@/components/results'
import TrustedBy from '@/components/trusted-by'
import CaseStudiesPreview from '@/components/case-studies-preview'
import HowWeWork from '@/components/how-we-work'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Results />
        <CaseStudiesPreview />
        <HowWeWork />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
