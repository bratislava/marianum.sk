import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { ArrowLeftIcon } from '@/assets/icons'
import IconButton from '@/components/atoms/IconButton'

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

const ScrollToTopButton = () => {
  const { t } = useTranslation('common')

  const [visible, setVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEventListener('scroll', handleScroll)

  return (
    <IconButton
      aria-label={t('ScrollToTopButton.aria.scrollToTop')}
      id="scrollToTopButton"
      onPress={handleScrollToTop}
      variant="secondary"
      className={`fixed bottom-5 right-5 z-30 bg-white md:bottom-7 md:right-7 ${
        visible ? 'visible' : 'invisible'
      }`}
    >
      <div className="-mt-0.5 rotate-90">
        <ArrowLeftIcon />
      </div>
    </IconButton>
  )
}

export default ScrollToTopButton
