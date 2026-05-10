'use client'

import { useEffect, useRef } from 'react'

const phases = [
  {
    number: '01',
    name: 'Plan',
    body: '15–20 minute discovery call. We learn what you’re trying to solve, identify the highest-impact work, and propose a scoped spec with timeline and price. No surprises before we write a line of code.',
  },
  {
    number: '02',
    name: 'Build',
    body: 'Two-week sprints with weekly demos. You see real progress and steer the direction. Production-grade code from day one — observable, tested, ready to ship.',
  },
  {
    number: '03',
    name: 'Ship',
    body: 'We deploy to production, handle migration, and stay on the hook. Monitoring, optimization, and continued development as your system scales.',
  },
]

export default function HowWeWork() {
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
      id="how-we-work"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight px-4 leading-[1.05]">
            How We Work
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mt-3 sm:mt-4">
            From Call To Ship
          </p>
        </div>

        {/* Phases */}
        <div className="relative">
          {/* Horizontal connecting line at md+ */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-px bg-border"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:gap-8 relative">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className="reveal relative"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Number circle */}
                <div className="relative z-10 mb-5 sm:mb-6 flex md:justify-center">
                  <div className="w-11 h-11 rounded-full bg-card-bg border-2 border-accent/25 flex items-center justify-center">
                    <span className="font-mono text-xs font-semibold text-accent tabular-nums">
                      {phase.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:text-center md:px-2">
                  <h3 className="text-xl sm:text-2xl md:text-[26px] font-medium text-text tracking-tight mb-2 sm:mb-3">
                    {phase.name}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-text-secondary leading-relaxed max-w-[340px] md:mx-auto">
                    {phase.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
