import { Tab as HeadlessTab } from '@headlessui/react'
import { ReactNode, useContext, useEffect } from 'react'

import { tabsContext } from './Tabs'

export type TabProps = {
  label: string
  children?: ReactNode
}

const Tab = ({ label, children }: TabProps) => {
  const { mountTab, unmountTab } = useContext(tabsContext)

  useEffect(() => {
    mountTab(label)
    return () => unmountTab(label)
  }, [label, mountTab, unmountTab])

  return <HeadlessTab.Panel className="outline-none">{children}</HeadlessTab.Panel>
}

export default Tab
