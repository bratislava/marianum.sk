import { InfoIcon } from '@assets/icons'
import Tooltip from '@components/atoms/Tooltip'
import { RadioGroup } from '@headlessui/react'
import cx from 'classnames'
import React, { PropsWithChildren, ReactNode } from 'react'

import RadioCircle from './RadioCircle'

const RadioBox = ({
  children,
  className,
  tooltip,
  ...props
}: Parameters<typeof RadioGroup.Option>[0] &
  PropsWithChildren<{ className?: string; tooltip?: ReactNode }>) => {
  const boxClassName = ({ checked, disabled }: { checked: boolean; disabled: boolean }) =>
    cx(
      'group flex flex-col space-y-4 p-6',
      {
        'border border-border bg-white': !checked,
        'border border-primary bg-primary bg-opacity-12': checked,
        'cursor-pointer': !disabled,
      },
      className,
    )

  return (
    <RadioGroup.Option {...props} className={boxClassName}>
      {({ active, checked, disabled }) => (
        <>
          <RadioCircle checked={checked} disabled={disabled} active={active} />
          <RadioGroup.Label className="text-h6 font-bold">{children}</RadioGroup.Label>
          {tooltip ? (
            // `popoverClassname` calculations offsets the tooltip icon to the info icon and makes it wider to balance the offset.
            <Tooltip tooltip={tooltip} popoverClassname="w-[calc(100%+theme(space.6))] -ml-3">
              <InfoIcon className="text-primary" />
            </Tooltip>
          ) : null}
        </>
      )}
    </RadioGroup.Option>
  )
}

export default RadioBox
