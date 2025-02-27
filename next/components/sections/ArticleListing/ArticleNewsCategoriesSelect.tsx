import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articleNewsCategoriesSelectFetcher,
  articleNewsCategoriesSelectSwrKey,
} from '@/services/fetchers/articleListingFetcher'

type ArticleNewsCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const ArticleNewsCategoriesSelect = ({
  onCategoryChange = () => {},
}: ArticleNewsCategoriesSelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'ArticleListing' })

  const defaultOption = useMemo(() => ({ value: 'all', label: t('allCategories') }), [t])

  return (
    <SelectWithFetcher
      swrKey={articleNewsCategoriesSelectSwrKey}
      defaultOption={defaultOption}
      fetcher={articleNewsCategoriesSelectFetcher}
      onChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default ArticleNewsCategoriesSelect
