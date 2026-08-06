/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#0EA5E9',
        success: '#22C55E',
        indigo: {
          50: 'var(--color-accent-50, oklch(96.2% 0.018 272.314))',
          100: 'var(--color-accent-100, oklch(93% 0.034 272.788))',
          200: 'var(--color-accent-200, oklch(87% 0.065 274.039))',
          300: 'var(--color-accent-300, oklch(78.5% 0.115 274.713))',
          400: 'var(--color-accent-400, oklch(67.3% 0.182 276.935))',
          500: 'var(--color-accent-500, oklch(58.5% 0.233 277.117))',
          600: 'var(--color-accent-600, oklch(51.1% 0.262 276.966))',
          700: 'var(--color-accent-700, oklch(45.7% 0.24 277.023))',
          800: 'var(--color-accent-800, oklch(39.8% 0.195 277.366))',
          900: 'var(--color-accent-900, oklch(35.9% 0.144 278.697))',
          950: 'var(--color-accent-950, oklch(25.7% 0.09 281.288))',
        },
        dark: {
          bg: '#0B0F19',
          surface: '#111827',
          border: '#1F2937'
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E5E7EB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
