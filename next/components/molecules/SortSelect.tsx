import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import Select, { SelectItem } from '@/components/atoms/Select'

export type Sort = 'newest' | 'oldest'

type SortSelectProps = {
  defaultSelected: Sort
  onChange?: (sort: Sort) => void
}

const SortSelect = ({ defaultSelected, onChange = () => {} }: SortSelectProps) => {
  const { t } = useTranslation()

  const options = useMemo(
    () => [
      { key: 'newest', label: t('SortSelect.byNewest') },
      { key: 'oldest', label: t('SortSelect.byOldest') },
    ],
    [t],
  )

  return (
    <Select
      items={options}
      onSelectionChange={(selection) => onChange(selection as Sort)}
      defaultSelectedKey={defaultSelected}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </Select>
  )
}

export default SortSelect
