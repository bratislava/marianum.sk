import cx from 'classnames'

import { AnimateHeight } from '@/components/atoms/AnimateHeight'

const ChecklistRadio = () => {
  return (
    <div
      className={cx(
        'relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-gray',
      )}
    />
  )
}

type ChecklistLineWithRadioProps = {
  hideTopLine?: boolean
  hideBottomLine?: boolean
}

const ChecklistLineWithRadio = ({
  hideTopLine = false,
  hideBottomLine = false,
}: ChecklistLineWithRadioProps) => {
  return (
    <div className="hidden flex-col items-center gap-2 sm:flex">
      <div className={cx('-mt-6 h-10 w-[2px] bg-gray', { invisible: hideTopLine })} />
      <ChecklistRadio />
      <div className={cx('h-full w-[2px] flex-1 bg-gray', { invisible: hideBottomLine })} />
    </div>
  )
}

const ChecklistSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {Array.from({ length: 6 }, (_item, index) => (
        <div className="flex gap-10" key={index}>
          <ChecklistLineWithRadio hideTopLine={index === 0} hideBottomLine={index + 1 === 6} />
          <div
            className={cx(
              'flex w-full flex-col border border-border bg-white outline-offset-2 outline-primary focus:outline-2',
            )}
          >
            {/* item title */}
            <div className="flex items-center p-6">
              <div className="h-6 w-32 rounded bg-gray" />
            </div>
            <AnimateHeight isVisible={index === 0}>
              <div className="flex w-full flex-col gap-6 px-6 pb-6">
                {/* item description */}
                <div className="mt-4 flex flex-col gap-3">
                  <div className="h-4 w-full rounded bg-gray" />
                  <div className="h-4 w-full rounded bg-gray" />
                  <div className="h-4 w-1/3 rounded bg-gray" />
                </div>
              </div>
            </AnimateHeight>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChecklistSkeleton
