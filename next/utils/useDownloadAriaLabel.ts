import { UploadFileEntityFragment } from '@graphql'
import filesize from 'filesize'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

export const useDownloadAriaLabel = () => {
  const { t, i18n } = useTranslation('common')

  const getDownloadAriaLabel = useCallback(
    (file: UploadFileEntityFragment, title: string): string => {
      const getFileDownloadAriaLabel = (
        fileInternal: UploadFileEntityFragment,
        titleInternal: string,
        locale: string,
      ) => {
        if (!fileInternal.attributes) {
          return t('general.downloadFile')
        }
        const { size, ext } = fileInternal.attributes
        const formattedSize = filesize(size * 1000, { round: 1, locale })
        const extFormatted = ext ?? t('general.unknownFormat')

        return t('general.downloadFileAriaLabel', {
          title: titleInternal,
          ext: extFormatted,
          size: formattedSize,
        })
      }

      return getFileDownloadAriaLabel(file, title, i18n.language)
    },
    [i18n.language, t],
  )
  return { getDownloadAriaLabel }
}
