import Nav from '@/components/nav'
import PageHeader from '@/components/page-header'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Duality Labs collects, uses, and protects information from visitors to dualitylabs.ai and people who contact us.',
  alternates: {
    canonical: 'https://www.dualitylabs.ai/privacy',
  },
}

const sections = [
  {
    heading: 'Who we are',
    body: [
      'Duality Labs is a software and AI development agency based in Miami, Florida. This policy explains what information we collect when you visit dualitylabs.ai, fill out one of our forms (including forms on Facebook and Instagram ads), or otherwise contact us, and what we do with it.',
    ],
  },
  {
    heading: 'Information you give us',
    body: [
      'When you contact us, book a call, or submit a lead form, we collect what you choose to share: typically your name, email address, phone number, company, and your answers to questions about your business (for example, how many clients you serve, what software you use, and what you would like automated).',
    ],
  },
  {
    heading: 'Information collected automatically',
    body: [
      'Our site uses Google Analytics and the Meta Pixel. These tools use cookies and similar technologies to record things like the pages you visit, the links you click, your browser and device type, and your approximate location. We use this to understand how the site is used and to measure and improve our advertising on Meta platforms. Our hosting provider also keeps standard server logs, such as IP addresses and request times.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'We use your information to respond to you, evaluate whether we are a good fit for your project, schedule and hold calls, deliver work you engage us for, and send follow-up messages related to your inquiry. We also use it to measure how our website and ads perform.',
      'We do not sell your personal information.',
    ],
  },
  {
    heading: 'Who we share it with',
    body: [
      'We share information only with service providers that help us run our business, and only as needed for that purpose: Meta (Facebook and Instagram lead forms and advertising measurement), Google (analytics), Calendly (call scheduling), our email provider, and Vercel (website hosting). We may also disclose information if required by law.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'We keep inquiry and lead information for as long as it is useful for the business relationship, or until you ask us to delete it, unless we need to keep it longer to meet legal or accounting obligations.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      'You can ask us to access, correct, or delete the information we hold about you by emailing ops@dualitylabs.ai. You can opt out of follow-up emails at any time by replying to let us know.',
      'You can block or delete cookies in your browser settings, opt out of Google Analytics with Google’s browser add-on, and control how Meta uses your activity for ads in your Facebook or Instagram ad preferences.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'We take reasonable measures to protect the information we collect. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'Our services are for businesses. We do not knowingly collect information from anyone under 16.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'If we change this policy, we will update it on this page and revise the effective date below.',
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
                  Effective October 2, 2026
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
