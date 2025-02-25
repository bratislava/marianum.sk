import filesize from 'filesize'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { UploadFileEntityFragment } from '@/graphql'

export const useDownloadAriaLabel = () => {
  const { t, i18n } = useTranslation('common')

  const getDownloadAriaLabel = useCallback(
    (file: UploadFileEntityFragment, title: string): string => {
      if (!file.attributes) {
        return t('general.downloadFile')
      }
      const { size, ext } = file.attributes
      const formattedSize = filesize(size * 1000, { round: 1, locale: i18n.language })
      const extFormatted = ext ?? t('general.unknownFormat')

      return t('general.downloadFileAriaLabel', {
        title,
        ext: extFormatted,
        size: formattedSize,
      })
    },
    [i18n.language, t],
  )

  return { getDownloadAriaLabel }
}
