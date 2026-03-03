import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative py-8 sm:py-12 border-t border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gradient-from to-bg" />
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-text mb-3">Services</h4>
            <div className="flex flex-col gap-2">
              <Link href="/services/custom-software" className="font-mono text-xs text-text-secondary hover:text-text transition-colors">Custom Software</Link>
              <Link href="/services/ai-ml" className="font-mono text-xs text-text-secondary hover:text-text transition-colors">AI & Machine Learning</Link>
              <Link href="/services/data-infrastructure" className="font-mono text-xs text-text-secondary hover:text-text transition-colors">Data Infrastructure</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-text mb-3">Company</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="font-mono text-xs text-text-secondary hover:text-text transition-colors">About</Link>
              <Link href="/blog" className="font-mono text-xs text-text-secondary hover:text-text transition-colors">Blog</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-text mb-3">Resources</h4>
            <div className="flex flex-col gap-2">
              <Link href="/blog/how-to-automate-business-with-ai" className="font-mono text-xs text-text-secondary hover:text-text transition-colors">AI Automation Guide</Link>
              <Link href="/blog/building-ai-agents" className="font-mono text-xs text-text-secondary hover:text-text transition-colors">Building AI Agents</Link>
              <Link href="/blog/what-is-llm-fine-tuning" className="font-mono text-xs text-text-secondary hover:text-text transition-colors">LLM Fine-Tuning</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-text mb-3">Connect</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/company/dualitylabs-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-secondary hover:text-text transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:ops@dualitylabs.ai"
                className="font-mono text-xs text-text-secondary hover:text-text transition-colors"
              >
                ops@dualitylabs.ai
              </a>
              <a
                href="https://calendly.com/dualitylabs/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-secondary hover:text-text transition-colors"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-mono text-xs text-text-secondary">
            © 2026 Duality Labs — Miami, FL
          </span>
          <span className="font-mono text-xs text-text-secondary">
            Custom AI & Software Development
          </span>
        </div>
      </div>
    </footer>
  )
}
