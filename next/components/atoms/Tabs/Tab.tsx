import { Tab as HeadlessTab } from '@headlessui/react'
import cx from 'classnames'
import { ReactNode, useContext, useEffect } from 'react'

import { tabsContext } from './Tabs'

export type TabProps = {
  label: string
  children?: ReactNode
}

const Tab = ({ label, children }: TabProps) => {
  const { mountTab, unmountTab, areWhite: isWhite } = useContext(tabsContext)

  useEffect(() => {
    mountTab(label)
    return () => unmountTab(label)
  }, [label, mountTab, unmountTab])

  return (
    <HeadlessTab.Panel className={cx('outline-none', { 'text-white': isWhite })}>
      {children}
    </HeadlessTab.Panel>
  )
}

export default Tab
