import Link from 'next/link'
import {
  getCaseStudiesForService,
  type ServiceSlug,
} from '@/lib/case-studies'

export default function ServiceCaseStudies({
  service,
}: {
  service: ServiceSlug
}) {
  const matches = getCaseStudiesForService(service)
  if (matches.length === 0) return null

  return (
    <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3 sm:mb-4">
          See it in action
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-[36px] font-medium mb-8 sm:mb-10 tracking-tight leading-tight">
          What this looks like in production.
        </h2>

        <div
          className={`grid grid-cols-1 ${matches.length > 1 ? 'md:grid-cols-2' : ''} gap-5 sm:gap-6`}
        >
          {matches.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="case-card group bg-card-bg border border-border rounded-xl p-6 sm:p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-accent mb-4">
                {c.industry}
              </div>
              <div className="font-mono text-2xl sm:text-3xl md:text-[36px] font-semibold text-accent leading-none mb-2 tracking-tight">
                {c.metric}
              </div>
              <div className="text-sm text-text-secondary mb-5">
                {c.metricLabel}
              </div>
              <h3 className="text-lg sm:text-xl font-medium leading-snug mb-3">
                {c.headline}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                {c.preview}
              </p>
              <div className="font-mono text-xs uppercase tracking-wider text-text-secondary group-hover:text-accent transition-colors flex items-center gap-1.5 mt-auto">
                <span>Read the case study</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
