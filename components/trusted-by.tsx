'use client'

import { useState } from 'react'

type Logo = {
  slug: string
  name: string
  logoUrl?: string
}

const logos: Logo[] = [
  { slug: 'salesforce', name: 'Salesforce' },
  {
    slug: 'openai',
    name: 'OpenAI',
    logoUrl: '/logos/brands/openai.svg',
  },
  { slug: 'n8n', name: 'n8n' },
  { slug: 'hubspot', name: 'HubSpot' },
  { slug: 'anthropic', name: 'Anthropic' },
  {
    slug: 'mondaydotcom',
    name: 'Monday.com',
    logoUrl: '/logos/brands/mondaydotcom.svg',
  },
  { slug: 'zapier', name: 'Zapier' },
  {
    slug: 'gohighlevel',
    name: 'GoHighLevel',
    logoUrl: '/logos/brands/gohighlevel.svg',
  },
  {
    slug: 'googlecloud',
    name: 'Google Cloud',
    logoUrl: '/logos/brands/googlecloud.svg',
  },
]

export default function TrustedBy() {
  const [failed, setFailed] = useState<Set<string>>(new Set())
  const track = [...logos, ...logos]

  return (
    <section className="relative py-10 sm:py-12 md:py-14 border-b border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

      <div className="relative z-10">
        {/* Subtle label */}
        <div className="text-center mb-6 sm:mb-8 px-4">
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            Integrated with
          </p>
        </div>

        {/* Marquee strip */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="marquee-track flex w-max items-center gap-10 sm:gap-14 md:gap-16 py-2">
            {track.map((logo, i) => {
              const iconBroken = failed.has(logo.slug)
              return (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2.5 sm:gap-3"
                >
                  {!iconBroken && (
                    <img
                      src={
                        logo.logoUrl ??
                        `https://cdn.simpleicons.org/${logo.slug}`
                      }
                      alt=""
                      className="h-6 sm:h-7 w-auto"
                      loading="lazy"
                      onError={() =>
                        setFailed((prev) => {
                          const next = new Set(prev)
                          next.add(logo.slug)
                          return next
                        })
                      }
                    />
                  )}
                  <span className="font-medium text-text-secondary text-sm sm:text-[15px] whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
