import { useTranslation } from 'next-i18next'

import { OpenInNewIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import IconButton from '@/components/atoms/IconButton'
import Row, { RowProps } from '@/components/molecules/Row/Row'

const PartnerRow = (props: Pick<RowProps, 'title' | 'titleId' | 'linkHref' | 'border'>) => {
  const { linkHref, titleId } = props

  const { t } = useTranslation()

  const LinkButton = () =>
    linkHref ? (
      <>
        {/* desktop button */}
        <Button
          href={linkHref}
          aria-labelledby={titleId}
          variant="plain-secondary"
          startIcon={<OpenInNewIcon />}
          className="hidden after:absolute after:inset-0 md:flex"
        >
          {t('PartnerRow.showWebsite')}
        </Button>
        {/* mobile button */}
        <IconButton
          href={linkHref}
          aria-labelledby={titleId}
          variant="plain-secondary"
          className="-mr-2 after:absolute after:inset-0 md:hidden"
        >
          <OpenInNewIcon />
        </IconButton>
      </>
    ) : null

  return <Row {...props} linkButton={<LinkButton />} />
}

export default PartnerRow
