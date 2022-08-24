import { Disclosure } from '@headlessui/react'
import cx from 'classnames'
import { ReactNode } from 'react'

import ChevronDown from '../../../assets/chevron_down.svg'

export type AccordionItemProps = {
  title: string | null | undefined
  children?: ReactNode
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  return (
    <Disclosure>
      {({ open }) => {
        return (
          <div className="flex w-full flex-col border border-border bg-white">
            <Disclosure.Button className="flex w-full justify-between gap-4 p-4 text-left text-h5 font-bold sm:p-5 md:p-6">
              <div
                className={cx('overflow-hidden text-ellipsis py-[3px]', {
                  truncate: !open,
                })}
              >
                {title}
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white">
                <ChevronDown
                  className={cx('transform text-primary transition-transform', {
                    'rotate-180': open,
                  })}
                />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="w-full px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6">
              {children}
            </Disclosure.Panel>
          </div>
        )
      }}
    </Disclosure>
  )
}

export default AccordionItem
