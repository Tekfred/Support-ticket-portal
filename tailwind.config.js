/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Enhanced dark mode palette (inspired by X.com's aesthetic)
        'dark-bg': {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#334155',
          800: '#1e293b',
          850: '#192038',
          900: '#0f172a',
          950: '#0a0f1a',
        },
        // Light mode palette
        'light-bg': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
        },
        // Enhanced brand colors
        'brand': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          400: '#a78bfa',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
        },
      },
      backgroundColor: {
        // Light mode backgrounds
        'light-surface': '#ffffff',
        'light-surface-secondary': '#f8fafc',
        'light-surface-tertiary': '#f1f5f9',
        // Dark mode backgrounds
        'dark-surface': '#1a1f35',
        'dark-surface-secondary': '#141b2e',
        'dark-surface-tertiary': '#0f172a',
      },
      borderColor: {
        // Light mode borders
        'light-border': '#e2e8f0',
        'light-border-subtle': '#f1f5f9',
        // Dark mode borders
        'dark-border': '#334155',
        'dark-border-subtle': '#1e293b',
      },
      textColor: {
        // Light mode text
        'light-text-primary': '#1e293b',
        'light-text-secondary': '#64748b',
        'light-text-tertiary': '#94a3b8',
        // Dark mode text
        'dark-text-primary': '#f1f5f9',
        'dark-text-secondary': '#cbd5e1',
        'dark-text-tertiary': '#94a3b8',
      },
      boxShadow: {
        // Light mode shadows - more sophisticated
        'sm-light': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base-light': '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'md-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg-light': '0 10px 15px -3px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl-light': '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        // Dark mode shadows - subtle but defined
        'sm-dark': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'base-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'md-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'lg-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'xl-dark': '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        // Card shadows
        'card-light': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'card-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'card-hover-light': '0 10px 15px -3px rgba(0, 0, 0, 0.12)',
        'card-hover-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'slide-in-down': 'slideInDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        'sans': ['"Inter"', 'system-ui', 'sans-serif'],
        'display': ['"Space Grotesk"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [
    // Custom dark mode variant plugin
    function({ addUtilities, matchUtilities, theme }) {
      // Add custom utilities for light/dark mode specific shadows
      addUtilities({
        '.shadow-card': {
          '@apply shadow-card-light dark:shadow-card-dark': {},
        },
        '.shadow-card-hover': {
          '@apply shadow-card-hover-light dark:shadow-card-hover-dark transition-shadow duration-fast': {},
        },
      });

      // Match utilities for responsive shadows
      matchUtilities(
        {
          shadow: (value) => ({
            boxShadow: value,
          }),
        },
        { values: theme('boxShadow') }
      );
    },
  ],
};
