import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Duality Labs — Applied AI & Software Systems'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAF9',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 72,
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: 16,
          }}
        >
          Ψ
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Applied AI & software systems
          <br />
          for growing companies.
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#666666',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
          }}
        >
          DUALITY LABS
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#0066FF',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
