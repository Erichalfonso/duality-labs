import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Process from '@/components/process'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
