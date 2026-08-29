/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        eye: {
          bg: '#070A0F',
          dark: '#0A0E17',
          surface: '#0E1420',
          card: '#121A2A',
          cardBorder: '#1A2438',
          lime: '#A3E635',
          limeBright: '#B8F000',
          emerald: '#10B981',
          teal: '#14B8A6',
          purple: '#8B5CF6',
          yellow: '#F59E0B',
          textPrimary: '#FFFFFF',
          textSecondary: '#94A3B8',
          textMuted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glowLime: '0 0 35px -5px rgba(163, 230, 53, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        glowEmerald: '0 0 35px -5px rgba(16, 185, 129, 0.35)',
        orbital: '0 0 50px -10px rgba(163, 230, 53, 0.25)',
        card: '0 20px 50px -10px rgba(0, 0, 0, 0.8)',
        innerLight: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      backgroundImage: {
        'lime-gradient': 'linear-gradient(135deg, #A3E635 0%, #B8F000 50%, #10B981 100%)',
        'hero-glow': 'radial-gradient(circle at 75% 30%, rgba(163, 230, 53, 0.18) 0%, rgba(16, 185, 129, 0.10) 35%, transparent 70%)',
        'card-glass': 'linear-gradient(135deg, rgba(14, 20, 32, 0.85) 0%, rgba(10, 14, 23, 0.95) 100%)',
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
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        nodePing: {
          '75%, 100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
