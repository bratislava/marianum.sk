import cx from 'classnames'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronDown from '../../assets/chevron_down.svg'
import ChevronRight from '../../assets/chevron_right.svg'
import { usePrevious } from '../../utils/hooks'

export type BreadcrumbsProps = {
  children: ReactNode
  className?: string
}

const Breadcrumb = ({
  children,
  noChevron = false,
}: {
  children: ReactNode
  noChevron?: boolean
}) => {
  return (
    <div className="flex gap-1">
      {!noChevron && (
        <div>
          <ChevronRight />
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
            <Breadcrumb key={index} noChevron={index === 0}>
              {child}
            </Breadcrumb>
          ))
        : [
            <Breadcrumb key={1} noChevron>
              {children}
            </Breadcrumb>,
          ],
    [children],
  )

  const isCollapsing = useMemo(() => breadcrumbedChildren.length > 2, [breadcrumbedChildren])

  const [isOpen, setOpen] = useState(false)

  const hiddenItems = useMemo(
    () => (
      <div className="flex px-3 pb-4 flex-col gap-2">
        {Array.isArray(children) &&
          children.slice(1, -1).map((child, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <Breadcrumb>{child}</Breadcrumb>
            </div>
          ))}
      </div>
    ),
    [children],
  )

  return (
    <div className={cx('w-full relative', className)}>
      <div>
        {isExpanded || !isCollapsing ? (
          <div className="flex items-center gap-1 p-4">{breadcrumbedChildren}</div>
        ) : (
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1 p-4">
                {/* first child */}
                {breadcrumbedChildren[0]}
                {/* ... */}
                <div className="flex gap-1">
                  <ChevronRight />
                  <span>...</span>
                </div>
                {/* last child */}
                {breadcrumbedChildren[breadcrumbedChildren.length - 1]}
              </div>
              <button className="p-4" type="button" onClick={() => setOpen((o) => !o)}>
                <div className={cx('transform transition-transform', { 'rotate-180': isOpen })}>
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
        className={cx('invisible p-4 select-none absolute w-full flex gap-1 items-center')}
      >
        {breadcrumbedChildren}
      </div>

      {/* expanded wrapping breadcrumbs for calculation purposes */}
      <div
        ref={breadcrumbsExpandedWrappingRef}
        className={cx(
          'invisible p-4 select-none absolute w-full flex gap-1 items-center flex-wrap',
        )}
      >
        {breadcrumbedChildren}
      </div>
    </div>
  )
}

export default Breadcrumbs
