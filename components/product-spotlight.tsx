'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const APP_STORE_URL = 'https://apps.apple.com/us/app/ppol-rider/id6748315719'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ppol.rider'
const WEBSITE_URL = 'https://www.ppolnetwork.com/'
const CASE_STUDY_URL = '/case-studies/logistics-nemt-operations-platform'

const features = [
  'Real-Time Tracking',
  'Verified Drivers',
  '24/7 Availability',
  'Apple Pay & Cards',
  'HIPAA-ready NEMT',
]

export default function ProductSpotlight() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 },
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="product-spotlight"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-gradient-to" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header — matches the Our Services / Case Studies pattern */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight px-4 leading-[1.05]">
            Product Spotlight
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mt-3 sm:mt-4">
            Built &amp; Shipped by Duality Labs
          </p>
        </div>

        {/* Blue stage — the flare that pulls the eye to center */}
        <div className="reveal relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#0066FF] to-[#0052CC] shadow-[0_30px_80px_-20px_rgba(0,102,255,0.45)]">
          {/* Decorative glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#3D8BFF]/40 blur-3xl"
          />
          {/* Faint grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          {/* Oversized brand psi watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-4 text-white/[0.06] select-none hidden md:block"
          >
            <svg width="420" height="420" viewBox="0 0 256 256" aria-hidden>
              <text
                x="128"
                y="188"
                textAnchor="middle"
                fontSize="240"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontWeight="700"
                fill="currentColor"
              >
                Ψ
              </text>
            </svg>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-6 items-center p-7 sm:p-10 lg:p-14">
            {/* Phones */}
            <div className="relative flex justify-center lg:justify-start items-end min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] order-2 lg:order-1">
              {/* Secondary phone — brand splash, behind */}
              <div className="animate-float-slow-delayed absolute left-1/2 -translate-x-[92%] sm:-translate-x-[86%] bottom-6 z-0 hidden sm:block">
                <PhoneFrame
                  src="/ppol/screen-1.png"
                  alt="Ppol Rider brand screen — Fast, Safe and Always There"
                  className="w-[168px] md:w-[188px] opacity-95 rotate-[-6deg]"
                />
              </div>

              {/* Primary phone — live booking + map, front */}
              <div className="animate-float-slow relative z-10 translate-x-2 sm:translate-x-8 lg:translate-x-0">
                <PhoneFrame
                  src="/ppol/screen-4.png"
                  alt="Ppol Rider app — instant booking with live map and fare estimate"
                  className="w-[236px] sm:w-[262px] md:w-[280px]"
                  priority
                />
              </div>

              {/* Floating app-icon badge */}
              <div className="absolute z-20 top-2 right-2 sm:right-6 lg:right-2 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-xl">
                <Image
                  src="/ppol/app-icon.png"
                  alt="Ppol Rider app icon"
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-xl"
                />
                <div className="pr-1">
                  <div className="text-[13px] font-semibold text-text leading-tight">
                    Ppol Rider
                  </div>
                  <div className="font-mono text-[10px] text-text-secondary leading-tight flex items-center gap-1">
                    <span className="text-accent">★ 5.0</span>
                    <span>· Travel · Free</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="text-white order-1 lg:order-2">
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] text-white/70 mb-3">
                Ppol Network · Miami, FL
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] mb-4">
                Smart rides. Smarter care.
              </h3>
              <p className="text-[15px] sm:text-base text-white/85 leading-relaxed max-w-md mb-6">
                The Non-Emergency Medical Transportation platform we engineered
                end to end for Ppol Network, now live on the App Store. Patients
                and everyday riders book a vehicle, watch it arrive in real time,
                and pay in a tap.
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-sm text-[12px] sm:text-[13px] font-medium text-white/90 whitespace-nowrap"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Store buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <StoreButton
                  href={APP_STORE_URL}
                  top="Download on the"
                  bottom="App Store"
                  icon={
                    <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current" aria-hidden>
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                  }
                />
                <StoreButton
                  href={PLAY_STORE_URL}
                  top="Get it on"
                  bottom="Google Play"
                  icon={
                    <svg viewBox="0 0 512 512" className="w-6 h-6" aria-hidden>
                      <path fill="#00D9FF" d="M47 32C37 37 31 46 31 59v394c0 13 6 22 16 27l229-224z" />
                      <path fill="#00F076" d="M47 32c4-2 9-2 14 1l290 166-63 62z" />
                      <path fill="#FFCE00" d="M351 199l60 34c20 12 20 34 0 46l-60 35-66-79z" />
                      <path fill="#FF3A44" d="M47 480c4 2 9 2 14-1l290-166-63-62z" />
                    </svg>
                  }
                />
              </div>

              {/* Supporting links */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-5 border-t border-white/15">
                <a
                  href={WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] uppercase tracking-wider text-white/85 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span>Visit ppolnetwork.com</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
                <Link
                  href={CASE_STUDY_URL}
                  className="font-mono text-[12px] uppercase tracking-wider text-white/85 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span>Read the case study</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneFrame({
  src,
  alt,
  className = '',
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <div
      className={`relative rounded-[2.2rem] bg-[#0A0A0A] p-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/10 ${className}`}
    >
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-[38%] h-5 bg-[#0A0A0A] rounded-b-2xl" />
      <Image
        src={src}
        alt={alt}
        width={884}
        height={1920}
        priority={priority}
        className="w-full h-auto rounded-[1.7rem]"
      />
    </div>
  )
}

function StoreButton({
  href,
  top,
  bottom,
  icon,
}: {
  href: string
  top: string
  bottom: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white ring-1 ring-white/15 hover:bg-black/80 hover:ring-white/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-normal text-white/70">
          {top}
        </span>
        <span className="block text-[15px] font-semibold -mt-0.5">
          {bottom}
        </span>
      </span>
    </a>
  )
}
