import { useState } from 'react'

import { MeilisearchResultType } from '../../../../utils/types'
import NavigationSearchMobileModal from './NavigationSearchMobileModal'
import NavigationSearchMobileTrigger from './NavigationSearchMobileTrigger'

type NavigationSearchMobileProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  results: MeilisearchResultType<string>[]
  isLoading: boolean
  onSearch: () => void
}

const NavigationSearchMobile = ({
  searchQuery,
  onSearchQueryChange,
  results,
  isLoading,
  onSearch,
}: NavigationSearchMobileProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <NavigationSearchMobileTrigger onPress={() => setOpen(!isOpen)} />
      <NavigationSearchMobileModal
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        results={results}
        isLoading={isLoading}
        onSearch={onSearch}
      />
    </>
  )
}

export default NavigationSearchMobile
