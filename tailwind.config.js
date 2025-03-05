/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Improved Clash of Clans inspired color palette
        primary: {
          DEFAULT: '#FFB626', // Brighter Gold
          dark: '#F18700',    // Dark Gold
        },
        secondary: {
          DEFAULT: '#3CADE2', // Bright Blue
          dark: '#1976D2',    // Dark Blue
        },
        accent: {
          DEFAULT: '#FF4C4C', // Bright Red
          dark: '#D32F2F',    // Dark Red
        },
        background: {
          DEFAULT: '#0A4271', // Deep Blue
          light: '#1565C0',   // Lighter Blue
          paper: '#FFFFFF',   // White for contrast
          dark: '#333333',    // Dark color for text
        },
        green: {
          DEFAULT: '#4CAF50', // Bright Green
          dark: '#388E3C',    // Dark Green
        },
        purple: {
          DEFAULT: '#9C27B0', // Bright Purple
          dark: '#7B1FA2',    // Dark Purple
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear',
        'bounce-slow': 'bounce 1s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      fontFamily: {
        sans: ['Supercell', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 