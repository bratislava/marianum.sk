import { useTranslation } from 'next-i18next'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { CloseCircleIcon, CloseIcon, SearchIcon } from '@/assets/icons'
import TextField from '@/components/atoms/TextField'

type SearchProps = {
  value?: string
  placeholder?: string
  inputClassName?: string
  onSearchQueryChange?: (value: string) => void
  onSearch?: (value: string) => void
  isLarge?: boolean
  className?: string
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>

const Search = ({
  value = '',
  placeholder,
  onSearchQueryChange = () => {},
  onSearch = () => {},
  className,
  inputClassName,
  isLarge = false,
  ...rest
}: SearchProps) => {
  const { t } = useTranslation()

  const [realValue, setRealValue] = useState(value)

  useEffect(() => {
    setRealValue(value)
  }, [value])

  const handleChange = useCallback(
    (text: string) => {
      setRealValue(text)
      onSearchQueryChange(text)
    },
    [onSearchQueryChange],
  )

  const clearHandler = useCallback(() => {
    setRealValue('')
    onSearchQueryChange('')
  }, [onSearchQueryChange])

  const onSearchHandler = useCallback(() => {
    onSearch(realValue)
  }, [onSearch, realValue])

  const onKeyUpHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearchHandler()
        e.preventDefault()
      }
      if (e.key === 'Escape') {
        clearHandler()
        e.preventDefault()
      }
    },
    [onSearchHandler, clearHandler],
  )

  return (
    <TextField
      id="search"
      value={realValue}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder ?? t('SearchField.searchPlaceholder')}
      aria-label={t('SearchField.aria.searchField')}
      onKeyUp={onKeyUpHandler}
      className={className}
      isLarge={isLarge}
      inputClassName={inputClassName}
      leftSlot={<SearchIcon />}
      rightSlot={
        realValue ? (
          <button onClick={clearHandler} type="button" className="p-2">
            {isLarge ? <CloseIcon /> : <CloseCircleIcon />}
          </button>
        ) : null
      }
      {...rest}
    />
  )
}

export default Search
