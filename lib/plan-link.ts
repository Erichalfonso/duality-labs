import { createHmac, timingSafeEqual } from 'crypto'
import { deflateRawSync, inflateRawSync } from 'zlib'
import type { PlanDoc } from '@/lib/plan'

// Server only: the plan travels inside the link, signed so nobody can edit what it says.
const sign = (body: string, secret: string) => createHmac('sha256', secret).update(body).digest('base64url').slice(0, 22)

export function encodePlan(doc: PlanDoc): string | null {
  const secret = process.env.PLAN_LINK_SECRET
  if (!secret) return null
  const body = deflateRawSync(JSON.stringify(doc)).toString('base64url')
  return `${body}.${sign(body, secret)}`
}

export function decodePlan(token: string): PlanDoc | null {
  const secret = process.env.PLAN_LINK_SECRET
  const [body, sig] = token.split('.')
  if (!secret || !body || !sig) return null
  const expected = sign(body, secret)
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  try {
    return JSON.parse(inflateRawSync(Buffer.from(body, 'base64url')).toString())
  } catch {
    return null
  }
}
