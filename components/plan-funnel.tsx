'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AI_USE, FIRM_TYPES, HEADCOUNTS, HOURS, MAX_TASKS, TASKS, TOOLS, UTM_KEYS, followUp, type Answers, type PlanDoc } from '@/lib/plan'
import PlanDocument from '@/components/plan-document'

declare global {
  interface Window {
    lintrk?: (action: string, data: { conversion_id: number }) => void
    gtag?: (command: 'event', name: string, params?: Record<string, string | number>) => void
  }
}

// Conversion IDs come from LinkedIn Campaign Manager. Until they are set, nothing fires.
const CONVERSIONS = {
  start: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_QUIZ_START,
  lead: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_LEAD,
  call: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_CALL,
}

const track = (event: keyof typeof CONVERSIONS) => {
  const id = Number(CONVERSIONS[event])
  if (id) window.lintrk?.('track', { conversion_id: id })
}

// Behaviour events for Google Analytics. Only the screen name and seconds are sent, never names, contact details or answers.
const analytics = (name: string, params?: Record<string, string | number>) => window.gtag?.('event', name, params)

const SAMPLE_STEPS = ['Matches every bank line', 'Flags what needs you', 'Chases missing receipts', 'Runs the month-end checklist']

// Facts about the quiz itself. No customer numbers until we have real ones.
const PROOF_POINTS = ['7 short questions. About 60 seconds.', 'Built from your answers and the tools you use.', 'Made for accounting and bookkeeping firms.']

// Shown while the plan is written, so the wait reads as work being done for them.
const BUILDING_STEPS = ['Reading your answers', 'Matching your tools', 'Mapping your helper', 'Laying out your roadmap']

const QUESTION_COUNT = 7
const GATE = QUESTION_COUNT + 1
const RESULT = GATE + 1
const PHONE = RESULT + 1

const SCREENS: Record<number, string> = {
  0: '01_name', [GATE]: '02_email', [PHONE]: '03_phone', 1: '04_firm_type', 2: '05_headcount', 3: '06_tasks',
  4: '07_follow_up', 5: '08_tools', 6: '09_ai_use', 7: '10_hours', [RESULT]: '11_roadmap',
}

const inputClass =
  'w-full bg-[#F0F5FF] border-2 border-[#0A0A0A]/60 rounded-lg px-4 py-4 text-lg font-medium text-[#0A0A0A] placeholder:text-[#8A94A6] placeholder:uppercase placeholder:tracking-wide focus:outline-none focus:border-[#0066FF] transition-colors'
const primaryClass =
  'w-full text-xl font-extrabold uppercase tracking-wide text-white bg-[#0066FF] px-6 py-5 rounded-full shadow-lg shadow-[#0066FF]/30 hover:bg-[#0052CC] transition-colors disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed'
const choiceClass = (selected: boolean) =>
  `w-full text-center text-lg font-semibold px-5 py-4 rounded-xl border-2 transition-colors ${
    selected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'bg-[#F0F5FF] border-[#0A0A0A]/15 text-[#0A0A0A] hover:border-[#0066FF]'
  }`
const backClass = 'font-mono text-sm text-[#525252] hover:text-[#0A0A0A] py-2 pr-4'

