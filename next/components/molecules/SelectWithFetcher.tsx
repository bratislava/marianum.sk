import { useMemo } from 'react'
import useSwr, { Key } from 'swr'

import Select, { Option, SelectProps, SingleSelect } from '@/components/atoms/Select'
import { useGetSwrExtras } from '@/utils/useGetSwrExtras'

type SelectWithFetcherProps = {
  swrKey: Key
  fetcher: () => Promise<Option[]>
  defaultOption: Option
} & Pick<SelectProps, 'id' | 'placeholder' | 'label' | 'disabled'> &
  Pick<SingleSelect, 'onSelectionChange'>

const SelectWithFetcher = ({
  swrKey,
  defaultOption,
  fetcher,
  disabled: originalDisabled,
  onSelectionChange,
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
      defaultSelected={defaultOption.key}
      multiple={false}
      disabled={loading || error || originalDisabled}
      onSelectionChange={onSelectionChange}
      {...rest}
    />
  )
}

export default SelectWithFetcher
