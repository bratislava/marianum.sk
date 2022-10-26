import cx from 'classnames'
import NextLink from 'next/link'
import { ComponentProps, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import ArrowRightIcon from '../../assets/arrow_forward.svg'

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'as' | 'passHref'> & {
  children: ReactNode
  variant?: 'primary' | 'white'
  noArrow?: boolean
  noStyles?: boolean
  className?: string
  suffix?: string // TODO: Implement.
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
      suffix,
      ...rest
    },
    ref,
  ) => {
    const styles = twMerge(
      noStyles
        ? ''
        : cx(
            'inline-flex items-center justify-center space-x-2 text-center align-middle text-md font-bold',
            {
              'text-primary hover:text-primary-dark': variant === 'primary',
              'text-white hover:opacity-64': variant === 'white',
            },
          ),
      className,
    )
    return (
      <NextLink
        href={href}
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
            {!noArrow && <ArrowRightIcon />}
          </>
        )}
      </NextLink>
    )
  },
)

export default MLink
