import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Process from '@/components/process'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
