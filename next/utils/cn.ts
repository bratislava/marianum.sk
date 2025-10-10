// cn helper function inspired by https://ui.shadcn.com/docs/installation/manual
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
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
