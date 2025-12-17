'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  const links = [
    { href: '/work', label: 'Work' },
    { href: '/#services', label: 'Services', scroll: true },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="sticky top-0 py-6 border-b border-border bg-gradient-to-b from-bg via-bg to-bg/95 backdrop-blur-sm z-50">
      <div className="max-w-[1000px] mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-wider text-text"
        >
          DUALITY LABS
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href ||
                            (link.href.includes('#') && pathname === '/')

            return (
              <Link
                key={link.href}
                href={link.href}
                scroll={link.scroll}
                className={`font-mono text-[13px] transition-colors ${
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            )
          })}

          <Link
            href="/#contact"
            className="font-mono text-[13px] text-text-secondary px-4 py-2 border border-border rounded hover:border-text hover:text-text transition-all ml-2"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </nav>
  )
}
