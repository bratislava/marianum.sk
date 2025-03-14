import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articleJobsCategoriesSelectFetcher,
  articleJobsCategoriesSelectSwrKey,
} from '@/services/fetchers/articleListingFetcher'

type ArticleJobsCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const ArticleJobsCategoriesSelect = ({
  onCategoryChange = () => {},
}: ArticleJobsCategoriesSelectProps) => {
  const { t } = useTranslation()

  const defaultOption = useMemo(() => ({ label: t('ArticleListing.allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey={articleJobsCategoriesSelectSwrKey}
      defaultOption={defaultOption}
      fetcher={articleJobsCategoriesSelectFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default ArticleJobsCategoriesSelect
