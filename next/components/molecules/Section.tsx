import cx from 'classnames'
import React, { ReactNode } from 'react'

export type SectionProps = {
  children: ReactNode
  fullWidth?: boolean
  color?: 'default' | 'white'
  cardGrid?: boolean
  title?: string | null | undefined
}

const Section = ({
  children,
  color = 'default',
  fullWidth = false,
  cardGrid = false,
  title,
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
        {title && <h2 className="pb-3 sm:pb-6">{title}</h2>}
        <div
          className={cx({ 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': cardGrid })}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

export default Section
