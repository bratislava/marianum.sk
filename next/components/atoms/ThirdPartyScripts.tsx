import Script from 'next/script'

const ThirdPartyScripts = () => {
  return (
    <>
      {/* Plausible */}
      <Script
        strategy="afterInteractive"
        data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/plausible.js"
      />
    </>
  )
}

export default ThirdPartyScripts
