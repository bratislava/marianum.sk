import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import Select from '@/components/atoms/Select'

export type Sort = 'newest' | 'oldest'

type SortSelectProps = {
  defaultSelected: Sort
  onChange?: (sort: Sort) => void
}

const SortSelect = ({ defaultSelected, onChange = () => {} }: SortSelectProps) => {
  const { t } = useTranslation('common')

  const options = useMemo(
    () => [
      { key: 'newest', label: t('SortSelect.byNewest') },
      { key: 'oldest', label: t('SortSelect.byOldest') },
    ],
    [t],
  )

  return (
    <Select
      options={options}
      onSelectionChange={onChange as (sort: string) => void}
      defaultSelected={defaultSelected}
    />
  )
}

export default SortSelect
