import { RadioGroup } from '@headlessui/react'
import React, { ReactNode } from 'react'
import { mergeProps } from 'react-aria'

import RadioCircle from './RadioCircle'

const SimpleRadio = ({
  children,
  ...props
}: Parameters<typeof RadioGroup.Option>[0] & { children?: ReactNode }) => {
  return (
    <RadioGroup.Option {...mergeProps(props, { className: 'group' })}>
      {({ active, checked, disabled }) => (
        <div className="flex items-center space-x-[14px]">
          <RadioCircle checked={checked} disabled={disabled} active={active} />
          <RadioGroup.Label className="text-sm">{children}</RadioGroup.Label>
        </div>
      )}
    </RadioGroup.Option>
  )
}

export default SimpleRadio
