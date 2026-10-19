import Link from 'next/link'
import ApplyForm from '@/components/apply-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Tell Duality Labs what you want to build: custom software, mobile apps, AI integration, or machine learning.',
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
              Tell us what you want to <span className="text-accent">build.</span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary mb-8">
              Custom software, mobile apps, AI integration, and machine learning. Leave your details and we&apos;ll reach out to set up a call.
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
