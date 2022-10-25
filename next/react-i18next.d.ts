import skCommonNamespace from './public/locales/sk/common.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof skCommonNamespace
    }
  }
}
