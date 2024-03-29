import { ReactNode } from 'react'
import { Item } from 'react-stately'

export type TabProps = {
  key: string | number
  title: string
  children: ReactNode
}

const TabItem = Item

export default TabItem
