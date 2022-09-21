import { IndexConfig, useMeilisearch } from '../../../../hooks/useMeilisearch'
import NavigationSearchMobile from './NavigationSearchMobile'

const branchIndexConfig: IndexConfig = { name: 'branch', localized: true }
const documentIndexConfig: IndexConfig = { name: 'document', localized: false }
const pageIndexConfig: IndexConfig = { name: 'page', localized: true }
const bundleIndexConfig: IndexConfig = { name: 'bundle', localized: true }
const articleIndexConfig: IndexConfig = { name: 'article', localized: true }

const indexes = [
  branchIndexConfig,
  documentIndexConfig,
  pageIndexConfig,
  bundleIndexConfig,
  articleIndexConfig,
]

const NavigationSearch = () => {
  const { searchQuery, setSearchQuery, results, isLoading } = useMeilisearch({
    indexes,
    countPerPage: 5,
  })

  return (
    <>
      <div className="md:hidden">
        <NavigationSearchMobile
          searchQuery={searchQuery ?? ''}
          onSearchQueryChange={setSearchQuery}
          results={results}
          isLoading={isLoading}
        />
      </div>

      {/* <div className="hidden w-72 transition-all duration-500 md:flex">
        <Search
          className="w-full border-transparent bg-white/[16%] focus-within:bg-white/100 focus-within:text-foreground hover:border-transparent hover:focus-within:border-border"
          inputClassName="placeholder:text-white focus:placeholder:text-foreground-placeholder"
          placeholder="Hľadať na stránke"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSearchQueryChange={handleSearch}
        />
      </div> */}
    </>
  )
}

export default NavigationSearch
