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
  testimonial: {
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
    slug: 'msp-ticket-triage',
    industry: 'MSP',
    metric: '8 min → <1 min',
    metricLabel: 'Time to first touch',
    headline:
      'Tickets routed and replied to before the engineer opens Slack.',
    preview:
      'Inbound tickets used to sit in a queue for 8–12 minutes before triage. Now AI categorizes, scores, and routes them — most get a first reply in under 60 seconds.',
    body: [
      'A managed service provider was running their support desk on a generic ticketing tool. Tickets came in via email, ConnectWise, and chat. Engineers manually triaged each one — categorized, prioritized, assigned. Average time-to-first-touch sat around 8–12 minutes during peak hours, with longer waits at night.',
      'We built an AI triage layer on top of their existing ConnectWise instance. Every inbound ticket gets categorized (incident vs. request vs. project), severity-scored, and routed to the right engineer pool. Common knowns — password resets, VPN issues, the usual — get an automated first response with resolution steps. Anything ambiguous goes to a human, but with a rich pre-fill so the engineer starts with context, not from zero.',
      'Time-to-triage went from 8–12 minutes down to under one. Engineers spend less time sorting and more time solving. Customer satisfaction scores climbed in the first quarter.',
    ],
    mock: 'spreadsheet-to-dashboard',
    relatedServices: ['ai-ml', 'data-infrastructure'],
    buildName: 'Triage Engine',
    buildType: 'Automation',
    buildSummary:
      'AI categorization, severity scoring, and auto-routing for inbound tickets across email, ConnectWise, and chat.',
    techStack: ['n8n', 'OpenAI', 'ConnectWise API', 'Postgres'],
    testimonial: {
      quote:
        'My engineers stopped feeling like dispatchers. They actually do the work they were hired for now.',
      attribution: 'Operations Manager · MSP',
    },
    meta: {
      title: 'Case study: MSP ticket triage automation',
      description:
        'How we replaced manual ticket triage with an AI-powered routing layer that cuts time-to-first-touch from 8–12 minutes to under one.',
    },
  },
  {
    slug: 'logistics-dispatch-routing',
    industry: 'Transportation & Logistics',
    metric: '+32% loads/day',
    metricLabel: 'Same fleet, more capacity',
    headline:
      'From phone-tag dispatch to one-click load assignment.',
    preview:
      'Their dispatcher used to call drivers, check positions, and assign loads manually all day. Now the system optimizes routes and assigns loads in seconds.',
    body: [
      'A regional freight company was running dispatch out of a whiteboard, a spreadsheet, and a lot of phone calls. Their dispatcher would check driver locations, available capacity, and customer pickup windows manually — load by load. The whole day was reactive. Some drivers sat idle while others were overbooked.',
      'We built a dispatch engine that pulls from their telematics provider, customer order system, and a route optimizer with capacity and time-window constraints. Loads get auto-assigned to the optimal driver. The dispatcher reviews and confirms with one click, or overrides if they have local context the system can’t see.',
      'The same fleet now moves 32% more loads per day. The dispatcher is no longer a bottleneck — they’re a quality-control layer.',
    ],
    mock: 'csv-to-pipeline',
    relatedServices: ['data-infrastructure', 'custom-software'],
    buildName: 'Dispatch Optimizer',
    buildType: 'App',
    buildSummary:
      'Real-time, fleet-aware dispatch with route optimization, telematics integration, and one-click load assignment.',
    techStack: ['Next.js', 'Mapbox', 'Samsara API', 'Postgres'],
    testimonial: {
      quote: 'It’s like adding three trucks to the fleet without buying any.',
      attribution: 'Director of Operations · Regional freight carrier',
    },
    meta: {
      title: 'Case study: Transportation & logistics dispatch automation',
      description:
        'How we cut dispatch overhead and grew fleet capacity 32% for a regional freight carrier through real-time route optimization and load auto-assignment.',
    },
  },
  {
    slug: 'media-rights-management',
    industry: 'Media, Music & Advertising',
    metric: '$1.4M recovered',
    metricLabel: 'Underreported royalties surfaced',
    headline:
      'Every stream, every territory, every payout — accounted for.',
    preview:
      'Royalty statements from 12+ DSPs and aggregators arrived in different formats, weeks apart. Now everything flows into one ledger with full audit trail.',
    body: [
      'An independent music label was tracking royalties across 12+ DSPs (Spotify, Apple Music, Tidal, and regional aggregators). Each provider sent statements in their own format, on their own schedule, with their own quirks. Reconciling artist payouts every quarter took two staff a full week — and was still error-prone.',
      'We built a centralized rights and royalty ledger that ingests every report (CSV, XML, custom format), normalizes against the label’s catalog, splits by contract terms, and produces artist-ready statements automatically. Every cent traceable from DSP report to artist payout.',
      'In the first 18 months, the system surfaced $1.4M in royalties that had been underreported or missing across providers — money that would have stayed lost. Quarterly close went from a week down to half a day.',
    ],
    mock: 'docs-to-report',
    relatedServices: ['custom-software', 'data-infrastructure'],
    buildName: 'Royalty Ledger',
    buildType: 'App',
    buildSummary:
      'Multi-format royalty ingestion, contract-aware splits, and artist-ready statement generation across 12+ DSPs.',
    techStack: ['Next.js', 'Postgres', 'Stripe Connect', 'AWS S3'],
    testimonial: {
      quote:
        'We’re catching money we would have missed. And our artists trust us more.',
      attribution: 'Head of Operations · Independent label',
    },
    meta: {
      title: 'Case study: Media & music royalty management',
      description:
        'How we built a centralized royalty ledger that surfaced $1.4M in underreported income for an independent music label.',
    },
  },
  {
    slug: 'finance-compliance-reporting',
    industry: 'Finance & Investing',
    metric: '0 late filings',
    metricLabel: 'Compliance cycle since launch',
    headline:
      'Regulatory filings, generated and submitted on time, every time.',
    preview:
      'Manual filing prep used to cause stress and overtime every quarter. Now the system pulls fresh data, applies the right rules per jurisdiction, and submits on schedule.',
    body: [
      'A wealth management firm was responsible for hundreds of regulatory filings every quarter — Form ADV, state registrations, custody reports, and more. Each had its own rule set, its own deadlines, its own data requirements. The compliance team was stretched thin and the firm had paid late-filing penalties more than once.',
      'We built a compliance reporting engine connected to their portfolio system, custodian data, and CRM. Every filing pulls fresh data on schedule, applies the appropriate rule set per jurisdiction, generates the form, and routes for one-click approval. Submissions happen automatically once approved.',
      'No late filings in the 18 months since launch. The compliance team’s workload dropped by half — and they spent that time on actual risk review instead of form-filling.',
    ],
    mock: 'spreadsheet-to-dashboard',
    relatedServices: ['custom-software', 'data-infrastructure'],
    buildName: 'Compliance Engine',
    buildType: 'App',
    buildSummary:
      'Jurisdiction-aware regulatory filing generation with portfolio data integration and automated submission.',
    techStack: ['Next.js', 'Postgres', 'AWS Lambda', 'Schwab API'],
    testimonial: {
      quote:
        'For the first time in my career, I sleep through a Friday filing deadline.',
      attribution: 'Chief Compliance Officer · Wealth management firm',
    },
    meta: {
      title: 'Case study: Finance compliance reporting automation',
      description:
        'How we automated regulatory filings across multiple jurisdictions for a wealth management firm — zero late filings in 18 months.',
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
