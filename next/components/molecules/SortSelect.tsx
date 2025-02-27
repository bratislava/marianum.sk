import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import Select from '@/components/atoms/Select'

export type Sort = 'newest' | 'oldest'

type SortSelectProps = {
  defaultSelected: Sort
  onChange?: (sort: Sort) => void
}

const SortSelect = ({ defaultSelected, onChange = () => {} }: SortSelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'SortSelect' })

  const options = useMemo(
    () => [
      { value: 'newest', label: t('byNewest') },
      { value: 'oldest', label: t('byOldest') },
    ],
    [t],
  )

  return (
    <Select
      options={options}
      onChange={onChange as (sort: string) => void}
      defaultValue={defaultSelected}
    />
  )
}

export default SortSelect
