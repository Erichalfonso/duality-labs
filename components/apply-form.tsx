'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const CALENDLY_URL = 'https://calendly.com/dualitylabs/new-meeting'

const QUESTIONS = [
  {
    key: 'business',
    label: 'What best describes your business?',
    options: ['Bookkeeping or accounting firm', 'Real estate', 'Healthcare or medical transport', 'E-commerce or retail', 'Professional services', 'Other'],
  },
  {
    key: 'need',
    label: 'What do you want help with?',
    options: ['An AI agent or automation', 'Custom software or an internal tool', 'Data, reporting, or integrations', 'Not sure yet'],
  },
  {
    key: 'teamSize',
    label: 'How big is your team?',
    options: ['Just me', '2–10', '11–50', '50+'],
  },
  {
    key: 'timeline',
    label: 'When would you like to start?',
    options: ['This month', 'Next 1–3 months', 'Just exploring'],
  },
] as const

type Answers = Record<string, string>
type Stage = 'questions' | 'details' | 'sending' | 'booking' | 'thanks'

const inputClass =
  'w-full bg-card-bg border border-border rounded-md px-4 py-3 text-[15px] text-text placeholder:text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors'

const labelClass = 'font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-2 block'

export default function ApplyForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [stage, setStage] = useState<Stage>('questions')
  const [error, setError] = useState('')

  const choose = (key: string, option: string) => {
    setAnswers((a) => ({ ...a, [key]: option }))
    if (step < QUESTIONS.length - 1) setStep(step + 1)
    else setStage('details')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Answers
    const payload = { ...answers, ...form }
    setAnswers(payload)
    setStage('sending')

    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null)

    if (!res?.ok) {
      setError('Something went wrong sending your answers. Please try again, or email ops@dualitylabs.ai.')
      setStage('details')
      return
    }

    const { qualified } = await res.json()
    window.fbq?.('track', 'Lead', { content_name: 'Apply form', qualified: qualified ? 'yes' : 'no' })
    setStage(qualified ? 'booking' : 'thanks')
  }

  if (stage === 'booking') return <Booking answers={answers} />

  if (stage === 'thanks') {
    return (
      <div className="bg-card-bg/80 border border-border rounded-2xl p-6 sm:p-10 text-center">
        <h2 className="text-2xl sm:text-[28px] font-medium tracking-tight mb-3">Thanks, {answers.name?.split(' ')[0]}.</h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[480px] mx-auto">
          We read every submission. We&apos;ll email you at <span className="text-text">{answers.email}</span> with some thoughts on your project, and when you&apos;re ready to start, we&apos;ll set up a call.
        </p>
      </div>
    )
  }

  if (stage === 'questions') {
    const q = QUESTIONS[step]
    return (
      <div className="bg-card-bg/80 border border-border rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
            Question {step + 1} of {QUESTIONS.length + 1}
          </span>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-text">
              ← Back
            </button>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-medium tracking-tight mb-6">{q.label}</h2>
        <div className="grid gap-3">
          {q.options.map((option) => (
            <button
              key={option}
              onClick={() => choose(q.key, option)}
              className={`text-left px-5 py-4 rounded-lg border text-[15px] transition-colors hover:border-accent hover:bg-accent-light ${
                answers[q.key] === option ? 'border-accent bg-accent-light' : 'border-border bg-bg'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card-bg/80 border border-border rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
          Question {QUESTIONS.length + 1} of {QUESTIONS.length + 1}
        </span>
        <button
          type="button"
          onClick={() => { setStage('questions'); setStep(QUESTIONS.length - 1) }}
          className="font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-text"
        >
          ← Back
        </button>
      </div>

      <div>
        <label htmlFor="ap-problem" className={labelClass}>What&apos;s the problem you want solved?</label>
        <textarea
          id="ap-problem"
          name="problem"
          required
          rows={4}
          defaultValue={answers.problem}
          placeholder="e.g. We spend two days every month-end reconciling client bank feeds by hand."
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="ap-name" className={labelClass}>Name</label>
          <input id="ap-name" name="name" required autoComplete="name" defaultValue={answers.name} placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-email" className={labelClass}>Work email</label>
          <input id="ap-email" name="email" type="email" required autoComplete="email" defaultValue={answers.email} placeholder="you@company.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-company" className={labelClass}>Company <span className="normal-case tracking-normal font-sans text-text-secondary/60">(optional)</span></label>
          <input id="ap-company" name="company" autoComplete="organization" defaultValue={answers.company} className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-phone" className={labelClass}>Phone <span className="normal-case tracking-normal font-sans text-text-secondary/60">(optional)</span></label>
          <input id="ap-phone" name="phone" type="tel" autoComplete="tel" defaultValue={answers.phone} className={inputClass} />
        </div>
      </div>

      {/* Honeypot, hidden from people */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={stage === 'sending'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-sm font-medium text-white bg-gradient-to-r from-gradient-accent-from to-gradient-accent-to px-6 py-3 rounded-md hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {stage === 'sending' ? 'Sending…' : 'Continue'}
      </button>
    </form>
  )
}

function Booking({ answers }: { answers: Answers }) {
  // Answers ride along to Calendly (a1 = the event's first invitee question) so they show up on the booking.
  const summary = [answers.business, answers.need, `Team: ${answers.teamSize}`, `Start: ${answers.timeline}`, answers.problem].join(' | ')
  const url = `${CALENDLY_URL}?hide_gdpr_banner=1&name=${encodeURIComponent(answers.name)}&email=${encodeURIComponent(answers.email)}&a1=${encodeURIComponent(summary)}`

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    const onMessage = (e: MessageEvent) => {
      if (e.origin === 'https://calendly.com' && e.data?.event === 'calendly.event_scheduled') {
        window.fbq?.('track', 'Schedule')
      }
    }
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
      script.remove()
    }
  }, [])

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-[28px] font-medium tracking-tight mb-2">Thanks. Now pick a time.</h2>
        <p className="text-sm sm:text-base text-text-secondary">You&apos;ll get a Google Meet link by email.</p>
      </div>
      <div className="calendly-inline-widget rounded-2xl overflow-hidden border border-border" data-url={url} style={{ minWidth: 320, height: 700 }} />
    </div>
  )
}
