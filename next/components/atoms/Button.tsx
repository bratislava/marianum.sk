/* eslint-disable sonarjs/no-duplicate-string */
import { LinkButtonProps } from '@react-types/button'
import classnames from 'classnames'
import { forwardRef, ReactNode, Ref, RefObject } from 'react'
import * as React from 'react'
import { AriaButtonProps, useButton } from 'react-aria'

import MLink from './MLink'

type ButtonBase = {
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
  noPadding?: boolean
}

/*
 *  This part makes the component return `HTMLAnchorElement` ref when `href` if provided and `HTMLButtonElement` when it's not.
 *  https://github.com/typescript-cheatsheets/react/issues/167#issuecomment-751347673
 */
type ButtonProps = Omit<AriaButtonProps<'button'>, keyof LinkButtonProps> &
  ButtonBase & { ref?: Ref<HTMLButtonElement>; href?: undefined }
type AnchorProps = AriaButtonProps<'a'> &
  ButtonBase & {
    ref?: Ref<HTMLAnchorElement>
    href: string
  }

type PolymorphicProps = ButtonProps | AnchorProps
type PolymorphicButton = {
  (props: AnchorProps): JSX.Element
  (props: ButtonProps): JSX.Element
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicProps>(
  (
    {
      startIcon = null,
      endIcon = null,
      variant = 'primary',
      className,
      children,
      disabled = false,
      tabIndex = 0,
      noPadding = false,
      ...rest
    },
    ref,
  ) => {
    const { buttonProps } = useButton(
      {
        ...rest,
        elementType: rest.href ? 'a' : 'button',
        isDisabled: disabled,
      },
      ref as RefObject<HTMLAnchorElement | HTMLButtonElement>,
    )
const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicProps>(
  (
    {
      startIcon = null,
      endIcon = null,
      variant = 'primary',
      className,
      children,
      disabled = false,
      tabIndex = 0,
      noPadding = false,
      ...rest
    },
    ref,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const { buttonProps } = useButton(
      {
        ...rest,
        elementType: rest.href ? 'a' : 'button',
        isDisabled: disabled,
      },
      ref as RefObject<HTMLAnchorElement | HTMLButtonElement>,
    )

    const style = classnames(
      'inline-flex items-center justify-center space-x-2 text-center align-middle text-btn font-bold focus:outline-none',
      className,
      {
        'px-6 py-2':
          !noPadding &&
          (variant === 'primary' ||
            variant === 'secondary' ||
            variant === 'tertiary' ||
            variant === 'white'),
        rounded:
          variant === 'plain-primary' || variant === 'plain-secondary' || variant === 'plain-white',
        'px-2':
          !noPadding &&
          (variant === 'plain-primary' ||
            variant === 'plain-secondary' ||
            variant === 'plain-white'),

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
          ref={ref as RefObject<HTMLAnchorElement>}
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
      <button
        type="button"
        ref={ref as RefObject<HTMLButtonElement>}
        tabIndex={tabIndex}
        className={style}
        {...buttonProps}
      >
        {startIcon}
        <span>{children}</span>
        {endIcon}
      </button>
    )
  },
) as PolymorphicButton

export default Button
