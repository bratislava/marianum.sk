import { RadioGroup } from '@headlessui/react'
import cx from 'classnames'
import React, { ReactNode } from 'react'

import RadioCircle from './RadioCircle'

/**
 * TODO: Add tooltip when available.
 */
const RadioBox = ({
  children,
  className,
  ...props
}: Parameters<typeof RadioGroup.Option>[0] & { className?: string; children?: ReactNode }) => {
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
        </>
      )}
    </RadioGroup.Option>
  )
}

export default RadioBox
