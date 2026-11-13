import { AI_USE, type PlanDoc } from '@/lib/plan'

// Hand-written and checked, not generated per lead: accountants notice made-up details,
// and every tool fact in the appendix was checked against the vendor's own docs (Nov 2026).

export type Rung = { name: string; detail: string }
export type Row = { area: string; holdsBack: string; toMoveUp: string }
export type FlowBox = { label: string; note: string; kind?: 'ai' | 'you' }
export type Week = { when: string; title: string; detail: string }
export type Check = { question: string; hint: string }
export type Connection = { tool: string; how: string }
export type Piece = { name: string; what: string }

export type Roadmap = {
  step: number
  rung: Rung
  nextRung: Rung
  whyHere: string
  table: Row[]
  bottomLine: [string, string]
  helper: { label: string; name: string; summary: string; flow: FlowBox[]; steps: string[]; whyThis: string }
  before: string[]
  after: string[]
  hoursBack: string
  staysWithYou: string[]
  weeks: Week[]
  buildYourself: string
  checklist: Check[]
  signs: string[]
  warnings: string[]
  next: { changes: string; graduateBy: string }
  appendix: { connections: Connection[]; pieces: Piece[]; security: string[]; askYourBuilder: string[] }
}

export const LADDER: Rung[] = [
  { name: 'All manual', detail: 'People do the routine work by hand. Maybe some ChatGPT on the side.' },
  { name: 'First helper', detail: 'One routine task runs on AI. A person checks the work.' },
  { name: 'Daily helpers', detail: 'Recs, receipts and reminders run every day.' },
  { name: 'Connected', detail: 'Helpers share data across your tools. Month-end runs as one flow.' },
  { name: 'AI back office', detail: 'Helpers do the routine. Your team reviews, advises and grows.' },
]

export const ROADMAP_WEEKS = ['Week 1', 'Weeks 2–3', 'Weeks 4–5', 'Week 6']

// Trying ChatGPT is still step 0: nothing runs on its own yet.
export function stepFor(aiUse: string): number {
  return [0, 0, 1, 2][AI_USE.indexOf(aiUse)] ?? 0
}

const HOURS_BACK: Record<string, string> = {
  'Under 5': '1 to 3 hours a week',
  '5-10': '3 to 6 hours a week',
  '10-20': '6 to 12 hours a week',
  '20+': '12 or more hours a week',
}

const pick = (tools: string[], wanted: string[]) => wanted.find((tool) => tools.includes(tool))

