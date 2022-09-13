import { KeyboardEvent, useCallback, useEffect, useState } from 'react'

import SearchIcon from '../../assets/search.svg'
import XIcon from '../../assets/x-alt.svg'
import TextField from '../atoms/TextField'

type SearchProps = {
  value?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  isLarge?: boolean
}

const Search = ({
  value = '',
  placeholder,
  onChange = () => {},
  onSearch = () => {},
  className,
  inputClassName,
  isLarge = false,
}: SearchProps) => {
  const [realValue, setRealValue] = useState(value)

  useEffect(() => {
    setRealValue(value)
  }, [value])

  const onRealValueChange = useCallback(
    (text: string) => {
      setRealValue(text)
      onChange(text)
    },
    [onChange],
  )

  const clearHandler = useCallback(() => {
    setRealValue('')
    onChange('')
  }, [onChange])

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
      onChange={(e) => onRealValueChange(e.target.value)}
      placeholder={placeholder}
      onKeyUp={onKeyUpHandler}
      className={className}
      isLarge={isLarge}
      inputClassName={inputClassName}
      leftSlot={
        <button onClick={onSearchHandler} type="button" className="p-2">
          <SearchIcon width={24} />
        </button>
      }
      rightSlot={
        realValue ? (
          <button onClick={clearHandler} type="button" className="p-2">
            <XIcon />
          </button>
        ) : null
      }
    />
  )
}

export default Search
