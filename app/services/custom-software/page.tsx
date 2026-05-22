import Nav from '@/components/nav'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import FAQ from '@/components/faq'
import Link from 'next/link'
import type { Metadata } from 'next'
import ServiceCaseStudies from '@/components/service-case-studies'

export const metadata: Metadata = {
  title: 'Custom Software Development — Miami',
  description: 'Custom web applications, APIs, internal tools, and product engineering. Duality Labs builds production-ready software designed for scale. Based in Miami, serving businesses nationwide.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/services/custom-software',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom Software Development',
  description: 'Custom web applications, APIs, internal tools, and product engineering. Duality Labs builds production-ready software designed for scale.',
  provider: { '@type': 'Organization', name: 'Duality Labs', url: 'https://www.dualitylabs.ai' },
  areaServed: { '@type': 'Country', name: 'United States' },
  url: 'https://www.dualitylabs.ai/services/custom-software',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dualitylabs.ai' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.dualitylabs.ai/services' },
    { '@type': 'ListItem', position: 3, name: 'Custom Software', item: 'https://www.dualitylabs.ai/services/custom-software' },
  ],
}

const faqs = [
  {
    question: 'What kind of custom software does Duality Labs build?',
    answer: 'We build web applications, APIs, internal tools, admin dashboards, customer-facing platforms, and data-driven products. Our stack is modern — React, Next.js, Node.js, Python, PostgreSQL — and every project is engineered for production from day one.',
  },
  {
    question: 'How is working with Duality Labs different from hiring a freelancer or dev shop?',
    answer: 'We combine deep technical expertise with business thinking. Both co-founders are hands-on in every project — from scoping and architecture to implementation and deployment. You get senior-level engineering without the overhead of managing a team, and we stay involved after launch to ensure everything keeps running.',
  },
  {
    question: 'How long does a typical custom software project take?',
    answer: 'It depends on scope, but most projects follow a phased approach. An MVP or first working version typically ships within 4 to 8 weeks. We build in focused sprints with regular check-ins so you see progress continuously and can steer direction as needed.',
  },
  {
    question: 'Can you work with our existing codebase or tech stack?',
    answer: 'Yes. We regularly integrate with and extend existing systems. Whether you need features added to an existing application, a legacy system modernized, or a new tool built to integrate with your current stack, we adapt to your environment.',
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes. We offer ongoing maintenance and support packages to handle bug fixes, feature additions, performance optimization, and infrastructure management. We stick around after launch to make sure your software keeps running smoothly as your business grows.',
  },
]

export default function CustomSoftwarePage() {
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
              Custom Software
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-4 sm:mb-6">
              Custom Software & Product Engineering
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              We design and build custom web applications, platforms, APIs, and internal tools. Whether you are launching a new product or modernizing legacy systems, we deliver production-ready software engineered for scale.
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
                <h3 className="text-lg sm:text-xl font-medium mb-2">Web Applications & Platforms</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Full-stack web applications built with modern frameworks — React, Next.js, Node.js, Python. From customer-facing platforms and SaaS products to operational dashboards and admin panels, we build applications that are fast, reliable, and designed to scale with your business.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Internal Tools & Admin Systems</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Off-the-shelf tools rarely fit how your team actually works. We build custom internal tools — CRMs, reporting dashboards, workflow management systems, data entry platforms — that match your exact processes. The result is less context-switching, fewer workarounds, and more time spent on work that matters.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">APIs & Backend Services</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Robust APIs and backend services that connect your systems, power your products, and handle data reliably at scale. We design REST and GraphQL APIs with proper authentication, rate limiting, error handling, and documentation — built to be consumed by your frontend, mobile apps, or third-party integrations.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">MVP & Product Development</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Launching a new product? We help founders and product teams go from concept to working software fast. We scope features ruthlessly, build focused MVPs, and iterate based on real user feedback. The goal is to get a working product in front of users as quickly as possible — then improve it based on what you learn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our process */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 tracking-tight">
              Our Process
            </h2>
            <div className="space-y-6 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>
                Every project starts with discovery. We dig into your workflows, your existing systems, and the specific problem you are trying to solve. This is not a checkbox exercise — it is how we make sure we are building the right thing, not just building something.
              </p>
              <p>
                From there, we define clear deliverables and a phased roadmap. We build in focused sprints — usually one to two weeks each — with regular demos and feedback sessions. You see working software early and often, not after months of development behind closed doors.
              </p>
              <p>
                We write clean, well-tested, well-documented code that your team can maintain and extend. When we hand off a project, you get a system that is production-ready, not a prototype that needs months of additional work to actually use.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 tracking-tight">
              Technology Stack
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { category: 'Frontend', tools: 'React, Next.js, TypeScript, Tailwind CSS' },
                { category: 'Backend', tools: 'Node.js, Python, FastAPI, Express' },
                { category: 'Databases', tools: 'PostgreSQL, MongoDB, Redis, Supabase' },
                { category: 'Infrastructure', tools: 'AWS, Vercel, Docker, GitHub Actions' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg border border-border">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">{item.category}</span>
                  <p className="text-sm text-text-secondary mt-2">{item.tools}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related content */}
        <section className="relative py-12 sm:py-16 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 tracking-tight">Related Services</h2>
            <div className="space-y-3">
              <Link href="/services/ai-ml" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">AI & Machine Learning Systems</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Add intelligence to your software with custom AI and ML.</p>
              </Link>
              <Link href="/services/data-infrastructure" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">Data Infrastructure & Automation</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Connect systems, automate workflows, and build data pipelines.</p>
              </Link>
              <Link href="/blog/build-vs-buy-ai-solutions" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">Build vs Buy: Making the Right Choice for AI Solutions</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">A framework for deciding when to build custom vs use off-the-shelf.</p>
              </Link>
            </div>
          </div>
        </section>

        <ServiceCaseStudies service="custom-software" />

        <FAQ items={faqs} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
