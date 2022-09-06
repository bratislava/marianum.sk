import cx from 'classnames'
import { ReactNode, useContext, useMemo } from 'react'

import { CtaButtonFragment } from '../../graphql'
import MLink from '../atoms/MLink'
import { BackgroundColor, sectionContext } from '../layouts/SectionsWrapper'

export type SectionProps = {
  children: ReactNode
  index?: number
  isContainer?: boolean
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
  isContainer = false,
  cardGrid = false,
  title,
  button,
  description,
}: SectionProps) => {
  const { getBackground, getDivider, getLast } = useContext(sectionContext)

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
        {(title || button?.url) && (
          <div className="flex">
            <h2 className="grow">{title}</h2>
            {button?.url && (
              <MLink
                href={button.url}
                target={button.targetBlank ? '_blank' : '_self'}
                className="hidden md:inline-flex"
              >
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
        {button && button.url && (
          <div className="mt-4 text-center md:hidden">
            <MLink href={button.url} target={button.targetBlank ? '_blank' : '_self'}>
              {button.label}
            </MLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default Section
