export type MockKind =
  | 'spreadsheet-to-dashboard'
  | 'csv-to-pipeline'
  | 'docs-to-report'

export type ServiceSlug = 'ai-ml' | 'custom-software' | 'data-infrastructure'

export type BuildType =
  | 'Automation'
  | 'Pipeline'
  | 'App'
  | 'Integration'
  | 'Dashboard'
  | 'Agent'

export type EngineeringChallenge = {
  challenge: string
  solution: string
}

export type CaseStudy = {
  slug: string
  industry: string
  metric: string
  metricLabel: string
  headline: string
  preview: string
  body: string[]
  beforeImg?: string | null
  afterImg?: string | null
  mock: MockKind
  relatedServices: ServiceSlug[]
  buildName: string
  buildType: BuildType
  buildSummary: string
  techStack: string[]
  timeline?: string
  capabilities?: string[]
  engineering?: EngineeringChallenge[]
  testimonial?: {
    quote: string
    attribution: string
  }
  meta: {
    title: string
    description: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'marketing-meta-ads-agent',
    industry: 'Marketing and Ads',
    metric: '300+ decisions',
    metricLabel: 'Autonomous bid + budget actions',
    headline:
      'An autonomous Meta Ads agent. No human in the loop.',
    preview:
      'Manual ad set management means watching ROAS dashboards and nudging bid and budget all day — or accepting whatever Meta’s auto-bidder decides. Now an autonomous agent runs the cycle every 30 minutes: discovery to find the bid that unlocks delivery, scaling to grow budget when ROAS holds, corrective pullback when it drops, and an emergency pause when things go sideways.',
    body: [
      'A direct-response advertiser was running Meta Bid Cap campaigns at six-figure-monthly spend. Bid Cap requires hands-on operator attention — you set the bid, watch what Meta does with it, and adjust. If the bid is too low, the auction never unlocks and the ad set sits with zero delivery. If the bid is too high, you overpay. If ROAS drifts down, you have to react fast or burn budget. The advertiser wanted to scale without scaling the operator’s hours, and Meta’s built-in auto-bidder didn’t give them the discipline they wanted around a Real Net ROAS target (which had to factor real paid revenue and exclude certain product upsells).',
      'We built an autonomous ad ops agent — a Python engine that runs every 30 minutes via cron, reads Meta ad performance and Whop sales from a Supabase warehouse, and runs each ad set through a three-phase state machine. Discovery raises the bid by $1 every 6 hours until the auction unlocks. Scaling grows the daily budget by 20% every 4 hours while Real Net ROAS holds above target. Corrective runs an escalating pullback ladder when ROAS drops — lower bid, then reduce budget, then pause — each step gated by three consecutive bad cycles. An emergency check runs every cycle and pauses immediately on spend-without-sales runaway or ROAS collapse. A fatigue monitor clones ad sets when frequency spikes or CTR craters. Six n8n workflows handle alerts to Discord, daily and weekly digests to Gmail, Meta token rotation, and a 15-minute health heartbeat.',
      'The agent has logged over 300 autonomous decisions and 190 alerts in production — every bid change, every budget step, every pause, with a full audit trail in Postgres. The advertiser stopped hand-tuning ad sets and started running the configuration: tune the target ROAS, the emergency floor, the bid ceiling, the cycle cadence — the agent runs the playbook between cycles.',
    ],
    mock: 'csv-to-pipeline',
    relatedServices: ['custom-software', 'data-infrastructure'],
    buildName: 'Ad Ops Agent',
    buildType: 'Agent',
    buildSummary:
      'Autonomous Meta Ads agent: three-phase state machine (discovery, scaling, corrective) with emergency pause and fatigue-driven creative rotation, running on cron with full Postgres audit trail.',
    techStack: ['Python', 'Supabase', 'Meta Marketing API', 'Whop API', 'n8n'],
    capabilities: [
      'Three-phase state machine: discovery (find the bid that unlocks delivery), scaling (grow budget on strong ROAS), corrective (pull back when ROAS drops)',
      'Emergency check every cycle: pauses on spend-without-sales runaway or ROAS collapse below floor',
      'Fatigue monitor clones ad sets when frequency spikes or CTR drops vs. 7-day baseline',
      'Real Net ROAS calculation pulls from Whop revenue API (filters out upsells per client config)',
      'Six n8n workflows handle Discord alerts, daily/weekly digests, Meta token rotation, and health heartbeats',
      'All decisions logged to Postgres with full audit trail (state, decisions, alerts, snapshots, errors)',
    ],
    engineering: [
      {
        challenge: 'Respecting Meta’s API rate limits without missing decisions',
        solution:
          'A dedicated rate limiter enforces Meta’s hard cap (4 mutations per hour per ad set, 9,000 points per 300 seconds for the account). Daily counters reset at midnight UTC via a separate cron. The engine refuses to mutate when it’d push past the cap and queues the decision for the next eligible cycle, with a Discord alert if a mutation gets deferred.',
      },
      {
        challenge: 'Real Net ROAS, not Meta’s reported ROAS',
        solution:
          'Whop’s payment API is polled every 15 minutes into a Supabase table. The agent calculates ROAS using actual paid revenue per ad set, filtered to specific Whop products (configurable inclusion/exclusion) — so upsells or refunds flow through cleanly instead of inflating the Meta-reported number.',
      },
      {
        challenge: 'Decisions had to be safe to ship',
        solution:
          'A development mode reads every metric and logs every decision but never touches Meta. The agent only mutates ads when explicitly set to production. A file lock prevents overlapping cron runs. Config validation refuses to start the engine if any required parameter is missing. An "insights guard" skips ad sets when Meta’s API returns empty data instead of deciding on bad info. Every mutation is logged before it’s executed so post-hoc review is always possible.',
      },
    ],
    meta: {
      title: 'Case study: Autonomous Meta Ads agent for Bid Cap campaigns',
      description:
        'How we built an autonomous Meta Ads agent that runs every 30 minutes — discovery to find the bid that unlocks delivery, scaling to grow budget on strong ROAS, corrective pullback when ROAS drops, and emergency pause when spend goes sideways. 300+ decisions logged in production.',
    },
  },
  {
    slug: 'logistics-nemt-operations-platform',
    industry: 'Transportation & Logistics',
    metric: '11 modules',
    metricLabel: 'HIPAA-ready from day one',
    headline:
      'From spreadsheets and email threads to one operations platform.',
    preview:
      'An NEMT (non-emergency medical transportation) broker was running their entire operations on spreadsheets, email threads, and ad-hoc trackers. Now a single HIPAA-ready platform handles trip dispatch, provider credentialing, reimbursement workflows, and audit trails — end to end.',
    body: [
      'An NEMT broker — a brokerage that coordinates Medicaid-funded medical transportation between health plans, members, and a network of transportation providers — was running their operations the way most brokerages do at small scale: spreadsheets for trip dispatch, email threads for provider assignments, paper or PDF forms for reimbursement claims, and credentialing tracked in a separate document somewhere. The compliance footprint was growing — HIPAA, 42 CFR 455 credentialing, state Medicaid documentation — and the brokerage was stretching the limits of what a small operations team could hold together by hand.',
      'We built their entire operations platform from scratch. Trip dispatch with a 9-step status workflow and a queue that surfaces unassigned and rejected trips, with mobility-type matching so the right vehicle gets sent to the right member. A provider directory with 13 tracked credential types — license, COI, background screen, drug screen, OIG/SAM exclusion lists — each with their own status and verification workflow. Recurring "standing orders" so weekly dialysis runs auto-generate trips. Reimbursement forms (Medicaid Trip, Provider Invoice, CMS-1500) flowing through a draft → submitted → under review → approved/denied → paid pipeline. Complaint tracking, audit log, dashboard analytics, role-based access. Every PHI field encrypted at rest. Every PHI access logged.',
      'The brokerage now runs entirely on one platform — 11 modules, one login, one source of truth. The operations team stopped reconciling spreadsheets and started running their business through software. And the system was HIPAA-ready from day one — encryption, audit trails, role-based access, BAA-signed infrastructure — not bolted on later when the brokerage tried to scale.',
    ],
    mock: 'csv-to-pipeline',
    relatedServices: ['custom-software', 'data-infrastructure'],
    buildName: 'Operations Platform',
    buildType: 'App',
    buildSummary:
      'End-to-end operations platform for a non-emergency medical transportation broker: trip dispatch, provider credentialing, reimbursement workflows, and HIPAA-ready audit trails — all on one PostgreSQL schema.',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'AWS Amplify'],
    capabilities: [
      'Trip dispatch with 9-step status workflow + assignment queue',
      'Mobility-type matching for provider assignment (ambulatory / wheelchair / stretcher)',
      'Provider directory with 13-type credential tracking (license, COI, drug screen, OIG/SAM)',
      'Recurring "standing orders" with day-of-week scheduling for weekly trips',
      'Reimbursement forms (Medicaid Trip, Provider Invoice, CMS-1500) with status workflow',
      'Audit log, complaint tracking, role-based access, PHI encryption at rest',
    ],
    engineering: [
      {
        challenge: 'HIPAA-grade compliance from day one',
        solution:
          'AES-256-GCM encryption on PHI fields (patient name, phone) at rest, TLS in transit, every PHI view logged as a discrete audit event, 30-min idle session timeout with 8-hour absolute cap, account lockout after 5 failed attempts, role-based access enforced at the route layer. BAA signed with AWS before any production data touched the system.',
      },
      {
        challenge: 'Eliminating duplicate data entry across workflows',
        solution:
          'One PostgreSQL schema serves dispatch, credentialing, reimbursements, and audit. A completed trip auto-populates the corresponding Medicaid reimbursement form. A provider’s credential status flows into trip assignment so an expired license blocks dispatch automatically. Operations staff stop typing the same Medicaid ID into three different systems.',
      },
      {
        challenge: 'Bulk-importing trips from health plan spreadsheets',
        solution:
          'Excel/CSV import endpoint that validates each row against the trip schema, looks up existing providers by code, and queues parse errors for review instead of silently dropping rows. Imported trips drop straight into the assignment queue, ready for mobility-matched dispatch.',
      },
    ],
    meta: {
      title: 'Case study: Operations platform for an NEMT brokerage',
      description:
        'How we built the entire operations platform for a non-emergency medical transportation broker — trip dispatch, provider credentialing, reimbursement workflows, and HIPAA-ready audit trails. 11 modules on one PostgreSQL schema.',
    },
  },
  {
    slug: 'media-music-asset-pipeline',
    industry: 'Media and Music',
    metric: '5K-song catalog',
    metricLabel: 'Processed end-to-end, zero manual steps',
    headline:
      'From MP4 upload to processed catalog, no human in the loop.',
    preview:
      'A music distribution platform was running upload processing across Zapier, an old n8n workflow, and manual studio steps for tempo and reverb. Now a single autonomous pipeline ingests every MP4 from Drive, deduplicates against the artist’s own library, runs the studio processing, and updates a Google Sheet — zero manual steps.',
    body: [
      'A music distribution platform — about 5,000 songs across many independent artists — was running their upload processing across three tools: a Zapier job that copied each MP4 from a shared Google Drive folder into the right artist subfolder, an older n8n workflow that logged the file to a Google Sheet, and a manual studio step where the operator would dedup-check, run a pitch-preserving tempo stretch, and add reverb on the output. The chain worked, but it broke if any one step needed a fix, and it didn’t scale: every new artist meant more manual processing, more zaps, and more places to lose track of a duplicate or a bad upload.',
      'We replaced the entire chain with a single self-hosted n8n workflow on a small Hetzner VPS — 58 nodes from ingest to logged catalog row. Every five minutes the pipeline scans the shared Drive root for new MP4s, runs each through ACRCloud deduplication against the artist’s own library (never the global commercial catalog, per the client’s hard requirement), checks for AI-generated audio fingerprints, applies a pitch-preserving tempo stretch with FFmpeg’s rubberband filter to land between 5:00 and 5:10, layers a SoX Freeverb reverb on the output, extracts a thumbnail at a random frame, packages a clean WAV, and uploads three artifacts back to Drive — all while writing a row to the artist’s own tab in a shared Google Sheet at every status transition. The dedup library is self-populating: every successfully processed song uploads to ACR’s custom bucket, so the next match is automatic.',
      'The platform now processes its 5,000-song catalog through one autonomous pipeline, no manual studio step, no Zapier orchestration, and no operator dedup checks. New artists onboard by creating a Drive folder and a Sheet tab — the workflow handles the rest. The whole system runs on a $14/month VPS.',
    ],
    mock: 'csv-to-pipeline',
    relatedServices: ['custom-software', 'data-infrastructure'],
    buildName: 'Music Asset Pipeline',
    buildType: 'Pipeline',
    buildSummary:
      'Autonomous music asset pipeline: scans Drive for MP4s, deduplicates via ACRCloud against the artist’s own library, runs pitch-preserving tempo stretch + Freeverb reverb, and logs everything to Google Sheets.',
    techStack: ['n8n', 'Docker', 'FFmpeg', 'SoX', 'ACRCloud', 'Google APIs'],
    capabilities: [
      'Scans Google Drive every 5 minutes for new MP4 uploads under each artist’s folder',
      'Deduplicates against the artist’s own library via ACRCloud (not the global commercial catalog)',
      'Detects AI-generated audio fingerprints via ACRCloud’s identify response',
      'Pitch-preserving tempo stretch to 5:00–5:10 with FFmpeg’s rubberband filter',
      'Layers Freeverb-algorithm reverb (SoX) and outputs a clean WAV + extended MP4 + thumbnail',
      'Logs every status transition to the artist’s tab in a shared Google Sheet (16-column schema)',
    ],
    engineering: [
      {
        challenge: 'Pitch-preserving tempo stretch (not speed change)',
        solution:
          'FFmpeg with the rubberband filter for studio-grade pitch-preserving time-stretch. The pipeline computes the exact tempo factor for each input to land in the 5:00–5:10 target window, with an atempo chain fallback for builds where rubberband isn’t compiled in.',
      },
      {
        challenge: 'Dedup that respects the artist’s own library, not Spotify-style global match',
        solution:
          'ACRCloud’s custom-bucket identify, not their global commercial catalog. The pipeline parses only metadata.custom_files[] matches as duplicates and explicitly ignores metadata.music[] (commercial catalog) matches. Every successfully processed song is uploaded to the artist’s bucket, making the dedup library self-populating.',
      },
      {
        challenge: 'Heavy media processing on a small VPS',
        solution:
          'Hetzner CPX21 ($14/mo, 3 vCPU, 4GB RAM, 2GB swap as a safety net for FFmpeg spikes). SplitInBatches set to 1 so the workflow processes one MP4 at a time — the CPU never gets pinned, and a single oversized upload can’t cascade. The Docker image pins n8n 1.110.0 (the last release before n8n switched to Hardened Images, which strip apk and break the FFmpeg + rubberband + SoX install step).',
      },
    ],
    meta: {
      title: 'Case study: Autonomous music asset pipeline',
      description:
        'How we replaced a Zapier copy job, an n8n logger, and a manual studio step with a single autonomous pipeline that ingests every MP4 upload, dedups against the artist’s library, runs pitch-preserving tempo stretch and Freeverb reverb, and logs to Google Sheets — running on a $14/mo VPS.',
    },
  },
  {
    slug: 'finance-options-trading-agent',
    industry: 'Finance & Investing',
    metric: '300+ trades',
    metricLabel: 'Executed unattended',
    headline:
      'An autonomous trading agent. No human in the loop.',
    preview:
      'Trading from a Discord alerts feed used to mean sitting at the screen all day. Now an autonomous agent monitors the feed, applies a strict risk-sizing policy, and executes the trade — signal to filled order in seconds, with no human in the loop.',
    body: [
      'A retail options trader was trading from a paid Discord alerts channel — every signal came in as a text line like "BOUGHT SPY 4/11 520C @ 1.50" and had to be acted on fast, before the underlying moved and the contract repriced. That meant sitting at the screen during market hours, copy-pasting strikes and expiries into a broker, and hoping the manual entry didn’t slip. The trader was the bottleneck — slow when distracted, gone at lunch, and prone to break the sizing rules under excitement. Missed alerts were lost edge. Wrong sizing was lost discipline.',
      'We built an autonomous trading agent that runs the full perceive–decide–act loop without the trader. It listens to one specific author in one Discord channel, parses every BOUGHT and SOLD line the moment it lands, applies the trader’s risk policy (max 5% of equity per trade, 8–10% portfolio exposure cap, special sizing for lotto-style follow-on trades) — including the decision to skip a trade when exposure is maxed or the policy can’t justify it — then submits a market order through Alpaca. Edited Discord messages get reconciled in real time without double-trading. Partial sells ("1/4 position", "ALL OUT") translate cleanly to contract counts. The trader is no longer in the loop; the agent runs it.',
      'Over 300 trades have now run through the agent end-to-end — every alert parsed, sized against policy, and submitted in seconds, with zero manual entry. The trader is off the screen. The discipline is enforced in code, not willpower. And no signal goes unseen because someone was on a call.',
    ],
    mock: 'csv-to-pipeline',
    relatedServices: ['custom-software', 'data-infrastructure'],
    buildName: 'Trading Agent',
    buildType: 'Agent',
    buildSummary:
      'Autonomous trading agent: monitors a Discord signal feed, applies a strict risk policy, and executes options orders through Alpaca with no human in the loop.',
    techStack: ['Python', 'discord.py', 'Alpaca API', 'Railway', 'SQLite'],
    capabilities: [
      'Watches a designated Discord channel for one signal author',
      'Parses BOUGHT and SOLD signals, including multi-line batches',
      'Sizes positions against a strict risk policy (5% / 8–10% caps)',
      'Applies special sizing rules for "lotto"-style follow-on trades',
      'Reconciles edited Discord messages without double-trading',
      'Submits market orders through Alpaca; tracks P&L and exposure in real time',
    ],
    engineering: [
      {
        challenge: 'Handling edited Discord messages without double-trading',
        solution:
          'Each successfully executed signal is keyed by action, ticker, strike, and option type and stored per message ID. When a message gets edited, only signals that haven’t already succeeded re-execute — corrections flow through, dupes get blocked.',
      },
      {
        challenge: 'Risk decisions ready the millisecond a signal lands',
        solution:
          'A background task refreshes account equity, buying power, and current exposure every 60 seconds. When a signal arrives, the sizing math runs against pre-warmed state instead of waiting on a slow API round-trip.',
      },
      {
        challenge: 'Sizing "lotto" follow-on trades against prior profits',
        solution:
          'Realized P&L is tracked per ticker as positions close. When a "lotto" or "roll up" signal arrives, the agent looks up the most recent closed trade’s profit for that ticker and caps the new position at 35% of it — never more than 5% of equity.',
      },
    ],
    meta: {
      title: 'Case study: Autonomous trading agent for Discord-driven options signals',
      description:
        'How we built an autonomous trading agent that monitors a Discord alerts feed, applies a strict risk policy, and executes options orders through Alpaca — 300+ trades run end-to-end with no human in the loop.',
    },
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export function getCaseStudiesForService(
  service: ServiceSlug,
): CaseStudy[] {
  return caseStudies.filter((c) => c.relatedServices.includes(service))
}
