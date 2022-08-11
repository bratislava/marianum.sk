import { useToggleState } from '@react-stately/toggle'
import type { AriaCheckboxProps } from '@react-types/checkbox'
import cx from 'classnames'
import React, { useRef } from 'react'
import { mergeProps, useCheckbox, useFocusRing, VisuallyHidden } from 'react-aria'

import CheckIcon from '../../assets/check.svg'

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
    'mr-[14px] grid h-5 w-5 place-content-center rounded border-2 text-white',
    {
      'border-primary': !props.hasError,
      'group-hover:border-primary-dark hover:border-primary-dark':
        !props.hasError && !isDisabledOrReadonly,
      'group-hover:bg-primary-dark hover:bg-primary-dark':
        !props.hasError && !isDisabledOrReadonly && props.isSelected,
      'bg-primary': !props.hasError && props.isSelected,
      'bg-white': !props.isSelected,
      'border-error': props.hasError,
      'bg-error': props.hasError && props.isSelected,
      'bg-opacity-50 border-opacity-0': isDisabledOrReadonly && props.isSelected,
      'border-opacity-50': isDisabledOrReadonly && !props.isSelected,
      'outline outline-2 outline-black': isFocusVisible,
      'cursor-pointer': !isDisabledOrReadonly,
    },
  )

  return (
    // The eslint rule itself suggests nesting `input` inside the `label`, but is not able to detect it.
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="group flex items-center">
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div className={checkboxClassName} aria-hidden="true">
        {props.isSelected && <CheckIcon className={cx({ 'opacity-50': isDisabledOrReadonly })} />}
      </div>
      <span className="text-sm">{props.children}</span>
    </label>
  )
}

export default Checkbox
