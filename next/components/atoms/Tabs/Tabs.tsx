import { Tab } from '@headlessui/react'
import cx from 'classnames'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

import { useTailwindBreakpoint } from '../../../hooks/useTailwindBreakpoint'

// Why context for this?
// If you look at HeadlessUI docs for Tabs component (https://headlessui.com/react/tabs)
// at basic example, you can see that each tab is separated into List and Panel.
// I just don't like it that way so the whole context and mount/unmount concept
// is here to make us able to write it prettier :)

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
  children: ReactNode
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

  const { isNull: isBreakpointNull } = useTailwindBreakpoint()

  const isVertical = useMemo(() => {
    return isBreakpointNull
  }, [isBreakpointNull])

  return (
    <tabsContext.Provider value={tabsContextValue}>
      <Tab.Group vertical={isVertical} manual as="div" className="flex flex-col">
        <Tab.List className={cx('flex gap-6', { 'flex-col sm:flex-row': areBig })}>
          {tabLabels.map((label, index) => (
            <Tab
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cx('flex-1 outline-none', {
                'focus:bg-primary focus:bg-opacity-10': !areWhite && !areBig,
                'focus:bg-white focus:bg-opacity-10': areWhite && !areBig,
                'focus:outline-2 focus:outline-primary': areBig && !areWhite,
              })}
            >
              {({ selected }) => (
                <div
                  className={cx(
                    'relative flex h-full items-center justify-center px-8 pt-4 pb-[14px]',
                    {
                      // unselected white
                      'border-b-2 border-white border-opacity-0 font-semibold text-white text-opacity-72 hover:text-opacity-100':
                        !selected && areWhite,
                      // selected white
                      'border-b-2 border-white border-opacity-100 font-semibold text-white text-opacity-100':
                        selected && areWhite,
                      // unselected big
                      'border border-border bg-background-beige px-6 py-5 text-[18px] font-bold':
                        !selected && areBig && !areWhite,
                      // selected big
                      'border border-primary bg-primary px-6 py-5 text-[18px] font-bold text-white':
                        selected && areBig && !areWhite,
                      // unselected default
                      'border-b-2 border-border font-semibold hover:text-primary':
                        !selected && !areWhite && !areBig,
                      // selected default
                      'border-b-2 border-primary font-semibold text-primary':
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
        <Tab.Panels className="mt-6 outline-none md:mt-11">{children}</Tab.Panels>
      </Tab.Group>
    </tabsContext.Provider>
  )
}

export default Tabs
