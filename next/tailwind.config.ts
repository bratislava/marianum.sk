import plugin from 'tailwindcss/plugin'
import { Config } from 'tailwindcss'

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

const customVariants = plugin(function ({ addVariant }) {
  addVariant('not-first', '&:not(:first-child)')
})

const config: Config = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  plugins: [scrollBarHide, inputNumberArrowsHide, customVariants, require('tailwindcss-radix')()],
  corePlugins: {
    // container: false,
  },
  theme: {
    boxShadow: {
      DEFAULT: '0px 4px 12px 0px #00000014',
      card: '0px 4px 16px #00000014',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4.75rem',
      },
    },
    screens: require('./screen-breakpoints.config').tailwindScreenBreakpoints,
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      gray: '#c4c4c4',
      black: '#000000',
      error: '#ef4823',
      primary: {
        DEFAULT: '#446650',
        light: '#567D64',
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
        dark: '#323532',
        placeholder: '#999c9a',
        disabled: '#b5b6b5',
        heading: '#2b2e2c',
      },
    },
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      serif: ['ABC Arizona Flare', 'serif'],
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
        8: '.08',
        12: '.12',
        64: '.64',
        72: '.72',
      },
      spacing: {
        1.5: '0.375rem', // 6px
        18: '4.5rem', // 72px
      },
    },
  },
}

export default config
