import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7C3AED',
          pink: '#EC4899',
          cyan: '#06B6D4',
          dark: '#0A0A0F',
          card: '#111118',
          border: '#1E1E2E',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'waveform': 'waveform 1.2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        glow: {
          from: { boxShadow: '0 0 10px #7C3AED40' },
          to: { boxShadow: '0 0 30px #7C3AED, 0 0 60px #7C3AED40' },
        },
        waveform: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '24px' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-studio': 'linear-gradient(135deg, #0A0A0F 0%, #111128 50%, #0A0A0F 100%)',
        'gradient-card': 'linear-gradient(145deg, #111118, #0D0D1A)',
      },
    },
  },
  plugins: [],
};

export default config;
