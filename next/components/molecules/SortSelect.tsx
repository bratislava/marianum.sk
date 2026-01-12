import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import Select, { SelectItem } from '@/components/atoms/SelectField'

export type Sort = 'newest' | 'oldest'

type SortSelectProps = {
  defaultSort: Sort
  onChange: (sort: Sort) => void
}

const SortSelect = ({ defaultSort, onChange }: SortSelectProps) => {
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
      onChange={(selection) => onChange(selection as Sort)}
      value={defaultSort}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </Select>
  )
}

export default SortSelect
