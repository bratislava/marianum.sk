/* eslint-disable sonarjs/no-duplicate-string */
import { LinkButtonProps } from '@react-types/button'
import { forwardRef, ReactNode, Ref, RefObject } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'

import MLink from '@/components/atoms/MLink'
import cn from '@/utils/cn'

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
export type ButtonProps = Omit<AriaButtonProps<'button'>, keyof LinkButtonProps> &
  ButtonBase & {
    ref?: Ref<HTMLButtonElement>
    href?: undefined
  }
export type AnchorProps = AriaButtonProps<'a'> &
  ButtonBase & {
    ref?: Ref<HTMLAnchorElement>
    href: string
  }

export type PolymorphicProps = ButtonProps | AnchorProps

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

    const style = cn(
      'base-focus-ring inline-flex items-center justify-center space-x-2 text-center align-middle text-btn font-bold',
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
        'border border-primary bg-primary': variant === 'primary',
        'border border-primary': variant === 'secondary',
        'border border-border-alt': variant === 'tertiary',
        'border border-white bg-white': variant === 'white',
        // 'hover:bg-white/12': variant === 'plain-white',

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
      className,
    )

    if (rest.href) {
      /* react-aria adds role="button" which we don't want to use for <a>s */
      const buttonPropsFixed = { ...buttonProps, role: undefined }

      return (
        <MLink
          ref={ref as RefObject<HTMLAnchorElement>}
          href={rest.href}
          tabIndex={tabIndex}
          noArrow
          noStyles
          className={style}
          {...buttonPropsFixed}
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
