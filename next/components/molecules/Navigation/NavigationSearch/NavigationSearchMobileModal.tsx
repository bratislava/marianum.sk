import { useTranslation } from 'next-i18next'

import { MeilisearchResultType } from '../../../../utils/types'
import { AnimateHeight } from '../../../atoms/AnimateHeight'
import Button from '../../../atoms/Button'
import Modal, { ModalProps } from '../../../atoms/Modal'
import Search from '../../Search'
import NavigationSearchResults from './NavigationSearchResults'

type NavigationSearchMobileModalProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  results: MeilisearchResultType<string>[]
  isLoading: boolean
  onSearch: () => void
} & ModalProps

const NavigationSearchMobileModal = (props: NavigationSearchMobileModalProps) => {
  const { isOpen, onClose, searchQuery, onSearchQueryChange, results, isLoading, onSearch } = props
  const { t } = useTranslation('common', {
    keyPrefix: 'components.molecules.Navigation.NavigationSearch',
  })

  return (
    <Modal
      centerVertically={false}
      overlayClassName="!w-full"
      showCloseButton={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex h-full w-full flex-col">
        <div className="z-50 flex w-full bg-primary py-3 pl-4">
          <Search
            value={searchQuery}
            placeholder={t('search')}
            onSearchQueryChange={onSearchQueryChange}
            className="flex-1"
            onSearch={onSearch}
          />
          <Button variant="plain-secondary" className="px-4 !text-white" onPress={onClose}>
            {t('close')}
          </Button>
        </div>
        <AnimateHeight className="bg-white" isVisible>
          <NavigationSearchResults
            results={results}
            isLoading={isLoading}
            searchQuery={searchQuery}
          />
        </AnimateHeight>
      </div>
    </Modal>
  )
}

export default NavigationSearchMobileModal
