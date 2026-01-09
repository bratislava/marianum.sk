import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import { SelectItem } from '@/components/atoms/Select'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articleJobsCategoriesSelectFetcher,
  articleJobsCategoriesSelectQueryKey,
} from '@/services/fetchers/articles/articleCategoriesSelectFetcher'

type ArticleJobsCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const ArticleJobsCategoriesSelect = ({ onCategoryChange }: ArticleJobsCategoriesSelectProps) => {
  const { t } = useTranslation()

  const defaultOption = useMemo(() => ({ label: t('ArticleListing.allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      queryKey={articleJobsCategoriesSelectQueryKey}
      defaultOption={defaultOption}
      fetcher={articleJobsCategoriesSelectFetcher}
      onChange={(selection) => {
        onCategoryChange(selection ? (selection as string) : null)
      }}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </SelectWithFetcher>
  )
}

export default ArticleJobsCategoriesSelect
