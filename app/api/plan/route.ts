import { NextResponse } from 'next/server'
import { AI_USE, CALENDLY_URL, FIRM_TYPES, HEADCOUNTS, HOURS, MAX_TASKS, TASKS, TOOLS, UTM_KEYS, followUp, planDoc, type Answers, type PlanDoc } from '@/lib/plan'
import { buildRoadmap, type Roadmap } from '@/lib/roadmap'
import { encodePlan } from '@/lib/plan-link'

const TO_EMAIL = 'ops@dualitylabs.ai'
// The sending domain must be verified in Resend.
const FROM_EMAIL = 'Duality Labs <apply@dualitylabs.ai>'
const PLAN_FROM = 'Erich from Duality Labs <ops@dualitylabs.ai>'

const text = (value: unknown, max = 200) => String(value ?? '').trim().slice(0, max)
const list = (value: unknown, allowed: string[]) => (Array.isArray(value) ? allowed.filter((option) => value.includes(option)) : [])

function planText(rm: Roadmap) {
  return [
    `Step ${rm.step} of the AI Readiness Ladder: ${rm.rung.name}`,
    '',
    `Your first AI helper: ${rm.helper.name}`,
    rm.helper.summary,
    '',
    'How it works',
    ...rm.helper.steps.map((step, i) => `${i + 1}. ${step}`),
    '',
    `Time back: about ${rm.hoursBack}. This is an estimate based on your answers, not a promise.`,
    '',
    'Your 6-week roadmap',
    ...rm.weeks.map((w) => `${w.when}: ${w.title}. ${w.detail}`),
  ].join('\n')
}

const escape = (value: string) => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

// Table layout and inline styles only: that is what email apps reliably render.
// Written as a note from Erich: his face and name make it read as a person, not a newsletter.
const ERICH_PHOTO = 'https://www.dualitylabs.ai/team/erich-avatar.jpg'

function planEmail(doc: PlanDoc, rm: Roadmap, link: string | null) {
  const font = 'font-family:Inter,Helvetica,Arial,sans-serif'
  const mono = "font-family:'JetBrains Mono',Menlo,monospace"
  const steps = rm.helper.steps
    .map(
      (step, i) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top"><span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:11px;background:#0066FF;color:#ffffff;${mono};font-size:12px">${i + 1}</span></td><td style="padding:6px 0;font-size:15px;line-height:1.5;color:#262626">${escape(step)}</td></tr>`,
    )
    .join('')

  return `<!doctype html><html><body style="margin:0;background:#F4F4F5;${font};color:#0A0A0A">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F5;padding:24px 12px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px"><tr><td style="background:#ffffff;border-radius:16px;padding:28px 24px">
<table cellpadding="0" cellspacing="0"><tr><td><img src="${ERICH_PHOTO}" width="52" height="52" alt="Erich" style="border-radius:26px;display:block"></td><td style="padding-left:12px"><p style="margin:0;font-weight:700;font-size:15px">Erich Alfonso</p><p style="margin:2px 0 0;color:#737373;font-size:13px">Co-founder, Duality Labs</p></td></tr></table>
<p style="margin:22px 0 6px;font-size:26px;font-weight:800;line-height:1.2">${escape(doc.firstName)}, I put your plan together.</p>
<p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#404040">Here's the AI helper I'd build first for your firm: <b style="color:#0066FF">${escape(rm.helper.name.replace(/^The /, 'a '))}</b>. ${escape(rm.helper.summary)}</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#DCE8FF;border-radius:12px"><tr><td style="padding:16px 18px"><p style="margin:0;${mono};font-size:11px;letter-spacing:.14em;color:#0066FF">TIME BACK (ESTIMATE)</p><p style="margin:4px 0 0;font-size:24px;font-weight:800;color:#0A0A0A">About ${escape(rm.hoursBack)}</p></td></tr></table>
<p style="margin:22px 0 8px;font-weight:800;font-size:17px">How it works</p>
<table cellpadding="0" cellspacing="0">${steps}</table>
${link ? `<div style="text-align:center;margin:26px 0 4px"><a href="${escape(link)}" style="display:inline-block;background:#0066FF;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:16px 30px;border-radius:12px">Open your full AI roadmap &rarr;</a></div>
<p style="margin:10px 0 0;text-align:center;font-size:13px;color:#737373">Where you are on the AI ladder, a 6-week roadmap, a checklist and a technical appendix. Download it as a PDF.</p>` : ''}
<hr style="border:none;border-top:1px solid #E5E5E5;margin:26px 0">
<p style="margin:0 0 8px;font-size:20px;font-weight:800">Want us to build it for you?</p>
<p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#404040">We're building case studies right now. So we'll build this exact AI helper for your firm at no cost. You just give us feedback and let us share the results.</p>
<a href="${CALENDLY_URL}" style="display:inline-block;border:2px solid #0A0A0A;color:#0A0A0A;text-decoration:none;font-weight:700;font-size:15px;padding:13px 24px;border-radius:12px">Book a 15-min call with me</a>
<p style="margin:26px 0 0;font-size:15px;color:#404040">Talk soon,<br><b style="color:#0A0A0A">Erich</b></p>
</td></tr></table>
<p style="margin:16px 0 0;font-size:12px;color:#737373">Duality Labs &middot; Just reply to this email to reach me.</p>
</td></tr></table></body></html>`
}

function sendEmail(body: Record<string, unknown>) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

// Sent when someone gives their email, before the questions: if no full lead follows, they stopped partway.
async function startedAlert(answers: Answers, email: string, phone: string, firm: string, utmData: unknown) {
  if (!answers.firstName || !/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, '').length < 10) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const utm = utmData && typeof utmData === 'object' ? (utmData as Record<string, unknown>) : {}
  const res = await sendEmail({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    reply_to: email,
    subject: `Quiz started: ${answers.firstName} ${answers.lastName} · ${email} · ${phone}`,
    text: [
      'Someone started the AI plan quiz. If no "New AI plan lead" email follows for them, they stopped before the end.',
      '',
      `Name: ${answers.firstName} ${answers.lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      ...(firm ? [`Firm: ${firm}`] : []),
      ...UTM_KEYS.filter((key) => text(utm[key])).map((key) => `${key}: ${text(utm[key])}`),
    ].join('\n'),
  })
  if (!res.ok) console.error('Resend error', res.status, await res.text())
  return NextResponse.json({ ok: res.ok })
}

