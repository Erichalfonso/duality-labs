'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Intro Call',
    description:
      'A quick conversation to learn about your business, your goals, and where you think AI and automation could make the biggest impact. We explain how we work and see if there is a fit.',
    duration: '15 min',
  },
  {
    number: '02',
    title: 'Business Audit',
    description:
      'We take a deep dive into your current systems, workflows, and tech stack. This is where we identify the highest-value opportunities for automation and AI integration.',
    duration: '60 min',
  },
  {
    number: '03',
    title: 'Custom Proposal',
    description:
      'Based on the audit, we deliver a clear scope with defined deliverables, timeline, and pricing. No surprises — you know exactly what you are getting before we write a single line of code.',
    duration: '3-5 days',
  },
  {
    number: '04',
    title: 'Build & Iterate',
    description:
      'Our engineering team builds your solution in focused sprints with regular check-ins. You see real progress every week and can steer the direction as we go.',
    duration: 'Ongoing',
  },
  {
    number: '05',
    title: 'Launch',
    description:
      'We deploy your solution into production, handle the migration, and make sure everything runs smoothly from day one.',
    duration: 'Launch day',
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description:
      'After launch, we stick around. Monitoring, optimization, and continued development as your business evolves and new opportunities emerge.',
    duration: 'Continuous',
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
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 reveal">
          <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3 sm:mb-4">
            How we work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 sm:mb-6 px-4">
            From first call to launch<br className="hidden sm:inline" /> and beyond.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto px-4">
            A clear, structured process so you always know what happens next.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] sm:left-[27px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8 sm:space-y-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="reveal relative flex gap-5 sm:gap-8"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full bg-card-bg border-2 border-accent/20 flex items-center justify-center">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-accent">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-medium">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[11px] text-text-secondary bg-black/[0.04] px-2 py-0.5 rounded w-fit">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                    {step.description}
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
