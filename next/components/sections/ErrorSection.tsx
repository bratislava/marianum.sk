import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Button from '../atoms/Button'
import Section from '../molecules/Section'

type ErrorSectionProps = {
  code: number
  title: string
  message: string
}

const ErrorSection = ({ code, title, message }: ErrorSectionProps) => {
  const router = useRouter()
  const { t } = useTranslation('common', { keyPrefix: 'ErrorPage' })

  const handleGoBack = () => {
    router.back()
  }

  return (
    <Section className="flex flex-col items-center justify-center text-center">
      <div className="py-[80px]">
        <div className="relative flex h-[200px] justify-center">
          <div className="status-code absolute text-[200px] font-bold leading-[200px] text-primary">
            {code}
          </div>
          <div className="absolute mt-[100px] h-[50%] w-full bg-gradient-to-t from-background-beige" />
        </div>

        <h1 className="pb-5">{title}</h1>

        <div className="lg:px-60 xl:px-80">{message}</div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          <Button href="/">{t('home')}</Button>
          <Button onPress={handleGoBack} variant="secondary">
            {t('previousPage')}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default ErrorSection
