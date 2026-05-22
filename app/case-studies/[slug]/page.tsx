import Nav from '@/components/nav'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies, getCaseStudy } from '@/lib/case-studies'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getCaseStudy(slug)
  if (!c) return { title: 'Case study' }
  return {
    title: c.meta.title,
    description: c.meta.description,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const c = getCaseStudy(slug)
  if (!c) notFound()

  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <header className="relative pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 md:pb-14 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to" />
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 relative z-10">
            {/* Back link */}
            <Link
              href="/#case-studies"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-accent transition-colors mb-8 sm:mb-10"
            >
              <span>←</span>
              <span>Back to case studies</span>
            </Link>

            <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-3 sm:mb-4">
              Case study · {c.industry}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6 sm:mb-8">
              {c.headline}
            </h1>

            {/* Headline metric */}
            <div className="inline-flex items-baseline gap-3 bg-card-bg border border-border rounded-lg px-5 sm:px-6 py-4 sm:py-5">
              <div className="font-mono text-2xl sm:text-3xl md:text-[32px] font-semibold text-accent leading-none tracking-tight">
                {c.metric}
              </div>
              <div className="text-sm sm:text-[15px] text-text-secondary">
                {c.metricLabel}
              </div>
            </div>
          </div>
        </header>

        {/* At-a-glance facts */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-accent mb-6 sm:mb-8 leading-[1.1]">
              At a glance
            </h2>
            <div className="relative bg-card-bg border border-border rounded-2xl p-5 sm:p-6 md:p-7 overflow-hidden">
              {/* Subtle accent corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/[0.06] blur-2xl"
              />

              {/* Top row — short facts, sit close together */}
              <div className="relative grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-1.5">
                    Industry
                  </div>
                  <div className="text-base sm:text-lg text-text font-medium leading-snug">
                    {c.industry}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-1.5">
                    Build type
                  </div>
                  <div className="text-base sm:text-lg text-text font-medium leading-snug">
                    {c.buildType}
                  </div>
                </div>
                {c.timeline && (
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-1.5">
                      Timeline
                    </div>
                    <div className="text-base sm:text-lg text-text font-medium leading-snug">
                      {c.timeline}
                    </div>
                  </div>
                )}
              </div>

              {/* Hairline + tech stack row — full width so the pills breathe */}
              <div className="relative mt-5 pt-5 border-t border-border">
                <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-2.5">
                  Tech stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.techStack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[12px] px-2.5 py-1 rounded-md border border-border bg-bg/40 text-text"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What it does — capabilities */}
        {c.capabilities && c.capabilities.length > 0 && (
          <section className="relative py-12 sm:py-16 md:py-20 border-b border-border">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6">
              <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-6 sm:mb-8">
                What it does
              </div>
              <ul className="space-y-3 sm:space-y-3.5">
                {c.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base sm:text-[17px] text-text leading-relaxed"
                  >
                    <span className="font-mono text-accent text-sm leading-[1.6] shrink-0 mt-px">
                      →
                    </span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Body */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6">
            <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-6 sm:mb-8">
              The work
            </div>
            <div className="space-y-5 sm:space-y-6 text-base sm:text-[17px] text-text leading-[1.65]">
              {c.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Testimonial (optional) */}
            {c.testimonial && (
              <div className="mt-10 sm:mt-14 border-l-2 border-accent pl-5 sm:pl-6">
                <p className="text-base sm:text-[17px] text-text leading-relaxed mb-2 italic">
                  &ldquo;{c.testimonial.quote}&rdquo;
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                  — {c.testimonial.attribution}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Engineering challenges */}
        {c.engineering && c.engineering.length > 0 && (
          <section className="relative py-12 sm:py-16 md:py-20 border-b border-border">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6">
              <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-6 sm:mb-8">
                Engineering challenges
              </div>
              <div className="space-y-8 sm:space-y-10">
                {c.engineering.map((item, i) => (
                  <div key={i} className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5">
                    <div className="font-mono text-sm sm:text-base text-accent tabular-nums leading-snug pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-[17px] sm:text-lg text-text font-medium leading-snug mb-2">
                        {item.challenge}
                      </h3>
                      <p className="text-[15px] sm:text-base text-text-secondary leading-[1.65]">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other case studies */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
            <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-6 sm:mb-8">
              More case studies
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {caseStudies
                .filter((other) => other.slug !== c.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/case-studies/${other.slug}`}
                    className="case-card group bg-card-bg border border-border rounded-xl p-6 sm:p-7 flex flex-col"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-3">
                      {other.industry}
                    </div>
                    <div className="font-mono text-2xl sm:text-3xl font-semibold text-accent leading-none mb-2 tracking-tight">
                      {other.metric}
                    </div>
                    <div className="text-sm text-text-secondary mb-4">
                      {other.metricLabel}
                    </div>
                    <h3 className="text-lg font-medium leading-snug mb-3">
                      {other.headline}
                    </h3>
                    <div className="font-mono text-xs uppercase tracking-wider text-text-secondary group-hover:text-accent transition-colors flex items-center gap-1.5 mt-auto">
                      <span>Read</span>
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