const STEP_TABLES: { rows: (task: string, books: string) => Row[]; bottom: [string, string]; next: { changes: string; graduateBy: string } }[] = [
  {
    rows: (task, books) => [
      { area: 'Work', holdsBack: 'The same checks are done by hand, for every client, every month.', toMoveUp: `Pick the ONE task that eats the most time (${task.toLowerCase()}). Hand off only that.` },
      { area: 'Clients', holdsBack: 'Client questions wait while the team catches up.', toMoveUp: 'Free up hours so replies go out the same day.' },
      { area: 'Tools', holdsBack: 'Your tools hold the data, but people move it between them.', toMoveUp: `Let a helper read from ${books}, not copy from it.` },
      { area: 'Team', holdsBack: 'Good staff spend their day ticking boxes.', toMoveUp: 'Move them from doing the work to checking it.' },
      { area: 'Rules', holdsBack: 'How the work is done lives in people’s heads.', toMoveUp: 'Write your rules down. One page is enough.' },
      { area: 'Trust', holdsBack: 'No one has seen AI do this work safely.', toMoveUp: 'Run it next to your team first. Compare before you rely on it.' },
    ],
    bottom: ['Routine work fills the week.', 'Hand off one job.'],
    next: { changes: 'One task runs on AI every day. Your team checks instead of types, and you can see where the next win is.', graduateBy: 'adding a second helper once the first one is trusted.' },
  },
  {
    rows: (task) => [
      { area: 'Work', holdsBack: 'One task runs on AI. Everything else is still by hand.', toMoveUp: `Add a second helper next to your first, for ${task.toLowerCase()}.` },
      { area: 'Clients', holdsBack: 'Clients still wait on the slow parts.', toMoveUp: 'Pick the next task that clients feel the most.' },
      { area: 'Tools', holdsBack: 'Each helper is wired up on its own.', toMoveUp: 'Use the same safe connections for every new helper.' },
      { area: 'Team', holdsBack: 'One or two people “own” the AI.', toMoveUp: 'Teach the whole team how to review a helper’s work.' },
      { area: 'Rules', holdsBack: 'Rules are written for one task only.', toMoveUp: 'Keep one rules document per helper, with an owner.' },
      { area: 'Trust', holdsBack: 'People re-check everything, just in case.', toMoveUp: 'Agree what “good enough to trust” means, and measure it.' },
    ],
    bottom: ['One win, but it stands alone.', 'Make it a daily habit.'],
    next: { changes: 'Recs, receipts and reminders run every day. Review is a normal part of everyone’s job.', graduateBy: 'connecting your helpers so they share data.' },
  },
  {
    rows: (task) => [
      { area: 'Work', holdsBack: 'Helpers run every day, but each one stops at its own edge.', toMoveUp: `Join ${task.toLowerCase()} to the helpers you already have.` },
      { area: 'Clients', holdsBack: 'Clients get faster answers, but month-end is still a crunch.', toMoveUp: 'Make month-end one flow, from first rec to final review.' },
      { area: 'Tools', holdsBack: 'Data is copied between helpers and tools.', toMoveUp: 'One shared record of each client’s status.' },
      { area: 'Team', holdsBack: 'Reviews pile up at the same time each month.', toMoveUp: 'Spread reviews through the month with daily lists.' },
      { area: 'Rules', holdsBack: 'Each helper has its own rules and its own exceptions.', toMoveUp: 'Shared rules for clients, approvals and limits.' },
      { area: 'Trust', holdsBack: 'You trust each helper, but not the whole chain.', toMoveUp: 'An audit log that shows every step, end to end.' },
    ],
    bottom: ['Helpers work, but not together.', 'Connect them.'],
    next: { changes: 'Your helpers pass work to each other. Month-end runs as one flow, and your team reviews the result.', graduateBy: 'moving your team’s time from review to advice.' },
  },
]

type TaskContent = Omit<Roadmap, 'step' | 'rung' | 'nextRung' | 'whyHere' | 'table' | 'bottomLine' | 'hoursBack' | 'next'> & { nextHelper: string }

