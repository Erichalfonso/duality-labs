import Nav from '@/components/nav'
import PageHeader from '@/components/page-header'
import Footer from '@/components/footer'
import ApplyForm from '@/components/apply-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for a Free Agent Build',
  description: 'Apply for a free AI agent build from Duality Labs. Tell us about your business and the task you want automated.',
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
          tag="Apply"
          title="Apply for a free agent build"
          description="We take on a limited number of free builds each month, chosen by fit. A few quick questions, about two minutes."
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
