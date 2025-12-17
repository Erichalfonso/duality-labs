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
        bg: '#FAFAF9',
        'bg-secondary': '#F5F5F4',
        text: '#1C1917',
        'text-secondary': '#57534E',
        accent: '#0D9488', // Teal - technical, differentiated
        'accent-light': '#CCFBF1',
        border: '#E7E5E4',
        // Gradient colors
        'gradient-from': '#F8FAF9',
        'gradient-via': '#F5F7F6',
        'gradient-to': '#FAFAF9',
        'gradient-accent-from': '#14B8A6',
        'gradient-accent-to': '#0D9488',
        // Card colors
        'card-bg': '#FFFFFF',
        'card-border': '#E7E5E4',
      },
      fontFamily: {
        sans: ['Syne', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
