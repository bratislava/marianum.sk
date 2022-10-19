import { Disclosure } from '@headlessui/react'
import cx from 'classnames'
import { ReactNode } from 'react'

import ChevronDown from '../../../assets/chevron_down.svg'
import { AnimateHeight } from '../../atoms/AnimateHeight'

export type AccordionItemProps = {
  title: string | null | undefined
  additionalInfo?: ReactNode
  children?: ReactNode
}

const AccordionItem = ({ title, additionalInfo, children }: AccordionItemProps) => {
  return (
    <Disclosure>
      {({ open }) => {
        return (
          <div className="flex w-full flex-col border border-border bg-white">
            <Disclosure.Button className="flex justify-between gap-4 p-4 text-left text-h5 sm:p-5 md:p-6">
              <div className="py-[3px] font-bold">{title}</div>
              {additionalInfo && <div className="pr-6">{additionalInfo}</div>}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white">
                <ChevronDown
                  className={cx('transform text-primary transition-transform', {
                    'rotate-180': open,
                  })}
                />
              </div>
            </Disclosure.Button>
            <AnimateHeight isVisible={open}>
              <Disclosure.Panel static className="w-full px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6">
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
