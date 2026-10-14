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

const WORKFLOW = [
  ['In', '418 bank transactions'],
  ['Agent', '412 matched, 6 flagged'],
  ['You', 'Review just the 6'],
]

const TERMS = ['1 agent, 1 task', 'Live in 2 weeks', '$0, no running costs', 'No obligation']

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="For bookkeeping firms"
          title="Bookkeeping firm owners: get one repetitive task automated, free."
          description="Tell us the task. We build the agent."
        />

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary mb-3">Example: bank reconciliation</p>
              <div className="grid grid-cols-3 gap-2">
                {WORKFLOW.map(([step, text]) => (
                  <div key={step} className="bg-card-bg/80 border border-border rounded-xl p-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{step}</span>
                    <p className="text-sm font-medium mt-1 leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <ul className="mb-8 flex flex-wrap gap-2">
              {TERMS.map((t) => (
                <li key={t} className="font-mono text-xs px-3 py-1.5 rounded-full border border-accent/40 bg-accent-light text-text">{t}</li>
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
