/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        protocol: {
          bg: '#08070D',
          dark: '#0C0A14',
          surface: '#121017',
          surfaceLight: '#1A1424',
          purple: '#241426',
          plum: '#3A1E3B',
          pink: '#D9579D',
          pinkLight: '#E89AC1',
          lavender: '#A982C4',
          violet: '#5A2A61',
          rose: '#C25D8E',
          textPrimary: '#FFFFFF',
          textSecondary: '#AAA3AF',
          textMuted: '#726B77',
          border: 'rgba(255, 255, 255, 0.12)',
          borderGlow: 'rgba(217, 87, 157, 0.45)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glowPink: '0 0 35px -5px rgba(217, 87, 157, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        glowLavender: '0 0 35px -5px rgba(169, 130, 196, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        glowPlum: '0 0 45px -10px rgba(58, 30, 59, 0.6)',
        card: '0 20px 50px -12px rgba(0, 0, 0, 0.65)',
        innerGlow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'protocol-bg': 'radial-gradient(circle at 20% 10%, rgba(90, 42, 97, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(217, 87, 157, 0.2) 0%, transparent 45%), radial-gradient(circle at 50% 80%, rgba(58, 30, 59, 0.35) 0%, transparent 50%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(58, 30, 59, 0.6) 0%, rgba(24, 14, 26, 0.8) 100%)',
        'card-primary': 'linear-gradient(135deg, rgba(58, 30, 59, 0.85) 0%, rgba(18, 16, 23, 0.9) 100%)',
        'card-secondary': 'linear-gradient(135deg, rgba(36, 20, 38, 0.6) 0%, rgba(12, 10, 20, 0.75) 100%)',
        'pink-button': 'linear-gradient(135deg, #D9579D 0%, #E89AC1 50%, #A982C4 100%)',
        'circuit-pattern': 'radial-gradient(rgba(217, 87, 157, 0.15) 1px, transparent 1px)',
      },
      animation: {
        'node-pulse': 'nodePulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'circuit-flow': 'circuitFlow 15s linear infinite',
      },
      keyframes: {
        nodePulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        circuitFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100px 100px' },
        },
      },
    },
  },
  plugins: [],
};
