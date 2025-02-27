import { SelectOption } from '@/components/atoms/Select'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import { client } from '@/services/graphql/gqlClient'

type DocumentsSectionCategorySelectProps = {
  defaultOption: SelectOption
  onCategoryChange: (option: SelectOption | null) => void
}

const mappedFetcher = () =>
  client.DocumentCategories().then(
    (data) =>
      data.documentCategories?.data.map((category) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value: category.id!,
        label: category?.attributes?.title ?? '',
      })) ?? [],
  )

const DocumentsSectionCategorySelect = ({
  defaultOption,
  onCategoryChange = () => {},
}: DocumentsSectionCategorySelectProps) => {
  return (
    <SelectWithFetcher
      swrKey="DocumentsSectionCategorySelect"
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onChange={onCategoryChange}
    />
  )
}

export default DocumentsSectionCategorySelect
