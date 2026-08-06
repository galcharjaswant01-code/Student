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
