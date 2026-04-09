import React, { PropsWithChildren, useContext } from 'react'

import { sectionContext } from '@/components/layouts/SectionsWrapper'
import cn from '@/utils/cn'

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
      className={cn(
        'md:p-6',
        {
          'md:bg-white': background === 'dark',
          'md:bg-background-beige': background === 'light',
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default FiltersBackgroundWrapper