export async function POST(request: Request) {
  const data = await request.json().catch(() => null)
  if (!data || typeof data !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real visitors never see this field, bots fill it in.
  if (data.fax) return NextResponse.json({ ok: true })

  const answers: Answers = {
    firstName: text(data.firstName, 80),
    lastName: text(data.lastName, 80),
    firmType: list([data.firmType], FIRM_TYPES)[0] ?? '',
    firmTypeOther: text(data.firmTypeOther),
    headcount: list([data.headcount], HEADCOUNTS)[0] ?? '',
    tasks: Array.isArray(data.tasks) ? data.tasks.filter((task: unknown) => TASKS.includes(String(task))).slice(0, MAX_TASKS) : [],
    followUp: text(data.followUp),
    tools: list(data.tools, TOOLS),
    hours: list([data.hours], HOURS)[0] ?? '',
    aiUse: list([data.aiUse], AI_USE)[0] ?? '',
  }
  const email = text(data.email, 200)
  const firm = text(data.firm)
  const phone = text(data.phone, 40)
  const validPhone = phone.replace(/\D/g, '').length >= 10

  if (data.stage === 'start') return startedAlert(answers, email, phone, firm, data.utm)

  if (!answers.firstName || !answers.firmType || !answers.headcount || !answers.tasks.length || !answers.hours || !answers.aiUse || !/^\S+@\S+\.\S+$/.test(email) || !validPhone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const doc = planDoc(answers)
  const rm = buildRoadmap(doc)
  const linkToken = encodePlan(doc)
  const link = linkToken ? `${new URL(request.url).origin}/plan/r/${linkToken}` : null

  const utm = data.utm && typeof data.utm === 'object' ? (data.utm as Record<string, unknown>) : {}
  const lead = [
    `Name: ${answers.firstName} ${answers.lastName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    ...(firm ? [`Firm: ${firm}`] : []),
    `Firm type: ${answers.firmType}${answers.firmTypeOther ? ` (${answers.firmTypeOther})` : ''}`,
    `Team size: ${answers.headcount}`,
    `Takes most of the week: ${answers.tasks.join(', ')}`,
    `${followUp(answers.tasks).question} ${answers.followUp || '(no answer)'}`,
    `Tools: ${answers.tools.join(', ') || '(none picked)'}`,
    `Hours a week on it: ${answers.hours}`,
    `AI today: ${answers.aiUse} (ladder step ${rm.step})`,
    '',
    ...UTM_KEYS.filter((key) => text(utm[key])).map((key) => `${key}: ${text(utm[key])}`),
    '',
    'Roadmap shown:',
    ...(link ? [`Link: ${link}`] : []),
    '',
    planText(rm),
  ].join('\n')

  const res = await sendEmail({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    reply_to: email,
    subject: `New AI plan lead: ${email} · ${phone} · ${answers.tasks[0]} · ${answers.hours} hrs/wk`,
    text: lead,
  })
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return NextResponse.json({ error: 'Could not send' }, { status: 502 })
  }

  // A failure is logged, not shown: the lead already reached us and they still see the plan on the page.
  const copy = await sendEmail({
    from: PLAN_FROM,
    to: email,
    reply_to: TO_EMAIL,
    subject: `${answers.firstName}, your AI plan is ready`,
    html: planEmail(doc, rm, link),
    text: `Hi ${answers.firstName},\n\nHere is your AI plan.${link ? `\n\nOpen your full AI roadmap: ${link}` : ''}\n\n${planText(rm)}\n\nWant us to build this for you? We're building case studies right now. So we'll build this exact AI helper for your firm at no cost. You just give us feedback and let us share the results.\n\nBook a 15-min call: ${CALENDLY_URL}\n\nErich\nDuality Labs`,
  }).catch(() => null)
  if (!copy?.ok) console.error('Plan email failed', copy?.status)

  return NextResponse.json({ ok: true, doc, link })
}
