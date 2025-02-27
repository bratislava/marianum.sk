import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import { client } from '@/services/graphql/gqlClient'

type DocumentsSectionCategorySelectProps = {
  onCategoryChange: (id: string | null) => void
}

const mappedFetcher = () =>
  client.DocumentCategories().then(
    (data) =>
      data.documentCategories?.data.map((category) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value: category.id!,
        label: category?.attributes?.title ?? '',
      })) ?? [],
  )

const DocumentsSectionCategorySelect = ({
  onCategoryChange = () => {},
}: DocumentsSectionCategorySelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'DocumentsSection' })

  const defaultOption = useMemo(() => ({ value: 'all', label: t('allCategories') }), [t])

  return (
    <SelectWithFetcher
      swrKey="DocumentsSectionCategorySelect"
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default DocumentsSectionCategorySelect
