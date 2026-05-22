'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { serviceCards } from '@/lib/services'
import { ServiceIcon } from './service-icons'

export default function Results() {
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

  // Layout: 1 col on mobile, 2 cols on sm/md, 3-on-top + 2-on-bottom centered at lg+
  const colClass = (i: number) => {
    if (i === 3) return 'lg:col-span-2 lg:col-start-2'
    if (i === 4) return 'sm:col-span-2 lg:col-span-2'
    return 'lg:col-span-2'
  }

  return (
    <section
      ref={sectionRef}
      id="specialties"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight px-4 leading-[1.05]">
            Our Services
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mt-3 sm:mt-4">
            Duality Labs Offers
          </p>
        </div>

        {/* Service cards — 3-on-top, 2-on-bottom centered at lg+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {serviceCards.map((s, i) => {
            const href = s.href ?? `/services/${s.slug}`
            const isExternal = href.startsWith('http')

            const cardInner = (
              <>
                {/* Layer 1 — Editorial watermark icon, anchored bottom-right inside the card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-5 right-5 text-accent/[0.05] group-hover:text-accent/[0.08] transition-colors duration-500 select-none"
                >
                  <ServiceIcon slug={s.slug} />
                </div>

                {/* Layer 2 — Soft corner glow that intensifies on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/[0.04] blur-2xl opacity-60 group-hover:opacity-100 group-hover:bg-accent/[0.08] transition-all duration-500"
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-[28px] sm:text-[30px] lg:text-[32px] font-semibold text-text leading-[1.1] tracking-[-0.02em] mb-4 sm:mb-5 pr-12">
                    {s.name}
                    <span className="text-accent">.</span>
                  </h3>

                  {/* Hard-sell result + business benefit */}
                  <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent mb-2">
                    {s.result}
                  </div>
                  <p className="text-[16px] sm:text-[17px] text-text leading-snug font-medium">
                    {s.benefit}
                  </p>

                  <div className="flex-1" />
                </div>

                {/* Arrow — top right (only on cards that link to a substantive external destination) */}
                {isExternal && (
                  <div className="absolute top-7 right-7 sm:top-8 sm:right-8 z-20 w-10 h-10 rounded-full border border-border bg-card-bg/80 backdrop-blur-sm flex items-center justify-center text-text-secondary group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-all duration-300">
                    <span className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </div>
                )}
              </>
            )

            const className = `case-card group reveal relative bg-card-bg border border-border rounded-2xl p-8 sm:p-9 flex flex-col min-h-[300px] sm:min-h-[320px] lg:min-h-[340px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 ${colClass(i)}`
            const styleProp = { transitionDelay: `${i * 0.06}s` }

            if (isExternal) {
              return (
                <a
                  key={s.slug}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  style={styleProp}
                >
                  {cardInner}
                </a>
              )
            }
            return (
              <Link
                key={s.slug}
                href={href}
                className={className}
                style={styleProp}
              >
                {cardInner}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
