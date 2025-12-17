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
    <section ref={sectionRef} id="contact" className="py-20 bg-bg-secondary relative z-10">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center max-w-[480px] mx-auto reveal">
          <h2 className="text-[28px] font-medium mb-4 tracking-tight">
            Ready to build?
          </h2>
          <p className="text-base text-text-secondary mb-8">
            15 minutes. No pitch deck. Just a conversation about what you're trying to solve.
          </p>
          <a
            href="#" // Replace with your Calendly link
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-white bg-accent px-7 py-3.5 rounded-md hover:bg-teal-700 transition-all hover:-translate-y-0.5"
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
