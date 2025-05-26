import { useTranslation } from 'next-i18next'

import { DownloadIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import Row from '@/components/molecules/Row/Row'
import { UploadFileEntityFragment } from '@/graphql'
import { useDownloadAriaLabel } from '@/utils/useDownloadAriaLabel'

type DocumentRowProps = {
  file: UploadFileEntityFragment
  title: string
  titleId: string
  linkHref?: string
  variant?: 'gaps' | 'dividers'
}
const DocumentRow = (props: DocumentRowProps) => {
  const { file, title } = props
  const { t } = useTranslation()
  const { getDownloadAriaLabel } = useDownloadAriaLabel()

  const DownloadButton = () =>
    file.attributes?.url ? (
      <Button
        href={file?.attributes?.url}
        target="_blank"
        variant="tertiary"
        aria-label={getDownloadAriaLabel(file, title)}
        startIcon={<DownloadIcon />}
      >
        {t('DocumentGroup.download')}
      </Button>
    ) : null

  return <Row {...props} button={<DownloadButton />} applyFocusStyles={false} />
}

export default DocumentRow
