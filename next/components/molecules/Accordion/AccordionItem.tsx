import { ChevronDownIcon } from '@assets/icons'
import { AnimateHeight } from '@components/atoms/AnimateHeight'
import { sectionContext } from '@components/layouts/SectionsWrapper'
import { Disclosure } from '@headlessui/react'
import cx from 'classnames'
import { ReactNode, useContext } from 'react'

export type AccordionItemProps = {
  title: string | null | undefined | ReactNode
  additionalInfo?: ReactNode
  children?: ReactNode
  border?: boolean
  noBoxStyles?: boolean
}

const AccordionItem = ({
  title,
  additionalInfo,
  children,
  border,
  noBoxStyles = false,
}: AccordionItemProps) => {
  const { border: contextBorder } = useContext(sectionContext)

  return (
    <Disclosure>
      {({ open }) => {
        return (
          <div
            className={cx('flex w-full flex-col bg-white', {
              'border border-border': (border ?? contextBorder) && !noBoxStyles,
            })}
          >
            <Disclosure.Button
              className={cx('flex justify-between gap-4 text-left text-h5', {
                'p-4 sm:p-5 md:p-6': !noBoxStyles,
              })}
            >
              <h3 className="py-[3px] text-h5">{title}</h3>
              {additionalInfo && <div className="pr-6">{additionalInfo}</div>}
              <div
                className={cx(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white',
                  { 'border border-border': !noBoxStyles },
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
                className={cx('w-full', {
                  'px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6': !noBoxStyles,
                  'pt-4 sm:pt-5 md:pt-6': noBoxStyles,
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
