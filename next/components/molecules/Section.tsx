import cx from 'classnames'
import { ReactNode, useContext, useMemo } from 'react'

import { CtaButtonFragment } from '../../graphql'
import { useActivateHeroSectionContentOverlay } from '../../utils/heroSectionContentOverlay'
import MLink from '../atoms/MLink'
import { BackgroundColor, sectionContext } from '../layouts/SectionsWrapper'
import { useGetFullPath } from './Navigation/NavigationProvider/useGetFullPath'

export type SectionProps = {
  children: ReactNode
  background?: BackgroundColor
  cardGrid?: 'cards' | 'bundles'
  title?: string | null | undefined
  /* use `button` for strapi sections with link to more content */
  button?: CtaButtonFragment | null | undefined
  /* use `buttonLink` for hardcoded link to more content */
  buttonLink?: { label: string; linkHref: string | null }
  description?: string | null | undefined
  className?: string
  innerClassName?: string
  childrenWrapperClassName?: string
  dividerClassName?: string
  overlayWithHero?: boolean
  centerTitleOnMobile?: boolean
}

const Section = ({
  children,
  background: propBackground,
  cardGrid,
  title,
  button,
  buttonLink,
  description,
  className,
  innerClassName,
  childrenWrapperClassName,
  dividerClassName,
  overlayWithHero = false,
  centerTitleOnMobile = true,
}: SectionProps) => {
  const { getFullPath } = useGetFullPath()

  const showMorePath = getFullPath(button?.page?.data) ?? buttonLink?.linkHref
  const showMoreLabel = button?.label ?? buttonLink?.label

  const { background, isDivider, isFirst, alternateBackground } = useContext(sectionContext)

  const resultBackground = useMemo(() => {
    return propBackground ?? background
  }, [propBackground, background])

  // Overlay should work only if the section is first.
  const shouldOverlayWithHero = overlayWithHero && isFirst
  useActivateHeroSectionContentOverlay(shouldOverlayWithHero)

  return (
    <div
      className={cx(
        'relative',
        {
          'bg-background-beige': resultBackground === 'dark',
          'bg-white': resultBackground === 'light',
          'not-first:mt-6 not-first:md:mt-8': !alternateBackground,
        },
        className,
      )}
    >
      {/* border displayed only when two last sections are same beige color */}

      {isDivider && (
        <div className="container">
          <div className={cx('h-px bg-border', dividerClassName)} />
        </div>
      )}
      {/*
        For some unknown reason, the negative margin of the next <div> only works when its preceded with another div
        with non-zero height.
        TODO: Investigate and remove.
      */}
      {shouldOverlayWithHero && <div className="h-px" />}

      <div
        className={cx(
          {
            'container py-6 md:py-16': alternateBackground,
            'md:-mt-12 md:pt-0': shouldOverlayWithHero && alternateBackground,
          },
          innerClassName,
        )}
      >
        {(title || showMorePath) && (
          <div className="flex">
            <h2 className={cx('grow md:text-left', { 'text-center': centerTitleOnMobile })}>
              {title}
            </h2>
            {showMorePath && (
              <MLink href={showMorePath} className="hidden md:inline-flex">
                {showMoreLabel}
              </MLink>
            )}
          </div>
        )}
        {description && (
          <div className="max-w-[744px] not-first:mt-3 not-first:md:mt-4">{description}</div>
        )}
        <div
          className={cx(
            'not-first:mt-3 not-first:md:mt-10',
            {
              'grid gap-6 md:grid-cols-2 lg:grid-cols-4': cardGrid === 'cards',
              'grid gap-6 md:grid-cols-2 lg:grid-cols-3': cardGrid === 'bundles',
            },
            childrenWrapperClassName,
          )}
        >
          {children}
        </div>
        {showMorePath && (
          <div className="mt-4 text-center md:hidden">
            <MLink href={showMorePath}>{showMoreLabel}</MLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default Section
