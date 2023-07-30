import { ChevronDownIcon } from '@assets/icons'
import MLink from '@components/atoms/MLink'
import { usePrevious } from '@utils/usePrevious'
import cx from 'classnames'
import last from 'lodash/last'
import { useTranslation } from 'next-i18next'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import { AnimateHeight } from './AnimateHeight'

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
  dontShrink?: boolean
}

const BreadcrumbChild = ({
  crumb,
  noChevron = false,
  noLink = false,
  dontShrink = false,
  ariaLabel,
}: BreadcrumbChildProps) => {
  return (
    <div className={cx('flex gap-1 overflow-hidden', { 'shrink-0': dontShrink })}>
      {!noChevron && (
        <div className="shrink-0 -rotate-90 pt-[2px]">
          <ChevronDownIcon />
        </div>
      )}
      {noLink ? (
        <div className="truncate">{crumb.label}</div>
      ) : (
        <MLink
          href={crumb.path}
          noStyles
          aria-label={ariaLabel}
          className="truncate underline hover:text-white/100"
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
        dontShrink={index === 0}
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
          <div className="flex w-full flex-col pb-3 pt-2">
            <div className="flex w-full items-center justify-between overflow-hidden">
              {/* min-w-0 is used because:
              https://css-tricks.com/flexbox-truncated-text/#aa-the-solution-is-min-width-0-on-the-flex-child */}
              <div className="flex min-w-0 items-center gap-1">
                {/* first child */}
                {breadcrumbedChildren[0]}
                {/* dots, linkHref is ignored */}
                <BreadcrumbChild crumb={{ label: '…', path: '#' }} noLink dontShrink />
                {/* last child */}
                {last(breadcrumbedChildren)}
              </div>
              {/* TODO add aria attributes */}
              <button className="p-4" type="button" onClick={() => setOpen((o) => !o)}>
                {/*  h-6 is set to match the height of the preceding text */}
                <div
                  className={cx('flex h-6 transform items-center transition-transform', {
                    'rotate-180': isOpen,
                  })}
                >
                  <ChevronDownIcon />
                </div>
              </button>
            </div>
            {/* The negative margin is here because of the ChevronDownIcon button having too large padding. */}
            <AnimateHeight isVisible={isOpen} className="-mt-1">
              <div className="flex flex-col gap-2 px-3 pb-3">
                {breadcrumbedChildren.slice(1, -1).map((crumbedChild, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index}>{crumbedChild}</div>
                ))}
              </div>
            </AnimateHeight>
          </div>
        )}
      </div>

      {/* expanded breadcrumbs for calculation purposes */}
      <div
        ref={breadcrumbsExpandedRef}
        className={cx(
          'invisible absolute flex w-full select-none items-center gap-1 overflow-hidden',
        )}
      >
        {breadcrumbedChildren}
      </div>

      {/* expanded wrapping breadcrumbs for calculation purposes */}
      <div
        ref={breadcrumbsExpandedWrappingRef}
        className={cx(
          'invisible absolute flex w-full select-none flex-wrap items-center gap-1 overflow-hidden',
        )}
      >
        {breadcrumbedChildren}
      </div>
    </div>
  )
}

export default Breadcrumbs
