import { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export type CookieConsentSettings = {
  arePreferenceCookiesAllowed: boolean
  areStatisticCookiesAllowed: boolean
  areMarketingCookiesAllowed: boolean
}

export type CookieConsentContext = {
  acceptance: CookieConsentSettings
  isBannerOpen: boolean
  onOpenBanner: () => void
  onCloseBanner: () => void
  isModalOpen: boolean
  onOpenModal: () => void
  onCloseModal: () => void
  onAcceptAll: () => void
  onRejectAll: () => void
  onCustomCookiesAcceptance: (settings: CookieConsentSettings) => void
}

export const cookieConsentContext = createContext<CookieConsentContext>({
  acceptance: {
    arePreferenceCookiesAllowed: false,
    areStatisticCookiesAllowed: false,
    areMarketingCookiesAllowed: false,
  },
  isBannerOpen: false,
  onOpenBanner: () => null,
  onCloseBanner: () => null,
  isModalOpen: false,
  onOpenModal: () => null,
  onCloseModal: () => null,
  onAcceptAll: () => null,
  onRejectAll: () => null,
  onCustomCookiesAcceptance: () => null,
})

type CookieConsentProps = {
  children?: ReactNode
  banner: FC
  modal: FC
}

const CookieConsent = ({ children, banner: Banner, modal: Modal }: CookieConsentProps) => {
  // help variable to know if settings are saved
  const [areCookieSettingsSaved, setCookieSettingsSaved] = useLocalStorage(
    'are-cookie-settings-saved',
    false,
  )

  // actual value of saved settings
  const [localStorageCookieAcceptance, setLocalStorageCookieAcceptance] =
    useLocalStorage<CookieConsentSettings>('cookie-settings', {
      arePreferenceCookiesAllowed: false,
      areStatisticCookiesAllowed: false,
      areMarketingCookiesAllowed: false,
    })

  const [isBannerOpen, setBannerOpen] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleCustomCookiesAcceptance = useCallback(
    (acceptance: CookieConsentSettings) => {
      setLocalStorageCookieAcceptance(acceptance)
      setCookieSettingsSaved(true)
      setBannerOpen(false)
      setModalOpen(false)
    },
    [setCookieSettingsSaved, setLocalStorageCookieAcceptance],
  )

  const handleCookiesAcceptAll = useCallback(() => {
    handleCustomCookiesAcceptance({
      arePreferenceCookiesAllowed: true,
      areStatisticCookiesAllowed: true,
      areMarketingCookiesAllowed: true,
    })
  }, [handleCustomCookiesAcceptance])

  const handleCookiesRejectAll = useCallback(() => {
    handleCustomCookiesAcceptance({
      arePreferenceCookiesAllowed: false,
      areStatisticCookiesAllowed: false,
      areMarketingCookiesAllowed: false,
    })
  }, [handleCustomCookiesAcceptance])

  const cookieConsentContextValue: CookieConsentContext = useMemo(
    () => ({
      acceptance: localStorageCookieAcceptance,
      isBannerOpen,
      onOpenBanner: () => setBannerOpen(true),
      onCloseBanner: () => setBannerOpen(false),
      isModalOpen,
      onOpenModal: () => setModalOpen(true),
      onCloseModal: () => setModalOpen(false),
      onAcceptAll: handleCookiesAcceptAll,
      onRejectAll: handleCookiesRejectAll,
      onCustomCookiesAcceptance: handleCustomCookiesAcceptance,
    }),
    [
      handleCookiesAcceptAll,
      handleCookiesRejectAll,
      handleCustomCookiesAcceptance,
      isBannerOpen,
      isModalOpen,
      localStorageCookieAcceptance,
    ],
  )

  useEffect(() => {
    setBannerOpen(!areCookieSettingsSaved)
  }, [areCookieSettingsSaved])

  return (
    <cookieConsentContext.Provider value={cookieConsentContextValue}>
      <Banner />
      <Modal />
      {children}
    </cookieConsentContext.Provider>
  )
}

export default CookieConsent
