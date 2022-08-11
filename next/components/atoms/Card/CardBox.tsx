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
    <div>
      <div
        className={classNames(
          'flex flex-col bg-white',
          {
            'border border-border': border,
            'group cursor-pointer hover:shadow-card cursor-pointer': hover,
          },
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default CardBox
