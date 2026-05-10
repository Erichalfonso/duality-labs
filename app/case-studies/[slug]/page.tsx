import Nav from '@/components/nav'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies, getCaseStudy } from '@/lib/case-studies'
import { BeforeAfterVisual } from '@/components/before-after-mock'

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
              href="/work"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-accent transition-colors mb-8 sm:mb-10"
            >
              <span>←</span>
              <span>Back to work</span>
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

        {/* Before / After visual */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-6 sm:mb-8">
              Before / After
            </div>
            <BeforeAfterVisual
              kind={c.mock}
              beforeImg={c.beforeImg ?? null}
              afterImg={c.afterImg ?? null}
            />
          </div>
        </section>

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

            {/* Testimonial */}
            <div className="mt-10 sm:mt-14 border-l-2 border-accent pl-5 sm:pl-6">
              <p className="text-base sm:text-[17px] text-text leading-relaxed mb-2 italic">
                &ldquo;{c.testimonial.quote}&rdquo;
              </p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                — {c.testimonial.attribution}
              </p>
            </div>
          </div>
        </section>

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
