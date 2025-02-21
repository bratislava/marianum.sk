/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import cx from 'classnames'
import { forwardRef, RefObject } from 'react'
import { useButton } from 'react-aria'

import { AnchorProps, PolymorphicProps } from '@/components/atoms/Button'
import MLink from '@/components/atoms/MLink'

type IconButtonProps = Omit<PolymorphicProps, 'variant' | 'startIcon' | 'endIcon' | 'noPadding'> & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'white'
    | 'plain-primary'
    | 'plain-secondary'
    | 'plain-white'
    | 'pagination'
    | 'pagination-selected'
  size?: 'small' | 'default'
}

export type PolymorphicIconProps = IconButtonProps | AnchorProps

type PolymorphicIconButton = {
  (props: AnchorProps): JSX.Element
  (props: IconButtonProps): JSX.Element
}

const IconButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicIconProps>(
  (
    {
      variant = 'plain-primary',
      size = 'default',
      className,
      children,
      disabled = false,
      tabIndex = 0,
      ...rest
    }: IconButtonProps,
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

    const style = cx(
      'flex items-center justify-center rounded-full p-2 text-center align-middle text-btn focus:outline-none',
      className,
      {
        'h-[40px] w-[40px]': size === 'default',
        'h-[32px] w-[32px]': size === 'small',

        // text color
        'text-white': variant === 'primary' || variant === 'plain-white',
        'text-primary':
          variant === 'secondary' ||
          variant === 'tertiary' ||
          variant === 'white' ||
          variant === 'plain-primary' ||
          variant === 'pagination-selected',
        'text-foreground': variant === 'plain-secondary' || variant === 'pagination',

        // bg and border color
        'border border-primary bg-primary focus:border-primary-dark focus:bg-primary-light':
          variant === 'primary',
        'border border-primary focus:border-primary-light focus:text-primary-light':
          variant === 'secondary' || variant === 'pagination-selected',
        'border border-border-alt focus:text-primary-light': variant === 'tertiary',
        'border border-border bg-white focus:border-primary-dark focus:text-primary-light':
          variant === 'white' || variant === 'pagination',
        'border border-primary bg-white': variant === 'pagination-selected',
        'focus:bg-primary/8 focus:text-primary-light': variant === 'plain-primary',
        'focus:bg-foreground/8 focus:text-foreground': variant === 'plain-secondary',
        'focus:bg-white/8': variant === 'plain-white',

        // hover
        'hover:border-primary-dark hover:bg-primary-dark': variant === 'primary' && !disabled,
        'border border-primary hover:border-primary-dark hover:text-primary-dark':
          (variant === 'secondary' || variant === 'pagination-selected') && !disabled,
        'hover:border-border-alt-dark hover:text-primary-dark': variant === 'tertiary' && !disabled,
        'hover:border-border-dark hover:text-primary-dark':
          (variant === 'white' || variant === 'pagination') && !disabled,
        'hover:bg-primary/12 hover:text-primary-dark': variant === 'plain-primary' && !disabled,
        'hover:bg-foreground/12 hover:text-foreground-dark':
          variant === 'plain-secondary' && !disabled,
        'hover:opacity-64': variant === 'plain-white' && !disabled,

        // disabled
        'opacity-50': disabled,
      },
    )

    if (rest.href) {
      /* react-aria adds role="button" which we don't want to use for <a>s */
      const buttonPropsFixed = { ...buttonProps, role: undefined }
      return (
        <MLink
          ref={ref as RefObject<HTMLAnchorElement>}
          href={rest.href}
          tabIndex={tabIndex}
          noStyles
          noArrow
          className={style}
          {...buttonPropsFixed}
        >
          <span>{children}</span>
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
        <span>{children}</span>
      </button>
    )
  },
) as PolymorphicIconButton

export default IconButton
