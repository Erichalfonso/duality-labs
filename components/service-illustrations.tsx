'use client'

import { useEffect, useState } from 'react'

export function AIAutomationIllustration() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const steps = [0, 1, 2, 3]
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length
      setStep(currentStep)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-5 space-y-3 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></div>
          <span className="text-white/60 text-xs font-mono">AI Agent</span>
        </div>

        {/* Task items */}
        <div className="space-y-2">
          {['Analyzing 500 invoices', 'Extracting key data', 'Updating database', 'Complete'].map((task, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                step >= i ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-2'
              }`}
            >
              {step > i ? (
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : step === i ? (
                <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin-slow"></div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-white/20"></div>
              )}
              <span className={`text-xs font-medium ${step >= i ? 'text-white' : 'text-white/40'}`}>
                {task}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-1000 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export function DashboardIllustration() {
  const [activeMetric, setActiveMetric] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { label: 'Revenue', value: '$125K', growth: '+24%' },
    { label: 'Users', value: '2.4K', growth: '+18%' },
    { label: 'Tasks', value: '94%', growth: '+12%' },
  ]

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-5 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/60 text-xs font-mono">Analytics Dashboard</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  i === activeMetric ? 'bg-accent w-3' : 'bg-white/20'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Animated metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className={`bg-white/5 backdrop-blur-sm p-3 rounded-lg border transition-all duration-500 ${
                activeMetric === i ? 'border-accent/50 bg-accent/5 scale-105' : 'border-white/10'
              }`}
            >
              <div className="text-white/40 text-[9px] font-mono mb-1">{metric.label}</div>
              <div className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                activeMetric === i ? 'text-accent' : 'text-white'
              }`}>
                {metric.value}
              </div>
              <div className="text-[9px] text-green-400">{metric.growth}</div>
            </div>
          ))}
        </div>

        {/* Chart representation */}
        <div className="flex items-end gap-1 h-12">
          {[40, 65, 45, 80, 60, 95, 70].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-accent/40 to-accent/20 rounded-t transition-all duration-1000"
              style={{
                height: `${height}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MVPIllustration() {
  const [buildProgress, setBuildProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildProgress((prev) => (prev >= 100 ? 0 : prev + 25))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-5 flex items-center justify-center h-full relative z-10">
        {/* Wireframe to product transition */}
        <div className="relative">
          {/* Mobile frame */}
          <div className="w-40 h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-4 shadow-2xl">
            {/* Status bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full transition-all duration-500 ${
                      buildProgress > i * 25 ? 'bg-accent' : 'bg-white/20'
                    }`}
                  ></div>
                ))}
              </div>
              <span className="text-[8px] text-white/40 font-mono">{buildProgress}%</span>
            </div>

            {/* Content areas building */}
            <div className="space-y-3">
              {/* Hero section */}
              <div
                className={`h-16 rounded-lg border transition-all duration-700 ${
                  buildProgress >= 25
                    ? 'bg-accent/20 border-accent/40'
                    : 'bg-white/5 border-white/10 border-dashed'
                }`}
              >
                {buildProgress >= 25 && (
                  <div className="p-2 space-y-1 animate-fade-in">
                    <div className="h-1 w-16 bg-white/40 rounded"></div>
                    <div className="h-1 w-12 bg-white/20 rounded"></div>
                  </div>
                )}
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-2">
                {[50, 75].map((threshold, i) => (
                  <div
                    key={i}
                    className={`h-12 rounded border transition-all duration-700 ${
                      buildProgress >= threshold
                        ? 'bg-white/10 border-white/20'
                        : 'bg-white/5 border-white/10 border-dashed'
                    }`}
                  >
                    {buildProgress >= threshold && (
                      <div className="p-1.5 space-y-1 animate-fade-in">
                        <div className="h-1 w-8 bg-white/40 rounded"></div>
                        <div className="h-1 w-6 bg-white/20 rounded"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div
                className={`h-8 rounded-lg transition-all duration-700 ${
                  buildProgress >= 100
                    ? 'bg-gradient-to-r from-accent to-accent/60 animate-pulse-slow'
                    : 'bg-white/5 border border-white/10 border-dashed'
                }`}
              ></div>
            </div>
          </div>

          {/* Build indicator */}
          {buildProgress < 100 && (
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-accent/20 rounded-full border-2 border-accent animate-ping"></div>
          )}
        </div>
      </div>
    </div>
  )
}

export function IntegrationIllustration() {
  const [dataFlow, setDataFlow] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow((prev) => (prev + 1) % 4)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const systems = [
    { name: 'CRM', icon: 'C', color: 'accent' },
    { name: 'DB', icon: 'D', color: 'accent' },
    { name: 'API', icon: 'A', color: 'accent' },
  ]

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-5 flex items-center justify-center h-full relative z-10">
        <div className="relative w-full">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow"></div>
            <span className="text-white/60 text-xs font-mono">Systems Synced</span>
          </div>

          {/* Integration flow */}
          <div className="flex items-center justify-between">
            {systems.map((system, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {/* System node */}
                <div
                  className={`w-16 h-16 bg-white/5 backdrop-blur-sm rounded-lg border-2 flex items-center justify-center transition-all duration-500 ${
                    dataFlow === i || dataFlow === (i + 1) % systems.length
                      ? 'border-accent/60 scale-110 shadow-lg shadow-accent/20'
                      : 'border-white/20'
                  }`}
                >
                  <span className={`text-lg font-bold transition-colors duration-300 ${
                    dataFlow === i || dataFlow === (i + 1) % systems.length ? 'text-accent' : 'text-white/40'
                  }`}>
                    {system.icon}
                  </span>
                </div>

                {/* System label */}
                <span className="text-[9px] text-white/40 font-mono">{system.name}</span>

                {/* Connection line to next system */}
                {i < systems.length - 1 && (
                  <div className="absolute top-[50%] left-[33%] w-[25%] h-px">
                    <div className="relative w-full h-full">
                      {/* Base line */}
                      <div className="absolute inset-0 bg-white/10"></div>

                      {/* Animated data packet */}
                      <div
                        className={`absolute h-2 w-2 -top-1 rounded-full bg-accent shadow-lg shadow-accent/50 transition-all duration-1000 ${
                          dataFlow === i ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                          left: dataFlow === i ? '100%' : '0%',
                        }}
                      ></div>

                      {/* Arrow */}
                      <div
                        className={`absolute right-0 -top-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 rotate-90 transition-colors duration-300 ${
                          dataFlow === i ? 'border-b-accent' : 'border-b-white/10'
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data transfer indicator */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow"></div>
              <span className="text-[10px] text-white/60 font-mono">
                {dataFlow === 3 ? 'Syncing...' : `Transferring data ${dataFlow + 1}/3`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
