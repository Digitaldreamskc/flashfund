/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        futuristic: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'scroll-bg': 'scroll-bg 10s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'scroll-bg': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
        'glow': {
          '0%': { textShadow: '0 0 5px rgba(0,255,255,0.5), 0 0 10px rgba(0,255,255,0.3)' },
          '100%': { textShadow: '0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.5)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 