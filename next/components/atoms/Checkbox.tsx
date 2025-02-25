import { useToggleState } from '@react-stately/toggle'
import type { AriaCheckboxProps } from '@react-types/checkbox'
import cx from 'classnames'
import React, { useRef } from 'react'
import { mergeProps, useCheckbox, useFocusRing, VisuallyHidden } from 'react-aria'

import { CheckNoPaddingIcon } from '@/assets/icons'

/* eslint-disable react/destructuring-assignment */
/**
 * Heavily inspired by https://react-spectrum.adobe.com/react-aria/useCheckbox.html and Tailwind example provided there.
 */
const Checkbox = (
  /* isIndeterminate is not supported */
  props: Omit<AriaCheckboxProps, 'isIndeterminate'> & { hasError?: boolean },
) => {
  const state = useToggleState(props)
  const ref = useRef<HTMLInputElement>(null)
  const { inputProps } = useCheckbox(props, state, ref)
  const { focusProps, isFocusVisible } = useFocusRing()

  const isDisabledOrReadonly = props.isDisabled || props.isReadOnly
  const checkboxClassName = cx(
    'mr-[14px] grid h-5 w-5 shrink-0 place-content-center rounded border-2 text-white',
    {
      'border-primary': !props.hasError,
      'hover:border-primary-dark group-hover:border-primary-dark':
        !props.hasError && !isDisabledOrReadonly,
      'hover:bg-primary-dark group-hover:bg-primary-dark':
        !props.hasError && !isDisabledOrReadonly && props.isSelected,
      'bg-primary': !props.hasError && props.isSelected,
      'bg-white': !props.isSelected,
      'border-error': props.hasError,
      'bg-error': props.hasError && props.isSelected,
      'border-opacity-0 bg-opacity-50': isDisabledOrReadonly && props.isSelected,
      'border-opacity-50': isDisabledOrReadonly && !props.isSelected,
      'outline outline-2 outline-black': isFocusVisible,
    },
  )

  const labelClassName = cx('group flex items-center', { 'cursor-pointer': !isDisabledOrReadonly })

  return (
    // The eslint rule itself suggests nesting `input` inside the `label`, but is not able to detect it.
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={labelClassName}>
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div className={checkboxClassName} aria-hidden="true">
        {props.isSelected && (
          <CheckNoPaddingIcon className={cx({ 'opacity-50': isDisabledOrReadonly })} />
        )}
      </div>
      <span className="text-sm">{props.children}</span>
    </label>
  )
}

export default Checkbox
