import { Listbox } from '@headlessui/react'
import cx from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'

import { ChevronDownIcon } from '@/assets/icons'
import { isDefined } from '@/utils/isDefined'

export type SelectOption = { value: string; label: string }

type SelectBase = {
  placeholder?: string | undefined
  options?: SelectOption[]
  isDisabled?: boolean | undefined
}

export type SingleSelect = {
  isMulti?: false | undefined
  defaultValue?: string
  onChange?: (selection: string) => void
} & SelectBase

type MultipleSelect = {
  isMulti: true
  defaultValue?: string[]
  onChange?: (selection: string[]) => void
} & SelectBase

export type SelectFieldProps = SingleSelect | MultipleSelect

const SelectField = ({
  placeholder,
  options = [],
  isDisabled = false,
  isMulti,
  defaultValue,
  onChange = () => {},
}: SelectFieldProps) => {
  const defaultSelectedOptions = isDefined(defaultValue)
    ? isMulti
      ? (defaultValue.map((selected) =>
          options.find((option) => option.value === selected),
        ) as SelectOption[])
      : [options.find((option) => option.value === defaultValue) as SelectOption]
    : []
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(defaultSelectedOptions)

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 8] },
      },
    ],
  })

  const changeHandler = useCallback(
    (optionOrOptions: SelectOption | SelectOption[]) => {
      if (Array.isArray(optionOrOptions)) {
        setSelectedOptions(optionOrOptions)
        ;(onChange as (selection: string[]) => void)(optionOrOptions.map((o) => o.value))
      } else {
        setSelectedOptions([optionOrOptions])
        ;(onChange as (selection: string) => void)(optionOrOptions.value)
      }
    },
    [onChange],
  )

  const selectedOption = useMemo(() => {
    return selectedOptions[0]
  }, [selectedOptions])

  return (
    <Listbox
      as="div"
      className="relative flex w-full"
      value={isMulti ? selectedOptions : selectedOption}
      onChange={changeHandler}
      multiple={isMulti}
      disabled={isDisabled}
    >
      <Listbox.Button
        ref={setReferenceElement}
        as="button"
        className="group flex w-full outline-none"
      >
        {({ open }) => (
          <>
            <div className="flex h-10 w-full min-w-0 cursor-pointer select-none items-center overflow-hidden pl-4">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option, index) => (
                  <div key={option.value} className="flex whitespace-nowrap">
                    {index !== 0 && <div className="whitespace-pre-wrap">, </div>}
                    <div>{option.label}</div>
                  </div>
                ))
              ) : (
                <div className="truncate text-foreground-placeholder">{placeholder}</div>
              )}
            </div>
            <div className={cx('transform p-2 transition-transform', { 'rotate-180': open })}>
              <ChevronDownIcon />
            </div>
          </>
        )}
      </Listbox.Button>

      <Listbox.Options
        as="div"
        ref={setPopperElement as React.Ref<HTMLDivElement>}
        className="z-20 max-h-[240px] w-full flex-col overflow-y-auto border border-border bg-white outline-none"
        style={styles.popper}
        {...attributes.popper}
      >
        {options.map((option) => (
          <Listbox.Option as="div" key={option.value} value={option}>
            {({ selected, active }) => (
              <div
                className={cx('flex h-10 cursor-pointer select-none items-center px-4', {
                  'bg-primary text-white': selected,
                  'bg-background-beige': active && !selected,
                })}
              >
                {option.label}
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default SelectField
