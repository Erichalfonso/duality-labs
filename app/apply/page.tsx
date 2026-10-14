import Link from 'next/link'
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
    <div className="min-h-screen flex flex-col">
      {/* Ad landing page: logo only, no menu or full footer, so the form is the one thing to do. */}
      <header className="border-b border-border">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-5">
          <span className="font-mono text-base sm:text-lg font-semibold tracking-wider text-text">DUALITY LABS</span>
        </div>
      </header>
      <main className="flex-1 flex">
        <section className="relative flex-1 flex items-center py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="w-full max-w-[560px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight leading-tight mb-4">
              We&apos;ll build your AI agent <span className="text-accent">free.</span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary mb-8">
              For bookkeeping firms. Pick one repetitive task and we&apos;ll automate it in 2 weeks. No cost, no obligation.
            </p>
            <ApplyForm />
          </div>
        </section>
      </main>
      <footer className="py-6 text-center font-mono text-xs text-text-secondary">
        © 2026 Duality Labs · <Link href="/privacy" className="hover:text-text">Privacy Policy</Link>
      </footer>
    </div>
  )
}
