import cx from 'classnames'
import React, { PropsWithChildren, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import { sectionContext } from '../layouts/SectionsWrapper'

// eslint-disable-next-line @typescript-eslint/ban-types

type FiltersBackgroundWrapperProps = { className: string }

/**
 * Wrapper for filters that checks the background of the section it is contained in and uses the opposite one.
 */
const FiltersBackgroundWrapper = ({
  className,
  children,
}: PropsWithChildren<FiltersBackgroundWrapperProps>) => {
  const { background } = useContext(sectionContext)

  return (
    <div
      className={twMerge(
        cx('md:p-6', {
          'md:bg-white': background === 'dark',
          'md:bg-background-beige': background === 'light',
        }),
        className,
      )}
    >
      {children}
    </div>
  )
}

export default FiltersBackgroundWrapper
