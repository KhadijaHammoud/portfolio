/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)',
          soft: 'rgb(var(--color-bg-soft) / <alpha-value>)',
          card: 'rgb(var(--color-bg-card) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--color-ink-faint) / <alpha-value>)',
        },
        accent: {
          DEFAULT: '#7c5cff',
          soft: '#a58bff',
          glow: '#5b3dff',
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
      },
      boxShadow: {
        glow: '0 0 60px -20px rgba(124, 92, 255, 0.55)',
        card: '0 1px 0 rgb(var(--color-line) / 0.04) inset, 0 0 0 1px rgb(var(--color-line) / 0.04)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgb(var(--color-line) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-line) / 0.04) 1px, transparent 1px)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
