import { NextResponse } from 'next/server'

const TO_EMAIL = 'ops@dualitylabs.ai'
// The sending domain must be verified in Resend.
const FROM_EMAIL = 'Duality Labs <apply@dualitylabs.ai>'

// Sent to applicants who don't book a call on the page. Replies go to the team inbox.
const CONFIRMATION_DELAY_MS = 30 * 60 * 1000
const CONFIRMATION_FROM = 'Erich from Duality Labs <ops@dualitylabs.ai>'
const CONFIRMATION_TEXT = `Hi,

Thanks for applying for a free AI agent with Duality Labs!

I'd love to learn more about your business and what tasks you're looking to automate.

Feel free to book a quick call at a time that works best for you:

https://calendly.com/dualitylabs/businessaudit

Best,
Erich
Duality Labs`

const FIELDS = [
  ['business', 'Business'],
  ['clients', 'Clients'],
  ['software', 'Software'],
  ['approval', 'Approval role'],
  ['budget', 'Paid AI agents after free agent'],
  ['timeline', 'Timeline'],
  ['task', 'Repeated task'],
  ['hours', 'Hours per month'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['company', 'Company'],
  ['site', 'Website'],
  ['phone', 'Phone'],
] as const

const REQUIRED = ['email', 'phone']

type Outcome = 'qualified' | 'review' | 'unqualified'

function route(budget: string, approval: string, timeline: string): Outcome {
  if (budget.startsWith('No') || approval === 'No' || timeline === 'Just exploring') return 'unqualified'
  if (budget.startsWith('Possibly')) return 'review'
  return 'qualified'
}

const SUBJECTS: Record<Outcome, string> = {
  qualified: 'New application',
  review: 'Review: needs to see results',
  unqualified: 'Not qualified',
}

const SUMMARIES: Record<Outcome, string> = {
  qualified: 'Qualified: shown the booking calendar.',
  review: 'Needs review: wants to see results and pricing first. Shown the thank-you screen.',
  unqualified: 'Not qualified: shown the thank-you screen.',
}

export async function POST(request: Request) {
  const data = await request.json().catch(() => null)
  if (!data || typeof data !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real visitors never see this field, bots fill it in.
  if (data.fax) return NextResponse.json({ ok: true })

  const value = (key: string) => String(data[key] ?? '').trim().slice(0, 2000)
  if (REQUIRED.some((key) => !value(key)) || !/^\S+@\S+\.\S+$/.test(value('email')) || value('phone').replace(/\D/g, '').length < 10) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const outcome = route(value('budget'), value('approval'), value('timeline'))
  const text = [
    SUMMARIES[outcome],
    '',
    // Only fields this applicant actually filled in; the form has changed over time.
    ...FIELDS.filter(([key]) => value(key)).map(([key, label]) => `${label}: ${value(key)}`),
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: value('email'),
      subject: `${SUBJECTS[outcome]}: ${value('email')} · ${value('phone')}`,
      text,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return NextResponse.json({ error: 'Could not send' }, { status: 502 })
  }

  // Scheduled, not sent: if they book on the page, /api/apply/booked cancels it, so only
  // people who leave without booking get the nudge. A failure is logged, since the
  // application itself already reached us.
  const confirmation = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONFIRMATION_FROM,
      to: value('email'),
      reply_to: TO_EMAIL,
      subject: 'Thanks for applying for a free AI agent',
      text: CONFIRMATION_TEXT,
      scheduled_at: new Date(Date.now() + CONFIRMATION_DELAY_MS).toISOString(),
    }),
  }).catch(() => null)
  if (!confirmation?.ok) console.error('Confirmation email failed', confirmation?.status)
  const confirmationId = confirmation?.ok ? (await confirmation.json()).id : null

  return NextResponse.json({ ok: true, outcome, qualified: outcome === 'qualified', confirmationId })
}
