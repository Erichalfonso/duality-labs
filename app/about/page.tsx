import Nav from '@/components/nav'
import PageHeader from '@/components/page-header'
import Footer from '@/components/footer'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Duality Labs',
  description: 'Miami-based AI agency founded by CS and economics experts. Duality Labs builds custom AI automation and software systems for growing businesses.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="About us"
          title="Two brothers, one mission"
          description="We started Duality Labs to help businesses move faster with AI and automation — without needing a full in-house engineering team."
        />

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="space-y-10 sm:space-y-14">

              {/* Who we are */}
              <div>
                <h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 tracking-tight">Who we are</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  Duality Labs was co-founded by Erich Alfonso and Alejandro Alfonso out of Miami, Florida. Erich studied Computer Science and Mathematics. Alejandro studied Economics. Together, we bring both the technical depth and the business thinking needed to build systems that actually move the needle — not just technically, but financially.
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
                  We stay hands-on from start to finish. Whether it is scoping a project, designing the architecture, or working directly with a client to understand their operations — we are in it at every stage.
                </p>

                {/* Team photos */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                      <Image
                        src="/team/erich.jpg"
                        alt="Erich Alfonso, Co-founder"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="font-medium text-sm sm:text-base text-accent">Erich Alfonso</p>
                      <p className="text-xs sm:text-sm text-text-secondary">Co-founder &middot; CS & Mathematics</p>
                    </div>
                  </div>
                  <div>
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                      <Image
                        src="/team/alejandro.jpg"
                        alt="Alejandro Alfonso, Co-founder"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="font-medium text-sm sm:text-base text-accent">Alejandro Alfonso</p>
                      <p className="text-xs sm:text-sm text-text-secondary">Co-founder &middot; Economics</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why we started this */}
              <div>
                <h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 tracking-tight">Why we started this</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  AI and modern software are evolving faster than most businesses can realistically keep up with. We kept seeing the same pattern: teams stuck doing manual work, juggling disconnected tools, and missing opportunities — not because they lacked ideas, but because they lacked engineering capacity.
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Duality Labs exists to close that gap. We give growing businesses access to custom AI and automation without the cost, risk, or overhead of building a full in-house engineering team. No off-the-shelf products. No cookie-cutter solutions. Just software built specifically for how your business works.
                </p>
              </div>

              {/* What changes */}
              <div>
                <h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 tracking-tight">What actually changes</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  Every business runs differently. That is why we start every engagement with a deep dive into your systems, workflows, and tech stack before writing a single line of code. We want to understand how your team actually operates — not just what tools you use.
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  From there, we scope clear deliverables, build in focused sprints, and keep you in the loop the entire way. No black boxes. No six-month timelines before you see results. We ship fast, iterate based on real feedback, and stick around after launch to make sure everything keeps running.
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  The result: fewer manual hours, cleaner data, fewer tools, fewer mistakes, and a team that can focus on the work that actually grows the business.
                </p>
              </div>

              {/* Who this is for */}
              <div>
                <h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 tracking-tight">Who this is for</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  We work with operations-heavy businesses, agencies, real estate firms, finance teams, logistics companies — anyone who has outgrown their current tools and knows they need something custom but does not have the engineering team to build it. If your team is spending more time managing systems than doing actual work, that is exactly where we come in.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4 sm:pt-6 border-t border-border">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-5">
                  If this sounds like you, we should talk. 15 minutes, no pitch deck — just a conversation about what you are trying to solve.
                </p>
                <a
                  href="https://calendly.com/dualitylabs/new-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm font-medium text-white bg-accent px-6 py-3 rounded-md hover:bg-gradient-accent-to transition-all hover:-translate-y-0.5"
                >
                  Book an intro call
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
