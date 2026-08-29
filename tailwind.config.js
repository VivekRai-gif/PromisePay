/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        monad: {
          bg: '#120F1D',
          surface: 'rgba(28, 22, 40, 0.65)',
          surfaceHover: 'rgba(38, 30, 54, 0.75)',
          surfaceLight: '#261F38',
          mauve: '#9D76C1',
          mauveDark: '#1E162B',
          purple: '#A855F7',
          purpleLight: '#C084FC',
          pink: '#F472B6',
          pinkSoft: '#FBCFE8',
          indigo: '#818CF8',
          emerald: '#34D399',
          amber: '#FBBF24',
          border: 'rgba(255, 255, 255, 0.12)',
          borderHover: 'rgba(192, 132, 252, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        mauveGlow: '0 0 35px -5px rgba(168, 85, 247, 0.35)',
        pinkGlow: '0 0 35px -5px rgba(244, 114, 182, 0.35)',
        emeraldGlow: '0 0 25px -5px rgba(52, 211, 153, 0.35)',
        frostedCard: '0 20px 50px 0 rgba(10, 8, 18, 0.55)',
        floatingNav: '0 20px 40px 0 rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'mauve-bg': 'radial-gradient(ellipse at 50% 0%, #2A1D3F 0%, #151022 60%, #0D0A16 100%)',
        'mauve-card': 'linear-gradient(145deg, rgba(40, 31, 60, 0.6) 0%, rgba(20, 15, 32, 0.7) 100%)',
        'mauve-gradient': 'linear-gradient(135deg, #A855F7 0%, #F472B6 100%)',
        'purple-pink-gradient': 'linear-gradient(135deg, #C084FC 0%, #E879F9 50%, #F472B6 100%)',
        'glass-highlight': 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      borderRadius: {
        '4xl': '2.25rem',
        '5xl': '2.75rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'glow-breathe': 'glowBreathe 5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowBreathe: {
          '0%': { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '0.75', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
