/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'oklch(var(--color-background) / <alpha-value>)',
        surface: {
          DEFAULT: 'oklch(var(--color-surface) / <alpha-value>)',
          secondary: 'oklch(var(--color-surface-secondary) / <alpha-value>)',
        },
        text: {
          primary: 'oklch(var(--color-text-primary) / <alpha-value>)',
          secondary: 'oklch(var(--color-text-secondary) / <alpha-value>)',
        },
        accent: {
          teal: 'oklch(var(--color-accent-teal) / <alpha-value>)',
          cyan: 'oklch(var(--color-accent-cyan) / <alpha-value>)',
        },
        border: 'oklch(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'glass': '0 12px 28px rgba(45, 38, 29, 0.08)',
        'glow-teal': '0 10px 22px rgba(185, 77, 56, 0.18)',
        'glow-cyan': '0 10px 22px rgba(28, 100, 112, 0.14)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: [],
}
