import cx from 'classnames'
import React, { useId } from 'react'
import Select, {
  components,
  DropdownIndicatorProps,
  OptionProps,
  Props as ReactSelectProps,
  SingleValue,
} from 'react-select'
import { twMerge } from 'tailwind-merge'

import { ChevronDownIcon } from '@/assets/icons'

export type SelectOption<T = string> = { value: T; label: string }

export type SelectProps = {
  value?: SelectOption
  options?: SelectOption[]
  defaultValue?: SelectOption
  onChange?: (option: SingleValue<SelectOption>) => void
} & Pick<ReactSelectProps, 'placeholder' | 'isDisabled' | 'isSearchable' | 'className'>

const DropdownIndicator = <IsMulti extends boolean = false>({
  ...props
}: DropdownIndicatorProps<SelectOption, IsMulti>) => {
  const { menuIsOpen, isDisabled } = props.selectProps

  return (
    <components.DropdownIndicator {...props}>
      <div
        className={cx('transform p-2 transition-transform', {
          'rotate-180': menuIsOpen,
          'text-content-disabled': isDisabled,
        })}
      >
        <ChevronDownIcon />
      </div>
    </components.DropdownIndicator>
  )
}

const CustomOption = <IsMulti extends boolean = false>({
  children,
  ...props
}: OptionProps<SelectOption, IsMulti>) => {
  const { isSelected, isFocused } = props

  return (
    <components.Option {...props}>
      <div
        className={cx(
          'flex h-10 select-none items-center overflow-hidden text-ellipsis whitespace-nowrap px-4 hover:cursor-pointer',
          {
            'bg-primary text-white': isSelected,
            'bg-background-beige': isFocused && !isSelected,
          },
        )}
      >
        <div className="truncate">{children}</div>
      </div>
    </components.Option>
  )
}

const SelectField = ({
  value,
  placeholder,
  options,
  defaultValue,
  isDisabled = false,
  isSearchable = false,
  onChange = () => null,
  className,
}: SelectProps) => {
  const id = useId()

  return (
    <div>
      <Select
        id={id}
        value={value}
        placeholder={placeholder}
        options={options}
        isDisabled={isDisabled}
        isMulti={false}
        isSearchable={isSearchable}
        defaultValue={defaultValue}
        onChange={onChange}
        unstyled
        className={twMerge(cx('w-full', className))}
        classNames={{
          container: () => 'md:z-10',
          // If a card with a link appears on large and medium screens, the link covers the select dropdown. The `md:z-10` ensures the select always precedes the link
          control: () =>
            'relative flex h-[42px] w-full min-w-0 border border-border bg-white pl-4 pr-1 hover:cursor-pointer outline-none hover:border-border-dark',
          menu: () => 'z-20 border border-border bg-white mt-2 outline-none',
          placeholder: () =>
            cx('truncate text-foreground-placeholder', {
              'text-content-disabled': isDisabled,
            }),
        }}
        components={{
          Option: (props) => <CustomOption {...props} />,
          DropdownIndicator,
        }}
      />
    </div>
  )
}

export default SelectField
