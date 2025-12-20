'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 py-4 md:py-6 border-b border-border bg-gradient-to-b from-bg via-bg to-bg/95 backdrop-blur-sm z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        <Link
          href="/"
          className="relative group"
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
              className={`font-mono text-base sm:text-lg font-semibold tracking-wider text-text transition-all duration-500 whitespace-nowrap ${
                isScrolled
                  ? 'opacity-0 scale-95'
                  : 'opacity-100 scale-100'
              }`}
            >
              DUALITY LABS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-text-secondary hover:text-text transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-bg">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
            {links.map((link) => {
              const isActive = pathname === link.href ||
                              (link.href.includes('#') && pathname === '/')

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={link.scroll}
                  className={`font-mono text-sm py-2 transition-colors ${
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
              className="font-mono text-sm text-text-secondary px-4 py-3 border border-border rounded hover:border-text hover:text-text transition-all text-center"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
