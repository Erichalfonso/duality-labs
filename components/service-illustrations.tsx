'use client'

import { useEffect, useState } from 'react'

export function AIAutomationIllustration() {
  const [step, setStep] = useState(0)
  const [particles, setParticles] = useState<number[]>([])

  useEffect(() => {
    const steps = [0, 1, 2, 3]
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length
      setStep(currentStep)

      // Generate particle effects
      if (currentStep > 0) {
        setParticles(Array.from({ length: 5 }, (_, i) => i))
        setTimeout(() => setParticles([]), 800)
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const documents = [
    { name: 'invoice_001.pdf', status: step > 0 ? 'processed' : 'pending' },
    { name: 'invoice_002.pdf', status: step > 1 ? 'processed' : step > 0 ? 'processing' : 'pending' },
    { name: 'invoice_003.pdf', status: step > 2 ? 'processed' : step > 1 ? 'processing' : 'pending' },
  ]

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p}
          className="absolute w-1 h-1 bg-accent rounded-full animate-fade-in"
          style={{
            left: `${20 + p * 15}%`,
            top: `${30 + Math.random() * 40}%`,
            animation: 'fade-in 0.8s ease-out forwards'
          }}
        ></div>
      ))}

      <div className="p-6 relative z-10 h-full flex flex-col">
        {/* Header with stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></div>
            <span className="text-white/60 text-xs font-mono">AI Processing Engine</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-white/40 font-mono">THROUGHPUT</div>
              <div className="text-xs text-accent font-bold">{step * 167}/sec</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 font-mono">ACCURACY</div>
              <div className="text-xs text-green-400 font-bold">99.{step}%</div>
            </div>
          </div>
        </div>

        {/* Document queue with previews */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {documents.map((doc, i) => (
            <div
              key={i}
              className={`relative bg-white/5 backdrop-blur-sm rounded-lg border p-2 transition-all duration-700 ${
                doc.status === 'processing' ? 'border-accent/60 shadow-lg shadow-accent/10 scale-105' :
                doc.status === 'processed' ? 'border-green-500/40 bg-green-500/5' :
                'border-white/10'
              }`}
            >
              {/* Mini document preview */}
              <div className="space-y-1 mb-2">
                <div className={`h-0.5 w-full rounded ${doc.status === 'processed' ? 'bg-green-400/40' : 'bg-white/20'}`}></div>
                <div className={`h-0.5 w-3/4 rounded ${doc.status === 'processed' ? 'bg-green-400/40' : 'bg-white/20'}`}></div>
                <div className={`h-0.5 w-5/6 rounded ${doc.status === 'processed' ? 'bg-green-400/40' : 'bg-white/20'}`}></div>
              </div>

              {/* File icon */}
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-[8px] text-white/40 font-mono truncate">{doc.name}</span>
              </div>

              {/* Status indicator */}
              {doc.status === 'processing' && (
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <div className="w-full h-full bg-accent rounded-full animate-ping"></div>
                  <div className="absolute inset-0 bg-accent rounded-full"></div>
                </div>
              )}
              {doc.status === 'processed' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Task pipeline */}
        <div className="space-y-2 flex-1">
          {['OCR Scanning', 'Data Extraction', 'Validation', 'Database Sync'].map((task, i) => (
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
                <div className="relative w-5 h-5">
                  <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin-slow"></div>
                  <div className="absolute inset-0 w-5 h-5 rounded-full border-2 border-accent/20"></div>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-white/20"></div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${step >= i ? 'text-white' : 'text-white/40'}`}>
                    {task}
                  </span>
                  {step === i && (
                    <span className="text-[9px] text-accent font-mono animate-pulse-slow">
                      {Math.min((step + 1) * 25, 100)}%
                    </span>
                  )}
                  {step > i && (
                    <span className="text-[9px] text-green-400 font-mono">✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall progress bar with segments */}
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-[9px] text-white/40 font-mono">
            <span>OVERALL PROGRESS</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-accent via-accent/80 to-accent/60 transition-all duration-1000 ease-out relative"
              style={{ width: `${(step / 3) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-flow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardIllustration() {
  const [activeMetric, setActiveMetric] = useState(0)
  const [chartData, setChartData] = useState([40, 65, 45, 80, 60, 95, 70, 85])
  const [liveUpdate, setLiveUpdate] = useState(0)

  useEffect(() => {
    const metricInterval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4)
    }, 2000)

    const chartInterval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev.slice(1), Math.random() * 40 + 60]
        return newData
      })
      setLiveUpdate((prev) => prev + 1)
    }, 3000)

    return () => {
      clearInterval(metricInterval)
      clearInterval(chartInterval)
    }
  }, [])

  const metrics = [
    { label: 'Revenue', value: '$125K', growth: '+24%', icon: '$', color: 'accent', sparkline: [30, 45, 35, 50, 45, 60] },
    { label: 'Users', value: '2.4K', growth: '+18%', icon: '👥', color: 'blue', sparkline: [40, 42, 48, 45, 52, 58] },
    { label: 'Tasks', value: '94%', growth: '+12%', icon: '✓', color: 'green', sparkline: [70, 75, 72, 80, 85, 94] },
    { label: 'Response', value: '1.2s', growth: '-8%', icon: '⚡', color: 'purple', sparkline: [2.5, 2.1, 1.8, 1.5, 1.3, 1.2] },
  ]

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)',
          backgroundSize: '15px 15px'
        }}></div>
      </div>

      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-5 relative z-10 h-full flex flex-col">
        {/* Header with live indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs font-mono">Analytics Dashboard</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow"></div>
              <span className="text-[9px] text-green-400 font-mono">LIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[9px] text-white/40 font-mono">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    i === activeMetric ? 'bg-accent w-3' : 'bg-white/20'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Metric cards with sparklines */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className={`relative bg-white/5 backdrop-blur-sm p-3 rounded-lg border transition-all duration-500 overflow-hidden ${
                activeMetric === i ? 'border-accent/50 bg-accent/5 scale-105 shadow-lg shadow-accent/10' : 'border-white/10'
              }`}
            >
              {/* Sparkline background */}
              <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent"
                    points={metric.sparkline.map((val, idx) => `${(idx / (metric.sparkline.length - 1)) * 100},${20 - (val / 100) * 20}`).join(' ')}
                  />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-white/40 text-[9px] font-mono">{metric.label.toUpperCase()}</div>
                  <span className="text-xs">{metric.icon}</span>
                </div>
                <div className={`text-lg font-bold mb-0.5 transition-colors duration-300 ${
                  activeMetric === i ? 'text-accent' : 'text-white'
                }`}>
                  {metric.value}
                </div>
                <div className={`text-[9px] font-mono ${metric.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.growth} vs last week
                </div>
              </div>

              {/* Active indicator */}
              {activeMetric === i && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full animate-pulse-slow"></div>
              )}
            </div>
          ))}
        </div>

        {/* Main chart with grid */}
        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-white/40 font-mono">REVENUE TREND</span>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent/60 rounded-sm"></div>
                <span className="text-[8px] text-white/40 font-mono">This Week</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white/20 rounded-sm"></div>
                <span className="text-[8px] text-white/40 font-mono">Last Week</span>
              </div>
            </div>
          </div>

          {/* Chart with animated bars and comparison */}
          <div className="flex items-end justify-between gap-1 h-16 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-full h-px bg-white/40"></div>
              ))}
            </div>

            {chartData.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5 relative z-10">
                {/* Current week bar */}
                <div
                  className="w-full bg-gradient-to-t from-accent/60 to-accent/40 rounded-t transition-all duration-700 relative group"
                  style={{
                    height: `${height}%`,
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Value tooltip on hover */}
                  {i === chartData.length - 1 && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-accent font-mono whitespace-nowrap">
                      ${Math.round(height * 1.5)}K
                    </div>
                  )}
                </div>

                {/* Previous week bar (ghost) */}
                <div
                  className="w-full bg-white/10 rounded-t"
                  style={{
                    height: `${Math.max(height - 15, 20)}%`,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: -1
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Time labels */}
          <div className="flex justify-between mt-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Today'].map((day, i) => (
              <span key={i} className={`text-[8px] font-mono ${i === 7 ? 'text-accent' : 'text-white/30'}`}>
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MVPIllustration() {
  const [buildProgress, setBuildProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [commits, setCommits] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildProgress((prev) => {
        const next = prev >= 100 ? 0 : prev + 20
        setCurrentPhase(Math.floor(next / 20))
        return next
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (buildProgress > 0 && buildProgress % 20 === 0) {
      const messages = [
        'feat: add auth system',
        'feat: build dashboard',
        'feat: add API routes',
        'style: polish UI',
        'deploy: ship to prod'
      ]
      setCommits([messages[Math.floor(buildProgress / 20) - 1], ...commits.slice(0, 2)])
    }
  }, [buildProgress])

  const phases = [
    { name: 'Planning', icon: '📋', color: 'blue' },
    { name: 'Development', icon: '⚙️', color: 'accent' },
    { name: 'Testing', icon: '🧪', color: 'purple' },
    { name: 'Styling', icon: '🎨', color: 'pink' },
    { name: 'Deployment', icon: '🚀', color: 'green' },
  ]

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Code-like background pattern */}
      <div className="absolute inset-0 opacity-5 font-mono text-[8px] overflow-hidden">
        <div className="absolute inset-0 flex flex-col gap-1 p-2 text-accent/40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>{`${'  '.repeat(i % 3)}const build_${i} = () => {...}`}</div>
          ))}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-6 h-full relative z-10 flex gap-4">
        {/* Left side - Build pipeline */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></div>
              <span className="text-white/60 text-xs font-mono">MVP Builder</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded border border-white/10">
              <span className="text-[9px] text-white/40 font-mono">PROGRESS</span>
              <span className="text-xs text-accent font-bold">{buildProgress}%</span>
            </div>
          </div>

          {/* Phase indicators */}
          <div className="space-y-2 mb-4">
            {phases.map((phase, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  currentPhase >= i ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-2'
                }`}
              >
                <div className={`relative w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-500 ${
                  currentPhase > i ? 'border-green-500/60 bg-green-500/10' :
                  currentPhase === i ? 'border-accent/60 bg-accent/10 scale-110' :
                  'border-white/20 bg-white/5'
                }`}>
                  {currentPhase > i ? (
                    <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : currentPhase === i ? (
                    <div className="text-xs">{phase.icon}</div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  )}

                  {currentPhase === i && (
                    <div className="absolute inset-0 border-2 border-accent rounded-lg animate-ping"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${currentPhase >= i ? 'text-white' : 'text-white/40'}`}>
                      {phase.name}
                    </span>
                    {currentPhase === i && (
                      <div className="flex gap-1">
                        {[0, 1, 2].map((dot) => (
                          <div
                            key={dot}
                            className="w-1 h-1 rounded-full bg-accent animate-pulse-slow"
                            style={{ animationDelay: `${dot * 0.2}s` }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Commit history */}
          <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3 h-3 text-white/40" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
                <path d="M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4z"/>
              </svg>
              <span className="text-[9px] text-white/40 font-mono">GIT COMMITS</span>
            </div>
            <div className="space-y-1.5">
              {commits.length === 0 ? (
                <div className="text-[9px] text-white/20 font-mono italic">No commits yet...</div>
              ) : (
                commits.map((commit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[9px] font-mono animate-slide-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                    <span className="text-white/60 truncate">{commit}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right side - Preview */}
        <div className="w-32 flex flex-col">
          <div className="text-[9px] text-white/40 font-mono mb-2">PREVIEW</div>

          {/* Mobile/Desktop preview */}
          <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-3 relative overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-1 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/60"></div>
            </div>

            {/* Content areas building */}
            <div className="space-y-2">
              {/* Header */}
              <div
                className={`h-4 rounded border transition-all duration-700 ${
                  buildProgress >= 20
                    ? 'bg-accent/20 border-accent/40'
                    : 'bg-white/5 border-white/10 border-dashed'
                }`}
              >
                {buildProgress >= 20 && (
                  <div className="px-1 py-0.5 flex items-center gap-1 animate-fade-in">
                    <div className="w-2 h-2 rounded-full bg-accent/60"></div>
                    <div className="h-0.5 w-6 bg-white/30 rounded"></div>
                  </div>
                )}
              </div>

              {/* Hero */}
              <div
                className={`h-8 rounded border transition-all duration-700 ${
                  buildProgress >= 40
                    ? 'bg-gradient-to-br from-accent/20 to-accent/10 border-accent/40'
                    : 'bg-white/5 border-white/10 border-dashed'
                }`}
              >
                {buildProgress >= 40 && (
                  <div className="p-1 space-y-0.5 animate-fade-in">
                    <div className="h-0.5 w-10 bg-white/40 rounded"></div>
                    <div className="h-0.5 w-8 bg-white/20 rounded"></div>
                  </div>
                )}
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {[60, 80].map((threshold, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded border transition-all duration-700 ${
                      buildProgress >= threshold
                        ? 'bg-white/10 border-white/20'
                        : 'bg-white/5 border-white/10 border-dashed'
                    }`}
                  >
                    {buildProgress >= threshold && (
                      <div className="p-1 space-y-0.5 animate-scale-in">
                        <div className="h-0.5 w-4 bg-white/40 rounded"></div>
                        <div className="h-0.5 w-3 bg-white/20 rounded"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className={`h-4 rounded transition-all duration-700 ${
                  buildProgress >= 100
                    ? 'bg-gradient-to-r from-accent to-accent/60 shadow-lg shadow-accent/20'
                    : 'bg-white/5 border border-white/10 border-dashed'
                }`}
              >
                {buildProgress >= 100 && (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-[7px] text-white font-bold">LIVE</span>
                  </div>
                )}
              </div>
            </div>

            {/* Deployment rocket */}
            {buildProgress === 100 && (
              <div className="absolute -top-4 -right-4 text-2xl animate-bounce">
                🚀
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MLPipelineIllustration() {
  const [epoch, setEpoch] = useState(0)
  const [stage, setStage] = useState(0)
  const [lossHistory, setLossHistory] = useState([0.92, 0.85, 0.71, 0.58, 0.42, 0.31, 0.22, 0.15])
  const [accuracyHistory, setAccuracyHistory] = useState([0.12, 0.28, 0.41, 0.55, 0.68, 0.78, 0.86, 0.92])

  useEffect(() => {
    const interval = setInterval(() => {
      setEpoch((prev) => {
        const next = (prev + 1) % 5
        setStage(next)
        return next
      })

      setLossHistory((prev) => {
        const newVal = Math.max(0.05, prev[prev.length - 1] - Math.random() * 0.08)
        return [...prev.slice(1), newVal]
      })

      setAccuracyHistory((prev) => {
        const newVal = Math.min(0.99, prev[prev.length - 1] + Math.random() * 0.03)
        return [...prev.slice(1), newVal]
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [])

  const stages = [
    { name: 'Data Preprocessing', status: stage > 0 ? 'done' : stage === 0 ? 'active' : 'pending' },
    { name: 'Model Training', status: stage > 1 ? 'done' : stage === 1 ? 'active' : 'pending' },
    { name: 'Evaluation', status: stage > 2 ? 'done' : stage === 2 ? 'active' : 'pending' },
    { name: 'Fine-Tuning', status: stage > 3 ? 'done' : stage === 3 ? 'active' : 'pending' },
    { name: 'Deployment', status: stage === 4 ? 'active' : 'pending' },
  ]

  const metrics = [
    { label: 'LOSS', value: lossHistory[lossHistory.length - 1].toFixed(3), color: 'text-red-400' },
    { label: 'ACCURACY', value: `${(accuracyHistory[accuracyHistory.length - 1] * 100).toFixed(1)}%`, color: 'text-green-400' },
    { label: 'EPOCH', value: `${(epoch + 1) * 50}`, color: 'text-accent' },
  ]

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-5 relative z-10 h-full flex flex-col">
        {/* Header with metrics */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></div>
            <span className="text-white/60 text-xs font-mono">ML Training Pipeline</span>
          </div>
          <div className="flex items-center gap-3">
            {metrics.map((metric, i) => (
              <div key={i} className="text-right">
                <div className="text-[9px] text-white/40 font-mono">{metric.label}</div>
                <div className={`text-xs font-bold ${metric.color}`}>{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline stages */}
        <div className="flex items-center gap-1 mb-4">
          {stages.map((s, i) => (
            <div key={i} className="flex-1 flex items-center gap-1">
              <div
                className={`flex-1 h-7 rounded-md border flex items-center justify-center transition-all duration-500 ${
                  s.status === 'done' ? 'border-green-500/40 bg-green-500/10' :
                  s.status === 'active' ? 'border-accent/60 bg-accent/10 shadow-lg shadow-accent/10' :
                  'border-white/10 bg-white/5'
                }`}
              >
                {s.status === 'done' ? (
                  <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s.status === 'active' ? (
                  <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin-slow"></div>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                )}
              </div>
              {i < stages.length - 1 && (
                <svg className={`w-3 h-3 flex-shrink-0 ${s.status === 'done' ? 'text-green-400/60' : 'text-white/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Stage labels */}
        <div className="flex gap-1 mb-4">
          {stages.map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <span className={`text-[8px] font-mono ${
                s.status === 'done' ? 'text-green-400/60' :
                s.status === 'active' ? 'text-accent' :
                'text-white/30'
              }`}>
                {s.name}
              </span>
            </div>
          ))}
        </div>

        {/* Loss and accuracy charts */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* Loss chart */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] text-white/40 font-mono">TRAINING LOSS</span>
              <span className="text-[9px] text-red-400 font-mono">{lossHistory[lossHistory.length - 1].toFixed(3)}</span>
            </div>
            <div className="h-full relative">
              <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 100 40">
                {/* Grid lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1="0" y1={i * 13} x2="100" y2={i * 13} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                ))}
                {/* Loss line */}
                <polyline
                  fill="none"
                  stroke="rgba(248, 113, 113, 0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={lossHistory.map((val, idx) => `${(idx / (lossHistory.length - 1)) * 100},${val * 40}`).join(' ')}
                />
                {/* Gradient fill under the line */}
                <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(248, 113, 113, 0.3)" />
                  <stop offset="100%" stopColor="rgba(248, 113, 113, 0)" />
                </linearGradient>
                <polygon
                  fill="url(#lossGradient)"
                  points={`0,40 ${lossHistory.map((val, idx) => `${(idx / (lossHistory.length - 1)) * 100},${val * 40}`).join(' ')} 100,40`}
                />
              </svg>
            </div>
          </div>

          {/* Accuracy chart */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] text-white/40 font-mono">ACCURACY</span>
              <span className="text-[9px] text-green-400 font-mono">{(accuracyHistory[accuracyHistory.length - 1] * 100).toFixed(1)}%</span>
            </div>
            <div className="h-full relative">
              <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 100 40">
                {/* Grid lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1="0" y1={i * 13} x2="100" y2={i * 13} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                ))}
                {/* Accuracy line */}
                <polyline
                  fill="none"
                  stroke="rgba(74, 222, 128, 0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={accuracyHistory.map((val, idx) => `${(idx / (accuracyHistory.length - 1)) * 100},${40 - val * 40}`).join(' ')}
                />
                {/* Gradient fill under the line */}
                <linearGradient id="accGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(74, 222, 128, 0)" />
                  <stop offset="100%" stopColor="rgba(74, 222, 128, 0.3)" />
                </linearGradient>
                <polygon
                  fill="url(#accGradient)"
                  points={`0,40 ${accuracyHistory.map((val, idx) => `${(idx / (accuracyHistory.length - 1)) * 100},${40 - val * 40}`).join(' ')} 100,40`}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Model info bar */}
        <div className="mt-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow"></div>
            <span className="text-[9px] text-white/40 font-mono">MODEL: custom-llm-v2</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-white/40 font-mono">PARAMS: 7B</span>
            <span className="text-[9px] text-white/40 font-mono">GPU: 4x A100</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-green-400"></div>
              <span className="text-[9px] text-green-400 font-mono">TRAINING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function IntegrationIllustration() {
  const [activeStage, setActiveStage] = useState(0)
  const [rowsProcessed, setRowsProcessed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4)
      setRowsProcessed((prev) => prev + 1)
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  const stages = [
    { name: 'Ingest', label: 'Sources', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    )},
    { name: 'Transform', label: 'Clean & Map', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )},
    { name: 'Store', label: 'Data Lake', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )},
    { name: 'Serve', label: 'Dashboards', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
  ]

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(0, 102, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-4 sm:p-6 h-full relative z-10 flex flex-col">
        {/* Header with metrics */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow"></div>
            <span className="text-white/60 text-xs font-mono">Data Pipeline</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right">
              <div className="text-[9px] text-white/40 font-mono">ROWS/MIN</div>
              <div className="text-xs text-accent font-bold">{(rowsProcessed * 842).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-white/40 font-mono">UPTIME</div>
              <div className="text-xs text-green-400 font-bold">99.97%</div>
            </div>
          </div>
        </div>

        {/* Pipeline stages — horizontal flow */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-4 gap-2 sm:gap-3">
            {stages.map((stage, i) => {
              const isActive = activeStage === i
              const isDone = (activeStage > i) || (activeStage === 0 && i !== 0 && rowsProcessed > 0)

              return (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Arrow connector (between stages) */}
                  {i > 0 && (
                    <div className="absolute -left-1.5 sm:-left-2 top-1/2 -translate-y-1/2 z-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M2 8h12M10 4l4 4-4 4"
                          stroke={isDone || isActive ? 'rgba(0, 102, 255, 0.6)' : 'rgba(255, 255, 255, 0.15)'}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-all duration-500"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Stage card */}
                  <div
                    className={`relative w-full bg-white/5 backdrop-blur-sm rounded-lg border p-2 sm:p-3 transition-all duration-500 ${
                      isActive
                        ? 'border-accent/60 bg-accent/10 shadow-lg shadow-accent/20 scale-105'
                        : isDone
                        ? 'border-green-500/30 bg-green-500/5'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                      {/* Icon */}
                      <div className={`transition-all duration-300 ${
                        isActive ? 'text-accent' : isDone ? 'text-green-400' : 'text-white/40'
                      }`}>
                        {stage.icon}
                      </div>

                      {/* Name */}
                      <div className="text-[9px] sm:text-[10px] font-mono font-medium text-white/80 text-center">
                        {stage.name}
                      </div>

                      {/* Sub-label */}
                      <div className="text-[7px] sm:text-[8px] font-mono text-white/30 text-center">
                        {stage.label}
                      </div>

                      {/* Status dot */}
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-accent animate-pulse-slow' : isDone ? 'bg-green-400' : 'bg-white/20'
                      }`}></div>
                    </div>

                    {/* Active pulse ring */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-ping"></div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom status bar — automated jobs */}
        <div className="mt-3 sm:mt-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent animate-pulse-slow"></div>
              <span className="text-[9px] text-white/40 font-mono">SCHEDULED JOBS</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {['ETL sync', 'Report gen', 'Cleanup'].map((job, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded border transition-all duration-300 ${
                    activeStage === i + 1
                      ? 'border-accent/40 bg-accent/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className={`w-1 h-1 rounded-full ${activeStage === i + 1 ? 'bg-accent' : 'bg-green-400'}`}></div>
                  <span className="text-[7px] sm:text-[8px] text-white/50 font-mono">{job}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WebDevIllustration() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const sections = ['Header', 'Hero', 'Features', 'Footer']

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Grid background - same as other cards */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Glow effect - same as other cards */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>

      <div className="p-6 relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></div>
            <span className="text-white/60 text-xs font-mono">Site Builder</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-white/40 font-mono">VISITORS</div>
              <div className="text-xs text-accent font-bold">12.4k</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 font-mono">CONVERSION</div>
              <div className="text-xs text-green-400 font-bold">4.8%</div>
            </div>
          </div>
        </div>

        {/* Browser mockup */}
        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden flex flex-col">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/60"></div>
            </div>
            <div className="flex-1 bg-white/5 rounded px-2 py-0.5 ml-1">
              <span className="text-[8px] font-mono text-white/25">www.client-site.com</span>
            </div>
          </div>

          {/* Page content that builds section by section */}
          <div className="p-3 flex-1 flex flex-col gap-1.5">
            {/* Nav */}
            <div className={`flex items-center justify-between px-2 py-1.5 rounded transition-all duration-700 ${
              step >= 0 ? 'bg-accent/15 border border-accent/30' : 'bg-white/[0.02] border border-white/5 border-dashed'
            }`}>
              <div className="h-1 w-8 bg-white/25 rounded-full"></div>
              <div className="flex gap-2">
                <div className="h-0.5 w-4 bg-white/15 rounded-full"></div>
                <div className="h-0.5 w-4 bg-white/15 rounded-full"></div>
                <div className="h-0.5 w-4 bg-white/15 rounded-full"></div>
              </div>
            </div>

            {/* Hero */}
            <div className={`px-2 py-2 rounded transition-all duration-700 ${
              step >= 1 ? 'bg-accent/12 border border-accent/25' : 'bg-white/[0.02] border border-white/5 border-dashed'
            }`}>
              <div className="space-y-1">
                <div className={`h-1.5 w-3/4 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-white/25' : 'bg-white/5'}`}></div>
                <div className={`h-1 w-1/2 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-white/15' : 'bg-white/5'}`}></div>
                <div className={`h-2.5 w-10 rounded-sm mt-1.5 transition-all duration-500 ${step >= 1 ? 'bg-accent/40' : 'bg-white/5'}`}></div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-3 gap-1.5 flex-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`rounded transition-all duration-700 flex flex-col p-1.5 ${
                    step >= 2 ? 'bg-accent/12 border border-accent/25' : 'bg-white/[0.02] border border-white/5 border-dashed'
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className={`h-1 w-full rounded-full mb-1 transition-all duration-500 ${step >= 2 ? 'bg-white/20' : 'bg-white/5'}`}></div>
                  <div className={`h-0.5 w-2/3 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-white/12' : 'bg-white/3'}`}></div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={`px-2 py-1 rounded transition-all duration-700 ${
              step >= 3 ? 'bg-accent/12 border border-accent/25' : 'bg-white/[0.02] border border-white/5 border-dashed'
            }`}>
              <div className="flex justify-between">
                <div className={`h-0.5 w-8 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-white/20' : 'bg-white/5'}`}></div>
                <div className={`h-0.5 w-6 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-white/15' : 'bg-white/5'}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Build progress - same style as other cards */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            {sections.map((section, i) => (
              <div key={i} className={`flex items-center gap-1.5 transition-all duration-500 ${step >= i ? 'opacity-100' : 'opacity-30'}`}>
                {step > i ? (
                  <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : step === i ? (
                  <div className="relative w-4 h-4">
                    <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin-slow"></div>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/20"></div>
                )}
                <span className={`text-[9px] font-mono ${step >= i ? 'text-white/60' : 'text-white/25'}`}>{section}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
