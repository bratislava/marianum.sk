import { RadioGroup } from '@headlessui/react'
import cx from 'classnames'
import React, { ReactNode } from 'react'
import { mergeProps } from 'react-aria'

import RadioCircle from './RadioCircle'

const RadioSimple = ({
  children,
  ...props
}: Parameters<typeof RadioGroup.Option>[0] & { children?: ReactNode }) => {
  return (
    <RadioGroup.Option {...mergeProps(props, { className: 'group' })}>
      {({ active, checked, disabled }) => (
        <div className={cx('flex items-center space-x-[14px]', { 'cursor-pointer': !disabled })}>
          <RadioCircle checked={checked} disabled={disabled} active={active} />
          <RadioGroup.Label className="cursor-pointer text-sm">{children}</RadioGroup.Label>
        </div>
      )}
    </RadioGroup.Option>
  )
}

export default RadioSimple
