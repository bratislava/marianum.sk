/* eslint-disable sonarjs/no-duplicate-string */
import cx from 'classnames'

import MLink from './MLink'

type IconButtonProps = React.DetailedHTMLProps<
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
  href?: string
}

const Button = ({
  children,
  variant = 'plain-primary',
  href,
  className,
  ...props
}: IconButtonProps) => {
  const style = cx(
    'p-2 rounded-full text-btn items-center justify-center text-center align-middle fill-current focus:outline outline-offset-2 outline-1',
    className,
    {
      // text color
      'text-white': variant === 'primary' || variant === 'plain-white',
      'text-primary hover:text-primary-dark':
        variant === 'secondary' ||
        variant === 'tertiary' ||
        variant === 'white' ||
        variant === 'plain-primary',
      'text-foreground hover:text-[#323532]': variant === 'plain-secondary',
      'hover:opacity-64': variant === 'plain-white',

      // bg and border color
      'bg-primary border border-primary hover:bg-primary-dark hover:border-primary-dark':
        variant === 'primary',
      'border border-primary hover:border-primary-dark': variant === 'secondary',
      'border border-border-alt hover:border-border-alt-dark': variant === 'tertiary',
      'bg-white border border-border hover:border-border-dark': variant === 'white',
    },
  )

  if (href) {
    return (
      <MLink href={href} noStyles noArrow className={style}>
        <span>{children}</span>
      </MLink>
    )
  }
  return (
    <button type="button" className={style} {...props}>
      <span>{children}</span>
    </button>
  )
}

export default Button
