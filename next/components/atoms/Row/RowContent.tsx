import { PropsWithChildren } from 'react'

import cn from '@/utils/cn'

type RowContentProps = {
  hover?: boolean
  className?: string
}

const RowContent = ({ className, hover = true, children }: PropsWithChildren<RowContentProps>) => {
  return (
    <div
      className={cn(
        'relative flex grow items-center px-4 py-3 md:px-5 md:py-4',
        {
          group: hover,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default RowContent
