import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Inspired by: https://ui.shadcn.com/docs/installation/manual
 */

const twMerge = extendTailwindMerge({
  extend: {
    // Add custom theme values, keep in sync with globals.css
    theme: {
      // Custom breakpoints
      breakpoint: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      // Custom colors
      color: [
        'transparent',
        'current',
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
        'text-size-h1',
        'text-size-h1-r',
        'text-size-h2',
        'text-size-h2-r',
        'text-size-h3',
        'text-size-h3-r',
        'text-size-h4',
        'text-size-h4-r',
        'text-size-h5',
        'text-size-h5-r',
        'text-size-h6',
        'text-size-h6-r',
        'text-size-p-large',
        'text-size-p-large-r',
        'text-size-p-default',
        'text-size-p-default-r',
        'text-size-p-small',
        'text-size-p-small-r',
        'text-size-button',
        'text-size-button-r',
      ],
    },
  },
})

function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}

export default cn
