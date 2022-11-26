import cx from 'classnames'
import { HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type RowBoxProps = {
  border?: boolean
  hover?: boolean
} & Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'onClick'>

const RowBox = ({
  border = false,
  className,
  hover = true,
  children,
  onClick = () => {},
}: PropsWithChildren<RowBoxProps>) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={twMerge(
        cx('flex w-full flex-col bg-white', {
          'border border-border': border,
          'hover:shadow-card': hover,
        }),
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default RowBox
