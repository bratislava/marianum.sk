import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export type CardBoxProps = { border: boolean; className?: string; hover?: boolean }

const CardBox = ({
  border,
  className,
  hover = true,
  children,
}: PropsWithChildren<CardBoxProps>) => {
  return (
    <div
      className={classNames(
        'flex flex-col bg-white cursor-pointer',
        {
          'border border-border': border,
          'group cursor-pointer hover:shadow-card': hover,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default CardBox
