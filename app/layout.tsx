import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Duality Labs — Applied AI & Software Systems',
  description: 'We design and build internal tools, automation, and AI-driven workflows — without the overhead of an in-house team.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text font-sans">{children}</body>
    </html>
  )
}
