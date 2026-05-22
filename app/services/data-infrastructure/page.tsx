import Nav from '@/components/nav'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import FAQ from '@/components/faq'
import Link from 'next/link'
import type { Metadata } from 'next'
import ServiceCaseStudies from '@/components/service-case-studies'

export const metadata: Metadata = {
  title: 'Data Infrastructure & Workflow Automation Services',
  description: 'Data pipeline development, workflow automation, system integrations, and reporting infrastructure. Duality Labs builds data systems that run themselves.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/services/data-infrastructure',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Data Infrastructure & Workflow Automation',
  description: 'Data pipeline development, workflow automation, system integrations, and reporting infrastructure.',
  provider: { '@type': 'Organization', name: 'Duality Labs', url: 'https://www.dualitylabs.ai' },
  areaServed: { '@type': 'Country', name: 'United States' },
  url: 'https://www.dualitylabs.ai/services/data-infrastructure',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dualitylabs.ai' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.dualitylabs.ai/services' },
    { '@type': 'ListItem', position: 3, name: 'Data Infrastructure', item: 'https://www.dualitylabs.ai/services/data-infrastructure' },
  ],
}

const faqs = [
  {
    question: 'What is data infrastructure and why does it matter?',
    answer: 'Data infrastructure refers to the systems that collect, move, store, transform, and serve your business data. Strong data infrastructure means your team has accurate, timely data without manual effort — enabling better decisions, automated workflows, and reliable reporting. Poor data infrastructure means spreadsheets, manual exports, and decisions based on stale information.',
  },
  {
    question: 'What kind of workflows can you automate?',
    answer: 'We automate data-heavy, repetitive workflows — report generation, data entry and extraction, lead routing, invoice processing, customer onboarding sequences, inventory updates, cross-system synchronization, and more. If your team is spending hours on manual data work, there is almost certainly a way to automate it.',
  },
  {
    question: 'Can you integrate with our existing tools and systems?',
    answer: 'Yes. We integrate with CRMs (Salesforce, HubSpot), ERPs, accounting software, databases, APIs, spreadsheets, email platforms, and custom internal tools. If a system has an API or can export data, we can connect it into an automated pipeline.',
  },
  {
    question: 'How do you handle data quality and reliability?',
    answer: 'We build data validation, error handling, and alerting into every pipeline. This includes schema validation, duplicate detection, null handling, retry logic for failed operations, and monitoring dashboards so you know immediately if something goes wrong. Reliable data systems require defensive engineering — not just happy-path code.',
  },
  {
    question: 'Do you build dashboards and reporting tools?',
    answer: 'Yes. We build custom reporting dashboards, automated report generation systems, and data visualization tools. Whether you need a real-time operational dashboard, automated weekly reports delivered via email, or a self-service analytics portal for your team, we design and build reporting infrastructure that gives you the insights you need without manual effort.',
  },
]

export default function DataInfrastructurePage() {
  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {/* Hero */}
        <section className="relative py-16 sm:py-20 md:py-24 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3 sm:mb-4">
              Data Infrastructure
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-4 sm:mb-6">
              Data Infrastructure & Workflow Automation
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              We architect data pipelines, automate complex workflows, and build integrations that connect your systems. Eliminate manual processes and let your infrastructure scale with your business.
            </p>
          </div>
        </section>

        {/* What we build */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 tracking-tight">
              What We Build
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Data Pipelines</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  End-to-end data pipelines that extract data from source systems, transform it for analysis or operational use, and load it into your data warehouse or application databases. We build both batch and real-time pipelines depending on your latency requirements, with proper error handling, data validation, and monitoring built in.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Workflow Automation</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Complex business workflows automated end to end — lead routing and follow-up sequences, invoice processing, customer onboarding, report generation and distribution, inventory management, and cross-system data synchronization. We identify the manual, repetitive processes that consume your team's time and replace them with reliable automated systems.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">System Integrations</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Your business runs on multiple systems — CRM, accounting, project management, communication tools, databases. We build integrations that keep them synchronized, eliminate duplicate data entry, and ensure your team is always working from a single source of truth. We work with APIs, webhooks, database connections, and file-based integrations.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Reporting & Analytics Infrastructure</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Custom dashboards, automated reports, and analytics infrastructure that give your team the data they need without manual effort. We build real-time operational dashboards, scheduled report generation, self-service analytics tools, and KPI tracking systems — all connected directly to your data sources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 tracking-tight">
              Why Data Infrastructure Matters
            </h2>
            <div className="space-y-6 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>
                Most growing businesses hit a point where their data systems become a bottleneck. Reports take hours to compile manually. Teams copy data between spreadsheets. Critical information lives in someone's inbox or a disconnected tool. Decisions are made on incomplete or stale data because getting the right numbers is too slow.
              </p>
              <p>
                Strong data infrastructure eliminates these problems. It ensures data flows automatically between systems, reports generate themselves, and your team has accurate, real-time information without manual effort. This is also the foundation for AI and machine learning — you cannot build intelligent systems without reliable data.
              </p>
              <p>
                We have seen data automation projects deliver 10x to 50x ROI within the first quarter — not through complex technology, but by eliminating the hours of manual work your highest-paid people spend on data tasks every week.
              </p>
            </div>
          </div>
        </section>

        {/* Integration examples */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 tracking-tight">
              Systems We Integrate With
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Salesforce, HubSpot, and custom CRMs',
                'QuickBooks, Xero, and accounting platforms',
                'PostgreSQL, MySQL, MongoDB databases',
                'REST APIs and GraphQL endpoints',
                'Google Workspace and Microsoft 365',
                'Slack, email, and communication tools',
                'AWS, GCP, and cloud services',
                'Custom internal tools and legacy systems',
              ].map((system, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-text-secondary">{system}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <ServiceCaseStudies service="data-infrastructure" />

        {/* Related content */}
        <section className="relative py-12 sm:py-16 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 tracking-tight">Related Resources</h2>
            <div className="space-y-3">
              <Link href="/services/ai-ml" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">AI & Machine Learning Systems</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Build on your data infrastructure with intelligent AI systems.</p>
              </Link>
              <Link href="/blog/how-to-automate-business-with-ai" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">How to Automate Your Business with AI</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">A practical guide to identifying and automating your highest-value workflows.</p>
              </Link>
              <Link href="/services/custom-software" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">Custom Software & Product Engineering</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Custom applications that leverage your data infrastructure.</p>
              </Link>
            </div>
          </div>
        </section>

        <FAQ items={faqs} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
