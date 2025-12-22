'use client'

import { useEffect, useState } from 'react'

export default function RealEstatePage() {
  const [time, setTime] = useState('12:34')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      {/* Simple header */}
      <header className="py-6 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="font-mono text-lg font-semibold tracking-wider text-white">
            DUALITY LABS
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="max-w-[800px] mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6 md:mb-8">
              <span className="text-red-400 text-xs md:text-sm font-mono font-medium">FOR REAL ESTATE TEAMS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] px-2">
              STOP LOSING DEALS<br className="hidden sm:block" /><span className="sm:hidden"> </span>TO SLOW FOLLOW-UPS
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 leading-relaxed px-2">
              We respond to your leads in <span className="text-accent font-semibold">under 60 seconds</span>—so they
              actually turn into conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Text Conversation Demo */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="max-w-[500px] mx-auto">
            {/* iPhone-style mockup */}
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-2 md:p-4 shadow-2xl">
              {/* Phone header */}
              <div className="bg-gray-50 rounded-t-[1.5rem] md:rounded-t-[2.5rem] px-3 md:px-6 py-3 md:py-4 flex items-center justify-between">
                <div className="text-xs md:text-sm text-gray-900 font-semibold">Contact</div>
                <div className="text-xs md:text-sm text-gray-500">{time}</div>
              </div>

              {/* Messages */}
              <div className="bg-white px-3 md:px-4 py-4 md:py-6 space-y-3 md:space-y-4 min-h-[350px] md:min-h-[400px]">
                {/* Lead message */}
                <div className="flex justify-start">
                  <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-3 md:px-4 py-2 md:py-3 max-w-[85%] md:max-w-[75%]">
                    <p className="text-gray-900 text-xs md:text-sm">
                      Hi, I'm interested in viewing the property on Oak Street. Is it still available?
                    </p>
                    <div className="text-[10px] md:text-xs text-gray-500 mt-1">2:47 PM</div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-end">
                  <div className="bg-accent rounded-2xl rounded-tr-sm px-3 md:px-4 py-2 md:py-3 max-w-[85%] md:max-w-[75%]">
                    <p className="text-white text-xs md:text-sm">
                      Yes! The Oak Street property is available. I can schedule a showing for you today or tomorrow. Which works better?
                    </p>
                    <div className="text-[10px] md:text-xs text-white/70 mt-1">2:47 PM</div>
                  </div>
                </div>

                {/* Response time badge */}
                <div className="flex justify-center">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-full px-3 md:px-4 py-1 md:py-1.5">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-[10px] md:text-xs font-mono font-semibold">
                        Responded in 47 seconds
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lead response */}
                <div className="flex justify-start">
                  <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-3 md:px-4 py-2 md:py-3 max-w-[85%] md:max-w-[75%]">
                    <p className="text-gray-900 text-xs md:text-sm">
                      Tomorrow afternoon would be perfect! Around 3pm?
                    </p>
                    <div className="text-[10px] md:text-xs text-gray-500 mt-1">2:49 PM</div>
                  </div>
                </div>

                {/* Agent handoff */}
                <div className="flex justify-end">
                  <div className="bg-accent rounded-2xl rounded-tr-sm px-3 md:px-4 py-2 md:py-3 max-w-[85%] md:max-w-[75%]">
                    <p className="text-white text-xs md:text-sm">
                      Perfect! I'm connecting you with Sarah from our team. She'll confirm the details and meet you there tomorrow at 3pm. 👍
                    </p>
                    <div className="text-[10px] md:text-xs text-white/70 mt-1">2:50 PM</div>
                  </div>
                </div>
              </div>

              {/* Phone footer */}
              <div className="bg-gray-50 rounded-b-[1.5rem] md:rounded-b-[2.5rem] h-8 md:h-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="max-w-[700px] mx-auto">
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: '⚡',
                  text: 'Leads get a response in under 60 seconds (even nights and weekends)',
                },
                {
                  icon: '🔥',
                  text: 'Warm leads go straight to your agents',
                },
                {
                  icon: '🤖',
                  text: 'Cold leads get followed up automatically until they respond',
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 md:gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:border-accent/30 transition-all"
                >
                  <div className="text-2xl md:text-3xl flex-shrink-0">{benefit.icon}</div>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed pt-0.5 md:pt-1">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target audience */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8">
              <p className="text-gray-300 text-base md:text-lg">
                This is for <span className="text-white font-semibold">real estate teams with 5+ agents</span> who pay for leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <a
              href="https://calendly.com/erichalfonso2000/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 md:gap-3 font-mono text-base md:text-lg font-semibold text-white bg-gradient-to-r from-accent to-teal-600 px-8 md:px-12 py-4 md:py-6 rounded-xl hover:shadow-2xl hover:shadow-accent/30 transition-all hover:-translate-y-1 w-full sm:w-auto"
            >
              Book a 15-Minute Call
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 md:w-5 h-4 md:h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <p className="text-gray-400 text-xs md:text-sm mt-4 md:mt-6 px-4">
              No pitch deck. Just a conversation about how we can help you close more deals.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
