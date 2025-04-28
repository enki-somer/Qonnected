import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#1a2236',
          dark: '#151b2d',
        },
        'accent': {
          DEFAULT: '#FFD700',
          hover: '#FFE44D',
        },
        'text': {
          DEFAULT: '#FFFFFF',
          muted: '#94A3B8',
        }
      },
    },
  },
  plugins: [],
}

export default config 