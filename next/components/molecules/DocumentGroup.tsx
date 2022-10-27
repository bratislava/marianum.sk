import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import DownloadIcon from '../../assets/download.svg'
import { DocumentGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Button from '../atoms/Button'
import { useGetFullPath } from './Navigation/NavigationProvider/useGetFullPath'
import Row from './Row/Row'

const DocumentGroup = ({ documents }: DocumentGroupFragment) => {
  const { t } = useTranslation()
  const { getFullPath } = useGetFullPath()

  const filteredDocuments = useMemo(() => {
    return (documents ?? []).map((document) => document?.document?.data).filter(isDefined)
  }, [documents])

  return (
    <div className="flex flex-col gap-4">
      {filteredDocuments?.map((doc) => {
        const { title, slug, file } = doc.attributes ?? {}

        return (
          <Row
            key={slug}
            title={title ?? ''}
            linkHref={getFullPath(doc) ?? ''}
            button={
              file?.data?.attributes?.url ? (
                <Button
                  href={file.data?.attributes?.url}
                  variant="tertiary"
                  startIcon={<DownloadIcon />}
                >
                  {t('layouts.DocumentLayout.downloadFile')}
                </Button>
              ) : null
            }
          />
        )
      })}
    </div>
  )
}

export default DocumentGroup
