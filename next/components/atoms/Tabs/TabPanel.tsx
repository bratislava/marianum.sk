import { useRef } from 'react'
import { AriaTabPanelProps, useTabPanel } from 'react-aria'
import { TabListState } from 'react-stately'

export interface TabPanelProps extends AriaTabPanelProps {
  state: TabListState<unknown>
}

const TabPanel = ({ state, ...props }: TabPanelProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { tabPanelProps } = useTabPanel(props, state, ref)
  return (
    <div className="outline-none" {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  )
}

export default TabPanel
