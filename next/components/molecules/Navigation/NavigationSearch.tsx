import { SearchResponse } from 'meilisearch'
import { useCallback, useEffect, useState } from 'react'

import SearchIcon from '../../../assets/search.svg'
import { meiliClient } from '../../../utils/meilisearch'
import IconButton from '../../atoms/IconButton'
import Search from '../Search'

const NavigationSearch = () => {
  const [results, setResults] = useState<SearchResponse<Record<string, any>>>()

  useEffect(() => {
    console.log(results)
  }, [results])

  const handleSearch = useCallback(async (query: string) => {
    meiliClient
      .index('branch')
      .search(query ?? '*')
      .then((r) => setResults(r))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <IconButton className="md:hidden" aria-label="hľadať" variant="primary">
        <SearchIcon />
      </IconButton>
      <div className="hidden w-72 transition-all duration-500 md:flex">
        <Search
          className="w-full border-transparent bg-white/[16%] focus-within:bg-white/100 focus-within:text-foreground hover:border-transparent hover:focus-within:border-border"
          inputClassName="placeholder:text-white focus:placeholder:text-foreground-placeholder"
          placeholder="Hľadať na stránke"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSearchQueryChange={handleSearch}
        />
      </div>
    </>
  )
}

export default NavigationSearch
