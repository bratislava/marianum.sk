import { useState } from 'react'

import { client } from '@/services/graphql/gqlClient'

import { ApplicationTypes } from './application-shared.types'

export const useSendApplication = () => {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  /**
   * On send error this forces to refresh the captcha component, as captcha token can be verified only once.
   */
  const [captchaRefreshDate, setCaptchaRefreshDate] = useState(Date.now())

  const send = async (application: ApplicationTypes.Application, captchaToken: string) => {
    if (sending) {
      return
    }
    setSending(true)
    setError(false)
    try {
      await client.CreateApplication({ data: application, captchaToken })
      setSending(false)
      setSent(true)
    } catch (error_) {
      setCaptchaRefreshDate(Date.now())
      setSending(false)
      setError(true)
    }
  }

  return { sent, sending, error, send, captchaRefreshDate }
}
