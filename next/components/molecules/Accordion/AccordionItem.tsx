import { ChevronDownIcon } from '@assets/icons'
import { Disclosure } from '@headlessui/react'
import cx from 'classnames'
import { ReactNode } from 'react'

import { AnimateHeight } from '../../atoms/AnimateHeight'

export type AccordionItemProps = {
  title: string | null | undefined | ReactNode
  additionalInfo?: ReactNode
  children?: ReactNode
  noBorder?: boolean
}

const AccordionItem = ({
  title,
  additionalInfo,
  children,
  noBorder = false,
}: AccordionItemProps) => {
  return (
    <Disclosure>
      {({ open }) => {
        return (
          <div
            className={cx('flex w-full flex-col bg-white', { 'border border-border': !noBorder })}
          >
            <Disclosure.Button
              className={cx('flex justify-between gap-4 text-left text-h5 ', {
                'p-4 sm:p-5 md:p-6': !noBorder,
              })}
            >
              <div className="py-[3px] font-bold">{title}</div>
              {additionalInfo && <div className="pr-6">{additionalInfo}</div>}
              <div
                className={cx(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white',
                  { 'border border-border': !noBorder },
                )}
              >
                <ChevronDownIcon
                  className={cx('transform text-primary transition-transform', {
                    'rotate-180': open,
                  })}
                />
              </div>
            </Disclosure.Button>
            <AnimateHeight isVisible={open}>
              <Disclosure.Panel
                static
                className={cx('w-full ', {
                  'px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6': !noBorder,
                  'pt-4 sm:pt-5 md:pt-6': noBorder,
                })}
              >
                {children}
              </Disclosure.Panel>
            </AnimateHeight>
          </div>
        )
      }}
    </Disclosure>
  )
}

export default AccordionItem
