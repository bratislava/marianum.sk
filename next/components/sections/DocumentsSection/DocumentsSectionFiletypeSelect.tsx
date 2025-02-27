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
        value: filetype,
        label: (filetype.startsWith('.') ? filetype.slice(1) : filetype).toUpperCase(),
      })) ?? [],
  )

const DocumentsSectionFiletypeSelect = ({
  onFiletypeChange = () => {},
}: DocumentsSectionFiletypeSelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'DocumentsSection' })

  const defaultOption = useMemo(() => ({ value: 'all', label: t('allFileTypes') }), [t])

  return (
    <SelectWithFetcher
      swrKey="DocumentsSectionFiletypeSelect"
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onChange={(selection: string) => {
        onFiletypeChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default DocumentsSectionFiletypeSelect
