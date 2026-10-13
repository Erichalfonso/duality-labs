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

const BULLETS = [
  'Built around your workflow and the software you already use',
  'You pick the task: reconciliations, flagging discrepancies, chasing documents',
  'Limited free builds each month, chosen by fit',
]

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="Free AI agent"
          title="Get your first AI agent built free"
          description="Tell us one task your team repeats. If it's a fit, we build an AI agent for it at no cost."
        />

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 relative z-10">
            <ul className="mb-8 space-y-3 text-sm sm:text-base text-text-secondary">
              {BULLETS.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-accent">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <ApplyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
