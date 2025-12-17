'use client'

import { useEffect, useRef } from 'react'
import {
  AIAutomationIllustration,
  DashboardIllustration,
  MVPIllustration,
  IntegrationIllustration,
} from './service-illustrations'

const services = [
  {
    title: 'Workflow Automation',
    subtitle: 'Automate repetitive tasks',
    description: 'We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains — saving time and cutting down errors.',
    features: ['Internal Task Bots', '100+ Automations', 'Smart Workflows'],
    illustration: AIAutomationIllustration,
  },
  {
    title: 'AI Assistant',
    subtitle: 'Delegate Daily Tasks',
    description: 'From managing calendars to drafting emails and summarizing meetings, our AI assistants work around the clock to keep your business running smarter and faster.',
    features: ['Summaries', 'Scheduling', 'Many more'],
    illustration: DashboardIllustration,
  },
  {
    title: 'Sales & Marketing',
    subtitle: 'Accelerate Sales Growth',
    description: 'AI tools for lead generation, personalized outreach, and automated content creation that scales your sales efforts and builds stronger brand presence.',
    features: ['Lead Generation', 'Content Creation', 'Social Posts'],
    illustration: MVPIllustration,
  },
  {
    title: 'Custom Projects',
    subtitle: 'Build Smarter Systems',
    description: 'Whether you\'re starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals.',
    features: ['Strategy', 'Custom AI', 'Consulting'],
    illustration: IntegrationIllustration,
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
    <section ref={sectionRef} id="services" className="relative">
      {/* Header section */}
      <div className="py-20 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4 reveal">
            What we offer
          </div>
          <h2 className="text-4xl md:text-5xl font-medium mb-6 reveal">
            AI Solutions That Take Your<br />Business to the Next Level
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto reveal">
            We design, develop, and implement automation tools that help you work smarter, not harder
          </p>
        </div>
      </div>

      {/* Service sections - each gets full space */}
      {services.map((service, i) => {
        const Illustration = service.illustration
        const isEven = i % 2 === 0

        return (
          <div
            key={i}
            className="relative py-24 border-b border-border overflow-hidden reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                {/* Illustration side */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Illustration />
                </div>

                {/* Content side */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                  <div>
                    <div className="inline-block px-3 py-1 bg-accent-light rounded-full mb-4">
                      <span className="font-mono text-xs font-medium text-accent">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-xl text-accent font-medium mb-4">
                      {service.subtitle}
                    </p>

                    <p className="text-base text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 bg-bg-secondary border border-border rounded-lg"
                      >
                        <span className="text-sm font-medium text-text-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
