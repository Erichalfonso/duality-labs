import Nav from '@/components/nav'
import PageHeader from '@/components/page-header'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work - Duality Labs',
  description: 'Selected projects and client work from Duality Labs.',
}

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="Portfolio"
          title="Selected work"
          description="Case studies and projects showcasing our approach to building AI-powered systems and internal tools."
        />

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
            {/* Placeholder for portfolio items */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative h-56 sm:h-64 p-6 sm:p-8 rounded-lg border border-card-border bg-card-bg flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-accent-light mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <span className="font-mono text-xs sm:text-sm font-medium text-accent">
                        {String(i).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary font-mono">
                      Project placeholder
                    </p>
                    <p className="text-[10px] sm:text-xs text-text-secondary mt-2">
                      Add your case study content here
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
