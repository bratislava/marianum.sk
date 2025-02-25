import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Copied from https://stackoverflow.com/a/70841409.
export const useLeavePageConfirm = (enabled: boolean, text?: string) => {
  const router = useRouter()

  // prompt the user if they try and leave with unsaved changes
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!enabled) return
      e.preventDefault()

      // eslint-disable-next-line consistent-return,no-return-assign
      return (e.returnValue = text)
    }
    const handleBrowseAway = () => {
      if (!enabled) return
      // eslint-disable-next-line no-alert
      if (window.confirm(text)) return
      router.events.emit('routeChangeError')
      throw new Error('routeChange aborted.')
    }
    window.addEventListener('beforeunload', handleWindowClose)
    router.events.on('routeChangeStart', handleBrowseAway)

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)
    }
  }, [enabled, router.events, text])
}