function taskContent(doc: PlanDoc): TaskContent {
  const books = pick(doc.tools, ['QuickBooks', 'Xero', 'Excel', 'Google Sheets']) ?? 'your books'
  const ledger = pick(doc.tools, ['QuickBooks', 'Xero']) ?? 'your accounting software'
  const mail = pick(doc.tools, ['Gmail', 'Outlook']) ?? 'email'
  const practice = pick(doc.tools, ['Karbon', 'Canopy', 'TaxDome'])
  const list = practice ? `${mail} or a task in ${practice}` : mail

  const shared = {
    security: [
      'Start read-only. Turn on anything that writes or sends only after weeks of clean results.',
      'Use an AI provider whose terms say your client data is not used to train models.',
      'Keep a log of every suggestion the helper makes and who approved it.',
      'Give each connection only the access it needs, and make sure you can switch it off in one click.',
    ],
    askYourBuilder: [
      'What exactly can the helper read, and what can it change?',
      'Which AI provider sees client data, and what do their terms say?',
      'What happens when it is unsure? Show me a flagged example.',
      'How will we measure accuracy before we rely on it?',
      'Who fixes it when a tool or bank changes, and how fast?',
    ],
  }

  const connection: Record<string, string> = {
    Xero: 'Xero Accounting API, with OAuth 2.0 sign-in. Note: Xero does not let any app reconcile bank lines through its API, and reading unreconciled statement lines needs the Bank Statement report, which Xero only opens to apps that accept extra security terms.',
    QuickBooks: 'QuickBooks Online Accounting API, with OAuth 2.0 sign-in. It can read and create transactions. Reconciling is still done inside QuickBooks.',
    Excel: 'Microsoft Graph, for Excel files kept in OneDrive or SharePoint.',
    'Google Sheets': 'Google Sheets API, with Google sign-in.',
    Gmail: 'Gmail API, with Google sign-in. Best used on one shared mailbox, not personal inboxes.',
    Outlook: 'Microsoft Graph mail API, with Microsoft sign-in. Best used on one shared mailbox.',
    Karbon: 'Karbon API (v3): read and update work items, and get webhooks when work changes.',
    Canopy: 'Canopy API: access is by request and depends on your plan (Plus or Premium).',
    TaxDome: 'TaxDome public API, rolling out to firms from October 2026. Owners choose read-only or read-write for each area.',
  }
  const connections = doc.tools.filter((tool) => connection[tool]).map((tool) => ({ tool, how: connection[tool] }))

  const content: Record<string, TaskInput> = {
    'Bank recs': {
      label: 'bank rec',
      summary: `It prepares the match for each bank line against your entries in ${books}. Your team only looks at the lines that need a person, then clicks reconcile.`,
      flow: [{ label: 'Bank lines', note: 'statement or export' }, { label: 'AI helper', note: 'suggests matches', kind: 'ai' }, { label: books, note: 'open entries' }, { label: 'You reconcile', note: `list in ${mail}`, kind: 'you' }],
      steps: [
        `Each morning it collects the new bank lines${ledger === 'Xero' ? ' (from Xero’s Bank Statement report, or a bank export)' : ' (from a bank export or bank-data service)'} and your open entries in ${books}.`,
        'It suggests a match for each line, using your rules: amount, date window and payee.',
        'When it is not sure, it does not guess. It flags the line and says why.',
        `It sends one short list to ${list}: suggested matches and lines that need you.`,
        `Your team confirms in ${books} and clicks reconcile. Nothing changes until a person does.`,
      ],
      whyThis: 'It happens every month for every client, it follows clear rules, and it is easy to check. That makes it the safest job to hand off first.',
      before: ['Open each account and go line by line.', 'Hunt for the few lines that don’t match.', 'Chase clients about unknown payments.', 'Do it again next month, for every client.'],
      after: ['Suggested matches are ready before you start.', 'You see only the lines that need you.', 'Questions for clients are already listed.', 'Your time goes to review and advice.'],
      staysWithYou: ['You check every flagged line', 'You click reconcile', 'You talk to the client', 'You sign off the account'],
      weeks: [
        { title: 'Map how you reconcile', detail: 'Pick 3 clients. Write down how your team matches lines today, and the odd cases you see most.' },
        { title: `Connect ${books}, read-only`, detail: `Give the helper read access to entries in ${books} and a way to get bank lines. Set up the daily list. It changes nothing yet.` },
        { title: 'Run it next to your team', detail: 'Your team reconciles as usual. The helper suggests matches for the same accounts. Compare, fix its rules, repeat.' },
        { title: 'Go live on those 3 clients', detail: 'The helper does the first pass. Your team confirms and reconciles. Add clients once you trust it.' },
      ],
      checklist: [
        { question: 'Which clients go first?', hint: 'Pick 3 with simple accounts and steady volume.' },
        { question: 'What counts as a match?', hint: 'Same amount? Within how many days? Does the payee need to match?' },
        { question: 'What should never be suggested on its own?', hint: 'For example transfers, loan payments or anything over a set amount.' },
        { question: 'Where do bank lines come from?', hint: ledger === 'Xero' ? 'Xero’s Bank Statement report (needs Xero’s approval) or a bank export.' : 'A bank export or a bank-data service.' },
        { question: 'Who confirms, and by when?', hint: 'One named person per client, and a daily cut-off.' },
        { question: 'Where should the daily list go?', hint: practice ? `${mail}, a task in ${practice}, or both.` : `${mail}, or a shared sheet.` },
        { question: 'What happens to unmatched lines?', hint: 'Who asks the client, and how?' },
        { question: 'How will you know it works?', hint: 'For example: its matches agree with your team for 2 weeks in a row.' },
      ],
      signs: ['Your team starts with a short list, not a full statement', 'Its suggestions agree with your team’s', 'Flags come with a clear reason', 'Recs close earlier in the month', 'Staff ask to add more clients'],
      warnings: ['Your team re-checks every line anyway', 'Too many lines are flagged', 'Rules live in one person’s head', 'The daily list goes unread', 'Clients are added before it is trusted'],
      pieces: [
        { name: 'Bank line source', what: ledger === 'Xero' ? 'Xero’s Bank Statement report (with Xero’s approval) or a bank export file.' : 'A bank export file or a bank-data service.' },
        { name: 'Matching rules', what: 'Plain rules first (amount, date, payee). An AI model only for messy payee names and descriptions.' },
        { name: 'Review list', what: `A daily list in ${list}, with a reason next to every flag.` },
        { name: 'Audit log', what: 'Every suggestion, its reason and who confirmed it.' },
      ],
      buildYourself: `Plan on 4 to 6 weeks, plus setup. The hard parts are getting bank lines safely${ledger === 'Xero' ? ' (Xero restricts this)' : ''}, writing rules for the odd cases, and keeping it working when a bank or tool changes.`,
      nextHelper: 'chasing clients for missing items',
    },
    Receipts: {
      label: 'receipt',
      summary: `It reads each receipt clients send, pulls out the key details and matches it to the right transaction in ${books}.`,
      flow: [{ label: doc.followUp === 'Email' ? mail : doc.followUp === 'Portal' && practice ? practice : 'Client receipts', note: `sent by ${(doc.followUp || 'clients').toLowerCase()}` }, { label: 'AI helper', note: 'reads and matches', kind: 'ai' }, { label: books, note: 'transactions' }, { label: 'You check flags', note: 'daily list', kind: 'you' }],
      steps: [
        `It collects receipts from where clients send them now${doc.followUp ? ` (${doc.followUp.toLowerCase()})` : ''}.`,
        'It reads the vendor, date, amount and tax from each one, even from a photo.',
        `It suggests the matching transaction in ${books} and attaches the receipt once you confirm.`,
        'It flags receipts it can’t read or can’t match, and lists transactions still missing a receipt.',
        'You check the flagged ones. The rest are ready to file.',
      ],
      whyThis: 'Receipts arrive every day, the work is repetitive, and every match is easy to check against the receipt itself.',
      before: ['Receipts arrive in every format, all month.', 'You match each one by hand.', 'Missing receipts surface at month-end.', 'Clients get chased late and in a rush.'],
      after: ['Receipts are read as they arrive.', 'Matches are suggested for you.', 'Missing receipts are listed early.', 'You only handle the odd ones.'],
      staysWithYou: ['You check flagged receipts', 'You decide how odd expenses are coded', 'You talk to the client', 'You own the final books'],
      weeks: [
        { title: 'Map how receipts arrive', detail: 'Pick 3 clients. List every way receipts reach you, and how your team codes them.' },
        { title: 'Connect the inbox and books', detail: `Point the helper at one receipts inbox and give it read access to ${books}. It suggests, it doesn’t change anything.` },
        { title: 'Run it next to your team', detail: 'Your team processes receipts as usual. Compare the helper’s reading and matching, then fix its rules.' },
        { title: 'Go live on those 3 clients', detail: 'The helper does the first pass. Your team confirms. Add clients once you trust it.' },
      ],
      checklist: [
        { question: 'Which clients go first?', hint: 'Pick 3 that send lots of receipts the same way.' },
        { question: 'Where should all receipts land?', hint: 'One inbox or one portal folder, not personal inboxes.' },
        { question: 'What must be read from each receipt?', hint: 'Vendor, date, amount, tax, and anything else you code by.' },
        { question: 'What counts as a match?', hint: 'Same amount within how many days? What about tips and currency?' },
        { question: 'When should it flag instead of suggest?', hint: 'Blurry photos, split payments, amounts over a set limit.' },
        { question: 'Who confirms, and how often?', hint: 'One named person per client, once a day.' },
        { question: 'How are missing receipts chased?', hint: 'Who asks, how, and how often?' },
        { question: 'How will you know it works?', hint: 'For example: 2 weeks where its reading matches your team’s.' },
      ],
      signs: ['Receipts are handled the day they arrive', 'Missing receipts show up early', 'Flags come with a clear reason', 'Month-end has fewer surprises', 'Clients send receipts the same way'],
      warnings: ['Your team re-reads every receipt anyway', 'Receipts still land in personal inboxes', 'Too many receipts are flagged', 'Coding rules aren’t written down', 'Clients are added before it is trusted'],
      pieces: [
        { name: 'Receipt intake', what: 'One shared inbox or portal folder the helper can read.' },
        { name: 'Reading', what: 'An AI model that reads text and numbers from photos and PDFs.' },
        { name: 'Matching rules', what: `Amount, date and vendor rules against transactions in ${books}.` },
        { name: 'Review list and log', what: 'A daily list of flags, and a record of every suggestion and approval.' },
      ],
      buildYourself: 'Plan on 4 to 6 weeks, plus setup. The hard parts are messy photos, getting every receipt into one place, and coding rules for the odd expenses.',
      nextHelper: 'bank recs',
    },
    'Client reminders': {
      label: 'client reminder',
      summary: `It keeps track of what each client still owes you and sends polite reminders from ${mail}, so nobody has to write them.`,
      flow: [{ label: practice ?? 'Client list', note: 'what is still owed' }, { label: 'AI helper', note: 'writes and schedules', kind: 'ai' }, { label: mail, note: 'sends reminders' }, { label: 'You call the late ones', note: 'weekly list', kind: 'you' }],
      steps: [
        `It keeps a list of what each client still owes you${practice ? `, from ${practice}` : ''}.`,
        'It writes a short, polite reminder for each client, in your firm’s tone.',
        `It sends them from ${mail} on a schedule you set, and stops when the client replies.`,
        'It notices when the client has sent what you asked for, and ticks it off.',
        'Each week it gives you a short list of who is still late, so you can call them.',
      ],
      whyThis: 'Chasing is repetitive, it happens all the time, and every reminder is easy to check before it goes out.',
      before: ['You track who owes what in your head or a sheet.', 'You write the same email again and again.', 'Work stalls while clients are late.', 'Reminders slip when the team is busy.'],
      after: ['Reminders go out on time, every time.', 'They stop as soon as the client sends it.', 'You see who is late at a glance.', 'You only call the few who need it.'],
      staysWithYou: ['You set the tone and schedule', 'You approve the wording', 'You make the hard calls', 'You decide when to stop chasing'],
      weeks: [
        { title: 'Map what you chase', detail: 'Pick 3 clients. List what you ask them for, how often, and the words you use.' },
        { title: `Connect ${practice ?? 'your client list'} and ${mail}`, detail: 'Give the helper read access to what is owed. It drafts reminders for you to approve. Nothing is sent yet.' },
        { title: 'Approve every message', detail: 'The helper drafts, you approve and send. Fix its tone and timing until you stop editing.' },
        { title: 'Go live on those 3 clients', detail: 'Let it send on schedule. You get the weekly late list. Add clients once you trust it.' },
      ],
      checklist: [
        { question: 'Which clients go first?', hint: 'Pick 3 who are often late but friendly.' },
        { question: 'What do you chase?', hint: 'Statements, receipts, signatures, payments. Be specific.' },
        { question: 'How often, and how many times?', hint: 'For example: day 3, day 7, then a call.' },
        { question: 'Who does it come from?', hint: 'A shared address or a named person.' },
        { question: 'How does it know an item arrived?', hint: practice ? `A status in ${practice}, or a reply with an attachment.` : 'A reply with an attachment, or a status you update.' },
        { question: 'What should never be sent automatically?', hint: 'Anything about fees, deadlines with penalties, or upset clients.' },
        { question: 'Who approves the wording?', hint: 'One person signs off every template.' },
        { question: 'How will you know it works?', hint: 'For example: fewer items still missing at month-end.' },
      ],
      signs: ['Clients reply to the reminders', 'Fewer items are missing at month-end', 'Nobody writes reminder emails anymore', 'The late list gets shorter', 'Clients say the reminders are clear'],
      warnings: ['Clients complain about too many emails', 'Reminders go out after the item arrived', 'Templates were never approved', 'Nobody reads the late list', 'Sensitive topics are sent automatically'],
      pieces: [
        { name: 'What is owed', what: practice ? `Status of each request, read from ${practice}.` : 'A simple list of open requests per client.' },
        { name: 'Writing', what: 'Approved templates, lightly adjusted by an AI model for each client.' },
        { name: 'Sending', what: `${mail} on a schedule, stopping when the client replies.` },
        { name: 'Late list and log', what: 'A weekly list of who is late, and a record of every message sent.' },
      ],
      buildYourself: 'Plan on 3 to 5 weeks, plus setup. The hard parts are knowing reliably when an item has arrived, and keeping the tone right.',
      nextHelper: 'receipts',
    },
    'Month-end close': {
      label: 'month-end',
      summary: `It runs your month-end checklist across ${books}${practice ? ` and ${practice}` : ''}, does the routine checks, and hands you one list of what still needs a person.`,
      flow: [{ label: books, note: 'balances and entries' }, { label: 'AI helper', note: 'runs the checklist', kind: 'ai' }, { label: practice ?? 'Checklist', note: 'status per client' }, { label: 'You sign off', note: 'one list', kind: 'you' }],
      steps: [
        `On the first day of month-end it opens your checklist for each client${practice ? ` in ${practice}` : ''}.`,
        `It runs the routine checks in ${books}: open items, missing receipts, odd balances, things out of the usual range.`,
        'It ticks off what passes and writes a short note on what doesn’t.',
        'It gives you one list per client of what still needs a person.',
        'You review, fix what’s left and sign off. It never closes the month itself.',
      ],
      whyThis: 'Most of a checklist is the same checks every month. Taking those off your plate leaves your team the judgment calls.',
      before: ['The same checklist, by hand, for every client.', 'Open items found one by one.', 'Month-end takes days.', 'The crunch lands on your best people.'],
      after: ['Routine checks are done before you start.', 'One list of what needs a person.', 'Review starts on day one.', 'Your best people do the judgment calls.'],
      staysWithYou: ['You review the numbers', 'You make the judgment calls', 'You fix what is flagged', 'You close the month and sign off'],
      weeks: [
        { title: 'Write down your checklist', detail: 'Pick 3 clients. List every month-end check, and mark which ones follow a fixed rule.' },
        { title: `Connect ${books}, read-only`, detail: 'Give the helper read access. Turn the fixed-rule checks into tests it can run.' },
        { title: 'Run it next to your team', detail: 'Your team closes as usual. The helper runs the same checks. Compare and fix.' },
        { title: 'Go live on those 3 clients', detail: 'The helper runs the checks on day one. Your team works from its list. Add clients once you trust it.' },
      ],
      checklist: [
        { question: 'Which clients go first?', hint: 'Pick 3 with a standard close.' },
        { question: 'Which checks follow a fixed rule?', hint: 'For example: no uncategorized items, bank balance agrees, no missing receipts over a set amount.' },
        { question: 'What is “out of the usual range”?', hint: 'For example: a cost more than a set percentage above last month.' },
        { question: 'Which checks always need a person?', hint: 'Accruals, judgment calls, anything client-specific.' },
        { question: 'Where does the list go?', hint: practice ? `A task in ${practice}, or ${mail}.` : `${mail}, or a shared sheet.` },
        { question: 'Who signs off each client?', hint: 'One named reviewer per client.' },
        { question: 'What is your close deadline?', hint: 'The day the helper must finish its checks.' },
        { question: 'How will you know it works?', hint: 'For example: 2 closes where its checks match your team’s.' },
      ],
      signs: ['Review starts on day one', 'Its checks agree with your team’s', 'Fewer surprises late in the close', 'Months close earlier', 'Your reviewers ask for more checks'],
      warnings: ['Your team re-runs every check anyway', 'Too many items are flagged', 'Checks aren’t written down', 'The list arrives too late to help', 'It is trusted with judgment calls'],
      pieces: [
        { name: 'Data access', what: `Read-only access to balances and entries in ${books}.` },
        { name: 'Checks', what: 'Your fixed-rule checks as code. An AI model only to summarize what it found in plain words.' },
        { name: 'Client list', what: practice ? `One task list per client in ${practice}.` : 'One list per client.' },
        { name: 'Audit log', what: 'Every check, its result and who signed off.' },
      ],
      buildYourself: 'Plan on 5 to 8 weeks, plus setup. The hard parts are turning your checklist into exact rules, and handling every client’s exceptions.',
      nextHelper: 'bank recs',
    },
    'Data entry': {
      label: 'data entry',
      summary: `It reads the documents you now type in by hand${doc.followUp ? ` (${doc.followUp})` : ''} and prepares the entries in ${books} for you to approve.`,
      flow: [{ label: 'Documents', note: 'PDFs, photos, emails' }, { label: 'AI helper', note: 'reads and prepares', kind: 'ai' }, { label: books, note: 'draft entries' }, { label: 'You approve', note: 'daily list', kind: 'you' }],
      steps: [
        'It collects the documents from one shared inbox or folder.',
        'It reads the names, dates, amounts and reference numbers.',
        `It prepares draft entries for ${books}, using your coding rules.`,
        'It flags anything it is not sure about, with the reason.',
        'You check and approve. Nothing is final until a person says yes.',
      ],
      whyThis: 'Typing from documents is slow, error-prone and easy to check. That makes it a strong first job to hand off.',
      before: ['You type numbers in from documents.', 'Typos creep in.', 'Backlogs build when it’s busy.', 'Skilled staff do clerical work.'],
      after: ['Entries are prepared for you.', 'Anything unclear is flagged.', 'You check instead of type.', 'Staff spend time on review.'],
      staysWithYou: ['You check flagged items', 'You decide how new items are coded', 'You approve every entry', 'You own the final numbers'],
      weeks: [
        { title: 'Map what you type in', detail: 'Pick 3 clients. Collect 20 sample documents and note how each is entered.' },
        { title: `Connect the inbox and ${books}`, detail: 'Point the helper at one folder or inbox. It prepares drafts only, never final entries.' },
        { title: 'Run it next to your team', detail: 'Your team enters as usual. Compare the helper’s drafts and fix its rules.' },
        { title: 'Go live on those 3 clients', detail: 'The helper prepares, your team approves. Add more document types once you trust it.' },
      ],
      checklist: [
        { question: 'Which documents go first?', hint: 'The type you see most, in the most standard format.' },
        { question: 'Where will they land?', hint: 'One inbox or folder the helper can read.' },
        { question: 'What must be read from each one?', hint: 'List every field you type in today.' },
        { question: 'How is each item coded?', hint: 'Write the rules, including the exceptions.' },
        { question: 'When should it flag instead of prepare?', hint: 'Unclear text, new vendors, amounts over a set limit.' },
        { question: 'Who approves, and how often?', hint: 'One named person, once a day.' },
        { question: 'Should anything be entered without review?', hint: 'At first, no.' },
        { question: 'How will you know it works?', hint: 'For example: 2 weeks where its drafts need no edits.' },
      ],
      signs: ['Drafts need fewer edits each week', 'No backlog at busy times', 'Flags come with a clear reason', 'Typos go down', 'Staff ask to add more document types'],
      warnings: ['Your team re-types everything anyway', 'Documents still arrive everywhere', 'Coding rules aren’t written', 'Drafts are approved without reading', 'Too many document types at once'],
      pieces: [
        { name: 'Intake', what: 'One shared inbox or folder.' },
        { name: 'Reading', what: 'An AI model that reads text and numbers from PDFs and photos.' },
        { name: 'Drafts', what: `Draft entries in ${books}, using your written coding rules.` },
        { name: 'Review list and log', what: 'A daily approval list, and a record of every draft and approval.' },
      ],
      buildYourself: 'Plan on 4 to 6 weeks, plus setup. The hard parts are messy documents, writing every coding rule down, and the odd formats.',
      nextHelper: 'bank recs',
    },
    Other: {
      label: 'task',
      summary: `It takes over the routine part of ${doc.followUp ? `“${doc.followUp}”` : 'your biggest task'}: the steps that follow the same rule every time. You keep the parts that need judgment.`,
      flow: [{ label: 'Incoming work', note: 'as it arrives today' }, { label: 'AI helper', note: 'does the routine steps', kind: 'ai' }, { label: books, note: 'results' }, { label: 'You approve', note: 'daily list', kind: 'you' }],
      steps: [
        'It takes in the work the same way you get it today.',
        'It does the steps that follow the same rule every time.',
        `It prepares the result in ${books}, as a draft.`,
        'It flags anything it is not sure about, with the reason.',
        'You check and approve. Nothing is final until a person says yes.',
      ],
      whyThis: 'You said this takes the most time. The parts that follow a fixed rule are the safest to hand off first.',
      before: ['The same steps, by hand, every time.', 'It takes time from client work.', 'It is easy to miss a step.', 'Only one or two people know how.'],
      after: ['The routine steps are done for you.', 'Anything unusual is flagged.', 'Nothing is missed.', 'You keep the judgment calls.'],
      staysWithYou: ['You check flagged items', 'You make the judgment calls', 'You approve the result', 'You talk to the client'],
      weeks: [
        { title: 'Write the task down', detail: 'Pick 3 clients. List every step, and mark which ones follow a fixed rule.' },
        { title: 'Connect your tools, read-only', detail: 'Give the helper read access to what it needs. It prepares drafts only.' },
        { title: 'Run it next to your team', detail: 'Your team works as usual. Compare the helper’s drafts and fix its rules.' },
        { title: 'Go live on those 3 clients', detail: 'The helper does the routine steps. Your team approves. Add clients once you trust it.' },
      ],
      checklist: [
        { question: 'Which clients go first?', hint: 'Pick 3 where the task is most standard.' },
        { question: 'What are the exact steps?', hint: 'Write each one, in order.' },
        { question: 'Which steps follow a fixed rule?', hint: 'Those are the ones to hand off.' },
        { question: 'Which steps always need a person?', hint: 'Judgment calls stay with you.' },
        { question: 'Where does the work come from?', hint: 'One place the helper can read.' },
        { question: 'Who approves, and how often?', hint: 'One named person, once a day.' },
        { question: 'What must never happen automatically?', hint: 'List it, so the helper flags it instead.' },
        { question: 'How will you know it works?', hint: 'For example: 2 weeks where its work needs no edits.' },
      ],
      signs: ['Drafts need fewer edits each week', 'Nothing gets missed', 'Flags come with a clear reason', 'The task takes less of your week', 'Staff ask to hand off more'],
      warnings: ['Your team redoes it anyway', 'Steps aren’t written down', 'Too much is flagged', 'Judgment calls are left to the helper', 'Too much is handed off at once'],
      pieces: [
        { name: 'Intake', what: 'One place the work arrives that the helper can read.' },
        { name: 'Rules', what: 'Your fixed-rule steps as code. An AI model only where text is messy.' },
        { name: 'Drafts', what: `Results prepared in ${books}, never final on their own.` },
        { name: 'Review list and log', what: 'A daily approval list, and a record of every step and approval.' },
      ],
      buildYourself: 'Plan on 4 to 6 weeks, plus setup, depending on the task. The hard parts are writing every step down and handling the exceptions.',
      nextHelper: 'bank recs',
    },
  }

  const chosen = content[doc.task] ?? content.Other
  return {
    helper: { label: `Your ${chosen.label} helper`, name: `The ${chosen.label} helper`, summary: chosen.summary, flow: chosen.flow, steps: chosen.steps, whyThis: chosen.whyThis },
    before: chosen.before,
    after: chosen.after,
    staysWithYou: chosen.staysWithYou,
    weeks: chosen.weeks.map((week, i) => ({ ...week, when: ROADMAP_WEEKS[i] })),
    buildYourself: chosen.buildYourself,
    checklist: chosen.checklist,
    signs: chosen.signs,
    warnings: chosen.warnings,
    appendix: { connections, pieces: chosen.pieces, ...shared },
    nextHelper: chosen.nextHelper,
  }
}

