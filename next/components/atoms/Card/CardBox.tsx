import cx from 'classnames'
import { HTMLAttributes, PropsWithChildren } from 'react'

export type CardBoxProps = { border?: boolean; hover?: boolean } & Pick<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'onClick'
>

const CardBox = ({
  border = false,
  className,
  hover = true,
  children,
  onClick = () => {},
}: PropsWithChildren<CardBoxProps>) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cx(
        'flex flex-col bg-white',
        {
          'border border-border': border,
          'group cursor-pointer hover:shadow-card': hover,
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default CardBox
