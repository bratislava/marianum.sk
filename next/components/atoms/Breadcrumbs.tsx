import cx from 'classnames'
import last from 'lodash/last'
import { useTranslation } from 'next-i18next'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronDown from '../../assets/chevron_down.svg'
import { usePrevious } from '../../utils/hooks'
import MLink from './MLink'

export type BreadcrumbItem = {
  label: string | ReactNode
  path: string
}

export type BreadcrumbsProps = {
  crumbs: BreadcrumbItem[]
  className?: string
}

export type BreadcrumbChildProps = {
  crumb: BreadcrumbItem
  noChevron?: boolean
  noLink?: boolean
  ariaLabel?: string
}

const BreadcrumbChild = ({
  crumb,
  noChevron = false,
  noLink = false,
  ariaLabel,
}: BreadcrumbChildProps) => {
  return (
    <div className="flex gap-1">
      {!noChevron && (
        <div className="-rotate-90 pt-[2px]">
          <ChevronDown />
        </div>
      )}
      {noLink ? (
        <div>{crumb.label}</div>
      ) : (
        <MLink
          href={crumb.path}
          noStyles
          aria-label={ariaLabel}
          className="whitespace-nowrap underline"
        >
          {crumb.label}
        </MLink>
      )}
    </div>
  )
}

const Breadcrumbs = ({ crumbs, className }: BreadcrumbsProps) => {
  const { t } = useTranslation()

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

  const breadcrumbedChildren = useMemo(() => {
    return crumbs.map((crumb, index) => (
      /* eslint-disable react/no-array-index-key */
      <BreadcrumbChild
        key={index}
        crumb={crumb}
        noChevron={index === 0}
        ariaLabel={index === 0 ? t('Navigation.home') : undefined}
        noLink={index === crumbs.length - 1}
      />
      /* eslint-enable react/no-array-index-key */
    ))
  }, [crumbs, t])

  const isCollapsing = useMemo(() => breadcrumbedChildren.length > 2, [breadcrumbedChildren])

  const [isOpen, setOpen] = useState(false)

  return (
    <div className={cx('relative w-full', className)}>
      <div>
        {isExpanded || !isCollapsing ? (
          <div className="flex items-center gap-1 py-6">{breadcrumbedChildren}</div>
        ) : (
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                {/* first child */}
                {breadcrumbedChildren[0]}
                {/* dots, linkHref is ignored */}
                <BreadcrumbChild crumb={{ label: '…', path: '#' }} noLink />
                {/* last child */}
                {last(breadcrumbedChildren)}
              </div>
              {/* TODO add aria attributes */}
              <button className="p-4" type="button" onClick={() => setOpen((o) => !o)}>
                <div className={cx('transform transition-transform', { 'rotate-180': isOpen })}>
                  <ChevronDown />
                </div>
              </button>
            </div>
            {isOpen && (
              <div className="flex flex-col gap-2 px-3 pb-4">
                {breadcrumbedChildren.slice(1, -1).map((crumbedChild, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index}>{crumbedChild}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* expanded breadcrumbs for calculation purposes */}
      <div
        ref={breadcrumbsExpandedRef}
        className={cx('invisible absolute flex w-full select-none items-center gap-1')}
      >
        {breadcrumbedChildren}
      </div>

      {/* expanded wrapping breadcrumbs for calculation purposes */}
      <div
        ref={breadcrumbsExpandedWrappingRef}
        className={cx('invisible absolute flex w-full select-none flex-wrap items-center gap-1')}
      >
        {breadcrumbedChildren}
      </div>
    </div>
  )
}

export default Breadcrumbs
