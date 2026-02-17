import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dualitylabs.ai'),
  title: 'Duality Labs — Applied AI & Software Systems',
  description: 'We design and build internal tools, automation, and AI-driven workflows — without the overhead of an in-house team.',
  keywords: ['AI automation', 'software development', 'internal tools', 'business automation', 'AI workflows', 'custom software', 'AI consulting', 'workflow automation'],
  authors: [{ name: 'Duality Labs' }],
  openGraph: {
    title: 'Duality Labs — Applied AI & Software Systems',
    description: 'We design and build internal tools, automation, and AI-driven workflows — without the overhead of an in-house team.',
    url: 'https://www.dualitylabs.ai',
    siteName: 'Duality Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duality Labs — Applied AI & Software Systems',
    description: 'We design and build internal tools, automation, and AI-driven workflows — without the overhead of an in-house team.',
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