type TaskInput = {
  label: string
  summary: string
  flow: FlowBox[]
  steps: string[]
  whyThis: string
  before: string[]
  after: string[]
  staysWithYou: string[]
  weeks: Omit<Week, 'when'>[]
  checklist: Check[]
  signs: string[]
  warnings: string[]
  pieces: Piece[]
  buildYourself: string
  nextHelper: string
}

export function buildRoadmap(doc: PlanDoc): Roadmap {
  const step = stepFor(doc.aiUse)
  const books = pick(doc.tools, ['QuickBooks', 'Xero', 'Excel', 'Google Sheets']) ?? 'your books'
  const { nextHelper, ...task } = taskContent(doc)
  const stage = STEP_TABLES[step]
  const taskName = doc.task === 'Other' ? 'this task' : doc.task.toLowerCase()

  const whyHere = [
    `You told us ${taskName} ${['Bank recs', 'Receipts', 'Client reminders'].includes(doc.task) ? 'take' : 'takes'} your team ${doc.hours.toLowerCase()} hours a week`,
    step === 0 ? ', and that nothing does that work for you yet. That is where most firms start, and it means your first win is close.'
      : step === 1 ? ', and that one task already runs on AI. You have proved it works. Now it is about making it a habit.'
      : ', and that several tasks already run on AI. The next gain comes from connecting them.',
  ].join('')

  return {
    ...task,
    step,
    rung: LADDER[step],
    nextRung: LADDER[step + 1],
    whyHere,
    table: stage.rows(doc.task === 'Other' ? 'your biggest task' : doc.task, books),
    bottomLine: stage.bottom,
    hoursBack: HOURS_BACK[doc.hours] ?? HOURS_BACK['Under 5'],
    next: { changes: stage.next.changes, graduateBy: step === 0 ? `adding a second helper. For you, a good next one is ${nextHelper}.` : stage.next.graduateBy },
  }
}
