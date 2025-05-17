/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'solana': {
          primary: '#9945FF',
          secondary: '#14F195',
          accent: '#00FFBD',
          background: '#0E0E0E',
          'text-light': '#E0E0E0',
          'card-bg': '#1a1a1a',
        },
        'solana-primary': '#9945FF',
        'solana-secondary': '#14F195',
        'solana-accent': '#03E1FF',
        'solana-card-bg': '#1A1B1E',
        'solana-text-light': '#FFFFFF',
      },
      fontFamily: {
        'heading': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #9945FF 0%, #14F195 50%, #00FFBD 100%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-line': 'glow-line 3s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          'from': {
            textShadow: '0 0 10px rgba(153, 69, 255, 0.5), 0 0 20px rgba(153, 69, 255, 0.3), 0 0 30px rgba(153, 69, 255, 0.2)',
          },
          'to': {
            textShadow: '0 0 20px rgba(153, 69, 255, 0.6), 0 0 30px rgba(153, 69, 255, 0.4), 0 0 40px rgba(153, 69, 255, 0.3)',
          },
        },
        'pulse-glow': {
          '0%': {
            textShadow: '0 0 10px rgba(153, 69, 255, 0.5), 0 0 20px rgba(153, 69, 255, 0.3)',
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            textShadow: '0 0 20px rgba(153, 69, 255, 0.8), 0 0 30px rgba(153, 69, 255, 0.6), 0 0 40px rgba(153, 69, 255, 0.4)',
            transform: 'scale(1.05)',
            opacity: '0.9'
          },
          '100%': {
            textShadow: '0 0 10px rgba(153, 69, 255, 0.5), 0 0 20px rgba(153, 69, 255, 0.3)',
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'glow-line': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '50%': {
            opacity: '0.5',
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
        'fade-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-subtle': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)'
          }
        }
      },
    },
  },
  plugins: [],
} 