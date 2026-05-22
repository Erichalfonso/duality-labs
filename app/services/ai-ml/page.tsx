import Nav from '@/components/nav'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import FAQ from '@/components/faq'
import Link from 'next/link'
import type { Metadata } from 'next'
import ServiceCaseStudies from '@/components/service-case-studies'

export const metadata: Metadata = {
  title: 'AI & Machine Learning Development Services',
  description: 'Custom AI agent development, LLM fine-tuning, ML pipeline engineering, and production AI systems. Duality Labs builds AI that works in the real world.',
}

const faqs = [
  {
    question: 'What types of AI systems does Duality Labs build?',
    answer: 'We build production AI systems including custom AI agents, LLM-powered workflows, fine-tuned language models, ML pipelines for prediction and classification, computer vision systems, and intelligent automation tools. Every system is designed for reliability, observability, and real-world performance.',
  },
  {
    question: 'How long does it take to build a custom AI solution?',
    answer: 'Most AI projects follow a phased approach. An initial proof-of-concept or MVP typically takes 2 to 4 weeks. From there, production hardening, integration, and scaling usually take another 4 to 8 weeks depending on complexity. We ship incrementally so you see working results early.',
  },
  {
    question: 'Do you work with existing AI tools or only build custom models?',
    answer: 'Both. We evaluate whether off-the-shelf APIs, fine-tuned models, or fully custom-trained models are the right fit for your use case. Often the best solution combines foundation models like GPT-4 or Claude with custom fine-tuning, retrieval-augmented generation, or domain-specific pipelines.',
  },
  {
    question: 'What does LLM fine-tuning involve?',
    answer: 'LLM fine-tuning adapts a pre-trained language model to your specific domain, tone, or task. We handle data preparation, training infrastructure, evaluation, and deployment. Fine-tuning is ideal when you need consistent outputs for specialized tasks like document extraction, classification, or domain-specific generation.',
  },
  {
    question: 'How do you ensure AI systems are reliable in production?',
    answer: 'We build observability into every AI system from day one — logging inputs, outputs, confidence scores, and latency for every decision. We include human-in-the-loop checkpoints where appropriate, implement fallback strategies, and set up monitoring and alerting so issues are caught before they impact your business.',
  },
]

export default function AIMLPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative py-16 sm:py-20 md:py-24 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3 sm:mb-4">
              AI & Machine Learning
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-4 sm:mb-6">
              AI & Machine Learning Systems That Work in Production
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              We build and deploy AI systems that solve real problems — from fine-tuning LLMs and training custom models to building ML pipelines and intelligent agents that integrate directly into your existing workflows.
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
                <h3 className="text-lg sm:text-xl font-medium mb-2">Custom AI Agents</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Autonomous AI agents that handle complex, multi-step tasks — lead qualification, document processing, customer support triage, data extraction, and more. We build agents with clear decision boundaries, human-in-the-loop checkpoints, and comprehensive logging so every action is traceable and auditable.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">LLM Fine-Tuning & Custom Models</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Off-the-shelf models get you 80% of the way there. Fine-tuning gets you to production-grade. We prepare training datasets, fine-tune foundation models on your domain-specific data, evaluate performance rigorously, and deploy with proper versioning and rollback capabilities. The result is a model that understands your business, your terminology, and your quality bar.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">ML Pipelines & Infrastructure</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Production ML is more than a model — it is an entire system. We build end-to-end ML pipelines that handle data ingestion, feature engineering, model training, evaluation, deployment, and monitoring. Whether you need batch prediction, real-time inference, or a hybrid approach, we architect the infrastructure to support it reliably at scale.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Retrieval-Augmented Generation (RAG)</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  RAG systems let your AI reference your actual data — documents, knowledge bases, product catalogs, support tickets — when generating responses. We build RAG pipelines with vector databases, semantic search, and reranking to ensure your AI gives answers grounded in real, up-to-date information rather than hallucinated content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our approach */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 tracking-tight">
              How We Approach AI Projects
            </h2>
            <div className="space-y-6 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>
                Every AI project starts with a clear business outcome — not a technology choice. We work backward from the result you need to determine the right architecture, model approach, and integration strategy. This keeps projects focused and prevents the common trap of building impressive technology that does not actually move the needle.
              </p>
              <p>
                We build incrementally. The first milestone is a working proof-of-concept validated against real data, usually within two to four weeks. From there, we harden for production — adding error handling, observability, edge case coverage, and integration with your existing systems. You see progress continuously, not after months of development.
              </p>
              <p>
                Observability is built in from day one. Every AI decision is logged with inputs, outputs, confidence scores, and latency. This gives you full visibility into how your AI systems are performing and provides the data needed to continuously improve them over time.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 tracking-tight">
              Common Use Cases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Automated lead qualification and response',
                'Document extraction and processing',
                'Customer support triage and routing',
                'Content generation with brand voice',
                'Predictive analytics and forecasting',
                'Invoice and receipt data extraction',
                'Intelligent search across internal docs',
                'Automated reporting and insights',
              ].map((useCase, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-text-secondary">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <ServiceCaseStudies service="ai-ml" />

        {/* Related content */}
        <section className="relative py-12 sm:py-16 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 tracking-tight">Related Resources</h2>
            <div className="space-y-3">
              <Link href="/blog/building-ai-agents" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">Building AI Agents That Actually Ship Value</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Lessons from deploying production AI automation systems.</p>
              </Link>
              <Link href="/blog/what-is-llm-fine-tuning" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">What Is LLM Fine-Tuning?</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">A practical guide to when and how to fine-tune language models.</p>
              </Link>
              <Link href="/services/data-infrastructure" className="block p-4 rounded-lg border border-border hover:border-accent transition-colors">
                <span className="text-sm sm:text-base font-medium text-accent">Data Infrastructure & Automation Services</span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">The data systems that power production AI.</p>
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
