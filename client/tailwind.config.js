/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'base' }),
    require('@tailwindcss/typography'),
  ],
  // mode: import.meta.env.PROD ? 'jit' : undefined,
};
