import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dualitylabs.ai'),
  alternates: {
    canonical: 'https://www.dualitylabs.ai',
  },
  title: {
    default: 'Custom AI & Software Development | Duality Labs, Miami',
    template: '%s | Duality Labs',
  },
  description: 'Duality Labs is a Miami software engineering studio building custom software, mobile apps, AI integrations, and machine learning systems for businesses.',
  keywords: ['custom AI development Miami', 'AI automation agency', 'custom software development', 'AI agents', 'LLM fine-tuning', 'ML pipelines', 'internal tools', 'business automation', 'AI consulting', 'workflow automation', 'data infrastructure'],
  authors: [{ name: 'Duality Labs' }],
  openGraph: {
    title: 'Custom AI & Software Development | Duality Labs, Miami',
    description: 'Duality Labs is a Miami software engineering studio building custom software, mobile apps, AI integrations, and machine learning systems for businesses.',
    url: 'https://www.dualitylabs.ai',
    siteName: 'Duality Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI & Software Development | Duality Labs, Miami',
    description: 'Duality Labs is a Miami software engineering studio building custom software, mobile apps, AI integrations, and machine learning systems for businesses.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
  name: 'Duality Labs',
  url: 'https://www.dualitylabs.ai',
  logo: 'https://www.dualitylabs.ai/logo/logo-horizontal-dark.svg',
  image: 'https://www.dualitylabs.ai/logo/logo-horizontal-dark.svg',
  description: 'Custom AI automation and software systems for growing businesses.',
  foundingDate: '2025',
  founders: [
    { '@type': 'Person', name: 'Erich Alfonso' },
    { '@type': 'Person', name: 'Alejandro Alfonso' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: ['Custom Software Development', 'Mobile App Development', 'AI Integration', 'AI Consulting', 'Machine Learning', 'Data Infrastructure'],
  priceRange: '$$',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
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
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1085405264352623');
            fbq('track', 'PageView');

            // Delegated so every email link counts, including ones rendered by
            // server components that can't take onClick handlers. The /apply
            // form fires its own Lead and Schedule events.
            document.addEventListener('click', function (e) {
              var a = e.target.closest && e.target.closest('a[href]');
              if (a && a.href.indexOf('mailto:') === 0) {
                fbq('track', 'Lead', { content_name: 'Email' });
              }
            });
            document.addEventListener('submit', function (e) {
              if (e.target.closest && e.target.closest('#contact')) {
                fbq('track', 'Lead', { content_name: 'Contact form' });
              }
            });
          `}
        </Script>
        {/* LinkedIn Insight Tag: loads once the partner ID from Campaign Manager is set. */}
        {process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID && (
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l) { window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q = [] }
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript"; b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `}
          </Script>
        )}
      </head>
      <body className="bg-bg text-text font-sans">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1085405264352623&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
