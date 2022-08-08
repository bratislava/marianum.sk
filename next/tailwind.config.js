const plugin = require('tailwindcss/plugin')

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

const inputNumberArrowsHide = plugin(function ({ addUtilities }) {
  // https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
  addUtilities({
    /* Chrome, Safari, Edge, Opera */
    '.arrows-hide': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
      /* Firefox */
      '-moz-appearance': 'textfield',
    },
  })
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    boxShadow: {
      DEFAULT: '0px 4px 12px 0px #00000014',
      card: '0px 4px 16px #00000014',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      gray: '#c4c4c4',
      black: '#000000',
      error: '#ef4823',
      primary: {
        DEFAULT: '#446650',
        dark: '#365240',
      },
      background: {
        dark: '#2b2e2c',
        disabled: '#e8e8e8',
        beige: '#f5f4f2',
      },
      border: {
        DEFAULT: '#dddddd',
        dark: '#c1c0c0',
        alt: '#e0ddd5',
        'alt-dark': '#cecbc4',
      },
      foreground: {
        DEFAULT: '#494e4a',
        placeholder: '#999c9a',
        disabled: '#b5b6b5',
        heading: '#2b2e2c',
      },
    },
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
    },
    fontSize: {
      lg: ['var(--font-size-large)', 'var(--line-height-large)'],
      md: ['var(--font-size-default)', 'var(--line-height-default)'],
      sm: ['var(--font-size-small)', 'var(--line-height-small)'],
      btn: ['var(--font-size-button)', 'var(--line-height-button)'],
      h6: ['var(--font-size-h6)', 'var(--line-height-h6)'],
      h5: ['var(--font-size-h5)', 'var(--line-height-h5)'],
      h4: ['var(--font-size-h4)', 'var(--line-height-h4)'],
      h3: ['var(--font-size-h3)', 'var(--line-height-h3)'],
      h2: ['var(--font-size-h2)', 'var(--line-height-h2)'],
      h1: ['var(--font-size-h1)', 'var(--line-height-h1)'],
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
      spacing: {
        1.5: '0.375rem',
      },
    },
  },
  corePlugins: {
    // container: false,
    aspectRatio: false, // See: https://tailwindcss.com/docs/aspect-ratio#browser-support
  },
  plugins: [scrollBarHide, inputNumberArrowsHide, require('tailwindcss-radix')()],
}
