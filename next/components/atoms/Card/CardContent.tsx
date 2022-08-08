import { PropsWithChildren } from 'react'
import cx from 'classnames'

type CardContentProps = { largePadding?: boolean; className?: string }

const CardContent = ({
  largePadding = false,
  className,
  children,
}: PropsWithChildren<CardContentProps>) => {
  return (
    <div className={cx('flex flex-col', largePadding ? 'p-4' : 'p-6', className)}>{children}</div>
  )
}

export default CardContent
