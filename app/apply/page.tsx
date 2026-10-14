import Nav from '@/components/nav'
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
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[560px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight leading-tight mb-4">
              Here&apos;s the <span className="text-accent">free AI agent</span> you asked about
            </h1>
            <p className="text-base sm:text-lg text-text-secondary mb-8">
              One repetitive task in your bookkeeping firm, automated free. Live in 2 weeks.
            </p>
            <ApplyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
