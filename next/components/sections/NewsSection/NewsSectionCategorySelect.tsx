import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { client } from '../../../utils/gql'
import SelectWithFetcher from '../../molecules/SelectWithFetcher'

type NewsSectionCategorySelectProps = {
  onCategoryChange: (id: string | null) => void
}

const mappedFetcher = client.NewsCategories().then(
  (data) =>
    data.articleNewsCategories?.data.map((category) => ({
      label: category.attributes?.title,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      key: category.id!,
    })) ?? [],
)

const NewsSectionCategorySelect = ({
  onCategoryChange = () => {},
}: NewsSectionCategorySelectProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.NewsSection',
  })

  const defaultOption = useMemo(() => ({ label: t('allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey="NewsSectionCategorySelect"
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default NewsSectionCategorySelect
