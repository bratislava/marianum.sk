import { useTranslation } from 'next-i18next'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import Spinner from '@/components/atoms/Spinner'

type LoadingProps = { className?: string }

const Loading = ({ className }: LoadingProps) => {
  const { t } = useTranslation('common')

  return (
    <div className={twMerge('flex flex-col items-center gap-4 text-primary', className)}>
      <Spinner className="size-12" />
      <div className="shrink-0">{t('Loading.loading')}</div>
    </div>
  )
}

export default Loading
