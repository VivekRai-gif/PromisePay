/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        monad: {
          dark: '#0A0812',
          surface: '#13111C',
          surfaceLight: '#1C1929',
          purple: '#8B5CF6',
          purpleLight: '#A855F7',
          pink: '#EC4899',
          indigo: '#6366F1',
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(139, 92, 246, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        glowPink: '0 0 25px -5px rgba(236, 72, 153, 0.4)',
        glowEmerald: '0 0 20px -5px rgba(16, 185, 129, 0.3)',
        card: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'monad-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'hero-glow': 'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.1) 35%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
