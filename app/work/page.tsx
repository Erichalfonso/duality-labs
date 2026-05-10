import Nav from '@/components/nav'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import Link from 'next/link'
import type { Metadata } from 'next'
import { caseStudies } from '@/lib/case-studies'
import { ShippedVisual } from '@/components/before-after-mock'

export const metadata: Metadata = {
  title: 'Work — Portfolio | Duality Labs',
  description:
    'Selected automations, pipelines, and apps we have shipped to production. Each one built for a real client and running in their stack today.',
}

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <header className="relative py-16 sm:py-20 md:py-24 lg:py-28 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to" />
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4 sm:mb-5">
              Portfolio
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] tracking-tight mb-5 sm:mb-6">
              Things we built. Running in production.
            </h1>
            <p className="text-base sm:text-lg text-text-secondary max-w-[640px] mx-auto leading-relaxed">
              Selected automations, pipelines, and apps shipped to real clients — each one operating in their stack today, every day.
            </p>
          </div>
        </header>

        {/* Portfolio grid */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
              {caseStudies.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="case-card group relative bg-card-bg border border-border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  {/* Visual thumbnail — the shipped state */}
                  <div className="p-5 sm:p-6 pb-0">
                    <ShippedVisual kind={c.mock} afterImg={c.afterImg ?? null} />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">
                    {/* Type · industry pills */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent-light/60 border border-accent/15 px-2.5 py-1 rounded-full">
                        {c.buildType}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary bg-bg-secondary border border-border px-2.5 py-1 rounded-full">
                        {c.industry}
                      </span>
                    </div>

                    {/* Build name */}
                    <h2 className="text-xl sm:text-[22px] md:text-[24px] font-semibold text-text leading-[1.15] tracking-tight mb-2.5">
                      {c.buildName}
                      <span className="text-accent">.</span>
                    </h2>

                    {/* Build summary */}
                    <p className="text-[14px] sm:text-[15px] text-text-secondary leading-relaxed mb-5">
                      {c.buildSummary}
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {c.techStack.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-text-secondary bg-text/[0.03] border border-border px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex-1" />

                    {/* CTA */}
                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <div className="font-mono text-[11px] text-accent tabular-nums">
                        {c.metric} · {c.metricLabel.toLowerCase()}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-text-secondary group-hover:text-accent transition-colors flex items-center gap-1.5">
                        <span>Case study</span>
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Industries strip */}
        <section className="relative py-10 sm:py-12 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3 sm:mb-4">
              Industries We've Shipped For
            </p>
            <div className="font-mono text-sm sm:text-base text-text flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2">
              <span>Real Estate</span>
              <span className="text-text-secondary/40">·</span>
              <span>E-commerce</span>
              <span className="text-text-secondary/40">·</span>
              <span>Professional Services</span>
              <span className="text-text-secondary/40">·</span>
              <span>SaaS</span>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
