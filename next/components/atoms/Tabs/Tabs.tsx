import { useEffect, useRef } from 'react'
import { useTabList } from 'react-aria'
import { TabListProps, useTabListState } from 'react-stately'
import { useSessionStorage } from 'usehooks-ts'

import { AnimateHeight } from '@/components/atoms/AnimateHeight'
import { useTailwindBreakpoint } from '@/utils/useTailwindBreakpoint'

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
      <AnimateHeight
        isVisible
        // To prevent focus rings on elements within BundleListingSection and HomepageProceduresSection from being cut off
        className="flex-1 overflow-visible"
      >
        <TabPanel key={state.selectedItem?.key} state={state} />
      </AnimateHeight>
    </div>
  )
}

export default Tabs
