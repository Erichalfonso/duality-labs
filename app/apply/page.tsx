import Nav from '@/components/nav'
import PageHeader from '@/components/page-header'
import Footer from '@/components/footer'
import ApplyForm from '@/components/apply-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book an Intro Call',
  description: 'Tell us about your business and what you want to build, then pick a time for a call with Duality Labs.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/apply',
  },
}

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="Book an intro call"
          title="Tell us what you're building"
          description="A few quick questions so we come to the call prepared. Takes about a minute."
        />

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 relative z-10">
            <ApplyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
