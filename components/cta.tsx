'use client'

import { useEffect, useRef } from 'react'

export default function CTA() {
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
    <section ref={sectionRef} id="contact" className="relative py-24 overflow-hidden">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-light via-bg-secondary to-gradient-to" />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/20 to-transparent" />

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-[520px] mx-auto reveal">
          {/* Decorative gradient line */}
          <div className="w-12 h-1 bg-gradient-to-r from-accent to-transparent mx-auto mb-6" />

          <h2 className="text-[32px] font-medium mb-4 tracking-tight">
            Ready to build?
          </h2>
          <p className="text-base text-text-secondary mb-8 leading-relaxed">
            15 minutes. No pitch deck. Just a conversation about what you're trying to solve.
          </p>

          {/* Enhanced button with gradient */}
          <a
            href="https://calendly.com/erichalfonso2000/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-white bg-gradient-to-r from-gradient-accent-from to-gradient-accent-to px-8 py-4 rounded-md hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-0.5"
          >
            Book an intro
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
