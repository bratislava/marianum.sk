import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { client } from '../../../utils/gql'
import { isDefined } from '../../../utils/isDefined'
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
  const { t } = useTranslation('common', {
    keyPrefix: 'components.DocumentsSection',
  })

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
