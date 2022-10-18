import { useTranslation } from 'next-i18next'
import { PropsWithChildren, useMemo } from 'react'

import { normalizeSkText } from '../../utils/normalizeSkText'

// eslint-disable-next-line @typescript-eslint/ban-types
const NormalizeSkText = ({ children }: PropsWithChildren<{}>) => {
  const { i18n } = useTranslation()

  return useMemo(() => {
    if (i18n?.language === 'sk' && typeof children === 'string') {
      return <>{normalizeSkText(children)}</>
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
  }, [children, i18n?.language])
}

export default NormalizeSkText
