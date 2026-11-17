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
        parchment: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F3EDE2',
          300: '#E8DFD1',
          400: '#D5C8B4',
        },
        sage: {
          50: '#F4F7F2',
          100: '#E7EFE4',
          200: '#DCE3D8',
          300: '#B8C7B2',
          600: '#4A6B50',
          700: '#3A5A40',
          800: '#2C4430',
        },
        terracotta: {
          50: '#FDF5F2',
          100: '#F9E7DF',
          500: '#DC6C43',
          600: '#C85A32',
          700: '#A94723',
        },
        charcoal: {
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
          500: '#52525B',
          400: '#71717A',
        },
        slateTeal: '#2C3E4C',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Instrument Serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        watercolor: '0 20px 40px -15px rgba(44, 62, 76, 0.08), 0 0 25px rgba(232, 223, 209, 0.45)',
        halo: '0 0 80px 20px rgba(200, 90, 50, 0.12)',
        glass: '0 8px 32px 0 rgba(44, 62, 76, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
