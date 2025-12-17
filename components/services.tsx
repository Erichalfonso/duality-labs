'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    title: 'AI automation & agents',
    description: 'Custom AI systems that handle repetitive work, process documents, and make decisions at scale.',
  },
  {
    title: 'Internal tools & dashboards',
    description: 'Operational software tailored to how your team actually works. No off-the-shelf compromises.',
  },
  {
    title: 'MVPs for founders',
    description: 'Ship your first version fast. We scope it right, build it clean, and hand it off ready to scale.',
  },
  {
    title: 'Systems integration',
    description: 'Connect your tools, unify your data, and automate the workflows in between.',
  },
]

export default function Services() {
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
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-8 reveal">
          What we do
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="reveal group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Card with gradient background */}
              <div className="relative h-full p-8 rounded-lg border border-card-border bg-card-bg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  {/* Number badge */}
                  <div className="w-10 h-10 rounded-md bg-accent-light flex items-center justify-center mb-4">
                    <span className="font-mono text-sm font-medium text-accent">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    {service.description}
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
