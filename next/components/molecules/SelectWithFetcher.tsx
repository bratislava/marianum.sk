import { useMemo } from 'react'
import useSwr, { Key } from 'swr'

import Select, { SelectFieldProps, SelectOption, SingleSelect } from '@/components/atoms/Select'
import { useGetSwrExtras } from '@/utils/useGetSwrExtras'

type SelectWithFetcherProps = {
  swrKey: Key
  fetcher: () => Promise<SelectOption[]>
  defaultOption: SelectOption
} & Pick<SelectFieldProps, 'placeholder' | 'isDisabled'> &
  Pick<SingleSelect, 'onChange'>

const SelectWithFetcher = ({
  swrKey,
  defaultOption,
  fetcher,
  isDisabled: originalDisabled,
  onChange,
  ...rest
}: SelectWithFetcherProps) => {
  const { data, error } = useSwr(swrKey, fetcher)

  const { loading } = useGetSwrExtras({ data, error })

  const options = useMemo(() => {
    if (data) {
      return [defaultOption, ...data]
    }

    return [defaultOption]
  }, [data, defaultOption])

  return (
    <Select
      options={options}
      defaultValue={defaultOption.value}
      isMulti={false}
      isDisabled={loading || error || originalDisabled}
      onChange={onChange}
      {...rest}
    />
  )
}

export default SelectWithFetcher