export default function PlanFunnel() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    firstName: '',
    lastName: '',
    firmType: '',
    firmTypeOther: '',
    headcount: '',
    tasks: [],
    followUp: '',
    tools: [],
    hours: '',
    aiUse: '',
  })
  const [utm, setUtm] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [doc, setDoc] = useState<PlanDoc | null>(null)
  const [link, setLink] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [fax, setFax] = useState('')
  const [phone, setPhone] = useState('')
  const [alerted, setAlerted] = useState('')
  const [building, setBuilding] = useState(0)

  useEffect(() => {
    if (!sending) return setBuilding(0)
    const timer = setInterval(() => setBuilding((current) => Math.min(current + 1, BUILDING_STEPS.length - 1)), 2500)
    return () => clearInterval(timer)
  }, [sending])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setUtm(Object.fromEntries(UTM_KEYS.filter((key) => params.get(key)).map((key) => [key, params.get(key) as string])))
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  // Time on each screen, and where people leave. The timer pauses while the tab is hidden.
  const shownAt = useRef(Date.now())
  const screen = SCREENS[step]
  useEffect(() => {
    shownAt.current = Date.now()
    analytics('quiz_screen_view', { screen })
    return () => analytics('quiz_screen_time', { screen, seconds: Math.round((Date.now() - shownAt.current) / 1000) })
  }, [screen])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        window.gtag?.('event', 'quiz_exit', { screen, seconds: Math.round((Date.now() - shownAt.current) / 1000), transport_type: 'beacon' })
      } else {
        shownAt.current = Date.now()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [screen])

  const set = (patch: Partial<Answers>) => setAnswers((current) => ({ ...current, ...patch }))
  const next = () => setStep((current) => current + 1)
  const choose = (patch: Partial<Answers>) => {
    set(patch)
    next()
  }

  const toggleTask = (task: string) => {
    const tasks = answers.tasks.includes(task) ? answers.tasks.filter((t) => t !== task) : [...answers.tasks, task].slice(0, MAX_TASKS)
    // The follow-up question belongs to the first task, so a new first task needs a new answer.
    set({ tasks, followUp: tasks[0] === answers.tasks[0] ? answers.followUp : '' })
  }

  const toggleTool = (tool: string) =>
    setAnswers((current) => ({
      ...current,
      tools: current.tools.includes(tool) ? current.tools.filter((t) => t !== tool) : [...current.tools, tool],
    }))

  const start = (e: React.FormEvent) => {
    e.preventDefault()
    track('start')
    setStep(GATE)
  }

  // Contact details come before the questions, so a lead is captured even if they stop partway.
  const saveEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setEmail(form.email)
    setFax(form.fax ?? '')
    setStep(PHONE)
  }

  const savePhone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const number = String(new FormData(e.currentTarget).get('phone') ?? '')
    setPhone(number)
    setStep(1)
    // Going back and continuing again should not alert ops twice for the same person.
    const key = `${email}|${number}`
    if (key === alerted) return
    setAlerted(key)
    fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: 'start', firstName: answers.firstName, lastName: answers.lastName, email, phone: number, fax, utm }),
    }).catch(() => {})
    track('lead')
  }

  const finish = async (hours: string) => {
    set({ hours })
    setError('')
    setSending(true)

    const res = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...answers, hours, email, phone, fax, utm }),
    }).catch(() => null)
    const result = res?.ok ? await res.json() : null

    setSending(false)
    if (!result?.doc) {
      setError('Something went wrong making your plan. Tap your answer again to retry, or email ops@dualitylabs.ai.')
      return
    }
    setDoc(result.doc)
    setLink(result.link)
    setStep(RESULT)
  }

  const follow = followUp(answers.tasks)

  // Shown on both the name and email screens, so asking for the email still feels like the landing page.
  const hero = (
    <>
            <h1 className="text-[34px] sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-3">
              Get your free personalized AI plan in <span className="bg-[#FFD60A] px-1.5 rounded">60 seconds.</span>
            </h1>
            <p className="text-lg text-[#525252] mb-7">Made just for your firm.</p>

            {/* A fanned stack of pages, so the plan reads as a real document they will get. */}
            <div className="relative mx-auto mb-9 h-[236px] max-w-[340px]" aria-label="Sample plan">
              <div className="absolute inset-y-6 left-0 w-[58%] -rotate-6 rounded-lg border border-[#0A0A0A]/15 bg-white shadow-md" />
              <div className="absolute inset-y-6 right-0 w-[58%] rotate-6 rounded-lg border border-[#0A0A0A]/15 bg-white shadow-md" />
              <div className="absolute inset-y-0 left-1/2 w-[78%] -translate-x-1/2 overflow-hidden rounded-lg border border-[#0A0A0A]/20 bg-white text-left shadow-xl">
                <div className="flex items-center justify-between bg-[#0A0A0A] px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-white">
                  <span>Your AI plan</span>
                  <span className="rounded bg-[#FFD60A] px-1.5 text-[#0A0A0A]">Sample</span>
                </div>
                <ul>
                  {SAMPLE_STEPS.map((sample, i) => (
                    <li key={sample} className="flex items-center gap-2 border-b border-[#E5E5E5] px-3 py-2 text-[13px] font-medium">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0066FF] font-mono text-[11px] text-white">{i + 1}</span>
                      <span className="flex-1">{sample}</span>
                      <span className="text-[#22C55E]">✓</span>
                    </li>
                  ))}
                </ul>
                <div className="px-3 py-2.5 text-[13px] font-extrabold text-[#0066FF]">
                  ~20 hrs a week saved <span className="font-medium text-[#737373]">in this sample</span>
                </div>
              </div>
            </div>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      <header className="bg-[#0A0A0A] print:hidden">
        <div className="max-w-[640px] mx-auto px-4 py-4 flex justify-center">
          <img src="/logo/logo-horizontal-light.svg" alt="Duality Labs" width={160} height={30} />
        </div>
      </header>

      <main className={`flex-1 w-full ${step === RESULT ? 'max-w-[720px]' : 'max-w-[640px]'} mx-auto px-4 py-8 sm:py-12`}>
        {step === 0 && (
          <div className="text-center">
            {hero}

            <form onSubmit={start} className="space-y-3">
              <h2 className="text-2xl mb-4">What&apos;s your <span className="font-extrabold">name?</span></h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={answers.firstName} onChange={(e) => set({ firstName: e.target.value })} required autoComplete="given-name" aria-label="First name" placeholder="First name" className={inputClass} />
              <input value={answers.lastName} onChange={(e) => set({ lastName: e.target.value })} required autoComplete="family-name" aria-label="Last name" placeholder="Last name" className={inputClass} />
              </div>
              <div className="pt-4 sm:mx-auto sm:max-w-[420px]">
                <button type="submit" className={primaryClass}>Let&apos;s start</button>
              </div>
            </form>

            <ul className="mt-10 space-y-4 text-left">
              {PROOF_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-lg font-bold leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-sm text-white">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {step >= 1 && step <= QUESTION_COUNT && !sending && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={() => setStep(step === 1 ? PHONE : step - 1)} className={backClass}>← Back</button>
              <span className="font-mono text-sm text-[#525252]">Question {step} of {QUESTION_COUNT}</span>
            </div>
            <div className="h-2 rounded-full bg-[#E5E5E5] mb-8" role="progressbar" aria-valuemin={1} aria-valuemax={QUESTION_COUNT} aria-valuenow={step}>
              <div className="h-full rounded-full bg-[#0066FF] transition-all" style={{ width: `${(step / QUESTION_COUNT) * 100}%` }} />
            </div>

            {step === 1 && (
              <Question title="What kind of firm do you run?">
                {FIRM_TYPES.map((type) => (
                  <button key={type} type="button" className={choiceClass(answers.firmType === type)} onClick={() => (type === 'Other' ? set({ firmType: type }) : choose({ firmType: type, firmTypeOther: '' }))}>
                    {type}
                  </button>
                ))}
                {answers.firmType === 'Other' && (
                  <>
                    <input autoFocus value={answers.firmTypeOther} onChange={(e) => set({ firmTypeOther: e.target.value })} aria-label="Your firm type" placeholder="Tell us what kind" className={inputClass} />
                    <button type="button" className={primaryClass} disabled={!answers.firmTypeOther.trim()} onClick={next}>Next</button>
                  </>
                )}
              </Question>
            )}

            {step === 2 && (
              <Question title="How many people work at your firm?">
                {HEADCOUNTS.map((count) => (
                  <button key={count} type="button" className={choiceClass(answers.headcount === count)} onClick={() => choose({ headcount: count })}>
                    {count}
                  </button>
                ))}
              </Question>
            )}

            {step === 3 && (
              <Question title="What takes most of your week?" hint={`Pick up to ${MAX_TASKS}.`}>
                {TASKS.map((task) => (
                  <button key={task} type="button" aria-pressed={answers.tasks.includes(task)} className={choiceClass(answers.tasks.includes(task))} onClick={() => toggleTask(task)}>
                    {task}
                  </button>
                ))}
                <button type="button" className={primaryClass} disabled={!answers.tasks.length} onClick={next}>Next</button>
              </Question>
            )}

            {step === 4 && (
              <Question title={follow.question}>
                {follow.options ? (
                  follow.options.map((option) => (
                    <button key={option} type="button" className={choiceClass(answers.followUp === option)} onClick={() => choose({ followUp: option })}>
                      {option}
                    </button>
                  ))
                ) : (
                  <>
                    <input autoFocus value={answers.followUp} onChange={(e) => set({ followUp: e.target.value })} aria-label={follow.question} placeholder="Type your answer" className={inputClass} />
                    <button type="button" className={primaryClass} disabled={!answers.followUp.trim()} onClick={next}>Next</button>
                  </>
                )}
              </Question>
            )}

            {step === 5 && (
              <Question title="What tools do you use?" hint="Pick all that apply.">
                <div className="grid grid-cols-2 gap-3">
                  {TOOLS.map((tool) => (
                    <button key={tool} type="button" aria-pressed={answers.tools.includes(tool)} className={choiceClass(answers.tools.includes(tool))} onClick={() => toggleTool(tool)}>
                      {tool}
                    </button>
                  ))}
                </div>
                <button type="button" className={primaryClass} disabled={!answers.tools.length} onClick={next}>Next</button>
              </Question>
            )}

            {step === 6 && (
              <Question title="How much does AI help your firm today?">
                {AI_USE.map((use) => (
                  <button key={use} type="button" className={choiceClass(answers.aiUse === use)} onClick={() => choose({ aiUse: use })}>
                    {use}
                  </button>
                ))}
              </Question>
            )}

            {step === 7 && (
              <Question title={`How many hours a week go to ${answers.tasks[0] === 'Other' ? 'this task' : answers.tasks[0]?.toLowerCase()}?`}>
                {HOURS.map((hours) => (
                  <button key={hours} type="button" className={choiceClass(answers.hours === hours)} onClick={() => finish(hours)}>
                    {hours}
                  </button>
                ))}
                {error && <p className="text-sm text-red-600">{error}</p>}
              </Question>
            )}
          </div>
        )}

        {sending && (
          <div className="py-10 text-center" role="status" aria-live="polite">
            <div className="mx-auto mb-8 h-14 w-14 animate-spin rounded-full border-4 border-[#E5E5E5] border-t-[#0066FF]" aria-hidden />
            <h1 className="text-[30px] font-extrabold tracking-tight leading-tight mb-8">Building your plan, {answers.firstName}…</h1>
            <ul className="mx-auto max-w-[300px] space-y-4 text-left">
              {BUILDING_STEPS.map((label, i) => (
                <li key={label} className={`flex items-center gap-3 text-lg font-bold transition-opacity ${i <= building ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm text-white ${i < building ? 'bg-[#22C55E]' : 'bg-[#0066FF]'}`}>{i < building ? '✓' : i + 1}</span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === GATE && (
          <div className="text-center">
            {hero}
            <form onSubmit={saveEmail} className="space-y-3">
              <h2 className="text-2xl mb-4">Where should we <span className="font-extrabold">send your plan?</span></h2>
              <input name="email" type="email" required autoFocus defaultValue={email} autoComplete="email" aria-label="Work email" placeholder="Work email" className={inputClass} />
              {/* Honeypot, hidden from people */}
              <input name="fax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <div className="pt-4 sm:mx-auto sm:max-w-[420px]">
                <button type="submit" className={primaryClass}>Continue</button>
              </div>
              <p className="text-sm text-[#737373] pt-1">
                No spam. <Link href="/privacy" className="underline hover:text-[#0A0A0A]">Privacy Policy</Link>
              </p>
            </form>
            <button type="button" onClick={() => setStep(0)} className={`${backClass} mt-6`}>← Back</button>
          </div>
        )}

        {step === PHONE && (
          <div className="text-center">
            {hero}
            <form onSubmit={savePhone} className="space-y-3">
              <h2 className="text-2xl mb-4">What is your <span className="font-extrabold">phone number?</span></h2>
              <input
                name="phone"
                type="tel"
                required
                autoFocus
                defaultValue={phone}
                autoComplete="tel"
                aria-label="Phone number"
                placeholder="Phone number"
                pattern="[^0-9]*([0-9][^0-9]*){10,}"
                title="Please enter a phone number with area code"
                className={inputClass}
              />
              <div className="pt-4 sm:mx-auto sm:max-w-[420px]">
                <button type="submit" className={primaryClass}>Continue</button>
              </div>
              <p className="text-xs leading-relaxed text-[#737373] pt-1 text-left sm:text-center">
                By continuing, you agree that Duality Labs may contact you by phone, text or email about your plan, including by automated means. Message and data rates may apply. Reply STOP to opt out of texts. We never sell your information. <Link href="/privacy" className="underline hover:text-[#0A0A0A]">Privacy Policy</Link>
              </p>
            </form>
            <button type="button" onClick={() => setStep(GATE)} className={`${backClass} mt-6`}>← Back</button>
          </div>
        )}

        {step === RESULT && doc && (
          <div>
            <p className="text-center text-sm text-[#737373] mb-4 print:hidden">We also sent it to {email}.</p>
            <PlanDocument doc={doc} link={link} onCall={() => { track('call'); analytics('roadmap_book_call') }} />
          </div>
        )}
      </main>

      {step !== RESULT && (
        <footer className="py-6 text-center font-mono text-xs text-[#737373]">
          © 2026 Duality Labs · <Link href="/privacy" className="hover:text-[#0A0A0A]">Privacy Policy</Link>
        </footer>
      )}
    </div>
  )
}

function Question({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h1 className="text-[28px] sm:text-4xl font-extrabold tracking-tight leading-[1.15] mb-2">{title}</h1>
      <p className="text-[#525252] mb-6 min-h-[24px]">{hint}</p>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
