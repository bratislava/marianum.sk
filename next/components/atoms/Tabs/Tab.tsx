import { Node } from '@react-types/shared'
import cx from 'classnames'
import { ReactNode, useRef } from 'react'
import { useTab } from 'react-aria'
import { TabListState } from 'react-stately'

export type TabProps = {
  item: Node<{
    title: string
    content: ReactNode
  }>
  state: TabListState<unknown>
}

const Tab = ({ item, state }: TabProps) => {
  const { key, rendered } = item
  const ref = useRef<HTMLDivElement | null>(null)
  const { tabProps, isSelected } = useTab({ key }, state, ref)
  return (
    <div
      className="flex-1 outline-none focus:outline-2 focus:outline-primary"
      {...tabProps}
      ref={ref}
    >
      <div
        className={cx('relative flex h-full items-center justify-center px-8 pt-4 pb-[14px]', {
          'border border-border bg-background-beige px-6 py-5 text-[18px] font-bold': !isSelected,
          'border border-primary bg-primary px-6 py-5 text-[18px] font-bold text-white': isSelected,
        })}
      >
        <h3 className="text-h6 text-current">{rendered}</h3>
        {isSelected && (
          <div className="absolute -bottom-3 hidden h-6 w-6 rotate-[-39deg] skew-x-12 bg-primary sm:block" />
        )}
      </div>
    </div>
  )
}

export default Tab
