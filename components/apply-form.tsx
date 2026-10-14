'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const CALENDLY_URL = 'https://calendly.com/dualitylabs/new-meeting'

type Answers = Record<string, string>
type Stage = 'form' | 'sending' | 'booking' | 'thanks'
type Outcome = 'qualified' | 'review' | 'unqualified'

const inputClass =
  'w-full bg-card-bg border border-border rounded-md px-4 py-3 text-[15px] text-text placeholder:text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors'


export default function ApplyForm() {
  const [answers, setAnswers] = useState<Answers>({})
  const [stage, setStage] = useState<Stage>('form')
  const [outcome, setOutcome] = useState<Outcome>('qualified')
  const [error, setError] = useState('')
  const [started, setStarted] = useState(false)

  // Fires once so Meta shows how many visitors begin the form versus finish it.
  const onStart = () => {
    if (started) return
    setStarted(true)
    window.fbq?.('trackCustom', 'ApplyStart')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const payload = Object.fromEntries(new FormData(e.currentTarget)) as Answers
    setAnswers(payload)
    setStage('sending')

    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null)

    if (!res?.ok) {
      setError('Something went wrong sending your answers. Please try again, or email ops@dualitylabs.ai.')
      setStage('form')
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
        <h2 className="text-2xl sm:text-[28px] font-medium tracking-tight mb-3">Thanks.</h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[480px] mx-auto">
          {outcome === 'review'
            ? <>We review every application by hand. If it&apos;s a fit, we&apos;ll email you at <span className="text-text">{answers.email}</span> with next steps and how pricing works for paid AI agents.</>
            : <>We read every submission. We&apos;ll email you at <span className="text-text">{answers.email}</span> if your project is a fit for a free build.</>}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} onFocus={onStart} className="space-y-3">
      <input name="email" type="email" required autoComplete="email" aria-label="Email" placeholder="Email" className={`${inputClass} text-center rounded-full py-4`} />

      {/* Honeypot, hidden from people */}
      <input name="fax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <button
        type="submit"
        disabled={stage === 'sending'}
        className="w-full font-mono text-sm font-medium text-white bg-gradient-to-r from-gradient-accent-from to-gradient-accent-to px-6 py-4 rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {stage === 'sending' ? 'Sending…' : 'Get my free AI agent'}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}

function Booking({ answers }: { answers: Answers }) {
    const url = `${CALENDLY_URL}?hide_gdpr_banner=1&email=${encodeURIComponent(answers.email)}`

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
