/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mauve: {
          bg: '#0B0A0D',
          surface: '#121016',
          surfaceLight: '#1B1722',
          card1: '#211722',
          card2: '#342031',
          card3: '#3A2338',
          cardEnd: '#151118',
          accent: '#D95B9A',
          accentSoft: '#E38BB5',
          lilac: '#A984C4',
          plum: '#4B304F',
          magenta: '#C66B9B',
          rose: '#A87587',
          mauveMuted: '#7C647C',
          dustyPurple: '#765878',
          textPrimary: '#FFFFFF',
          textSecondary: '#C8C1C9',
          textMuted: '#8F8991',
          textDisabled: '#625E65',
          border: 'rgba(255, 255, 255, 0.10)',
          borderHover: 'rgba(217, 91, 154, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glowPink: '0 0 30px -5px rgba(217, 91, 154, 0.45)',
        glowLilac: '0 0 30px -5px rgba(169, 132, 196, 0.4)',
        glowMauve: '0 0 35px -8px rgba(124, 100, 124, 0.5)',
        card: '0 12px 40px -10px rgba(0, 0, 0, 0.5)',
        floatingNav: '0 10px 30px 0 rgba(0, 0, 0, 0.6), 0 0 25px rgba(217, 91, 154, 0.2)',
      },
      backgroundImage: {
        'mauve-hero-glow': 'radial-gradient(circle at 50% 20%, rgba(124, 100, 124, 0.3) 0%, rgba(198, 107, 155, 0.2) 35%, transparent 70%)',
        'mauve-card-gradient': 'linear-gradient(135deg, #211722 0%, #151118 100%)',
        'mauve-card-gradient-highlight': 'linear-gradient(135deg, #342031 0%, #19121A 100%)',
        'pink-accent-gradient': 'linear-gradient(135deg, #D95B9A 0%, #A984C4 100%)',
        'pink-button-gradient': 'linear-gradient(135deg, #D95B9A 0%, #C66B9B 50%, #A984C4 100%)',
        'glass-overlay': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
