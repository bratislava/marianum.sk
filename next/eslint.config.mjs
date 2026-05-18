import { createNextConfig } from '@bratislava/eslint-config-next'

export default [
  ...createNextConfig({
    ignores: ['services/graphql/**'],
  }),
  // https://github.com/bratislava/eslint-config/blob/b17b3028c67e639cf5cef183817f9087d6281d7e/packages/next/README.md#tailwind-css
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: './styles/globals.css',
        callees: ['cx', 'classnames', 'clsx', 'cn', 'twMerge', 'tw'],
      },
    },
  },

  // Project-specific rule overrides
  {
    rules: {
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',

      // TODO good rules, require work to fix and were skipped over in eslint v9 upgrade
      '@typescript-eslint/consistent-type-definitions': 'off', // 95 violations

      // TODO think these through
      'arrow-body-style': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/img-redundant-alt': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',

      // TODO fix and enable
      '@typescript-eslint/no-unnecessary-condition': 'warn', // 109 violations
      'i18next/no-literal-string': 'warn', // 84 violations
      '@typescript-eslint/promise-function-async': 'warn', // 31 violations
      '@typescript-eslint/no-unused-vars': 'warn', // 20 violations
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn', // 15 violations
      'sonarjs/no-redundant-optional': 'warn', // 13 violations
      'no-implicit-coercion': ['warn', { boolean: false }], // 5 violations
      'react-hooks/refs': 'warn', // 4 violations
      '@typescript-eslint/no-useless-default-assignment': 'warn', // 4 violations
      'react-hooks/static-components': 'warn', // 4 violations
      '@typescript-eslint/no-misused-spread': 'warn', // 2 violations
      'react-hooks/set-state-in-effect': 'warn', // 2 violations
      '@typescript-eslint/unified-signatures': 'warn', // 2 violations
      '@typescript-eslint/consistent-indexed-object-style': 'warn', // 2 violations
      '@typescript-eslint/no-empty-object-type': 'warn', // 2 violations
      'react-hooks/purity': 'warn', // 2 violations
      '@typescript-eslint/no-unnecessary-type-parameters': 'warn', // 2 violations
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn', // 1 violation
      '@typescript-eslint/switch-exhaustiveness-check': 'warn', // 1 violation
      '@typescript-eslint/no-redundant-type-constituents': 'warn', // 1 violation
      'react-hooks/preserve-manual-memoization': 'warn', // 1 violation
      '@typescript-eslint/no-unnecessary-template-expression': 'warn', // 1 violation
      'sonarjs/pseudo-random': 'warn', // 1 violation
      '@typescript-eslint/require-await': 'warn', // 1 violation
      '@typescript-eslint/no-non-null-assertion': 'warn', // 1 violation
      '@typescript-eslint/no-deprecated': 'warn', // 1 violation
      'sonarjs/no-nested-assignment': 'warn', // 1 violation
    },
  },
]
