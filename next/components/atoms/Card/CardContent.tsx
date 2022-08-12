import cx from 'classnames'
import { PropsWithChildren } from 'react'

type CardContentProps = { largePadding?: boolean; className?: string }

const CardContent = ({
  largePadding = false,
  className,
  children,
}: PropsWithChildren<CardContentProps>) => {
  return (
    <div className={cx('flex flex-col', largePadding ? 'p-6' : 'p-4', className)}>{children}</div>
  )
}

export default CardContent
