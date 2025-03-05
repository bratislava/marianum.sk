import { useTranslation } from 'next-i18next'

import { CloseCircleIcon, SearchIcon } from '@/assets/icons'
import TextField from '@/components/atoms/TextField'

export type FilteringSearchInputProps = {
  value: string
  onChange: (value: string) => void
}

const FilteringSearchInput = ({ value, onChange }: FilteringSearchInputProps) => {
  const { t } = useTranslation()

  const handleCancelClick = () => {
    onChange('')
  }

  return (
    <TextField
      id="with-text-left-icon"
      value={value}
      leftSlot={<SearchIcon />}
      rightSlot={
        value ? (
          <button type="button" className="p-2" onClick={handleCancelClick}>
            <CloseCircleIcon />
          </button>
        ) : null
      }
      placeholder={t('SearchField.searchPlaceholder')}
      aria-label={t('SearchField.aria.searchField')}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default FilteringSearchInput
