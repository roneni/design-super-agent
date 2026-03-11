/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#050510',
        'deep': '#0d0d1a',
        'surface': '#1a1a2e',
        'elevated': '#2a2a3e',
        'accent-cyan': '#22d3ee',
        'accent-violet': '#a855f7',
        'accent-magenta': '#ec4899',
        'accent-amber': '#f59e0b',
        'accent-gold': '#d4a853',
        'text-primary': '#f0ebe0',
        'text-secondary': '#a0a0b8',
        'text-muted': '#6b6b80',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        display: ['"Exo 2"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
