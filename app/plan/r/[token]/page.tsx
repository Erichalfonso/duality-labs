import { notFound } from 'next/navigation'
import Link from 'next/link'
import PlanDocument from '@/components/plan-document'
import { decodePlan } from '@/lib/plan-link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ token: string }> }

export const metadata: Metadata = {
  title: 'Your AI Plan',
  // Personal links: never indexed, never followed.
  robots: { index: false, follow: false },
}

export default async function SharedPlanPage({ params }: Props) {
  const { token } = await params
  const doc = decodePlan(token)
  if (!doc) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      <header className="bg-[#0A0A0A]">
        <div className="max-w-[720px] mx-auto px-4 py-4 flex justify-center">
          <img src="/logo/logo-horizontal-light.svg" alt="Duality Labs" width={160} height={30} />
        </div>
      </header>
      <main className="flex-1 w-full max-w-[720px] mx-auto px-4 py-8 sm:py-12">
        <PlanDocument doc={doc} />
      </main>
      <footer className="py-6 text-center font-mono text-xs text-[#737373] print:hidden">
        © 2026 Duality Labs · <Link href="/privacy" className="hover:text-[#0A0A0A]">Privacy Policy</Link>
      </footer>
    </div>
  )
}
