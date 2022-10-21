import { Tab } from '@headlessui/react'
import cx from 'classnames'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

import { useTailwindBreakpoint } from '../../../hooks/useTailwindBreakpoint'
import { AnimateHeight } from '../AnimateHeight'

// Context provide us ability to write tab in one component instead of separating it to tab and panel

export type TabsContext = {
  mountTab: (tabLabel: string) => void
  unmountTab: (tabLabel: string) => void
}

export const tabsContext = createContext<TabsContext>({
  mountTab: () => {},
  unmountTab: () => {},
})

export type TabsProps = {
  children: ReactNode
}

const Tabs = ({ children }: TabsProps) => {
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
    return { mountTab, unmountTab }
  }, [mountTab, unmountTab])

  const { isNull: isBreakpointNull } = useTailwindBreakpoint()

  return (
    <tabsContext.Provider value={tabsContextValue}>
      <Tab.Group
        vertical={isBreakpointNull}
        manual
        as="div"
        className="flex flex-col gap-6 md:gap-11"
      >
        <Tab.List className="flex flex-col gap-6 sm:flex-row">
          {tabLabels.map((label, index) => (
            <Tab
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="flex-1 outline-none focus:outline-2 focus:outline-primary"
            >
              {({ selected }) => (
                <div
                  className={cx(
                    'relative flex h-full items-center justify-center px-8 pt-4 pb-[14px]',
                    {
                      // unselected big
                      'border border-border bg-background-beige px-6 py-5 text-[18px] font-bold':
                        !selected,
                      // selected big
                      'border border-primary bg-primary px-6 py-5 text-[18px] font-bold text-white':
                        selected,
                    },
                  )}
                >
                  <h3 className="text-h6 text-current">{label}</h3>
                  {selected && (
                    <div className="absolute -bottom-3 hidden h-6 w-6 rotate-[-39deg] skew-x-12 bg-primary sm:block" />
                  )}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <AnimateHeight isVisible>
          <Tab.Panels className="outline-none">{children}</Tab.Panels>
        </AnimateHeight>
      </Tab.Group>
    </tabsContext.Provider>
  )
}

export default Tabs
