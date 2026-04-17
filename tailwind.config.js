/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        lelab: {
          yellow: '#EFB909',
          charcoal: '#0a0a0a',
          surface: '#111111',
          light: '#EFEFEF',
          gray: '#666666',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
