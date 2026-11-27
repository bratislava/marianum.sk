import { useTranslation } from 'next-i18next/pages'
import { useMemo } from 'react'

import { SelectItem } from '@/components/atoms/SelectField'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import { client } from '@/services/graphql/gqlClient'
import { isDefined } from '@/utils/isDefined'

type AssetsSectionCategorySelectProps = {
  onCategoryChange: (id: string | null) => void
}

const mappedFetcher = async () =>
  client.AssetCategories().then((data) =>
    data.assetCategories.filter(isDefined).map((category) => ({
      label: category.title,
      key: category.documentId,
    })),
  )

const AssetsSectionCategorySelect = ({ onCategoryChange }: AssetsSectionCategorySelectProps) => {
  const { t } = useTranslation()

  const defaultOption = useMemo(() => ({ label: t('AssetsSection.allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      queryKey={['AssetsSectionCategorySelect']}
      defaultOption={defaultOption}
      defaultValue={defaultOption.key}
      fetcher={mappedFetcher}
      onChange={(selection) => {
        onCategoryChange(selection ? (selection as string) : null)
      }}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </SelectWithFetcher>
  )
}

export default AssetsSectionCategorySelect
