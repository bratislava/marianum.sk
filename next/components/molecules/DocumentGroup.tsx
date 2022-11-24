import { DownloadIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import { useGetFullPath } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Row from '@components/molecules/Row/Row'
import { DocumentGroupFragment } from '@graphql'
import { isDefined } from '@utils/isDefined'
import { useTranslation } from 'next-i18next'
import { useId, useMemo } from 'react'

const getAriaLabelId = (id: string, index: number) => `document-group-title-${id}-${index}`

const DocumentGroup = ({ documents }: DocumentGroupFragment) => {
  const { t } = useTranslation('common', { keyPrefix: 'DocumentGroup' })
  const { getFullPath } = useGetFullPath()

  const filteredDocuments = useMemo(() => {
    return (documents ?? []).map((document) => document?.document?.data).filter(isDefined)
  }, [documents])

  const id = useId()

  return (
    <div className="flex flex-col gap-4">
      {filteredDocuments?.map((doc, index) => {
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
                  aria-labelledby={getAriaLabelId(id, index)}
                  startIcon={<DownloadIcon />}
                >
                  {t('download')}
                </Button>
              ) : null
            }
            titleId={getAriaLabelId(id, index)}
          />
        )
      })}
    </div>
  )
}

export default DocumentGroup
