import cx from 'classnames'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

type ChipProps = DetailedHTMLProps<InputHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode
  isActive?: boolean
}

const Chip = ({ children, isActive = false, className, ...rest }: ChipProps) => {
  return (
    <div
      {...rest}
      className={cx(
        'rounded-full w-fit h-8 whitespace-nowrap font-semibold flex items-center border px-3 select-none',
        {
          'bg-primary border-primary text-white': isActive,
          'bg-white border-border hover:text-primary': !isActive,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Chip
