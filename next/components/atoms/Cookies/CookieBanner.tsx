import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'

import { CheckIcon, CloseCircleIcon, InfoIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import { cookieConsentContext } from '@/components/atoms/Cookies/CookieConsent'
import IconButton from '@/components/atoms/IconButton'

const CookieBanner = () => {
  const { t } = useTranslation('common', { keyPrefix: 'CookieConsent' })

  const { onOpenModal, isBannerOpen, isModalOpen, onAcceptAll, onRejectAll, onCloseBanner } =
    useContext(cookieConsentContext)

  return (
    <AnimatePresence>
      {isBannerOpen && !isModalOpen && (
        <motion.div
          transition={{ ease: 'easeInOut' }}
          initial={{ y: 'calc(100% + 200px)' }}
          animate={{ y: 0 }}
          exit={{ y: 'calc(100% + 200px)' }}
          className="fixed bottom-2 z-40 w-full sm:bottom-4"
        >
          <div className="container w-full px-2 sm:px-4 lg:px-8 xl:px-12">
            <div className="relative flex w-full flex-col justify-between gap-8 border border-border bg-white shadow">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-2 pr-6 pt-6">
                  <span className="pl-8 text-h3 font-bold">{t('banner.title')}</span>
                  <IconButton
                    aria-label={t('aria.dismissCookieBanner')}
                    className="shrink-0"
                    onPress={onCloseBanner}
                  >
                    <CloseCircleIcon />
                  </IconButton>
                </div>
                <p className="flex-1 px-8">{t('banner.description')}</p>
              </div>
              <div className="flex w-full flex-col gap-4 px-8 pb-8 sm:flex-row md:w-fit">
                <Button
                  aria-label={t('aria.acceptAllCookies')}
                  className="w-full whitespace-nowrap"
                  variant="primary"
                  onPress={onAcceptAll}
                  startIcon={<CheckIcon />}
                >
                  {t('acceptAll')}
                </Button>
                <Button
                  className="w-full whitespace-nowrap"
                  aria-label={t('aria.rejectAllCookies')}
                  variant="secondary"
                  onPress={onRejectAll}
                  startIcon={<CloseCircleIcon />}
                >
                  {t('rejectAll')}
                </Button>
                <Button
                  className="w-full whitespace-nowrap"
                  aria-label={t('aria.openCookieSettings')}
                  variant="secondary"
                  onPress={onOpenModal}
                  startIcon={<InfoIcon />}
                >
                  {t('settings')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner
