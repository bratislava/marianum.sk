import cx from 'classnames'
import { ReactNode, useContext, useMemo } from 'react'

import { CtaButtonFragment } from '../../graphql'
import MLink from '../atoms/MLink'
import { BackgroundColor, sectionContext } from '../layouts/SectionsWrapper'

export type SectionProps = {
  children: ReactNode
  index?: number
  background?: BackgroundColor
  cardGrid?: boolean
  title?: string | null | undefined
  button?: CtaButtonFragment | null | undefined
  description?: string | null | undefined
}

const Section = ({
  children,
  background,
  index = 0,
  cardGrid = false,
  title,
  button,
  description,
}: SectionProps) => {
  const showMoreSlug = button?.page?.data?.attributes?.slug

  const { getBackground, getDivider, getLast, isContainer } = useContext(sectionContext)

  const resultBackground = useMemo(() => {
    return background ?? getBackground(index)
  }, [background, getBackground, index])

  const isDivider = useMemo(() => {
    return getDivider(index)
  }, [getDivider, index])

  const isLast = useMemo(() => {
    return getLast(index)
  }, [getLast, index])

  return (
    <div
      className={cx('relative', {
        'bg-background-beige': resultBackground === 'dark',
        'bg-white': resultBackground === 'light',
        'not-first:mt-6 not-first:md:mt-8': !isContainer,
      })}
    >
      {/* border displayed only when two last sections are same beige color */}
      {isDivider && <div className={cx('container mx-auto border-t border-border')} />}
      <div
        className={cx({
          'container mx-auto px-4 py-6 md:py-20': isContainer,
          'pb-20 md:pb-36': isLast,
        })}
      >
        {(title || showMoreSlug) && (
          <div className="flex">
            <h2 className="grow">{title}</h2>
            {showMoreSlug && (
              <MLink href={showMoreSlug} className="hidden md:inline-flex">
                {button.label}
              </MLink>
            )}
          </div>
        )}
        {description && (
          <div className="max-w-[744px] not-first:mt-3 not-first:md:mt-4">{description}</div>
        )}
        <div
          className={cx('not-first:mt-3 not-first:md:mt-10', {
            'grid gap-6 md:grid-cols-2 lg:grid-cols-4': cardGrid,
          })}
        >
          {children}
        </div>
        {showMoreSlug && (
          <div className="mt-4 text-center md:hidden">
            <MLink href={showMoreSlug}>{button.label}</MLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default Section
