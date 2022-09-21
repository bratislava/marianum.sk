import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import { AriaOverlayProps, FocusScope, OverlayContainer, useModal, useOverlay } from 'react-aria'

import { MeilisearchResultType } from '../../../../utils/types'
import { AnimateHeight } from '../../../atoms/AnimateHeight'
import Button from '../../../atoms/Button'
import Search from '../../Search'
import NavigationSearchResults from './NavigationSearchResults'

type NavigationSearchMobileModalProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  results: MeilisearchResultType<string>[]
  isLoading: boolean
  onSearch: () => void
} & AriaOverlayProps

const NavigationSearchMobileModal = (props: NavigationSearchMobileModalProps) => {
  const { isOpen, onClose, searchQuery, onSearchQueryChange, results, isLoading, onSearch } = props
  const { t } = useTranslation('common', {
    keyPrefix: 'components.molecules.Navigation.NavigationSearch',
  })

  const ref = useRef<HTMLDivElement | null>(null)

  const { overlayProps, underlayProps } = useOverlay(props, ref)

  const { modalProps } = useModal()

  // workaround because react-aria OverlayContainers uses DOM
  const [isBrowser, setBrowser] = useState(false)
  useEffect(() => {
    setBrowser(true)
  }, [])

  return isBrowser ? (
    <OverlayContainer>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FocusScope autoFocus contain restoreFocus>
              <div {...underlayProps} className="fixed inset-0 z-50 flex flex-col bg-black/40">
                <div
                  className="z-50 flex w-full bg-primary py-3 pl-4"
                  {...overlayProps}
                  {...modalProps}
                  ref={ref}
                >
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
            </FocusScope>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContainer>
  ) : null
}

export default NavigationSearchMobileModal
