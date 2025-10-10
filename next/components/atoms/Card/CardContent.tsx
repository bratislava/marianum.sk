import { PropsWithChildren } from 'react'

import cn from '@/utils/cn'

type CardContentProps = {
  largePadding?: boolean
  className?: string
}

const CardContent = ({
  largePadding = false,
  className,
  children,
}: PropsWithChildren<CardContentProps>) => {
  return (
    <div className={cn('flex flex-col', largePadding ? 'p-6' : 'p-4', className)}>{children}</div>
  )
}

export default CardContent
