import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="sticky top-0 py-6 border-b border-border bg-gradient-to-b from-bg via-bg to-bg/95 backdrop-blur-sm z-50">
      <div className="max-w-[1000px] mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="font-mono text-sm font-medium tracking-wider text-text"
        >
          DUALITY LABS
        </Link>
        <Link
          href="#contact"
          className="font-mono text-[13px] text-text-secondary px-4 py-2 border border-border rounded hover:border-text hover:text-text transition-all"
        >
          Get in touch
        </Link>
      </div>
    </nav>
  )
}
