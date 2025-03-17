import cx from 'classnames'
import NextLink from 'next/link'
import { ComponentProps, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { ArrowRightIcon } from '@/assets/icons'

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'as' | 'passHref'> & {
  children: ReactNode
  variant?: 'primary' | 'white' | 'regular'
  noArrow?: boolean
  noStyles?: boolean
  className?: string
}

const MLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
      children,
      variant = 'primary',
      noArrow = false,
      noStyles = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const styles = twMerge(
      noStyles
        ? ''
        : cx({
            'inline-flex items-center justify-center space-x-2 text-center align-middle text-md font-bold':
              variant === 'primary' || variant === 'white',
            'text-primary hover:text-primary-dark': variant === 'primary',
            'text-white hover:opacity-64': variant === 'white',
            'font-semibold text-primary underline hover:text-primary-dark': variant === 'regular',
          }),
      'base-focus-ring',
      className,
    )

    return (
      <NextLink
        href={href ?? ''}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        ref={ref}
        passHref
        {...rest}
        className={styles}
      >
        {noStyles ? (
          children
        ) : (
          <>
            <span>{children}</span>
            {!noArrow && (
              <ArrowRightIcon className={variant === 'regular' ? 'inline' : undefined} />
            )}
          </>
        )}
      </NextLink>
    )
  },
)

export default MLink
