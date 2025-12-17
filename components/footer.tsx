export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-[1000px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-mono text-xs text-text-secondary">
          © 2025 Duality Labs
        </span>
        <div className="flex gap-6">
          <a 
            href="#" 
            className="font-mono text-xs text-text-secondary hover:text-text transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="#" 
            className="font-mono text-xs text-text-secondary hover:text-text transition-colors"
          >
            Twitter
          </a>
          <a 
            href="mailto:hello@dualitylabs.com" 
            className="font-mono text-xs text-text-secondary hover:text-text transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
