import Nav from '@/components/nav'
import PageHeader from '@/components/page-header'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Duality Labs collects, uses, and protects information from website visitors and people who submit our forms, including LinkedIn Lead Gen Forms.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/privacy',
  },
}

const sections = [
  {
    heading: 'Who we are',
    body: [
      'Duality Labs (dualitylabs.ai) is based in Miami, Florida. We build custom AI agents, automations, and integrations for businesses. This policy explains what information we collect through our website, our ads, and lead forms, and what we do with it.',
    ],
  },
  {
    heading: 'What we collect',
    body: [
      'Information you give us. When you fill out a form on our website or a lead form on LinkedIn, Facebook, or Instagram, we collect the contact and business details you submit: your name, work email, phone number (if you give it), company name, job title, company size, and your answers to our form questions.',
      'Information collected automatically. Our site uses Google Analytics, the Meta Pixel, and cookies to record basic usage, such as the pages you visit, the links you click, your browser and device type, and your approximate location. Our hosting provider also keeps standard server logs, such as IP addresses and request times.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'We use your information to reply to your inquiry or application, review whether you are a fit for our services and free offers, schedule calls, send follow-up emails related to your inquiry, and improve our website and marketing.',
    ],
  },
  {
    heading: 'Sharing',
    body: [
      'We do not sell your personal information. We share it only with service providers that help us run our business, such as our CRM, email, scheduling, analytics, and hosting tools, and only as needed for that purpose. We may also disclose information when required by law.',
    ],
  },
  {
    heading: 'LinkedIn Lead Gen Forms',
    body: [
      'If you submit a LinkedIn Lead Gen Form for one of our ads, LinkedIn shares the information in that form with us, and we handle it under this policy. LinkedIn’s own privacy policy also applies to your use of LinkedIn. The same is true of lead forms on Facebook and Instagram and Meta’s privacy policy.',
    ],
  },
  {
    heading: 'Data retention',
    body: [
      'We keep your information only as long as we need it for the purposes above, then delete it, unless we must keep it longer to meet a legal obligation.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'We use reasonable safeguards to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      'You can ask us to access, correct, or delete your information by emailing ops@dualitylabs.ai. You can opt out of marketing emails at any time by using the unsubscribe link in the email or by contacting us.',
      'You can also block or delete cookies in your browser settings, and control how Meta and LinkedIn use your activity for ads in your ad preferences on those platforms.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'Our services are not directed to anyone under 16, and we do not knowingly collect their information.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'We may update this policy. When we do, we will post the new version on this page with a new effective date.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          tag="Legal"
          title="Privacy Policy"
          description="What we collect, why we collect it, and the choices you have."
        />

        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="space-y-10 sm:space-y-12">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 tracking-tight">{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              <div>
                <h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 tracking-tight">Contact</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  Questions about this policy or your information? Email{' '}
                  <a href="mailto:ops@dualitylabs.ai" className="text-accent hover:underline">ops@dualitylabs.ai</a>.
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Effective October 18, 2026
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
