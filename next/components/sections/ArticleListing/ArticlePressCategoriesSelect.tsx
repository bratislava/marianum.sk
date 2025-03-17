import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articlePressCategoriesQueryKey,
  articlePressCategoriesSelectFetcher,
} from '@/services/fetchers/articleListingFetcher'

type ArticlePressCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const ArticlePressCategoriesSelect = ({
  onCategoryChange = () => {},
}: ArticlePressCategoriesSelectProps) => {
  const { t } = useTranslation()

  const defaultOption = useMemo(() => ({ label: t('ArticleListing.allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey={articlePressCategoriesQueryKey}
      defaultOption={defaultOption}
      fetcher={articlePressCategoriesSelectFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default ArticlePressCategoriesSelect
