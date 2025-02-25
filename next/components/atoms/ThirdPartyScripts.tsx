import Script from 'next/script'
import { useContext } from 'react'

import { cookieConsentContext } from '@/components/atoms/Cookies/CookieConsent'

const ThirdPartyScripts = () => {
  const {
    acceptance: { areMarketingCookiesAllowed, areStatisticCookiesAllowed },
  } = useContext(cookieConsentContext)

  return (
    <>
      {/* Plausible */}
      <Script
        strategy="afterInteractive"
        data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/plausible.js"
      />

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
