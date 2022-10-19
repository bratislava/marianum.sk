import { useTranslation } from 'next-i18next'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import Spinner from './Spinner'

type LoadingProps = { className?: string }

const Loading = ({ className }: LoadingProps) => {
  const { t } = useTranslation()

  return (
    <div className={twMerge('flex flex-col items-center gap-4 text-primary', className)}>
      <Spinner className="h-12 w-12" />
      <div className="shrink-0">{t('components.atoms.LoadingOverlay.loading')}</div>
    </div>
  )
}

export default Loading
