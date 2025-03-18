import { keepPreviousData, useQuery } from '@tanstack/react-query'

import Select, { Option, SelectProps, SingleSelect } from '@/components/atoms/Select'

type SelectWithFetcherProps = {
  queryKey: string | string[]
  fetcher: () => Promise<Option[]>
  defaultOption: Option
} & Pick<SelectProps, 'id' | 'placeholder' | 'label' | 'disabled'> &
  Pick<SingleSelect, 'onSelectionChange'>

const SelectWithFetcher = ({
  queryKey,
  defaultOption,
  fetcher,
  disabled: originalDisabled,
  onSelectionChange,
  ...rest
}: SelectWithFetcherProps) => {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: [queryKey, fetcher],
    queryFn: fetcher,
    placeholderData: keepPreviousData,
  })

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  const options = isPending ? [defaultOption] : [defaultOption, ...data]

  return (
    <Select
      options={options}
      defaultSelected={defaultOption.key}
      multiple={false}
      disabled={isFetching || error || originalDisabled}
      onSelectionChange={onSelectionChange}
      {...rest}
    />
  )
}

export default SelectWithFetcher
