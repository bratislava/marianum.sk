import { Listbox } from '@headlessui/react'
import cx from 'classnames'
import { ReactNode, useCallback, useId, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'

import ChevronDown from '../../assets/chevron_down.svg'
import { isDefined } from '../../utils/isDefined'
import FieldWrapper from './FieldWrapper'

export interface Option {
  key: string
  label: ReactNode | string
  [key: string]: unknown
}

type SelectBase = {
  id?: string
  placeholder?: string
  options?: Option[]
  disabled?: boolean
  error?: boolean
  label?: string
  required?: boolean
}

type SingleSelect = {
  multiple?: false | undefined
  defaultSelected?: string
  onSelectionChange?: (selection: string) => void
} & SelectBase

type MultipleSelect = {
  multiple: true
  defaultSelected?: string[]
  onSelectionChange?: (selection: string[]) => void
} & SelectBase

type SelectProps = SingleSelect | MultipleSelect

const Select = ({
  id,
  placeholder,
  options = [],
  disabled = false,
  error = false,
  label,
  required,
  multiple,
  defaultSelected,
  onSelectionChange = () => {},
}: SelectProps) => {
  const generatedId = useId()
  const generatedOrProvidedId = id ?? generatedId

  const defaultSelectedOptions = isDefined(defaultSelected)
    ? multiple
      ? (defaultSelected.map((selected) =>
          options.find((option) => option.key === selected),
        ) as Option[])
      : [options.find((option) => option.key === defaultSelected) as Option]
    : []
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(defaultSelectedOptions)

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [18, 8] },
      },
    ],
  })

  const changeHandler = useCallback(
    (optionOrOptions: Option | Option[]) => {
      if (Array.isArray(optionOrOptions)) {
        setSelectedOptions(optionOrOptions)
        ;(onSelectionChange as (selection: string[]) => void)(optionOrOptions.map((o) => o.key))
      } else {
        setSelectedOptions([optionOrOptions])
        ;(onSelectionChange as (selection: string) => void)(optionOrOptions.key)
      }
    },
    [onSelectionChange],
  )

  const selectedOption = useMemo(() => {
    return selectedOptions[0]
  }, [selectedOptions])

  return (
    <Listbox
      as="div"
      className="relative flex w-full"
      value={multiple ? selectedOptions : selectedOption}
      onChange={changeHandler}
      multiple={multiple}
    >
      <Listbox.Button as="button" className="group flex w-full outline-none">
        {({ open }) => (
          <FieldWrapper
            error={error}
            disabled={disabled}
            label={label}
            required={required}
            id={generatedOrProvidedId}
            hasRightSlot
          >
            <div
              ref={setReferenceElement}
              className="flex h-10 w-full min-w-0 cursor-pointer select-none items-center overflow-hidden pl-4"
            >
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option, index) => (
                  <div key={option.key} className="flex whitespace-nowrap">
                    {index !== 0 && <div className="whitespace-pre-wrap">, </div>}
                    <div>{option.label}</div>
                  </div>
                ))
              ) : (
                <div className="truncate text-foreground-placeholder">{placeholder}</div>
              )}
            </div>
            <div className={cx('transform p-2 transition-transform', { 'rotate-180': open })}>
              <ChevronDown />
            </div>
          </FieldWrapper>
        )}
      </Listbox.Button>
      <Listbox.Options
        as="div"
        ref={setPopperElement}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        style={styles.popper}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        {...attributes.popper}
        className={cx('z-20 w-full flex-col border border-border bg-white outline-none')}
      >
        {options.map((option) => (
          <Listbox.Option as="div" key={option.key} value={option}>
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

export default Select
