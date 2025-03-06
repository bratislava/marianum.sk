import cx from 'classnames'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type RowContentProps = {
  hover?: boolean
  className?: string
}

const RowContent = ({ className, hover = true, children }: PropsWithChildren<RowContentProps>) => {
  return (
    <div
      className={twMerge(
        cx('relative flex grow items-center gap-x-4 px-4 py-3 md:px-5 md:py-4', { group: hover }),
        className,
      )}
    >
      {children}
    </div>
  )
}

export default RowContent
