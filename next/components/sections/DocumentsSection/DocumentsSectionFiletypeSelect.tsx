import { client } from '@services/gqlClient'
import { isDefined } from '@utils'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '../../molecules/SelectWithFetcher'

type DocumentsSectionFiletypeSelectProps = {
  onFiletypeChange: (filetype: string | null) => void
}

const mappedFetcher = client.DocumentFiletypes().then(
  (data) =>
    data.documentFiletypes?.filter(isDefined).map((filetype) => ({
      label: (filetype.startsWith('.') ? filetype.slice(1) : filetype).toUpperCase(),
      key: filetype,
    })) ?? [],
)

const DocumentsSectionFiletypeSelect = ({
  onFiletypeChange = () => {},
}: DocumentsSectionFiletypeSelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'DocumentsSection' })

  const defaultOption = useMemo(() => ({ label: t('allFileTypes'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey="DocumentsSectionFiletypeSelect"
      defaultOption={defaultOption}
      fetcher={() => mappedFetcher}
      onSelectionChange={(selection: string) => {
        onFiletypeChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default DocumentsSectionFiletypeSelect
