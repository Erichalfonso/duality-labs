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
    <section ref={sectionRef} className="py-20 border-b border-border bg-bg relative z-10">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-8 reveal">
          What we do
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-x-16">
          {services.map((service, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <h3 className="text-lg font-medium mb-2 tracking-tight">{service.title}</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
