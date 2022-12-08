import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type RowMoreContentProps = {
  className?: string
}

const RowMoreContent = ({ className, children }: PropsWithChildren<RowMoreContentProps>) => {
  return (
    <div className={twMerge('flex py-3 px-4 md:py-4 md:px-5 border-border border-t', className)}>
      {children}
    </div>
  )
}

export default RowMoreContent
