import { Tab } from '@headlessui/react'
import cx from 'classnames'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

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

export type TabsProps = {
  children: ReactNode[]
  areWhite?: boolean
}

const Tabs = ({ children, areWhite = false }: TabsProps) => {
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

  return (
    <tabsContext.Provider value={tabsContextValue}>
      <Tab.Group manual as="div" className="flex flex-col">
        <Tab.List className="flex gap-4">
          {tabLabels.map((label, index) => (
            <Tab
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cx('outline-none', {
                'focus:bg-primary focus:bg-opacity-10': !areWhite,
                'focus:bg-white focus:bg-opacity-10': areWhite,
              })}
            >
              {({ selected }) => (
                <div
                  className={cx('border-b-2 pt-4 px-8 pb-[14px] font-semibold', {
                    'text-white text-opacity-72 border-white border-opacity-0 hover:text-opacity-100':
                      !selected && areWhite,
                    'text-white text-opacity-100 border-white border-opacity-100':
                      selected && areWhite,
                    'border-border hover:text-primary': !selected && !areWhite,
                    'border-primary text-primary': selected && !areWhite,
                  })}
                >
                  {label}
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
