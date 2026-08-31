/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bisque: '#EDE6D6',
        porcelain: '#F7F3EA',
        kiln: '#3A2E26',
        rust: '#B8542F',
        sage: '#6B7A5E',
        clay: {
          50: '#F7F3EA',
          100: '#EDE6D6',
          200: '#DDD0B8',
          300: '#C4AE86',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        script: ['var(--font-caveat)', 'cursive'],
        body: ['var(--font-instrument-sans)', 'sans-serif'],
      },
      fontSize: {
        mega: ['clamp(3.5rem, 12vw, 11rem)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        huge: ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '0.92', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
}
