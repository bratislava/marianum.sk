import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { client } from '../../../utils/gql'
import SelectWithFetcher from '../../molecules/SelectWithFetcher'

type DocumentsSectionCategorySelectProps = {
  onCategoryChange: (id: string | null) => void
}

const mappedFetcher = client.DocumentCategories().then(
  (data) =>
    data.documentCategories?.data.map((category) => ({
      label: category.attributes?.title,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      key: category.id!,
    })) ?? [],
)

const DocumentsSectionCategorySelect = ({
  onCategoryChange = () => {},
}: DocumentsSectionCategorySelectProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.DocumentsSectionCategorySelect',
  })

  const defaultOption = useMemo(() => ({ label: t('allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey="DocumentsSectionCategorySelect"
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default DocumentsSectionCategorySelect
