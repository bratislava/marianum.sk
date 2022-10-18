import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { client } from '../../../utils/gql'
import SelectWithFetcher from '../../molecules/SelectWithFetcher'

type ArticlePressCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const mappedFetcher = client.ArticlePressCategories().then(
  (data) =>
    data.articlePressCategories?.data.map((category) => ({
      label: category.attributes?.title,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      key: category.id!,
    })) ?? [],
)

const ArticlePressCategoriesSelect = ({
  onCategoryChange = () => {},
}: ArticlePressCategoriesSelectProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.ArticleListing',
  })

  const defaultOption = useMemo(() => ({ label: t('allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey="ArticlePressCategoriesSelect"
      defaultOption={defaultOption}
      fetcher={() => mappedFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default ArticlePressCategoriesSelect
