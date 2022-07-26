import { Tab } from '@headlessui/react'
import cx from 'classnames'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

export type TabsContext = {
  mountTab: (tabLabel: string) => void
  unmountTab: (tabLabel: string) => void
}

export const tabsContext = createContext<TabsContext>({
  mountTab: () => {},
  unmountTab: () => {},
})

export type TabsProps = {
  children: ReactNode[]
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

  const tabsContextValue = useMemo(() => {
    return { mountTab, unmountTab }
  }, [mountTab, unmountTab])

  return (
    <tabsContext.Provider value={tabsContextValue}>
      <Tab.Group manual as="div" className="flex flex-col">
        <Tab.List className="flex">
          {tabLabels.map((label, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tab key={index}>
              {({ selected }) => (
                <div className={cx('border-b', { 'border-primary text-primary': selected })}>
                  {label}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>{children}</Tab.Panels>
      </Tab.Group>
    </tabsContext.Provider>
  )
}

export default Tabs
