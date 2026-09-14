import Nav from '@/components/nav'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bank Reconciliation First Pass for Accounting Firms',
  description: 'Sample reconciliations from a tool we built for an accounting firm client.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/reconcile',
  },
}

// Figures are what site/build.sh in ProlineProject prints for each sample. Rebuild, then update.
const samples = [
  { file: 'large', lines: 660, matched: 595, left: 71 },
  { file: 'medium', lines: 250, matched: 236, left: 17 },
  { file: 'small', lines: 46, matched: 41, left: 8 },
]

export default function ReconcilePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid gap-3 sm:grid-cols-3">
              {samples.map((s) => (
                <a
                  key={s.file}
                  href={`/reconcile/samples/${s.file}.html`}
                  target="_blank"
                  rel="noopener"
                  className="block rounded-xl border border-black/10 bg-white/60 p-5 hover:border-accent/40 transition-colors"
                >
                  <div className="text-2xl font-medium tracking-tight">{s.lines}-line month</div>
                  <div className="text-sm text-text-secondary mt-1">
                    {s.matched} matched · {s.left} need you
                  </div>
                  <div className="text-sm text-accent mt-4">Open sample →</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
