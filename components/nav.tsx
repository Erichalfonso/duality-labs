'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  const links = [
    { href: '/work', label: 'Work' },
    { href: '/#services', label: 'Services', scroll: true },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="sticky top-0 py-6 border-b border-border bg-gradient-to-b from-bg via-bg to-bg/95 backdrop-blur-sm z-50">
      <div className="max-w-[1400px] mx-auto px-12 flex justify-between items-center">
        <Link
          href="/"
          className="relative -ml-6 group"
        >
          {/* Container with fixed height to prevent jumping */}
          <div className="relative h-8 flex items-center">
            {/* Psi Symbol - positioned absolutely to occupy same space as text */}
            <span
              className={`absolute left-0 text-text transition-all duration-500 group-hover:text-accent ${
                isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '32px',
                fontWeight: 'bold',
                lineHeight: 1
              }}
            >
              Ψ
            </span>

            {/* Text - animates out when scrolled */}
            <span
              className={`font-mono text-lg font-semibold tracking-wider text-text transition-all duration-500 whitespace-nowrap ${
                isScrolled
                  ? 'opacity-0 scale-95'
                  : 'opacity-100 scale-100'
              }`}
            >
              DUALITY LABS
            </span>
          </div>
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
