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
    <section ref={sectionRef} className="py-20 border-b border-border bg-bg relative z-10">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-8 reveal">
          How we work
        </div>
        <div className="flex flex-col gap-6">
          {process.map((item, i) => (
            <div 
              key={i} 
              className="flex gap-6 items-baseline reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="font-mono text-xs text-text-secondary w-6 shrink-0">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-[17px] font-medium mb-1">{item.title}</h3>
                <p className="text-[15px] text-text-secondary">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
