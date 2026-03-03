import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Process from '@/components/process'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Keyword-rich intro section */}
        <section className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-4 sm:mb-6 tracking-tight text-center">
              AI Automation & Custom Software for Growing Businesses
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>
                Duality Labs is a Miami-based AI automation and custom software development agency. We partner with growing businesses — from operations-heavy companies and agencies to real estate firms and finance teams — to build the internal tools, AI systems, and data infrastructure they need to scale without hiring a full engineering team.
              </p>
              <p>
                Our services span three core areas: <Link href="/services/custom-software" className="text-accent hover:underline">custom software and product engineering</Link>, <Link href="/services/ai-ml" className="text-accent hover:underline">AI and machine learning systems</Link> including LLM fine-tuning, custom model training, and AI agent development, and <Link href="/services/data-infrastructure" className="text-accent hover:underline">data infrastructure and workflow automation</Link> that eliminates manual processes and connects your systems.
              </p>
              <p>
                Every engagement starts with a deep understanding of your operations. We scope clear deliverables, build in focused sprints, and ship production-ready systems designed for reliability and scale. Whether you need an AI-powered lead response tool, an automated reporting pipeline, or a custom internal platform, we bring the technical depth to deliver — and stick around after launch to make sure everything keeps running.
              </p>
            </div>
          </div>
        </section>

        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
