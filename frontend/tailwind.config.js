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
          orange: '#FF5500',
          'orange-hover': '#FF6A1A',
          'orange-dark': '#E04500',
          'orange-light': '#FFF0E8',
          dark: '#0B0D11',
          'dark-card': '#14171E',
          'dark-surface': '#1A1E26',
          'dark-border': '#2A303C',
          gray: '#8C95A6',
          'light-bg': '#F8F9FA'
        }
      },
      fontFamily: {
        sans: ['Prompt', 'Sarabun', 'sans-serif'],
        display: ['Prompt', 'Kanit', 'sans-serif'],
        anton: ['"Anton"', 'sans-serif'],
        headline: ['"Anton"', 'sans-serif']
      },
      boxShadow: {
        'glow-orange': '0 0 25px rgba(255, 85, 0, 0.45)',
        'glow-orange-lg': '0 0 45px rgba(255, 85, 0, 0.6)',
        'card-slant': '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 15px rgba(255, 85, 0, 0.2)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'values-pattern': 'linear-gradient(135deg, #FF5500 0%, #D84300 60%, #9B2D00 100%)'
      }
    },
  },
  plugins: [],
}
