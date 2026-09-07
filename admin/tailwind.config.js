/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gis: {
          navy: '#14213D',
          darknavy: '#0C1322',
          sidebar: '#111D35',
          sidebarHover: '#1A2B4C',
          orange: '#F97316',
          orangeDark: '#EA580C',
          blue: '#2563EB',
          sky: '#0EA5E9',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Prompt', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
