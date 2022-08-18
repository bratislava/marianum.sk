import cx from 'classnames'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronDown from '../../assets/chevron_down.svg'
import { usePrevious } from '../../utils/hooks'

export type BreadcrumbsProps = {
  children: ReactNode
  className?: string
}

export type BreadcrumbChildProps = {
  children: ReactNode
  noChevron?: boolean
}

const BreadcrumbChild = ({ children, noChevron = false }: BreadcrumbChildProps) => {
  return (
    <div className="flex gap-1">
      {!noChevron && (
        <div className="-rotate-90 pt-[2px]">
          <ChevronDown />
        </div>
      )}
      <div className="whitespace-nowrap">{children}</div>
    </div>
  )
}

const Breadcrumbs = ({ children, className }: BreadcrumbsProps) => {
  const { height, ref: breadcrumbsExpandedRef } = useResizeDetector()
  const { height: fullHeight, ref: breadcrumbsExpandedWrappingRef } = useResizeDetector()

  const previousFullHeight = usePrevious(fullHeight)

  const [isExpanded, setExpanded] = useState(true)

  const recalculateExpansion = useCallback(() => {
    setExpanded((height ?? 0) === (fullHeight ?? 0))
  }, [height, fullHeight])

  useEffect(() => {
    recalculateExpansion()
  }, [recalculateExpansion])

  useEffect(() => {
    if (fullHeight && previousFullHeight && previousFullHeight !== fullHeight) {
      recalculateExpansion()
    }
  }, [fullHeight, previousFullHeight, recalculateExpansion])

  const breadcrumbedChildren = useMemo(
    () =>
      Array.isArray(children)
        ? children.map((child, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <BreadcrumbChild key={index} noChevron={index === 0}>
              {child}
            </BreadcrumbChild>
          ))
        : [
            <BreadcrumbChild key={0} noChevron>
              {children}
            </BreadcrumbChild>,
          ],
    [children],
  )

  const isCollapsing = useMemo(() => breadcrumbedChildren.length > 2, [breadcrumbedChildren])

  const [isOpen, setOpen] = useState(false)

  const hiddenItems = useMemo(
    () => (
      <div className="flex flex-col gap-2 px-3 pb-4">
        {Array.isArray(children) &&
          children.slice(1, -1).map((child, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <BreadcrumbChild>{child}</BreadcrumbChild>
            </div>
          ))}
      </div>
    ),
    [children],
  )

  return (
    <div className={cx('relative w-full', className)}>
      <div>
        {isExpanded || !isCollapsing ? (
          <div className="flex items-center gap-1 py-6">{breadcrumbedChildren}</div>
        ) : (
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1 p-4">
                {/* first child */}
                {breadcrumbedChildren[0]}
                {/* ... */}
                <BreadcrumbChild>...</BreadcrumbChild>
                {/* last child */}
                {breadcrumbedChildren[breadcrumbedChildren.length - 1]}
              </div>
              <button className="p-4" type="button" onClick={() => setOpen((o) => !o)}>
                <div
                  className={cx('transform transition-transform', {
                    'rotate-180': isOpen,
                  })}
                >
                  <ChevronDown />
                </div>
              </button>
            </div>
            {isOpen && hiddenItems}
          </div>
        )}
      </div>

      {/* expanded breadcrumbs for calculation purposes */}
      <div
        ref={breadcrumbsExpandedRef}
        className={cx('invisible absolute flex w-full select-none items-center gap-1 p-4')}
      >
        {breadcrumbedChildren}
      </div>

      {/* expanded wrapping breadcrumbs for calculation purposes */}
      <div
        ref={breadcrumbsExpandedWrappingRef}
        className={cx(
          'invisible absolute flex w-full select-none flex-wrap items-center gap-1 p-4',
        )}
      >
        {breadcrumbedChildren}
      </div>
    </div>
  )
}

export default Breadcrumbs
