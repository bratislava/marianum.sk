import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import { SelectItem } from '@/components/atoms/Select'
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
      queryKey={['DocumentsSectionFiletypeSelect']}
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onChange={(selection) => {
        onFiletypeChange(selection ? (selection as string) : null)
      }}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </SelectWithFetcher>
  )
}

export default DocumentsSectionFiletypeSelect
