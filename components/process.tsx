'use client'

import { useEffect, useRef } from 'react'

const process = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'US-Led Product Ownership',
    description: 'Direct access to senior product thinking with clear communication and strategic guidance from experienced US-based leads.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Distributed Engineering',
    description: 'Vetted, senior engineers working asynchronously across time zones to deliver high-quality solutions efficiently.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Fixed-Scope Outcomes',
    description: "Clear deliverables and timelines ensure you know exactly what you're getting with predictable results.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Rapid Iteration',
    description: 'Fast feedback cycles and agile methodology ensure quick turnaround times without sacrificing quality.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Data-Driven Decisions',
    description: 'Analytics and metrics guide every decision, ensuring measurable impact and continuous improvement.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    title: 'Full Transparency',
    description: 'Complete visibility into progress, challenges, and solutions with regular updates and open communication.',
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
    <section ref={sectionRef} className="relative py-24 border-b border-border overflow-hidden">
      {/* Gradient background - same as other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
            How we work
          </div>
          <h2 className="text-4xl md:text-5xl font-medium mb-6">
            The Key Benefits of AI<br />for Your Business Growth
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover how AI automation enhances efficiency, reduces costs, and drives
            business growth with smarter, faster processes.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {process.map((item, i) => (
            <div
              key={i}
              className="reveal group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-full p-8 rounded-xl border border-card-border bg-card-bg shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-12 h-12 mb-6 text-accent">
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-medium mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {item.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
