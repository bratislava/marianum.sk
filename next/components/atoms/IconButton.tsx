/* eslint-disable sonarjs/no-duplicate-string */
import cx from 'classnames'

import MLink from './MLink'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
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
    size?: 'small' | 'default'
    href?: string
  }

const Button = ({
  children,
  variant = 'plain-primary',
  size = 'default',
  href,
  className,
  ...rest
}: IconButtonProps) => {
  const style = cx(
    'flex p-2 rounded-full text-btn items-center justify-center text-center align-middle',
    className,
    {
      'h-[40px] w-[40px]': size === 'default',
      'h-[32px] w-[32px]': size === 'small',
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
      <MLink href={href} noStyles noArrow className={style} {...rest}>
        <span>{children}</span>
      </MLink>
    )
  }
  return (
    <button type="button" className={style} {...rest}>
      <span>{children}</span>
    </button>
  )
}

export default Button
