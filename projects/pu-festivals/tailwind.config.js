/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0a0a14',
        surface: '#0f0f1e',
        elevated: '#1a1a2e',
        cosmic: {
          cyan: '#22d3ee',
          purple: '#a855f7',
          amber: '#f59e0b',
          magenta: '#ec4899',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
