'use client'

import { useEffect, useRef, useState } from 'react'

type Status = 'idle' | 'sending' | 'sent'

const TO_EMAIL = 'ops@dualitylabs.ai'
const CALENDLY_URL = 'https://calendly.com/dualitylabs/new-meeting'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<Status>('idle')

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const subject = `New inquiry from ${name}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || '—'}`,
      '',
      'Message:',
      message,
    ].join('\n')

    const href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = href
    setTimeout(() => setStatus('sent'), 600)
  }

  const inputClass =
    'w-full bg-card-bg border border-border rounded-md px-4 py-3 text-[15px] text-text placeholder:text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors'

  const labelClass =
    'font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-2 block'

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* Existing accent gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-light via-bg-secondary to-gradient-to" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/20 to-transparent" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header + primary CTA (book) */}
        <div className="text-center max-w-[560px] mx-auto reveal">
          <div className="w-12 h-1 bg-gradient-to-r from-accent to-transparent mx-auto mb-4 sm:mb-6" />

          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-medium mb-3 sm:mb-4 tracking-tight px-4">
            Ready to build?
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 leading-relaxed px-4">
            15 minutes. No pitch deck. Just a conversation about what you’re trying to solve.
          </p>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-mono text-sm font-medium text-white bg-gradient-to-r from-gradient-accent-from to-gradient-accent-to px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-0.5"
          >
            Book an intro
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>

        {/* OR divider */}
        <div className="max-w-[560px] mx-auto my-10 sm:my-12 flex items-center gap-4 reveal">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
            Or send a note
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="reveal max-w-[640px] mx-auto bg-card-bg/80 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 space-y-5 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label htmlFor="cf-name" className={labelClass}>
                Name
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="cf-email" className={labelClass}>
                Email
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="cf-phone" className={labelClass}>
              Phone{' '}
              <span className="text-text-secondary/60 normal-case tracking-normal font-sans">
                (optional)
              </span>
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 555-5555"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="cf-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={5}
              placeholder="What are you trying to build?"
              className={`${inputClass} resize-none leading-relaxed`}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <p className="font-mono text-[11px] text-text-secondary">
              Or email{' '}
              <a
                href={`mailto:${TO_EMAIL}`}
                className="text-accent hover:underline"
              >
                {TO_EMAIL}
              </a>
            </p>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center gap-2 font-mono text-sm font-medium text-white bg-gradient-to-r from-gradient-accent-from to-gradient-accent-to px-6 py-3 rounded-md hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed self-start sm:self-auto"
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
