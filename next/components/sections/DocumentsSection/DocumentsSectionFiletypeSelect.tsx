import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import { client } from '@/services/graphql/gqlClient'
import { isDefined } from '@/utils/isDefined'

type DocumentsSectionFiletypeSelectProps = {
  onFiletypeChange: (filetype: string | null) => void
}

const mappedFetcher = () =>
  client.DocumentFiletypes().then(
    (data) =>
      data.documentFiletypes?.filter(isDefined).map((filetype) => ({
        label: (filetype.startsWith('.') ? filetype.slice(1) : filetype).toUpperCase(),
        key: filetype,
      })) ?? [],
  )

const DocumentsSectionFiletypeSelect = ({
  onFiletypeChange = () => {},
}: DocumentsSectionFiletypeSelectProps) => {
  const { t } = useTranslation()

  const defaultOption = useMemo(() => ({ label: t('DocumentsSection.allFileTypes'), key: '' }), [t])

  return (
    <SelectWithFetcher
      queryKey="DocumentsSectionFiletypeSelect"
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onSelectionChange={(selection: string) => {
        onFiletypeChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default DocumentsSectionFiletypeSelect
