import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import ArrowIcon from '../../assets/arrow_back.svg'
import IconButton from './IconButton'

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

const ScrollToTopButton = () => {
  const { t } = useTranslation('common', { keyPrefix: 'ScrollToTopButton' })

  const [visible, setVisible] = useState(false)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  }

  return (
    <IconButton
      aria-label={t('aria.scrollToTop')}
      id="scrollToTopButton"
      onPress={handleScrollToTop}
      variant="secondary"
      className={`fixed bottom-5 right-5 z-[2] bg-white md:bottom-7 md:right-7 ${
        visible ? 'visible' : 'invisible'
      }`}
    >
      <div className="-mt-0.5 rotate-90">
        <ArrowIcon />
      </div>
    </IconButton>
  )
}

export default ScrollToTopButton
