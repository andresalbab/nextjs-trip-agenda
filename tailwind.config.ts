import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        secondary: 'var(--color-secondary)',
        'on-secondary': 'var(--color-on-secondary)',
        tertiary: 'var(--color-tertiary-container)',
        'on-tertiary': 'var(--color-on-tertiary-container)',
        container: 'var(--color-container)',
        'on-container': 'var(--color-on-container)',
        surface: 'var(--color-surface)',
        'surface-var': 'var(--color-surface-var)',
        'on-surface': 'var(--color-text)',
        outline: 'var(--color-outline)',
      },
      fontFamily: {
        sans: ['var(--font-plain)', 'Roboto', 'sans-serif'],
        display: ['var(--font-brand)', 'Google Sans', 'sans-serif'],
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      borderRadius: {
        s: 'var(--radius-s)',
        m: 'var(--radius-m)',
        l: 'var(--radius-l)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },
    },
  },
  plugins: [],
};

export default config;

