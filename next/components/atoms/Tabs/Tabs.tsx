import { ReactNode, useRef } from 'react'
import { useTabList } from 'react-aria'
import { TabListProps, useTabListState } from 'react-stately'

import { useTailwindBreakpoint } from '../../../hooks/useTailwindBreakpoint'
import { AnimateHeight } from '../AnimateHeight'
import Tab from './Tab'
import TabPanel from './TabPanel'

type TabItem = { title: string; content: ReactNode }

const Tabs = (props: TabListProps<TabItem>) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const state = useTabListState(props)
  const { isNull: isBreakpointNull } = useTailwindBreakpoint()
  const { tabListProps } = useTabList(
    { ...props, orientation: isBreakpointNull ? 'vertical' : 'horizontal' },
    state,
    ref,
  )

  return (
    <div className="flex flex-col gap-6 md:gap-11">
      <div className="flex flex-col gap-6 sm:flex-row" {...tabListProps} ref={ref}>
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </div>
      <AnimateHeight isVisible>
        <TabPanel key={state.selectedItem?.key} state={state} />
      </AnimateHeight>
    </div>
  )
}

export default Tabs
