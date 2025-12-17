'use client'

import { useEffect, useRef } from 'react'

const process = [
  {
    title: 'US-led product ownership',
    description: 'Direct access to senior product thinking. No account managers in the way.',
  },
  {
    title: 'Distributed engineering',
    description: 'Vetted, senior engineers working async across time zones.',
  },
  {
    title: 'Fixed-scope, outcome-driven builds',
    description: "Clear deliverables, clear timelines. You know exactly what you're getting.",
  },
]

export default function Process() {
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
      { threshold: 0.1 }
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 border-b border-border overflow-hidden">
      {/* Gradient background - inverted from services */}
      <div className="absolute inset-0 bg-gradient-to-b from-gradient-to to-bg" />

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-8 reveal">
          How we work
        </div>

        <div className="flex flex-col gap-4">
          {process.map((item, i) => (
            <div
              key={i}
              className="reveal group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="relative flex gap-6 items-start p-6 rounded-lg border border-card-border bg-card-bg hover:shadow-md transition-all duration-300">
                {/* Gradient accent bar on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-accent/30 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="font-mono text-xs text-text-secondary w-8 shrink-0 pt-1">
                  0{i + 1}
                </span>

                <div className="flex-1">
                  <h3 className="text-[17px] font-medium mb-2">{item.title}</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
