import { useTranslation } from 'next-i18next/pages'
import { useMemo } from 'react'

import { SelectItem } from '@/components/atoms/SelectField'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import { client } from '@/services/graphql/gqlClient'
import { isDefined } from '@/utils/isDefined'

type AssetsSectionFiletypeSelectProps = {
  onFiletypeChange: (filetype: string | null) => void
}

const mappedFetcher = async () =>
  client.DocumentFiletypes().then(
    (data) =>
      data.documentFiletypes?.filter(isDefined).map((filetype) => ({
        label: (filetype.startsWith('.') ? filetype.slice(1) : filetype).toUpperCase(),
        key: filetype,
      })) ?? [],
  )

const AssetsSectionFiletypeSelect = ({ onFiletypeChange }: AssetsSectionFiletypeSelectProps) => {
  const { t } = useTranslation()

  const defaultOption = useMemo(() => ({ label: t('AssetsSection.allFileTypes'), key: '' }), [t])

  return (
    <SelectWithFetcher
      queryKey={['AssetsSectionFiletypeSelect']}
      defaultOption={defaultOption}
      defaultValue={defaultOption.key}
      fetcher={mappedFetcher}
      onChange={(selection) => {
        onFiletypeChange(selection ? (selection as string) : null)
      }}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </SelectWithFetcher>
  )
}

export default AssetsSectionFiletypeSelect
