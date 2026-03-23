'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MVPIllustration,
  MLPipelineIllustration,
  IntegrationIllustration,
  WebDevIllustration,
} from './service-illustrations'

const services = [
  {
    title: 'Custom Software & Product Engineering',
    subtitle: 'From concept to production',
    description: 'We design and build custom web applications, platforms, APIs, and internal tools. Whether you\'re launching a new product or modernizing legacy systems, we deliver production-ready software engineered for scale.',
    features: ['Web Applications', 'APIs & Platforms', 'Internal Tools', 'Product Development'],
    illustration: MVPIllustration,
    href: '/services/custom-software',
  },
  {
    title: 'AI & Machine Learning Systems',
    subtitle: 'Intelligence that works in production',
    description: 'We build and deploy AI systems that solve real problems — from fine-tuning LLMs and training custom models to building ML pipelines and intelligent agents that integrate into your existing workflows.',
    features: ['LLM Fine-Tuning', 'ML Pipelines', 'Custom Models', 'AI Agents'],
    illustration: MLPipelineIllustration,
    href: '/services/ai-ml',
  },
  {
    title: 'Data Infrastructure & Automation',
    subtitle: 'Systems that run themselves',
    description: 'We architect data pipelines, automate complex workflows, and build integrations that connect your systems. Eliminate manual processes and let your infrastructure scale with your business.',
    features: ['Data Pipelines', 'Workflow Automation', 'System Integrations', 'Reporting & Analytics'],
    illustration: IntegrationIllustration,
    href: '/services/data-infrastructure',
  },
  {
    title: 'Website Development',
    subtitle: 'Fast, beautiful, performance-first',
    description: 'We design and build high-performance marketing sites, landing pages, and interactive web experiences. Optimized for speed, SEO, and conversion — deployed and maintained on modern infrastructure.',
    features: ['Conversion-Driven UI/UX Design', 'High-Conversion Landing Pages', 'Interactive Web Experiences', 'SEO & Speed Optimization'],
    illustration: WebDevIllustration,
    href: '/services',
    linkLabel: 'See our work',
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
      <div className="py-12 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3 sm:mb-4 reveal">
            What we build
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 sm:mb-6 reveal px-4">
            Engineering Solutions That<br className="hidden sm:inline" />{' '}
            <span className="sm:hidden">Scale With Your Business</span>
            <span className="hidden sm:inline">Scale With Your Business</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto reveal px-4">
            Custom software, AI systems, and data infrastructure — from strategy through production
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
            className="relative py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border overflow-hidden reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
              <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                {/* Illustration side */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Illustration />
                </div>

                {/* Content side */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-4 sm:space-y-6`}>
                  <div>
                    <div className="inline-block px-3 py-1 bg-accent-light rounded-full mb-3 sm:mb-4">
                      <span className="font-mono text-xs font-medium text-accent">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 sm:mb-3 tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-lg sm:text-xl text-accent font-medium mb-3 sm:mb-4">
                      {service.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-bg-secondary border border-border rounded-lg"
                      >
                        <span className="text-xs sm:text-sm font-medium text-text-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline mt-2"
                  >
                    {service.linkLabel || 'Learn more'}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
