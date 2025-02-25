import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import LoadingOverlay from '@/components/atoms/LoadingOverlay'

const DisclosureIframe = () => {
  const { t } = useTranslation('common', { keyPrefix: 'DisclosureIframe' })

  const [loading, setLoading] = useState(true)

  return (
    <div className="mx-auto mt-[-30px] max-w-[990px] pt-1.5 md:pt-0">
      <div className="relative z-[1] h-8 bg-background-beige" />
      <div className="mt-[-30px]">
        <LoadingOverlay loading={loading}>
          <iframe
            title={t('disclosureOfInformation')}
            src="https://marianum.samospravaonline.sk/web/index.php"
            width="100%"
            height="1050px"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </LoadingOverlay>
      </div>
    </div>
  )
}

export default DisclosureIframe
