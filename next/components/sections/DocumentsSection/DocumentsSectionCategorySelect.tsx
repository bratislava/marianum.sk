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
        label: category.attributes?.title,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        key: category.id!,
      })) ?? [],
  )

const DocumentsSectionCategorySelect = ({
  onCategoryChange = () => {},
}: DocumentsSectionCategorySelectProps) => {
  const { t } = useTranslation()

  const defaultOption = useMemo(
    () => ({ label: t('DocumentsSection.allCategories'), key: '' }),
    [t],
  )

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
