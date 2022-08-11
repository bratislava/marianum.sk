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
  const boxClassName = ({ checked }: { checked: boolean }) =>
    cx(
      'group flex flex-col space-y-4 p-6',
      {
        'bg-white border border-border': !checked,
        /* bg-opacity-12 was in design, but I find it acceptable to use 10, as arbitrary values are not available for bg-opacity */
        'bg-primary bg-opacity-10 border border-primary': checked,
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
