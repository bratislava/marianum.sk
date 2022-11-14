import Button from '@components/atoms/Button'
import { useTranslation } from 'next-i18next'

/* Based on approach here: https://levelup.gitconnected.com/build-an-accessible-skip-to-content-anchor-link-with-react-140903f3bd7e */
const handleSkip = () => {
  const contentElement: HTMLElement | null = document.querySelector('main:first-of-type')
  if (contentElement) {
    contentElement.setAttribute('tabindex', '0')
    contentElement.focus()
    setTimeout(() => contentElement.removeAttribute('tabindex'), 1000)
  }
}

const SkipToContentButton = () => {
  const { t } = useTranslation('common', { keyPrefix: 'SkipToContentButton' })

  return (
    <div className="fixed left-0 z-10 translate-x-[-1000px] bg-white transition-transform focus-within:translate-x-0">
      <Button variant="plain-primary" onPress={handleSkip}>
        {t('skipToContent')}
      </Button>
    </div>
  )
}

export default SkipToContentButton
