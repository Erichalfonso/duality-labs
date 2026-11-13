export const FIRM_TYPES = ['Bookkeeping', 'Tax', 'CPA firm', 'Other']
export const HEADCOUNTS = ['Just me', '2-5', '6-20', '21-50', '50+']
export const TASKS = ['Bank recs', 'Receipts', 'Client reminders', 'Month-end close', 'Data entry', 'Other']
export const MAX_TASKS = 2
export const TOOLS = ['QuickBooks', 'Xero', 'Excel', 'Google Sheets', 'Gmail', 'Outlook', 'Karbon', 'Canopy', 'TaxDome', 'Other']
export const HOURS = ['Under 5', '5-10', '10-20', '20+']
// Places the firm on the AI Readiness Ladder (see stepFor in lib/roadmap.ts).
export const AI_USE = ['Not at all', 'We try ChatGPT now and then', 'One task runs on AI', 'Several tasks run on AI']
export const CALENDLY_URL = 'https://calendly.com/dualitylabs/new-meeting'
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

export type Answers = {
  firstName: string
  lastName: string
  firmType: string
  firmTypeOther: string
  headcount: string
  tasks: string[]
  followUp: string
  tools: string[]
  hours: string
  aiUse: string
}

// Everything the roadmap is drawn from. It travels inside a shared plan link, so keep it small.
export type PlanDoc = {
  firstName: string
  firmType: string
  headcount: string
  task: string
  followUp: string
  hours: string
  tools: string[]
  aiUse: string
}

export type FollowUp = { question: string; options?: string[] }

const FOLLOW_UPS: Record<string, FollowUp> = {
  'Bank recs': { question: 'How many bank accounts do you reconcile each month?', options: ['1-5', '6-20', '21-50', '50+'] },
  Receipts: { question: 'How do clients send receipts now?', options: ['Email', 'Text', 'Portal', 'Paper'] },
  'Client reminders': { question: 'How do you chase clients now?', options: ['Email', 'Phone', 'Text', "We don't"] },
  'Month-end close': { question: 'How long does month-end take?', options: ['1-2 days', '3-5 days', 'A week+'] },
  'Data entry': { question: 'What do you type in by hand the most?' },
  Other: { question: 'What is the task? One line is fine.' },
}

// The follow-up asks about the first task picked: that is the one the plan is built around.
export function followUp(tasks: string[]): FollowUp {
  return FOLLOW_UPS[tasks[0]] ?? FOLLOW_UPS.Other
}

export function planDoc(answers: Answers): PlanDoc {
  return {
    firstName: answers.firstName,
    firmType: answers.firmTypeOther || answers.firmType,
    headcount: answers.headcount,
    task: TASKS.includes(answers.tasks[0]) ? answers.tasks[0] : 'Other',
    followUp: answers.followUp,
    hours: answers.hours,
    tools: answers.tools.filter((tool) => tool !== 'Other'),
    aiUse: answers.aiUse,
  }
}
