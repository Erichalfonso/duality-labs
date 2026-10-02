import { NextResponse } from 'next/server'

const TO_EMAIL = 'ops@dualitylabs.ai'
// The sending domain must be verified in Resend.
const FROM_EMAIL = 'Duality Labs <apply@dualitylabs.ai>'

const FIELDS = [
  ['business', 'Business'],
  ['need', 'Wants help with'],
  ['teamSize', 'Team size'],
  ['timeline', 'Timeline'],
  ['problem', 'Problem'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['company', 'Company'],
  ['phone', 'Phone'],
] as const

const REQUIRED = ['business', 'need', 'teamSize', 'timeline', 'problem', 'name', 'email']

export async function POST(request: Request) {
  const data = await request.json().catch(() => null)
  if (!data || typeof data !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real visitors never see this field, bots fill it in.
  if (data.website) return NextResponse.json({ ok: true })

  const value = (key: string) => String(data[key] ?? '').trim().slice(0, 2000)
  if (REQUIRED.some((key) => !value(key)) || !/^\S+@\S+\.\S+$/.test(value('email'))) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const qualified = value('timeline') !== 'Just exploring'
  const text = [
    qualified ? 'Qualified: shown the booking calendar.' : 'Not yet qualified: shown the thank-you screen.',
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
      subject: `${qualified ? 'New application' : 'New inquiry (exploring)'}: ${value('name')}${value('company') ? `, ${value('company')}` : ''}`,
      text,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return NextResponse.json({ error: 'Could not send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, qualified })
}
