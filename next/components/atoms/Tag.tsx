import cx from 'classnames'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

type TagProps = DetailedHTMLProps<InputHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode
  isActive?: boolean
  ignoreEvents?: boolean
}

const Tag = ({
  children,
  isActive = false,
  className,
  ignoreEvents = false,
  ...rest
}: TagProps) => {
  return (
    <div
      {...rest}
      tabIndex={ignoreEvents ? -1 : 0}
      className={cx(
        'rounded-full w-fit h-8 whitespace-nowrap font-semibold flex items-center border px-3 select-none',
        {
          'bg-primary border-primary text-white': isActive,
          'bg-white border-border hover:text-primary': !isActive,
          'pointer-events-none': ignoreEvents,
          'cursor-pointer': !ignoreEvents,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Tag
