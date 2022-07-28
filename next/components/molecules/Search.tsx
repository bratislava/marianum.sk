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
}

const Search = ({
  value = '',
  placeholder,
  onChange = () => {},
  onSearch = () => {},
  className,
  inputClassName,
}: SearchProps) => {
  const [realValue, setRealValue] = useState(value)

  useEffect(() => {
    setRealValue(value)
  }, [value])

  useEffect(() => {
    onChange(realValue)
  }, [onChange, realValue])

  const clearHandler = useCallback(() => {
    setRealValue('')
  }, [])

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
      onChange={(e) => setRealValue(e.target.value)}
      placeholder={placeholder}
      onKeyUp={onKeyUpHandler}
      className={className}
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
