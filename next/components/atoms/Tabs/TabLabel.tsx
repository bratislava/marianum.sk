import { Node } from '@react-types/shared'
import cx from 'classnames'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useTab } from 'react-aria'
import { TabListState } from 'react-stately'

type TabLabelProps<T> = {
  item: Node<T>
  state: TabListState<unknown>
  setSessionTabKey: Dispatch<SetStateAction<string>>
}

const TabLabel = <T,>({ item, state, setSessionTabKey }: TabLabelProps<T>) => {
  const { key, rendered } = item
  const ref = useRef<HTMLDivElement | null>(null)
  const { tabProps, isSelected } = useTab({ key }, state, ref)

  const handleTabLabelClick = () => {
    setSessionTabKey(key.toString())
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="flex-1 cursor-pointer outline-none focus:outline-2 focus:outline-primary"
      {...tabProps}
      ref={ref}
      onClick={handleTabLabelClick}
    >
      <div
        className={cx(
          'relative flex h-full items-center justify-center px-8 pb-[14px] pt-4 text-center xl:px-16',
          {
            'border border-border bg-background-beige px-6 py-5 text-[18px] font-bold': !isSelected,
            'border border-primary bg-primary px-6 py-5 text-[18px] font-bold text-white':
              isSelected,
          },
        )}
      >
        <h3 className="text-h6 text-current">{rendered}</h3>
        {isSelected && (
          <div className="absolute -bottom-3 hidden h-6 w-6 rotate-[-39deg] skew-x-12 bg-primary sm:block" />
        )}
      </div>
    </div>
  )
}

export default TabLabel
