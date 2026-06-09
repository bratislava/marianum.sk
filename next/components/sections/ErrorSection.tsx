import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'

import Button from '@/components/atoms/Button'
import Section from '@/components/molecules/Section'

type ErrorSectionProps = {
  code: number
  title: string
  message: string
}

const ErrorSection = ({ code, title, message }: ErrorSectionProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <Section className="flex flex-col items-center justify-center text-center">
      <div className="py-20">
        <div className="relative flex h-50 justify-center">
          <div className="absolute text-[200px]/50 font-bold text-primary text-style-status-code">
            {code}
          </div>
          <div className="absolute mt-25 h-1/2 w-full bg-linear-to-t from-background-beige" />
        </div>

        <h1 className="pb-5">{title}</h1>

        <div className="lg:px-60 xl:px-80">{message}</div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          <Button href="/">{t('ErrorPage.home')}</Button>
          <Button onPress={handleGoBack} variant="secondary">
            {t('ErrorPage.previousPage')}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default ErrorSection
