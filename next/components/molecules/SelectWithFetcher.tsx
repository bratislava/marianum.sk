import { keepPreviousData, useQuery } from '@tanstack/react-query'

import Select, { SelectFieldProps } from '@/components/atoms/Select'

type SelectWithFetcherProps<T extends object> = {
  queryKey: string[]
  fetcher: () => Promise<T[]>
  defaultOption: T
} & SelectFieldProps<T>

const SelectWithFetcher = <T extends object>({
  queryKey,
  defaultOption,
  fetcher,
  children,
  isDisabled,
  ...rest
}: SelectWithFetcherProps<T>) => {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: fetcher,
    placeholderData: keepPreviousData,
  })

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  const options = isPending ? [defaultOption] : [defaultOption, ...data]

  return (
    <Select items={options} isDisabled={isFetching || error || isDisabled} {...rest}>
      {children}
    </Select>
  )
}

export default SelectWithFetcher
