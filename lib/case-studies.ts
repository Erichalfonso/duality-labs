export type MockKind =
  | 'spreadsheet-to-dashboard'
  | 'csv-to-pipeline'
  | 'docs-to-report'

export type ServiceSlug = 'ai-ml' | 'custom-software' | 'data-infrastructure'

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
    slug: 'real-estate-lead-routing',
    industry: 'Real estate brokerage',
    metric: '40+ hrs/wk',
    metricLabel: 'Lead triage saved',
    headline:
      'From 4-source spreadsheet hell to single-pane lead routing.',
    preview:
      'Leads from 4 sources used to land in different inboxes and a shared sheet. Now they auto-route to the right agent and the first response goes out in under 60 seconds.',
    body: [
      'A regional brokerage was generating leads from Zillow, Realtor.com, Facebook Lead Ads, and their own website. Each source dropped into a different inbox or partner CRM. An ops coordinator copy-pasted everything into a master spreadsheet, then texted agents one by one — best case, leads got a response in a few hours; worst case, they fell through entirely.',
      'We built a routing layer that ingests every source in real time, deduplicates against past contacts, scores by intent, and assigns to the right agent based on geography and current workload. The agent gets a notification with full context. The lead gets a personalized first response from the brokerage in under 60 seconds.',
      'The ops coordinator now spends those 40+ hours a week on retention and recruiting instead of triage. Lead-to-conversation rate roughly doubled in the first quarter.',
    ],
    mock: 'spreadsheet-to-dashboard',
    relatedServices: ['ai-ml', 'data-infrastructure'],
    testimonial: {
      quote:
        'They didn’t just automate our chaos — they understood it first. The system thinks the way our best agents do.',
      attribution: 'Director of operations · Real estate brokerage',
    },
    meta: {
      title: 'Case study: Real estate lead routing automation',
      description:
        'How we eliminated 40+ hours per week of manual lead triage for a regional real estate brokerage and cut lead response time to under 60 seconds.',
    },
  },
  {
    slug: 'ecommerce-order-reconciliation',
    industry: 'E-commerce',
    metric: '~2,400/mo',
    metricLabel: 'Orders auto-reconciled',
    headline: 'Order ops that run while you sleep.',
    preview:
      'Manual CSV exports and matching across Shopify, fulfillment, and accounting — replaced with a 15-minute pipeline. Humans only see exceptions.',
    body: [
      'A fast-growing DTC brand was running their entire post-purchase ops out of CSV exports. Someone pulled orders from Shopify, downloaded fulfillment confirmations from their 3PL, and reconciled both against accounting line by line. Errors compounded. Refunds got missed. The owner spent half her Sunday catching up the books.',
      'We replaced the manual loop with a pipeline that runs every 15 minutes. Orders, fulfillment events, and payouts flow into a single normalized data layer. Matching happens automatically. Anomalies — a missing tracking number, a payout that doesn’t reconcile, a refund that hasn’t been issued — get surfaced in a focused exceptions queue instead of buried in a spreadsheet.',
      'Today around 2,400 orders a month flow through with zero human touch. The team handles the small percentage that actually need eyes — and finishes by lunch.',
    ],
    mock: 'csv-to-pipeline',
    relatedServices: ['data-infrastructure', 'custom-software'],
    testimonial: {
      quote:
        'It’s the difference between Monday-morning panic and Monday-morning coffee.',
      attribution: 'COO · DTC e-commerce brand',
    },
    meta: {
      title: 'Case study: E-commerce order reconciliation',
      description:
        'How we replaced manual CSV reconciliation with an automated pipeline that processes ~2,400 orders per month without human intervention.',
    },
  },
  {
    slug: 'service-reporting-automation',
    industry: 'Service business',
    metric: '3d → 20m',
    metricLabel: 'Report generation',
    headline: 'End-of-engagement reports in 20 minutes flat.',
    preview:
      'Pulling data from 5 dashboards into a Google Doc used to take 3 days. Now one click generates a branded PDF.',
    body: [
      'A professional services firm closed every client engagement with a final report — pulling numbers from 5 different dashboards, screenshotting charts, pasting them into a Google Doc, writing the narrative, exporting a PDF, and sending it. Three days of work per report. Multiply that by every client every month.',
      'We built a reporting service that pulls live data from each source on demand, applies the firm’s narrative templates, renders charts in their brand style, and produces a branded PDF on a click. The narrative is editable — the data, layout, and styling aren’t. Reports come out consistent every time.',
      'A 3-day production process is now 20 minutes — most of which is the senior reviewer reading it. The team got their week back, and clients started getting reports faster than ever.',
    ],
    mock: 'docs-to-report',
    relatedServices: ['custom-software', 'data-infrastructure'],
    testimonial: {
      quote:
        'What used to eat half my week now runs while I sleep. Our clients think we hired more people.',
      attribution: 'Founder · Professional services firm',
    },
    meta: {
      title: 'Case study: Automated client reporting',
      description:
        'How we cut end-of-engagement reporting from 3 days to 20 minutes for a professional services firm.',
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
