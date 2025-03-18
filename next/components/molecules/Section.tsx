import cx from 'classnames'
import { ReactNode, useContext, useMemo } from 'react'

import MLink from '@/components/atoms/MLink'
import { BackgroundColor, sectionContext } from '@/components/layouts/SectionsWrapper'
import { useGetLinkProps } from '@/components/molecules/Navigation/NavigationProvider/useGetLinkProps'
import { CtaButtonFragment } from '@/graphql'
import { useActivateHeroSectionContentOverlay } from '@/utils/heroSectionContentOverlay'

export type SectionProps = {
  children: ReactNode
  background?: BackgroundColor
  cardGrid?: 'cards' | 'bundles' | 'serviceCards'
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
  titleFontSize?: 'h2' | 'h3'
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
  titleFontSize,
}: SectionProps) => {
  const { getLinkProps } = useGetLinkProps()

  const showMore = getLinkProps(button)
  const showMorePath = showMore.href === '#' ? buttonLink?.linkHref : showMore.href
  const showMoreLabel = showMore.label ?? buttonLink?.label

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
            <h2
              className={cx('grow md:text-left', {
                'text-center': centerTitleOnMobile,
                'text-h3': titleFontSize === 'h3',
              })}
            >
              {title}
            </h2>
            {showMorePath && (
              <MLink href={showMorePath} target={showMore.target} className="hidden md:inline-flex">
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
            // 'pb' and '-mb' is here to display shadow properly, otherwise the bottom shadow is cut off
            {
              '-mb-6 grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-4': cardGrid === 'cards',
              '-mb-6 grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-3': cardGrid === 'bundles',
              '-mb-6 flex gap-6 overflow-x-auto pb-6 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4':
                cardGrid === 'serviceCards',
            },
            childrenWrapperClassName,
          )}
        >
          {children}
        </div>
        {showMorePath && (
          <div className="mt-4 text-center md:hidden">
            <MLink href={showMorePath} target={showMore.target}>
              {showMoreLabel}
            </MLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default Section
