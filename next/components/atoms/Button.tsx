/* eslint-disable sonarjs/no-duplicate-string */
import cx from 'classnames'

import MLink from './MLink'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
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
  }

const Button = ({
  startIcon = null,
  endIcon = null,
  children,
  variant = 'primary',
  href,
  className,
  ...rest
}: ButtonProps) => {
  const style = cx(
    'text-btn font-bold inline-flex items-center justify-center text-center align-middle space-x-2',
    className,
    {
      'px-6 py-2':
        variant === 'primary' ||
        variant === 'secondary' ||
        variant === 'tertiary' ||
        variant === 'white',
      'px-2':
        variant === 'plain-primary' || variant === 'plain-secondary' || variant === 'plain-white',

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
      'bg-white border border-white': variant === 'white',
    },
  )

  if (href) {
    return (
      <MLink href={href} noArrow noStyles className={style} {...rest}>
        {startIcon}
        <span>{children}</span>
        {endIcon}
      </MLink>
    )
  }

  return (
    <button type="button" className={style} {...rest}>
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  )
}

export default Button
