import Terminal from './terminal'

export default function Hero() {
  return (
    <header className="relative py-16 sm:py-20 md:py-24 lg:py-32 border-b border-border overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="max-w-[560px]">
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-medium leading-[1.15] tracking-tight mb-4 sm:mb-6 fade-in">
              Applied AI & software systems for growing companies.
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed fade-in fade-in-delay-1 mb-6 sm:mb-8">
              We design and build internal tools, automation, and AI-driven workflows — without the overhead of an in-house team.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 fade-in fade-in-delay-2">
              <a
                href="https://calendly.com/erichalfonso2000/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-medium text-white bg-accent px-6 py-3 rounded-md hover:bg-gradient-accent-to transition-all hover:-translate-y-0.5 text-center"
              >
                Book intro call
              </a>
              <a
                href="#services"
                className="font-mono text-sm text-text-secondary border border-border px-6 py-3 rounded-md hover:border-text hover:text-text transition-all text-center"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Right: Terminal Animation */}
          <div className="lg:pl-8 fade-in fade-in-delay-2 mt-8 lg:mt-0">
            <Terminal />
          </div>
        </div>
      </div>
    </header>
  )
}
