import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articleNewsCategoriesSelectFetcher,
  articleNewsCategoriesSelectQueryKey,
} from '@/services/fetchers/articles/articleCategoriesSelectFetcher'

type ArticleNewsCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const ArticleNewsCategoriesSelect = ({
  onCategoryChange = () => {},
}: ArticleNewsCategoriesSelectProps) => {
  const { t } = useTranslation()

  const defaultOption = useMemo(() => ({ label: t('ArticleListing.allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      queryKey={articleNewsCategoriesSelectQueryKey}
      defaultOption={defaultOption}
      fetcher={articleNewsCategoriesSelectFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default ArticleNewsCategoriesSelect
