/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#CFFF00',
          electric: '#B8F000',
          dark: '#96CE00',
        },
        emerald: {
          fresh: '#19D98B',
          deep: '#00C878',
        },
        violet: {
          soft: '#8B5CF6',
          electric: '#7C3AED',
        },
        yellow: {
          warm: '#F4E04D',
        },
        protocol: {
          bg: '#05070A',
          dark: '#080B10',
          surface: '#0C1015',
          card: '#10151B',
          cardLight: '#121820',
          cardBorder: '#161D25',
          textPrimary: '#F8FAFC',
          textSecondary: '#9AA4B2',
          textMuted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glowLime: '0 0 35px -5px rgba(207, 255, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        glowEmerald: '0 0 35px -5px rgba(25, 217, 139, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        glowViolet: '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        card: '0 20px 50px -12px rgba(0, 0, 0, 0.7)',
        innerHighlight: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'lime-emerald-btn': 'linear-gradient(135deg, #CFFF00 0%, #B8F000 45%, #19D98B 100%)',
        'lime-card-primary': 'linear-gradient(135deg, rgba(16, 21, 27, 0.9) 0%, rgba(12, 16, 21, 0.95) 100%)',
        'lime-card-highlight': 'linear-gradient(135deg, rgba(20, 28, 36, 0.9) 0%, rgba(10, 14, 19, 0.95) 100%)',
        'lime-text-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #CFFF00 50%, #19D98B 100%)',
      },
      animation: {
        'node-pulse': 'nodePulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
      },
      keyframes: {
        nodePulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.25)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0.5deg)' },
        },
      },
    },
  },
  plugins: [],
};
