import { useRouter } from 'next/router'
import Script from 'next/script'
import { useContext, useEffect } from 'react'

import * as gtag from '../../utils/googleAnalytics'
import { cookieConsentContext } from './CookieConsent'

const ThirdPartyScripts = () => {
  const router = useRouter()

  const {
    acceptance: { areMarketingCookiesAllowed, areStatisticCookiesAllowed },
  } = useContext(cookieConsentContext)

  useEffect(() => {
    if (areMarketingCookiesAllowed && areStatisticCookiesAllowed) {
      router.events.on('routeChangeComplete', gtag.pageview)
      router.events.on('hashChangeComplete', gtag.pageview)
    }
    return () => {
      if (areMarketingCookiesAllowed && areStatisticCookiesAllowed) {
        router.events.off('routeChangeComplete', gtag.pageview)
        router.events.off('hashChangeComplete', gtag.pageview)
      }
    }
  }, [router.events, areMarketingCookiesAllowed, areStatisticCookiesAllowed])
  return (
    <>
      {/* Plausible */}
      <Script
        strategy="afterInteractive"
        data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/plausible.js"
      />

      {areMarketingCookiesAllowed && areStatisticCookiesAllowed && (
        <>
          {/* Google Analytics */}
          <Script
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${
              process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''
            }`}
          />
          <Script
            id="google-analytics-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </>
      )}

      {/* TODO: are Hotjar cookies for marketing purpose? */}
      {areMarketingCookiesAllowed && areStatisticCookiesAllowed && (
        <>
          {/* Hotjar */}
          <Script
            id="hotjar-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:'${process.env.NEXT_PUBLIC_HOTJAR_SITE_ID ?? ''}',hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
            }}
          />
        </>
      )}
    </>
  )
}

export default ThirdPartyScripts
