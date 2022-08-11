/* eslint-disable sonarjs/no-duplicate-string */
import cx from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef, forwardRef } from 'react'

import MLink from './MLink'

const removeGroupHover = (className: string) =>
  className
    .split(' ')
    .filter((c) => !c.startsWith('group-hover:'))
    .join(' ')

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
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
    groupHover?: boolean
    noPadding?: boolean
  }

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      startIcon = null,
      endIcon = null,
      children,
      variant = 'primary',
      href,
      className,
      groupHover = false,
      noPadding = false,
      ...rest
    },
    ref,
  ) => {
    const styleWithGroupHover = cx(
      'text-btn font-bold inline-flex items-center justify-center text-center align-middle space-x-2',
      className,
      {
        'px-6 py-2':
          !noPadding &&
          (variant === 'primary' ||
            variant === 'secondary' ||
            variant === 'tertiary' ||
            variant === 'white'),
        'px-2':
          !noPadding &&
          (variant === 'plain-primary' ||
            variant === 'plain-secondary' ||
            variant === 'plain-white'),

        // text color
        'text-white': variant === 'primary' || variant === 'plain-white',
        'text-primary hover:text-primary-dark group-hover:text-primary-dark':
          variant === 'secondary' ||
          variant === 'tertiary' ||
          variant === 'white' ||
          variant === 'plain-primary',
        'text-foreground hover:text-[#323532] group-hover:text-[#323532]':
          variant === 'plain-secondary',
        'hover:opacity-64 group-hover:opacity-64': variant === 'plain-white',

        // bg and border color
        'bg-primary border border-primary hover:bg-primary-dark group-hover:bg-primary-dark hover:border-primary-dark group-hover:border-primary-dark':
          variant === 'primary',
        'border border-primary hover:border-primary-dark group-hover:border-primary-dark':
          variant === 'secondary',
        'border border-border-alt hover:border-border-alt-dark group-hover:border-border-alt-dark':
          variant === 'tertiary',
        'bg-white border border-white': variant === 'white',
      },
    )

    const style = groupHover ? styleWithGroupHover : removeGroupHover(styleWithGroupHover)

    if (href) {
      return (
        <MLink
          href={href}
          noArrow
          noStyles
          className={style}
          // @ts-ignore
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          {...rest}
        >
          {startIcon}
          <span>{children}</span>
          {endIcon}
        </MLink>
      )
    }

    return (
      <button
        type="button"
        className={style}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        {...rest}
      >
        {startIcon}
        <span>{children}</span>
        {endIcon}
      </button>
    )
  },
)

export default Button
