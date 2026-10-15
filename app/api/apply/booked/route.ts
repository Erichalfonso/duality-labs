import { NextResponse } from 'next/server'

// Called by /apply when the visitor books on the embedded calendar: cancels their
// scheduled "book a call" email, since they already did.
export async function POST(request: Request) {
  const { id } = (await request.json().catch(() => ({}))) as { id?: string }
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const res = await fetch(`https://api.resend.com/emails/${id}/cancel`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
  })
  if (!res.ok) console.error('Cancel confirmation failed', res.status, await res.text())

  return NextResponse.json({ ok: res.ok })
}
