import { ReactNode, useContext, useMemo } from 'react'

import MLink from '@/components/atoms/MLink'
import { BackgroundColor, sectionContext } from '@/components/layouts/SectionsWrapper'
import { useGetLinkProps } from '@/components/molecules/Navigation/NavigationProvider/useGetLinkProps'
import { CtaButtonFragment } from '@/graphql'
import cn from '@/utils/cn'
import { useActivateHeroSectionContentOverlay } from '@/utils/heroSectionContentOverlay'

export type SectionProps = {
  children: ReactNode
  background?: BackgroundColor
  cardGrid?: 'cards' | 'bundles' | 'serviceCards'
  title?: string | null | undefined
  /* use `button` for strapi sections with link to more content */
  button?: CtaButtonFragment | null | undefined
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

  const linkProps = getLinkProps(button)
  const { background, isDivider, isFirst, alternateBackground } = useContext(sectionContext)

  const resultBackground = useMemo(() => {
    return propBackground ?? background
  }, [propBackground, background])

  // Overlay should work only if the section is first.
  const shouldOverlayWithHero = overlayWithHero && isFirst
  useActivateHeroSectionContentOverlay(shouldOverlayWithHero)

  return (
    <div
      className={cn(
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
          <div className={cn('h-px bg-border', dividerClassName)} />
        </div>
      )}
      {/*
        For some unknown reason, the negative margin of the next <div> only works when its preceded with another div
        with non-zero height.
        TODO: Investigate and remove.
      */}
      {shouldOverlayWithHero && <div className="h-px" />}

      <div
        className={cn(
          {
            'container py-6 md:py-16': alternateBackground,
            'md:-mt-12 md:pt-0': shouldOverlayWithHero && alternateBackground,
          },
          innerClassName,
        )}
      >
        {(title || button) && (
          <div className="flex">
            <h2
              className={cn('grow md:text-left', {
                'text-center': centerTitleOnMobile,
                'text-h3': titleFontSize === 'h3',
              })}
            >
              {title}
            </h2>
            {button && (
              <MLink {...linkProps} className="hidden md:inline-flex">
                {linkProps.label}
              </MLink>
            )}
          </div>
        )}
        {description && (
          <div className="max-w-[744px] not-first:mt-3 not-first:md:mt-4">{description}</div>
        )}
        <div
          // Added `tabIndex` and `focus:outline-none` to prevent unwanted focus styles (only the individual items should be focusable)
          tabIndex={-1}
          className={cn(
            'focus:outline-none not-first:mt-3 not-first:md:mt-10',
            {
              // 'pb' and '-mb' is here to display shadow properly, otherwise the bottom shadow is cut off
              '-mb-6 grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-4': cardGrid === 'cards',
              '-mb-6 grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-3': cardGrid === 'bundles',
              '-mb-6 flex gap-6 overflow-x-auto pb-6 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4':
                cardGrid === 'serviceCards',
              // Since the wrapper already has a top margin, we subtract the top padding from it to prevent focus rings from being cropped
              '-mx-2 px-2 not-first:mt-1 not-first:pt-2 not-first:md:mt-8':
                cardGrid === 'cards' || cardGrid === 'serviceCards',
            },
            childrenWrapperClassName,
          )}
        >
          {children}
        </div>
        {button && (
          <div className="mt-4 text-center md:hidden">
            <MLink {...linkProps}>{linkProps.label}</MLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default Section
