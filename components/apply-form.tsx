'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const CALENDLY_URL = 'https://calendly.com/dualitylabs/new-meeting'

type Answers = Record<string, string>
type Stage = 'questions' | 'details' | 'sending' | 'booking' | 'thanks'
type Outcome = 'qualified' | 'review' | 'unqualified'

const FIRMS = ['Bookkeeping or accounting firm', 'CPA firm']

const QUESTIONS: { key: string; label: string; options: string[]; when?: (a: Answers) => boolean }[] = [
  {
    key: 'business',
    label: 'What best describes your business?',
    options: [...FIRMS, 'In-house finance team', 'Real estate', 'Healthcare', 'E-commerce', 'Professional services', 'Other'],
  },
  {
    key: 'clients',
    label: 'How many clients do you serve?',
    options: ['Under 10', '10–50', '50–150', '150+'],
    when: (a) => FIRMS.includes(a.business),
  },
  {
    key: 'software',
    label: 'What accounting software do you use?',
    options: ['QuickBooks', 'Xero', 'Sage or NetSuite', 'Other'],
  },
  {
    key: 'approval',
    label: 'Would you be involved in approving additional AI agents?',
    options: ['Yes, I make the call', "Yes, I'd decide with others", "I'd bring in the decision-maker", 'No'],
  },
  {
    key: 'budget',
    label: 'The first AI agent is free. If it delivers useful results, would you consider paid AI agents for other tasks?',
    options: [
      'Yes, potentially $2,000–$10,000 over the next six months',
      'Yes, potentially more than $10,000',
      "Possibly, I'd need to see the results and pricing",
      "No, I'm only interested in the free agent",
    ],
  },
  {
    key: 'timeline',
    label: 'When would you want to start?',
    options: ['This month', '1–3 months', 'Just exploring'],
  },
]

const HOURS = ['Under 5', '5–20', '20–50', '50+']

const inputClass =
  'w-full bg-card-bg border border-border rounded-md px-4 py-3 text-[15px] text-text placeholder:text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors'

const labelClass = 'font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-2 block'

export default function ApplyForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [stage, setStage] = useState<Stage>('questions')
  const [outcome, setOutcome] = useState<Outcome>('qualified')
  const [error, setError] = useState('')

  const visible = QUESTIONS.filter((q) => !q.when || q.when(answers))

  const choose = (key: string, option: string) => {
    const next = { ...answers, [key]: option }
    setAnswers(next)
    // Recount after this answer, since it can show or hide the next question.
    const nextVisible = QUESTIONS.filter((q) => !q.when || q.when(next))
    if (step < nextVisible.length - 1) setStep(step + 1)
    else setStage('details')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Answers
    const payload = { ...answers, ...form }
    if (!FIRMS.includes(payload.business)) delete payload.clients
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

    const result = await res.json()
    window.fbq?.('track', 'Lead', { content_name: 'Apply form', qualified: result.outcome })
    setOutcome(result.outcome)
    setStage(result.outcome === 'qualified' ? 'booking' : 'thanks')
  }

  if (stage === 'booking') return <Booking answers={answers} />

  if (stage === 'thanks') {
    return (
      <div className="bg-card-bg/80 border border-border rounded-2xl p-6 sm:p-10 text-center">
        <h2 className="text-2xl sm:text-[28px] font-medium tracking-tight mb-3">Thanks, {answers.name?.split(' ')[0]}.</h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[480px] mx-auto">
          {outcome === 'review'
            ? <>We review every application by hand. If it&apos;s a fit, we&apos;ll email you at <span className="text-text">{answers.email}</span> with next steps and how pricing works for paid AI agents.</>
            : <>We read every submission. We&apos;ll email you at <span className="text-text">{answers.email}</span> if your project is a fit for a free build.</>}
        </p>
      </div>
    )
  }

  if (stage === 'questions') {
    const q = visible[step]
    return (
      <div className="bg-card-bg/80 border border-border rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
            Question {step + 1} of {visible.length + 1}
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
          Question {visible.length + 1} of {visible.length + 1}
        </span>
        <button
          type="button"
          onClick={() => { setStage('questions'); setStep(visible.length - 1) }}
          className="font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-text"
        >
          ← Back
        </button>
      </div>

      <div>
        <label htmlFor="ap-task" className={labelClass}>What&apos;s one task your team repeats every week or month?</label>
        <textarea
          id="ap-task"
          name="task"
          required
          rows={3}
          defaultValue={answers.task}
          placeholder="e.g. Chasing clients for missing receipts before month-end."
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>

      <div>
        <label htmlFor="ap-hours" className={labelClass}>About how many hours a month does it take?</label>
        <select id="ap-hours" name="hours" required defaultValue={answers.hours ?? ''} className={inputClass}>
          <option value="" disabled>Choose one</option>
          {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
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
          <label htmlFor="ap-company" className={labelClass}>Company</label>
          <input id="ap-company" name="company" required autoComplete="organization" defaultValue={answers.company} className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-site" className={labelClass}>Website <span className="normal-case tracking-normal font-sans text-text-secondary/60">(optional)</span></label>
          <input id="ap-site" name="site" autoComplete="url" defaultValue={answers.site} placeholder="yourfirm.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-phone" className={labelClass}>Phone <span className="normal-case tracking-normal font-sans text-text-secondary/60">(optional)</span></label>
          <input id="ap-phone" name="phone" type="tel" autoComplete="tel" defaultValue={answers.phone} className={inputClass} />
        </div>
      </div>

      {/* Honeypot, hidden from people */}
      <input name="fax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

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
  const summary = [answers.business, answers.clients && `Clients: ${answers.clients}`, answers.software, `Budget: ${answers.budget}`, `Start: ${answers.timeline}`, `${answers.task} (${answers.hours} hrs/mo)`].filter(Boolean).join(' | ')
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
