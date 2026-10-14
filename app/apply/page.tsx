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
  { step: 'In', title: 'Bank feed + ledger export', body: '418 transactions for the month, pulled from the tools you already use.' },
  { step: 'Agent', title: 'Matches and flags', body: '412 matched automatically. 6 flagged: amounts that differ, entries missing from the ledger.' },
  { step: 'You', title: 'Review only the exceptions', body: 'You check 6 items instead of 418. Nothing posts without your approval.' },
]

const FREE_TERMS = [
  ['What you get', 'One AI agent for one repetitive task, set up in your tools and live in about 2 weeks.'],
  ['What it costs', 'Nothing. No setup fee and no running costs.'],
  ['What you owe us', 'No obligation to buy anything else.'],
  ['Why it\'s free', 'We want to show it works in your firm before you ever pay us.'],
]

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="For bookkeeping firms"
          title="Bookkeeping firm owners: get one repetitive task automated, free."
          description="Tell us the task. We build an AI agent for it around your workflow, at no cost."
        />

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-10">
              <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary mb-3">Sample workflow: monthly bank reconciliation</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {WORKFLOW.map((w) => (
                  <div key={w.step} className="bg-card-bg/80 border border-border rounded-xl p-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{w.step}</span>
                    <p className="font-medium mt-1 mb-1">{w.title}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{w.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary mt-2">An example. Yours is built around whichever task you pick.</p>
            </div>

            <dl className="mb-10 grid gap-4 sm:grid-cols-2">
              {FREE_TERMS.map(([term, detail]) => (
                <div key={term}>
                  <dt className="font-medium text-sm sm:text-base">{term}</dt>
                  <dd className="text-sm text-text-secondary leading-relaxed">{detail}</dd>
                </div>
              ))}
            </dl>

            <ApplyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
