import cx from 'classnames'
import { ReactNode } from 'react'

import { CtaButtonFragment } from '../../graphql'
import MLink from '../atoms/MLink'

export type SectionProps = {
  children: ReactNode
  fullWidth?: boolean
  color?: 'default' | 'white'
  cardGrid?: boolean
  title?: string | null | undefined
  button?: CtaButtonFragment | null | undefined
}

const Section = ({
  children,
  color = 'default',
  fullWidth = false,
  cardGrid = false,
  title,
  button,
}: SectionProps) => {
  return (
    <section
      className={cx('relative', {
        'py-6 md:py-20': fullWidth,
        'bg-white': color === 'white' && fullWidth,
      })}
    >
      <div
        className={cx({
          'container mx-auto px-4': fullWidth,
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
