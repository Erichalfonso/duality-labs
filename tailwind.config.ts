import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        'bg-secondary': '#FAFAFA',
        text: '#0A0A0A',
        'text-secondary': '#737373',
        accent: '#0066FF', // Bold electric blue
        'accent-light': '#E6F0FF',
        border: '#E5E5E5',
        // Gradient colors - very subtle
        'gradient-from': '#FFFFFF',
        'gradient-via': '#FEFEFE',
        'gradient-to': '#FAFAFA',
        'gradient-accent-from': '#0066FF',
        'gradient-accent-to': '#0052CC',
        // Card colors
        'card-bg': '#FFFFFF',
        'card-border': '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
