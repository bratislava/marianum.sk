/* eslint-disable sonarjs/no-duplicate-string */
import cx from 'classnames'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'white'
    | 'plain-primary'
    | 'plain-secondary'
    | 'plain-white'
    | 'circle'
}

const Button = ({
  startIcon = null,
  endIcon = null,
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cx(
        'text-btn font-bold inline-flex items-center justify-center text-center align-middle space-x-2 fill-current focus:outline outline-offset-2 outline-1',
        className,
        {
          'px-6 py-2': variant !== 'circle',
          'p-2 rounded-full': variant === 'circle',

          // text color
          'text-white': variant === 'primary' || variant === 'plain-white',
          'text-primary hover:text-primaryDark':
            variant === 'secondary' ||
            variant === 'tertiary' ||
            variant === 'white' ||
            variant === 'plain-primary' ||
            variant === 'circle',
          'text-default hover:text-[#323532]': variant === 'plain-secondary',
          'hover:opacity-64': variant === 'plain-white',

          // bg and border color
          'bg-primary border border-primary hover:bg-primaryDark hover:border-primaryDark':
            variant === 'primary',
          'border border-primary hover:border-primaryDark': variant === 'secondary',
          'border border-alternative hover:border-alternativeDark': variant === 'tertiary',
          'bg-white border border-white': variant === 'white',
          'bg-white border border-borderDefault hover:border-borderDark': variant === 'circle',
          'border border-transparent':
            variant === 'plain-primary' ||
            variant === 'plain-secondary' ||
            variant === 'plain-white',
        },
      )}
      {...props}
    >
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  )
}

export default Button
