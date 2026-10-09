import { NextResponse } from 'next/server'

const TO_EMAIL = 'ops@dualitylabs.ai'
// The sending domain must be verified in Resend.
const FROM_EMAIL = 'Duality Labs <apply@dualitylabs.ai>'

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

const REQUIRED = ['business', 'software', 'approval', 'budget', 'timeline', 'task', 'hours', 'name', 'email', 'company']

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
  if (REQUIRED.some((key) => !value(key)) || !/^\S+@\S+\.\S+$/.test(value('email'))) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const outcome = route(value('budget'), value('approval'), value('timeline'))
  const text = [
    SUMMARIES[outcome],
    '',
    ...FIELDS.map(([key, label]) => `${label}: ${value(key) || '—'}`),
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
      subject: `${SUBJECTS[outcome]}: ${value('name')}, ${value('company')}`,
      text,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return NextResponse.json({ error: 'Could not send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, outcome, qualified: outcome === 'qualified' })
}
