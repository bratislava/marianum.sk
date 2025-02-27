import { SelectOption } from '@/components/atoms/Select'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articleNewsCategoriesSelectFetcher,
  articleNewsCategoriesSelectSwrKey,
} from '@/services/fetchers/articleListingFetcher'

type ArticleNewsCategoriesSelectProps = {
  defaultOption: SelectOption
  onCategoryChange: (option: SelectOption | null) => void
}

const ArticleNewsCategoriesSelect = ({
  defaultOption,
  onCategoryChange = () => {},
}: ArticleNewsCategoriesSelectProps) => {
  return (
    <SelectWithFetcher
      swrKey={articleNewsCategoriesSelectSwrKey}
      defaultOption={defaultOption}
      fetcher={articleNewsCategoriesSelectFetcher}
      onChange={onCategoryChange}
    />
  )
}

export default ArticleNewsCategoriesSelect
