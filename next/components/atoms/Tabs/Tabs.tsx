import { Tab } from '@headlessui/react'
import cx from 'classnames'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

import { useTailwindBreakpoint } from '../../../hooks/useTailwindBreakpoint'

export type TabsContext = {
  mountTab: (tabLabel: string) => void
  unmountTab: (tabLabel: string) => void
  areWhite: boolean
}

export const tabsContext = createContext<TabsContext>({
  mountTab: () => {},
  unmountTab: () => {},
  areWhite: false,
})

type WhiteOrBigConditionalProps =
  | {
      areWhite?: boolean
      areBig?: never
    }
  | {
      areWhite?: never
      areBig?: boolean
    }

export type TabsProps = WhiteOrBigConditionalProps & {
  children: ReactNode[]
}

const Tabs = ({ children, areWhite = false, areBig = false }: TabsProps) => {
  const [tabLabels, setTabLabels] = useState<string[]>([])

  const mountTab = useCallback((tabLabel: string) => {
    setTabLabels((currentTabLabels) => {
      const foundTabLabel = currentTabLabels.find((l) => l === tabLabel)
      if (!foundTabLabel) {
        return [...currentTabLabels, tabLabel]
      }
      return currentTabLabels
    })
  }, [])

  const unmountTab = useCallback((tabLabel: string) => {
    setTabLabels((currentTabLabels) => {
      const foundTabLabelIndex = currentTabLabels.indexOf(tabLabel)
      if (foundTabLabelIndex) {
        currentTabLabels.splice(foundTabLabelIndex, 1)
      }
      return currentTabLabels
    })
  }, [])

  const tabsContextValue: TabsContext = useMemo(() => {
    return { mountTab, unmountTab, areWhite }
  }, [mountTab, unmountTab, areWhite])

  const breakpoint = useTailwindBreakpoint()

  const isVertical = useMemo(() => {
    return breakpoint === null
  }, [breakpoint])

  return (
    <tabsContext.Provider value={tabsContextValue}>
      <Tab.Group vertical={isVertical} manual as="div" className="flex flex-col">
        <Tab.List className={cx('flex gap-4', { 'flex-col sm:flex-row': areBig })}>
          {tabLabels.map((label, index) => (
            <Tab
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cx('outline-none flex-1', {
                'focus:bg-primary focus:bg-opacity-10': !areWhite && !areBig,
                'focus:bg-white focus:bg-opacity-10': areWhite && !areBig,
                'focus:outline-2 focus:outline-primary': areBig && !areWhite,
              })}
            >
              {({ selected }) => (
                <div
                  className={cx(
                    'relative flex h-full items-center justify-center pt-4 px-8 pb-[14px]',
                    {
                      // unselected white
                      'border-b-2 font-semibold text-white text-opacity-72 border-white border-opacity-0 hover:text-opacity-100':
                        !selected && areWhite,
                      // selected white
                      'border-b-2 font-semibold text-white text-opacity-100 border-white border-opacity-100':
                        selected && areWhite,
                      // unselected big
                      'px-6 py-5 font-bold text-[18px] border border-border':
                        !selected && areBig && !areWhite,
                      // selected big
                      'px-6 py-5 font-bold text-[18px] border bg-primary text-white border-primary':
                        selected && areBig && !areWhite,
                      // unselected default
                      'border-b-2 font-semibold border-border hover:text-primary':
                        !selected && !areWhite && !areBig,
                      // selected default
                      'border-b-2 font-semibold border-primary text-primary':
                        selected && !areWhite && !areBig,
                    },
                  )}
                >
                  {label}
                  {selected && areBig && (
                    <div className="absolute -bottom-3 hidden h-6 w-6 rotate-[-39deg] skew-x-12 bg-primary sm:block" />
                  )}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="outline-none">{children}</Tab.Panels>
      </Tab.Group>
    </tabsContext.Provider>
  )
}

export default Tabs
