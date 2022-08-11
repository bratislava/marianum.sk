/* eslint-disable sonarjs/no-duplicate-string */
import classnames from 'classnames'
import { ReactNode, useRef } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'

import MLink from './MLink'

type ButtonProps = (AriaButtonProps<'button'> | AriaButtonProps<'a'>) & {
  startIcon?: ReactNode
  endIcon?: ReactNode
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'white'
    | 'plain-primary'
    | 'plain-secondary'
    | 'plain-white'
  className?: string
  disabled?: boolean
  tabIndex?: number
}

const Button = ({
  startIcon = null,
  endIcon = null,
  variant = 'primary',
  className,
  children,
  disabled = false,
  tabIndex = 0,
  ...rest
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(
    {
      ...rest,
      elementType: rest.href ? 'a' : 'button',
      isDisabled: disabled,
    },
    ref,
  )

  const style = classnames(
    'inline-flex items-center justify-center space-x-2 text-center align-middle text-btn font-bold focus:outline-none',
    className,
    {
      'px-6 py-2':
        variant === 'primary' ||
        variant === 'secondary' ||
        variant === 'tertiary' ||
        variant === 'white',
      'rounded px-2':
        variant === 'plain-primary' || variant === 'plain-secondary' || variant === 'plain-white',

      // text color
      'text-white': variant === 'primary' || variant === 'plain-white',
      'text-primary':
        variant === 'secondary' ||
        variant === 'tertiary' ||
        variant === 'white' ||
        variant === 'plain-primary',
      'text-foreground': variant === 'plain-secondary',

      // bg and border color
      'border border-primary bg-primary focus:border-primary-dark focus:bg-primary-light':
        variant === 'primary',
      'border border-primary focus:border-primary-light focus:text-primary-light':
        variant === 'secondary',
      'border border-border-alt focus:text-primary-light': variant === 'tertiary',
      'border border-white bg-white focus:border-primary-dark focus:text-primary-light':
        variant === 'white',
      'focus:bg-primary/8 focus:text-primary-light': variant === 'plain-primary',
      'focus:bg-foreground/8 focus:text-foreground': variant === 'plain-secondary',
      'hover:bg-white/12 focus:bg-white/8': variant === 'plain-white',

      // hover
      'hover:border-primary-dark hover:bg-primary-dark': variant === 'primary' && !disabled,
      'border border-primary hover:border-primary-dark hover:text-primary-dark':
        variant === 'secondary' && !disabled,
      'hover:border-primary-dark hover:text-primary-dark': variant === 'tertiary' && !disabled,
      'hover:border-border-alt-dark hover:text-primary-dark': variant === 'white' && !disabled,
      'hover:bg-primary/12 hover:text-primary-dark': variant === 'plain-primary' && !disabled,
      'hover:bg-foreground/12 hover:text-foreground-dark':
        variant === 'plain-secondary' && !disabled,
      'hover:opacity-64': variant === 'plain-white' && !disabled,

      // disabled
      'opacity-50': disabled,
    },
  )

  if (rest.href) {
    return (
      <MLink
        href={rest.href}
        tabIndex={tabIndex}
        noArrow
        noStyles
        className={style}
        {...buttonProps}
      >
        {startIcon}
        <span>{children}</span>
        {endIcon}
      </MLink>
    )
  }

  return (
    <button type="button" ref={ref} tabIndex={tabIndex} className={style} {...buttonProps}>
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  )
}

export default Button
