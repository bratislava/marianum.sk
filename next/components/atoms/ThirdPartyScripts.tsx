import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

import * as gtag from '../../utils/googleAnalytics'

const ThirdPartyScripts = () => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', gtag.pageview)
    router.events.on('hashChangeComplete', gtag.pageview)
    return () => {
      router.events.off('routeChangeComplete', gtag.pageview)
      router.events.off('hashChangeComplete', gtag.pageview)
    }
  }, [router.events])

  return (
    <>
      {/* Plausible */}
      <Script
        strategy="afterInteractive"
        data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/plausible.js"
      />

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
  )
}

export default ThirdPartyScripts
