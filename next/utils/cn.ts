// cn helper function inspired by https://ui.shadcn.com/docs/installation/manual
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// NEED TO CHANGE

const twMerge = extendTailwindMerge({
  extend: {
    // Add custom theme values, keep in sync with globals.css
    theme: {
      // Custom breakpoints
      breakpoint: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      // Custom colors
      color: [
        'transparen',
        'curren',
        'white',
        'gray',
        'black',
        'error',
        'primary',
        'primary-light',
        'primary-dark',
        'background-dark',
        'background-disabled',
        'background-beige',
        'border',
        'border-dark',
        'border-alt',
        'border-alt-dark',
        'foreground',
        'foreground-dark',
        'foreground-placeholder',
        'foreground-disabled',
        'foreground-heading',
      ],
      // Custom shadows
      shadow: ['card'],
    },
    classGroups: {
      // Keep in sync with utility classes in globals.css
      'font-size': [
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-h5',
        'text-h6',
        'text-btn',
        'text-sm',
        'text-md',
        'text-lg',
      ],
    },
  },
})

function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}

export default cn
