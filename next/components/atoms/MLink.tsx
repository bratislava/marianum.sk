import cx from 'classnames'
import NextLink from 'next/link'
import { ComponentProps, forwardRef, ReactNode } from 'react'

import ArrowRightIcon from '../../assets/arrow_forward.svg'

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'as' | 'passHref'> & {
  children: ReactNode
  variant?: 'primary' | 'white'
  noArrow?: boolean
  noStyles?: boolean
  className?: string
  suffix?: string
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
    return (
      <NextLink
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        passHref
      >
        {noStyles ? (
          <a ref={ref} {...rest} className={className}>
            {children}
          </a>
        ) : (
          <a
            ref={ref}
            {...rest}
            className={cx(
              className,
              'inline-flex items-center justify-center space-x-2 text-center align-middle text-md font-bold',
              {
                'text-primary hover:text-primary-dark': variant === 'primary',
                'text-white hover:opacity-64': variant === 'white',
              },
            )}
          >
            <span>{children}</span>
            {!noArrow && <ArrowRightIcon />}
          </a>
        )}
      </NextLink>
    )
  },
)

export default MLink
