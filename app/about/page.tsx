import Nav from '@/components/nav'
import PageHeader from '@/components/page-header'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Duality Labs',
  description: 'Learn more about Duality Labs and our approach to building software.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="About us"
          title="Building systems that scale"
          description="We're a distributed team focused on practical AI and software systems for growing companies."
        />

        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

          <div className="max-w-[800px] mx-auto px-6 relative z-10">
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-medium mb-4 tracking-tight">Our approach</h2>
                <p className="text-base text-text-secondary leading-relaxed">
                  Placeholder content. Share your story, team background, mission, and what makes your approach unique. Talk about your experience, technical expertise, and the problems you solve.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-medium mb-4 tracking-tight">Why we exist</h2>
                <p className="text-base text-text-secondary leading-relaxed">
                  Placeholder content. Explain the problem you solve and the vision behind Duality Labs. What gap in the market are you filling? Why should clients choose you?
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-medium mb-4 tracking-tight">How we work</h2>
                <p className="text-base text-text-secondary leading-relaxed">
                  Placeholder content. Detail your process, team structure, and collaboration approach. How do you ensure quality? What's your development methodology?
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
