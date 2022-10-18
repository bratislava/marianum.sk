import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  articlePressCategoriesSelectFetcher,
  articlePressCategoriesSelectSwrKey,
} from '../../../utils/fetchers/articleListingFetcher'
import SelectWithFetcher from '../../molecules/SelectWithFetcher'

type ArticlePressCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const ArticlePressCategoriesSelect = ({
  onCategoryChange = () => {},
}: ArticlePressCategoriesSelectProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.ArticleListing',
  })

  const defaultOption = useMemo(() => ({ label: t('allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey={articlePressCategoriesSelectSwrKey}
      defaultOption={defaultOption}
      fetcher={articlePressCategoriesSelectFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default ArticlePressCategoriesSelect
