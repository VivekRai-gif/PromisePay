/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        eye: {
          bg: '#07040D',
          dark: '#0D0718',
          surface: '#130924',
          card: '#180E2E',
          cardBorder: '#2D1B54',
          lime: '#A055FF',         // Electric Monad Purple Accent
          limeBright: '#B875FF',   // Bright Monad Purple
          emerald: '#8335EC',     // Core Monad Purple
          teal: '#A855F7',        // Monad Violet
          purple: '#8335EC',      // Monad Brand Purple
          yellow: '#F59E0B',
          textPrimary: '#FFFFFF',
          textSecondary: '#C4B5FD',
          textMuted: '#8B5CF6',
        },
        monad: {
          purple: '#8335EC',
          lightPurple: '#A055FF',
          brightViolet: '#C084FC',
          dark: '#07040D',
          cardBg: '#130924',
          border: '#2E1959',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glowLime: '0 0 35px -5px rgba(131, 53, 236, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
        glowEmerald: '0 0 35px -5px rgba(160, 85, 255, 0.5)',
        glowPurple: '0 0 45px -5px rgba(131, 53, 236, 0.7)',
        orbital: '0 0 60px -10px rgba(160, 85, 255, 0.35)',
        card: '0 20px 50px -10px rgba(0, 0, 0, 0.85)',
        innerLight: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      backgroundImage: {
        'lime-gradient': 'linear-gradient(135deg, #8335EC 0%, #A055FF 50%, #C084FC 100%)',
        'monad-gradient': 'linear-gradient(135deg, #8335EC 0%, #A055FF 100%)',
        'hero-glow': 'radial-gradient(circle at 75% 30%, rgba(131, 53, 236, 0.28) 0%, rgba(160, 85, 255, 0.15) 35%, transparent 70%)',
        'card-glass': 'linear-gradient(135deg, rgba(19, 9, 36, 0.88) 0%, rgba(13, 7, 24, 0.95) 100%)',
      },
      animation: {
        'orbital-rotate': 'orbitalRotate 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'node-ping': 'nodePing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        orbitalRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.08)' },
        },
        nodePing: {
          '75%, 100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
