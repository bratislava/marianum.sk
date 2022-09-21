import { useState } from 'react'

import { MeilisearchResultType } from '../../../../utils/types'
import NavigationSearchMobileModal from './NavigationSearchMobileModal'
import NavigationSearchMobileTrigger from './NavigationSearchMobileTrigger'

type NavigationSearchMobileProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  results: MeilisearchResultType<string>[]
  isLoading: boolean
}

const NavigationSearchMobile = ({
  searchQuery,
  onSearchQueryChange,
  results,
  isLoading,
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
      />
    </>
  )
}

export default NavigationSearchMobile
