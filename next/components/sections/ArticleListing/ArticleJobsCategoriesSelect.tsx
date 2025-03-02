import { SingleValue } from 'react-select'

import { SelectOption } from '@/components/atoms/Select'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articleJobsCategoriesSelectFetcher,
  articleJobsCategoriesSelectSwrKey,
} from '@/services/fetchers/articleListingFetcher'

type ArticleJobsCategoriesSelectProps = {
  defaultOption: SelectOption
  onCategoryChange: (option: SingleValue<SelectOption> | null) => void
}

const ArticleJobsCategoriesSelect = ({
  defaultOption,
  onCategoryChange = () => {},
}: ArticleJobsCategoriesSelectProps) => {
  return (
    <SelectWithFetcher
      swrKey={articleJobsCategoriesSelectSwrKey}
      defaultOption={defaultOption}
      fetcher={articleJobsCategoriesSelectFetcher}
      onChange={onCategoryChange}
    />
  )
}

export default ArticleJobsCategoriesSelect
