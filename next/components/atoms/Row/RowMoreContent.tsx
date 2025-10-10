import { PropsWithChildren } from 'react'

import cn from '@/utils/cn'

type RowMoreContentProps = {
  className?: string
}

const RowMoreContent = ({ className, children }: PropsWithChildren<RowMoreContentProps>) => {
  return (
    <div className={cn('flex border-t border-border px-4 py-3 md:px-5 md:py-4', className)}>
      {children}
    </div>
  )
}

export default RowMoreContent
