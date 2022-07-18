const plugin = require('tailwindcss/plugin')
const { join } = require('path')

const scrollBarHide = plugin(function ({ addUtilities }) {
  addUtilities({
    '.scrollbar-hide': {
      /* Firefox */
      'scrollbar-width': 'none',
      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      white: 'var(--color-white)',
      primary: 'var(--color-brand-default)',
      primaryDark: 'var(--color-brand-hover)',
      error: 'var(--color-error)',
      beige: 'var(--color-background-beige)',
      bgDark: 'var(--color-background-dark)',
      bgDisabled: 'var(--color-background-disabled)',
      border: 'var(--color-divider)',
      borderDark: 'var(--color-divider-dark)',
      alternative: 'var(--color-alternative-default)',
      alternativeDark: 'var(--color-alternative-hover)',
      text: 'var(--color-text-default)',
      placeholder: 'var(--color-text-placeholder)',
      disabled: 'var(--color-text-disabled)',
      heading: 'var(--color-text-headline)',
    },
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
    },
    fontSize: {
      lg: ['var(--font-size-large)', 'var(--line-height-large)'],
      md: ['var(--font-size-default)', 'var(--line-height-default)'],
      sm: ['var(--font-size-small)', 'var(--line-height-small)'],
      btn: ['var(--font-size-button)', 'var(--line-height-button)'],
      h1: ['var(--font-size-h6)', 'var(--line-height-h6)'],
      h2: ['var(--font-size-h5)', 'var(--line-height-h5)'],
      h3: ['var(--font-size-h4)', 'var(--line-height-h4)'],
      h4: ['var(--font-size-h3)', 'var(--line-height-h3)'],
      h5: ['var(--font-size-h2)', 'var(--line-height-h2)'],
      h6: ['var(--font-size-h1)', 'var(--line-height-h1)'],
    },
    fontWeight: {
      regular: '400',
      semibold: '600',
      bold: '700',
    },
    extend: {
      opacity: {
        64: '.64',
        72: '.72',
      },
    },
  },
  corePlugins: {
    container: false,
    aspectRatio: false, // See: https://tailwindcss.com/docs/aspect-ratio#browser-support
  },
  plugins: [scrollBarHide],
}
