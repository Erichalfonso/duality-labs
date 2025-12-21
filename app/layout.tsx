import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Duality Labs — Applied AI & Software Systems',
  description: 'We design and build internal tools, automation, and AI-driven workflows — without the overhead of an in-house team.',
  keywords: ['AI automation', 'software development', 'internal tools', 'business automation', 'AI workflows'],
  authors: [{ name: 'Duality Labs' }],
  openGraph: {
    title: 'Duality Labs — Applied AI & Software Systems',
    description: 'We design and build internal tools, automation, and AI-driven workflows — without the overhead of an in-house team.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duality Labs — Applied AI & Software Systems',
    description: 'We design and build internal tools, automation, and AI-driven workflows — without the overhead of an in-house team.',
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
