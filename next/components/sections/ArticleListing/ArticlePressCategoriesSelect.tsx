import { SingleValue } from 'react-select'

import { SelectOption } from '@/components/atoms/Select'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articlePressCategoriesSelectFetcher,
  articlePressCategoriesSelectSwrKey,
} from '@/services/fetchers/articleListingFetcher'

type ArticlePressCategoriesSelectProps = {
  defaultOption: SelectOption
  onCategoryChange: (option: SingleValue<SelectOption> | null) => void
}

const ArticlePressCategoriesSelect = ({
  defaultOption,
  onCategoryChange = () => {},
}: ArticlePressCategoriesSelectProps) => {
  return (
    <SelectWithFetcher
      swrKey={articlePressCategoriesSelectSwrKey}
      defaultOption={defaultOption}
      fetcher={articlePressCategoriesSelectFetcher}
      onChange={onCategoryChange}
    />
  )
}

export default ArticlePressCategoriesSelect
