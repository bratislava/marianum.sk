import { client } from '@services/graphql/gqlClient'
import { useState } from 'react'

import { ApplicationTypes } from './application-shared.types'

export const useSendApplication = () => {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

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
      setSending(false)
      setError(true)
    }
  }

  return { sent, sending, error, send }
}
