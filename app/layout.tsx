import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dualitylabs.ai'),
  title: {
    default: 'Custom AI & Software Development | Duality Labs — Miami',
    template: '%s | Duality Labs',
  },
  description: 'Duality Labs is a Miami-based AI automation and custom software development agency. We build AI agents, ML pipelines, internal tools, and data infrastructure for growing businesses.',
  keywords: ['custom AI development Miami', 'AI automation agency', 'custom software development', 'AI agents', 'LLM fine-tuning', 'ML pipelines', 'internal tools', 'business automation', 'AI consulting', 'workflow automation', 'data infrastructure'],
  authors: [{ name: 'Duality Labs' }],
  openGraph: {
    title: 'Custom AI & Software Development | Duality Labs — Miami',
    description: 'Duality Labs is a Miami-based AI automation and custom software development agency. We build AI agents, ML pipelines, internal tools, and data infrastructure for growing businesses.',
    url: 'https://www.dualitylabs.ai',
    siteName: 'Duality Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI & Software Development | Duality Labs — Miami',
    description: 'Duality Labs is a Miami-based AI automation and custom software development agency. We build AI agents, ML pipelines, internal tools, and data infrastructure for growing businesses.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Duality Labs',
  url: 'https://www.dualitylabs.ai',
  logo: 'https://www.dualitylabs.ai/icon.svg',
  description: 'Custom AI automation and software systems for growing businesses.',
  foundingDate: '2025',
  founders: [
    {
      '@type': 'Person',
      name: 'Erich Alfonso',
    },
    {
      '@type': 'Person',
      name: 'Alejandro Alfonso',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.linkedin.com/company/dualitylabs-ai/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'ops@dualitylabs.ai',
    contactType: 'sales',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Font preloading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MEHTN6Q3LD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEHTN6Q3LD');
          `}
        </Script>
      </head>
      <body className="bg-bg text-text font-sans">{children}</body>
    </html>
  )
}
