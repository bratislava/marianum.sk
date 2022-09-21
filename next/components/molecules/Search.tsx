import { KeyboardEvent, useCallback, useEffect, useState } from 'react'

import CloseIcon from '../../assets/close.svg'
import SearchIcon from '../../assets/search.svg'
import XAltIcon from '../../assets/x-alt.svg'
import TextField from '../atoms/TextField'

type SearchProps = {
  value?: string
  placeholder?: string
  inputClassName?: string
  onSearchQueryChange?: (value: string) => void
  onSearch?: (value: string) => void
  isLarge?: boolean
  className?: string
}

const Search = ({
  value = '',
  placeholder,
  onSearchQueryChange = () => {},
  onSearch = () => {},
  className,
  inputClassName,
  isLarge = false,
}: SearchProps) => {
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
      placeholder={placeholder}
      onKeyUp={onKeyUpHandler}
      className={className}
      isLarge={isLarge}
      inputClassName={inputClassName}
      leftSlot={
        <div className="p-2">
          <SearchIcon width={24} />
        </div>
      }
      rightSlot={
        realValue ? (
          <button onClick={clearHandler} type="button" className="p-2">
            {isLarge ? <CloseIcon /> : <XAltIcon />}
          </button>
        ) : null
      }
    />
  )
}

export default Search
