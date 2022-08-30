import cx from 'classnames'
import { ReactNode } from 'react'

import { CtaButtonFragment } from '../../graphql'
import MLink from '../atoms/MLink'

export type SectionProps = {
  children: ReactNode
  isContainer?: boolean
  color?: 'default' | 'white'
  cardGrid?: boolean
  title?: string | null | undefined
  button?: CtaButtonFragment | null | undefined
}

const Section = ({
  children,
  color,
  isContainer = false,
  cardGrid = false,
  title,
  button,
}: SectionProps) => {
  return (
    <section
      className={cx('group relative', {
        'odd:bg-white even:bg-background-beige last-of-type:bg-background-beige': !color,
        'bg-white': color === 'white',
      })}
    >
      {/* border displayed only when two last sections are same beige color */}
      <div className="container mx-auto group-even:hidden group-last-of-type:border-t group-last-of-type:border-border" />
      <div
        className={cx('', {
          'container mx-auto px-4 py-6 group-last-of-type:pb-20 md:py-20 md:group-last-of-type:pb-36':
            isContainer,
        })}
      >
        {(title || button?.url) && (
          <div className="flex pb-3 md:pb-10">
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
        <div className={cx({ 'grid gap-6 md:grid-cols-2 lg:grid-cols-4': cardGrid })}>
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
    </section>
  )
}

export default Section
