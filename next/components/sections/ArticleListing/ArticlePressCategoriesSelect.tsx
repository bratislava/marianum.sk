import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articlePressCategoriesSelectFetcher,
  articlePressCategoriesSelectSwrKey,
} from '@/services/fetchers/articleListingFetcher'

type ArticlePressCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const ArticlePressCategoriesSelect = ({
  onCategoryChange = () => {},
}: ArticlePressCategoriesSelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'ArticleListing' })

  const defaultOption = useMemo(() => ({ value: 'all', label: t('allCategories') }), [t])

  return (
    <SelectWithFetcher
      swrKey={articlePressCategoriesSelectSwrKey}
      defaultOption={defaultOption}
      fetcher={articlePressCategoriesSelectFetcher}
      onChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default ArticlePressCategoriesSelect
