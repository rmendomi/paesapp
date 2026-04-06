/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep:  '#0c1f3d',
          mid:   '#1d4ed8',
          main:  '#3b82f6',
          light: '#93c5fd',
          pale:  '#dbeafe',
        },
        cream: {
          DEFAULT: '#f8faff',
          dark:    '#eff6ff',
          deeper:  '#dbeafe',
        },
        gold:  '#f59e0b',
        teal:  '#0891b2',
        green: '#10b981',
        red:   '#ef4444',
      },
      fontFamily: {
        display: ['Cormorant Garant', 'Georgia', 'serif'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft':   '0 4px 30px rgba(12, 31, 61, 0.08)',
        'medium': '0 8px 40px rgba(12, 31, 61, 0.12)',
        'hard':   '0 12px 50px rgba(12, 31, 61, 0.18)',
      },
    },
  },
  plugins: [],
}
