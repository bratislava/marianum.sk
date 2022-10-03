import Script from 'next/script'

const ThirdPartyScripts = () => {
  return (
    <>
      {/* Plausible */}
      <Script
        strategy="afterInteractive"
        data-domain="marianum.sk" // TODO: take the domain from env variable
        src="https://plausible.io/js/plausible.js"
      />
    </>
  )
}

export default ThirdPartyScripts
