import { SelectOption } from '@/components/atoms/Select'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import { client } from '@/services/graphql/gqlClient'
import { isDefined } from '@/utils/isDefined'

type DocumentsSectionFiletypeSelectProps = {
  defaultOption: SelectOption
  onFiletypeChange: (option: SelectOption | null) => void
}

const mappedFetcher = () =>
  client.DocumentFiletypes().then(
    (data) =>
      data.documentFiletypes?.filter(isDefined).map((filetype) => ({
        value: filetype,
        label: (filetype.startsWith('.') ? filetype.slice(1) : filetype).toUpperCase(),
      })) ?? [],
  )

const DocumentsSectionFiletypeSelect = ({
  defaultOption,
  onFiletypeChange = () => {},
}: DocumentsSectionFiletypeSelectProps) => {
  return (
    <SelectWithFetcher
      swrKey="DocumentsSectionFiletypeSelect"
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onChange={onFiletypeChange}
    />
  )
}

export default DocumentsSectionFiletypeSelect
