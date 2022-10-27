import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useCallback, useContext, useState } from 'react'

import CheckIcon from '../../assets/check.svg'
import CloseIcon from '../../assets/close.svg'
import XIcon from '../../assets/x-alt.svg'
import Button from './Button'
import Checkbox from './Checkbox'
import { cookieConsentContext } from './CookieConsent'
import IconButton from './IconButton'
import Modal from './Modal'

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
  const { t } = useTranslation('common', { keyPrefix: 'CookieConsent' })

  const {
    isModalOpen,
    onCloseModal,
    onAcceptAll,
    onRejectAll,
    onCustomCookiesAcceptance,
    acceptance,
  } = useContext(cookieConsentContext)

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

  return (
    <Modal
      showCloseButton={false}
      isOpen={isModalOpen}
      onClose={onCloseModal}
      underlayClassName="p-4 md:p-8"
    >
      <div className="mx-auto max-h-full w-full max-w-4xl overflow-y-auto p-4 md:p-8">
        <div className="flex w-full flex-col gap-4 bg-white p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div className="text-h3 font-bold">{t('modal.title')}</div>
            <IconButton
              aria-label={t('aria.dismissCookieSettings')}
              variant="white"
              onPress={onCloseModal}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex flex-col gap-4">
            <CookieTypeCheckbox
              title={t('modal.types.necessary.title')}
              description={t('modal.types.necessary.description')}
              isChecked
              isDisabled
            />

            <CookieTypeCheckbox
              title={t('modal.types.preference.title')}
              description={t('modal.types.preference.description')}
              isChecked={arePreferenceCookiesAllowed}
              onChange={setPreferenceCookiesAllowed}
            />

            <CookieTypeCheckbox
              title={t('modal.types.statistic.title')}
              description={t('modal.types.statistic.description')}
              isChecked={areStatisticCookiesAllowed}
              onChange={setStatisticCookiesAllowed}
            />

            <CookieTypeCheckbox
              title={t('modal.types.marketing.title')}
              description={t('modal.types.marketing.description')}
              isChecked={areMarketingCookiesAllowed}
              onChange={setMarketingCookiesAllowed}
            />
          </div>

          <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
            <div className="flex flex-col gap-4 md:flex-row">
              <Button
                aria-label={t('aria.acceptAllCookies')}
                className="whitespace-nowrap"
                variant="primary"
                onPress={onAcceptAll}
                startIcon={<CheckIcon />}
              >
                {t('acceptAll')}
              </Button>
              <Button
                aria-label={t('aria.rejectAllCookies')}
                className="whitespace-nowrap"
                variant="secondary"
                onPress={onRejectAll}
                startIcon={<XIcon />}
              >
                {t('rejectAll')}
              </Button>
            </div>
            <Button
              aria-label={t('aria.saveCookieSettings')}
              className="whitespace-nowrap"
              variant="secondary"
              onPress={handleCustomCookiesAcceptance}
            >
              {t('saveSettings')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CookieSettingsModal
