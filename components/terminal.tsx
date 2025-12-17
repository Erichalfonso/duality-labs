'use client'

import { useEffect, useState, useRef } from 'react'

interface TerminalLine {
  id: number
  type: 'comment' | 'command' | 'output' | 'success'
  content: string
  delay: number
}

const terminalSequence: TerminalLine[] = [
  { id: 1, type: 'comment', content: '# Building your internal tools', delay: 0 },
  { id: 2, type: 'command', content: 'npm run build-automation', delay: 800 },
  { id: 3, type: 'output', content: 'Analyzing workflow patterns...', delay: 1200 },
  { id: 4, type: 'output', content: 'Generating AI agents...', delay: 1800 },
  { id: 5, type: 'success', content: '✓ System deployed successfully', delay: 2400 },
  { id: 6, type: 'command', content: 'git commit -m "shipped"', delay: 3200 },
]

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [currentTyping, setCurrentTyping] = useState<{ lineId: number; text: string } | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Start animation sequence
    const animateSequence = () => {
      setVisibleLines([])
      setCurrentTyping(null)

      terminalSequence.forEach((line) => {
        setTimeout(() => {
          if (line.type === 'command') {
            // Typing effect for commands
            const text = line.content
            let charIndex = 0

            const typeChar = () => {
              if (charIndex <= text.length) {
                setCurrentTyping({ lineId: line.id, text: text.slice(0, charIndex) })
                charIndex++
                setTimeout(typeChar, 30) // 30ms per character
              } else {
                setCurrentTyping(null)
                setVisibleLines(prev => [...prev, line.id])
              }
            }
            typeChar()
          } else {
            // Instant appear for output/comments
            setVisibleLines(prev => [...prev, line.id])
          }
        }, line.delay)
      })

      // Loop animation
      timeoutRef.current = setTimeout(() => {
        animateSequence()
      }, terminalSequence[terminalSequence.length - 1].delay + 2000)
    }

    animateSequence()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'comment':
        return 'text-gray-500'
      case 'command':
        return 'text-accent'
      case 'output':
        return 'text-gray-400'
      case 'success':
        return 'text-green-400'
      default:
        return 'text-gray-300'
    }
  }

  return (
    <div className="relative w-full max-w-[520px]">
      {/* Terminal window */}
      <div className="bg-[#1C1917] rounded-lg shadow-2xl overflow-hidden border border-[#2D2D2D]">
        {/* Header with traffic lights */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#252525] border-b border-[#2D2D2D]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
          </div>
          <span className="font-mono text-xs text-gray-500 ml-2">
            duality-terminal
          </span>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-[240px] sm:min-h-[320px]"
        >
          {terminalSequence.map((line) => {
            const isVisible = visibleLines.includes(line.id)
            const isTyping = currentTyping?.lineId === line.id

            if (!isVisible && !isTyping) return null

            return (
              <div
                key={line.id}
                className={`terminal-line ${getLineColor(line.type)} mb-2`}
              >
                {line.type === 'command' && <span className="text-gray-500 mr-2">$</span>}
                {isTyping ? currentTyping.text : line.content}
                {isTyping && <span className="terminal-cursor inline-block w-2 h-4 bg-accent ml-1" />}
              </div>
            )
          })}
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg -z-10 blur-xl" />
    </div>
  )
}
