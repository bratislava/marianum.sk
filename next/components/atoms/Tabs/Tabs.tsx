import { useTailwindBreakpoint } from '@utils'
import { useEffect, useRef } from 'react'
import { useTabList } from 'react-aria'
import { TabListProps, useTabListState } from 'react-stately'
import { useSessionStorage } from 'usehooks-ts'

import { AnimateHeight } from '../AnimateHeight'
import TabLabel from './TabLabel'
import TabPanel from './TabPanel'

const Tabs = <T extends object>(props: TabListProps<T>) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const state = useTabListState<T>(props)
  const { isNull: isBreakpointNull } = useTailwindBreakpoint()
  const { tabListProps } = useTabList(
    { ...props, orientation: isBreakpointNull ? 'vertical' : 'horizontal' },
    state,
    ref,
  )

  const [sessionTabKey, setSessionTabKey] = useSessionStorage<string>(
    'marianum-decease-place-tabs',
    '',
  )

  useEffect(() => {
    if (sessionTabKey) {
      state.setSelectedKey(sessionTabKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-6 md:gap-11">
      <div className="flex flex-col gap-6 sm:flex-row" {...tabListProps} ref={ref}>
        {[...state.collection].map((item) => (
          <TabLabel key={item.key} item={item} state={state} setSessionTabKey={setSessionTabKey} />
        ))}
      </div>
      <AnimateHeight isVisible>
        <TabPanel key={state.selectedItem?.key} state={state} />
      </AnimateHeight>
    </div>
  )
}

export default Tabs
