import { useMemo } from 'react'
import useSwr, { Key } from 'swr'

import Select, { SelectOption, SelectProps } from '@/components/atoms/Select'
import { useGetSwrExtras } from '@/utils/useGetSwrExtras'

type SelectWithFetcherProps = {
  swrKey: Key
  fetcher: () => Promise<SelectOption[]>
  defaultOption: SelectOption
} & Pick<SelectProps, 'placeholder' | 'isDisabled' | 'onChange'>

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
      defaultValue={defaultOption}
      isDisabled={loading || error || originalDisabled}
      onChange={(option, actionMeta) =>
        onChange ? onChange(option?.value === 'all' ? null : option, actionMeta) : null
      }
      {...rest}
    />
  )
}

export default SelectWithFetcher
