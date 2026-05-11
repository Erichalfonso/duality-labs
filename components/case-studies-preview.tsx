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
            Where our systems run
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mt-3 sm:mt-4">
            Industries We've Shipped For
          </p>
        </div>

        {/* Cards — industry as the hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {caseStudies.map((c, i) => {
            // Each card hosts one quadrant of a single giant Ψ whose center
            // sits ~32px below the grid's middle cross. The 20px gap (md:gap-5)
            // bisects the glyph horizontally — that gap-slit is the "cut" through it.
            // Positions assume a 2x2 grid order: [TL, TR, BL, BR].
            const psiQuadrantPos = [
              'bottom-[-42px] right-[-10px] translate-x-1/2 translate-y-1/2',
              'bottom-[-42px] left-[-10px] -translate-x-1/2 translate-y-1/2',
              'top-[22px] right-[-10px] translate-x-1/2 -translate-y-1/2',
              'top-[22px] left-[-10px] -translate-x-1/2 -translate-y-1/2',
            ][i]

            return (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="case-card group reveal relative bg-card-bg border border-border rounded-2xl p-7 sm:p-8 flex flex-col min-h-[320px] sm:min-h-[340px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              {/* Shared Ψ watermark — one quadrant per card, centered across the 4-card grid */}
              <div
                aria-hidden
                className={`pointer-events-none hidden md:block absolute ${psiQuadrantPos} text-accent/[0.05] select-none`}
              >
                <svg width="560" height="560" viewBox="0 0 256 256" aria-hidden>
                  <text
                    x="128"
                    y="188"
                    textAnchor="middle"
                    fontSize="240"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fontWeight="700"
                    fill="currentColor"
                  >
                    Ψ
                  </text>
                </svg>
              </div>

              {/* Corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/[0.04] blur-2xl opacity-60 group-hover:opacity-100 group-hover:bg-accent/[0.08] transition-all duration-500"
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Industry — big eye-catcher (the WHO) */}
                <h3 className="text-[26px] sm:text-[28px] lg:text-[30px] font-semibold text-text leading-[1.1] tracking-[-0.02em] mb-4 sm:mb-5 pr-12">
                  {c.industry}
                  <span className="text-accent">.</span>
                </h3>

                {/* Headline — what we did, in their language */}
                <p className="text-[15px] sm:text-base text-text leading-snug font-medium mb-6 sm:mb-7">
                  {c.headline}
                </p>

                <div className="flex-1" />

                {/* Hairline + small supporting metric attribution */}
                <div className="pt-5 border-t border-border">
                  <div className="font-mono text-[13px] text-accent mb-1.5 tabular-nums">
                    {c.metric} · {c.metricLabel.toLowerCase()}
                  </div>
                  <div className="font-mono text-[12px] uppercase tracking-wider text-text-secondary group-hover:text-accent transition-colors flex items-center gap-1.5">
                    <span>Read the case study</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow circle top-right */}
              <div className="absolute top-6 right-6 sm:top-7 sm:right-7 z-20 w-9 h-9 rounded-full border border-border bg-card-bg/80 backdrop-blur-sm flex items-center justify-center text-text-secondary group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-all duration-300">
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
