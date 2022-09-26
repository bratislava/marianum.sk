import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { IndexConfig, useMeilisearch } from '../../../../hooks/useMeilisearch'
import NavigationSearchDesktop from './NavigationSearchDesktop'
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

  const router = useRouter()

  const { t: pathsT } = useTranslation('common', { keyPrefix: 'paths' })

  const handleSearch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`${pathsT('search')}?query=${searchQuery ?? ''}`)
  }, [router, searchQuery, pathsT])

  return (
    <>
      <div className="md:hidden">
        <NavigationSearchMobile
          searchQuery={searchQuery ?? ''}
          onSearchQueryChange={setSearchQuery}
          results={results}
          isLoading={isLoading}
          onSearch={handleSearch}
        />
      </div>

      <div className="hidden md:flex">
        <NavigationSearchDesktop
          searchQuery={searchQuery ?? ''}
          onSearchQueryChange={setSearchQuery}
          results={results}
          isLoading={isLoading}
          onSearch={handleSearch}
        />
      </div>
    </>
  )
}

export default NavigationSearch
