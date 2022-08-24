import cx from 'classnames'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

type TagButtonProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: ReactNode
  isActive?: boolean
}

const TagButton = ({ children, isActive = false, className, ...rest }: TagButtonProps) => {
  return (
    <button
      {...rest}
      type="button"
      className={cx(
        'flex h-8 w-fit cursor-pointer select-none items-center whitespace-nowrap rounded-full border px-3 text-sm font-semibold',
        {
          'border-primary bg-primary text-white': isActive,
          'border-border bg-white hover:text-primary': !isActive,
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

export default TagButton
