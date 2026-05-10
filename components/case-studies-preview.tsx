'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { caseStudies } from '@/lib/case-studies'

export default function CaseStudiesPreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 },
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight px-4 leading-[1.05]">
            Case Studies
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mt-3 sm:mt-4">
            Real Client Wins
          </p>
        </div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {caseStudies.map((c, i) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="case-card group reveal relative bg-card-bg border border-border rounded-2xl p-7 sm:p-8 flex flex-col min-h-[300px] sm:min-h-[320px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              {/* Corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/[0.04] blur-2xl opacity-60 group-hover:opacity-100 group-hover:bg-accent/[0.08] transition-all duration-500"
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Industry tag */}
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-accent mb-4 sm:mb-5">
                  {c.industry}
                </div>

                {/* Metric — the hero of the card */}
                <div className="font-mono text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-accent leading-none mb-2 tracking-tight pr-12">
                  {c.metric}
                </div>
                <div className="text-sm text-text-secondary mb-5 sm:mb-6">
                  {c.metricLabel}
                </div>

                {/* Headline */}
                <h3 className="text-lg sm:text-xl font-medium leading-snug mb-3 text-text">
                  {c.headline}
                </h3>

                {/* Preview */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                  {c.preview}
                </p>

                {/* CTA */}
                <div className="font-mono text-xs uppercase tracking-wider text-text-secondary group-hover:text-accent transition-colors flex items-center gap-1.5">
                  <span>Read the case study</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>

              {/* Arrow circle top-right */}
              <div className="absolute top-6 right-6 sm:top-7 sm:right-7 z-20 w-9 h-9 rounded-full border border-border bg-card-bg/80 backdrop-blur-sm flex items-center justify-center text-text-secondary group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-all duration-300">
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
