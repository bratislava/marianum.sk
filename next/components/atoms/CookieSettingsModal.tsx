import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  AriaOverlayProps,
  FocusScope,
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria'

import Check from '../../assets/check.svg'
import Close from '../../assets/close.svg'
import X from '../../assets/x-alt.svg'
import Button from './Button'
import Checkbox from './Checkbox'
import { cookieConsentContext } from './CookieConsent'
import IconButton from './IconButton'

const CookieTypeCheckbox = ({
  isChecked,
  onChange,
  title,
  description,
  isDisabled,
}: {
  isChecked: boolean
  onChange?: (isChecked: boolean) => void
  title: string
  description: string
  isDisabled?: boolean
}) => {
  return (
    <div
      className={cx('flex flex-col gap-2 border p-4', {
        'border-primary bg-primary/10 text-primary': isChecked,
        'border-border': !isChecked,
      })}
    >
      <div className="flex items-center">
        <Checkbox isSelected={isChecked} isDisabled={isDisabled} onChange={onChange}>
          <span className="text-h5 font-bold">{title}</span>
        </Checkbox>
      </div>
      <div>{description}</div>
    </div>
  )
}

const CookieSettingsModal = () => {
  const { t } = useTranslation()

  const {
    isModalOpen,
    onCloseModal,
    onAcceptAll,
    onRejectAll,
    onCustomCookiesAcceptance,
    acceptance,
  } = useContext(cookieConsentContext)

  const overlayHookProps: AriaOverlayProps = { isOpen: isModalOpen, onClose: onCloseModal }

  const ref = useRef<HTMLDivElement | null>(null)
  const { overlayProps, underlayProps } = useOverlay(overlayHookProps, ref)
  usePreventScroll({ isDisabled: !isModalOpen })
  const { modalProps } = useModal()
  const [isBrowser, setBrowser] = useState(false)

  useEffect(() => {
    setBrowser(true)
  }, [])

  const [arePreferenceCookiesAllowed, setPreferenceCookiesAllowed] = useState(
    acceptance.arePreferenceCookiesAllowed,
  )
  const [areStatisticCookiesAllowed, setStatisticCookiesAllowed] = useState(
    acceptance.areStatisticCookiesAllowed,
  )
  const [areMarketingCookiesAllowed, setMarketingCookiesAllowed] = useState(
    acceptance.areMarketingCookiesAllowed,
  )

  const handleCustomCookiesAcceptance = useCallback(() => {
    onCustomCookiesAcceptance({
      areMarketingCookiesAllowed,
      arePreferenceCookiesAllowed,
      areStatisticCookiesAllowed,
    })
    onCloseModal()
  }, [
    areMarketingCookiesAllowed,
    arePreferenceCookiesAllowed,
    areStatisticCookiesAllowed,
    onCustomCookiesAcceptance,
    onCloseModal,
  ])

  return isBrowser ? (
    <OverlayContainer>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div {...underlayProps} className="fixed inset-0 z-50 flex bg-black/40">
              <div
                className="flex h-full w-full items-center"
                {...overlayProps}
                {...modalProps}
                ref={ref}
              >
                <FocusScope contain restoreFocus autoFocus>
                  <div className="mx-auto max-h-full w-full max-w-4xl overflow-y-auto p-4 md:p-8">
                    <div className="flex w-full flex-col gap-4 bg-white p-4 md:gap-8 md:p-8">
                      <div className="flex items-center justify-between">
                        <div className="text-h3 font-bold">{t('cookieConsent.modal.title')}</div>
                        <IconButton
                          aria-label={t('cookieConsent.modal.dismiss')}
                          variant="white"
                          onPress={onCloseModal}
                        >
                          <Close />
                        </IconButton>
                      </div>
                      <div className="flex flex-col gap-4">
                        <CookieTypeCheckbox
                          title={t('cookieConsent.modal.types.necessary.title')}
                          description={t('cookieConsent.modal.types.necessary.description')}
                          isChecked
                          isDisabled
                        />

                        <CookieTypeCheckbox
                          title={t('cookieConsent.modal.types.preference.title')}
                          description={t('cookieConsent.modal.types.preference.description')}
                          isChecked={arePreferenceCookiesAllowed}
                          onChange={setPreferenceCookiesAllowed}
                        />

                        <CookieTypeCheckbox
                          title={t('cookieConsent.modal.types.statistic.title')}
                          description={t('cookieConsent.modal.types.statistic.description')}
                          isChecked={areStatisticCookiesAllowed}
                          onChange={setStatisticCookiesAllowed}
                        />

                        <CookieTypeCheckbox
                          title={t('cookieConsent.modal.types.marketing.title')}
                          description={t('cookieConsent.modal.types.marketing.description')}
                          isChecked={areMarketingCookiesAllowed}
                          onChange={setMarketingCookiesAllowed}
                        />
                      </div>

                      <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
                        <div className="flex flex-col gap-4 md:flex-row">
                          <Button
                            className="whitespace-nowrap"
                            variant="primary"
                            onPress={onAcceptAll}
                            startIcon={<Check />}
                          >
                            {t('cookieConsent.modal.acceptAll')}
                          </Button>
                          <Button
                            className="whitespace-nowrap"
                            variant="secondary"
                            onPress={onRejectAll}
                            startIcon={<X />}
                          >
                            {t('cookieConsent.modal.rejectAll')}
                          </Button>
                        </div>
                        <Button
                          className="whitespace-nowrap"
                          variant="secondary"
                          onPress={handleCustomCookiesAcceptance}
                        >
                          {t('cookieConsent.modal.saveSettings')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </FocusScope>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContainer>
  ) : null
}

export default CookieSettingsModal
