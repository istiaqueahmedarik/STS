/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-x':'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': { 'background-size': '200% 200%', 'background-position': '0% 30%' },
          '30%': { 'background-size': '200% 200%', 'background-position': '30% 50%' },
          '50%': { 'background-size': '200% 200%', 'background-position': '100% 50%' },
          '70%': { 'background-size': '200% 200%', 'background-position': '100% 70%' },
          '100%': { 'background-size': '200% 200%', 'background-position': '0% 50%' },
        },
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-animate")],
}
