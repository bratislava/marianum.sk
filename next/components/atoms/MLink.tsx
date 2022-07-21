import cx from 'classnames'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef } from 'react'

import ArrowRightIcon from '../../assets/arrow_forward.svg'

export type LinkProps = Omit<NextLinkProps, 'as' | 'passHref'> & {
  children: React.ReactNode
  variant?: 'primary' | 'white'
  noArrow?: boolean
  noStyles?: boolean
  className?: string
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
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
            <span>{children}</span>
          </a>
        ) : (
          <a
            ref={ref}
            {...rest}
            className={cx(
              'inline-flex items-center justify-center space-x-2 fill-current text-center align-middle text-md font-bold',
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

export default Link
