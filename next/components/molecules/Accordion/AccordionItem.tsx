import cx from 'classnames'
import { ReactNode, useContext } from 'react'

import { ChevronDownIcon } from '@/assets/icons'
import { AnimateHeight } from '@/components/atoms/AnimateHeight'
import { sectionContext } from '@/components/layouts/SectionsWrapper'

export type AccordionItemProps = {
  title: string | null | undefined | ReactNode
  additionalInfo?: ReactNode
  children?: ReactNode
  border?: boolean
  noBoxStyles?: boolean
}

/**
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/lib/Accordion/Accordion.tsx
 */

const AccordionItem = ({
  title,
  additionalInfo,
  children,
  border,
  noBoxStyles = false,
}: AccordionItemProps) => {
  const { border: contextBorder } = useContext(sectionContext)

  return (
    <AnimateHeight
      isVisible
      className="focus-within:[z-1] relative ring-offset-2 transition focus-within:[&:has(:focus-visible)]:ring"
    >
      <div>
        <details
          className={cx('group flex w-full flex-col bg-white', {
            'border border-border': (border ?? contextBorder) && !noBoxStyles,
          })}
        >
          <summary
            className={cx(
              'flex cursor-pointer justify-between gap-4 text-left text-h5 focus:outline-none',
              { 'p-4 sm:p-5 md:p-6': !noBoxStyles },
            )}
          >
            <h3 className="py-[3px] text-h5">{title}</h3>
            {additionalInfo && <div className="pr-6">{additionalInfo}</div>}
            <div
              className={cx(
                'flex size-8 shrink-0 items-center justify-center rounded-full bg-white',
                { 'border border-border': !noBoxStyles },
              )}
            >
              <ChevronDownIcon
                aria-hidden
                className="text-primary transition-transform group-open:rotate-180"
              />
            </div>
          </summary>

          <div
            className={cx('w-full', {
              'px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6': !noBoxStyles,
              'pt-4 sm:pt-5 md:pt-6': noBoxStyles,
            })}
          >
            {children}
          </div>
        </details>
      </div>
    </AnimateHeight>
  )
}

export default AccordionItem
