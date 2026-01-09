import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import { SelectItem } from '@/components/atoms/SelectField'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articlePressCategoriesSelectFetcher,
  articlePressCategoriesSelectQueryKey,
} from '@/services/fetchers/articles/articleCategoriesSelectFetcher'

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
      queryKey={articlePressCategoriesSelectQueryKey}
      defaultOption={defaultOption}
      fetcher={articlePressCategoriesSelectFetcher}
      onChange={(selection) => {
        onCategoryChange(selection ? (selection as string) : null)
      }}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </SelectWithFetcher>
  )
}

export default ArticlePressCategoriesSelect
