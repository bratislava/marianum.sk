import cx from 'classnames'
import React, { useId } from 'react'
import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  OptionProps,
  Props as ReactSelectProps,
} from 'react-select'
import { twMerge } from 'tailwind-merge'

import { CheckNoPaddingIcon, ChevronDownIcon, CloseIcon } from '@/assets/icons'
import Checkbox from '@/components/atoms/Checkbox'

export type SelectOption = { value: string; label: string }

const DropdownIndicator = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  ...props
}: DropdownIndicatorProps<Option, IsMulti, Group>) => {
  const { menuIsOpen, isDisabled } = props.selectProps

  return (
    <components.DropdownIndicator {...props}>
      <div
        className={cx('p-2', {
          'rotate-180': menuIsOpen,
          'text-foreground-disabled': isDisabled,
        })}
      >
        <ChevronDownIcon />
      </div>
    </components.DropdownIndicator>
  )
}

const ClearIndicator = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>,
) => {
  return (
    <components.ClearIndicator {...props}>
      <div className="p-2">
        <CloseIcon className="scale-[80%]" />
      </div>
    </components.ClearIndicator>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon />
    </components.MultiValueRemove>
  )
}

const CustomOption = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  children,
  ...props
}: OptionProps<Option, IsMulti, Group>) => {
  const { isSelected, isMulti } = props

  return (
    <>
      <components.Option {...props}>
        <div>{children}</div>
        <div aria-hidden>
          {isMulti ? (
            <Checkbox isSelected={isSelected} />
          ) : isSelected ? (
            <CheckNoPaddingIcon aria-hidden className="text-primary" />
          ) : null}
        </div>
      </components.Option>
      <div className="mx-2 h-px bg-border last:hidden" aria-hidden />
    </>
  )
}

/**
 * Figma: https://www.figma.com/design/aSo4AQ5Rag1TmFc8jmANfP/Marianum?node-id=460-362&m=dev
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/lib/Select/Select.tsx
 */

const SelectField = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  value,
  options,
  onChange = () => null,
  className,
  ...rest
}: ReactSelectProps<Option, IsMulti, Group>) => {
  const id = useId()

  return (
    <Select
      {...rest}
      id={id}
      unstyled
      value={value}
      onChange={onChange}
      options={options}
      closeMenuOnSelect={!rest.isMulti}
      hideSelectedOptions={false}
      className={twMerge(cx('w-full', className))}
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          cx('border border-border bg-white hover:cursor-pointer hover:border-border-dark', {
            'border-border-disable': isDisabled,
            'border-border-dark': isFocused && !isDisabled,
            'border-border-default hover:border-border-hover': !isFocused && !isDisabled,
          }),
        placeholder: ({ isFocused }) =>
          cx('text-foreground-placeholder', {
            // `invisible` hides the text but keeps the placeholder container visible
            invisible: isFocused,
          }),
        // If a card with a link appears on large and medium screens, the link covers the select dropdown. The `md:z-10` ensures the select always precedes the link
        valueContainer: ({ isDisabled }) =>
          // If there's a long value in select, it stretches the parent element instead of wrapping the text.
          // `[container-type:inline-size]` fixes this for some reason.
          cx('gap-x-2 gap-y-1 px-3 py-2 [container-type:inline-size]', {
            'bg-background-disabled text-foreground-disabled': isDisabled,
          }),
        multiValue: ({ isDisabled }) =>
          cx('items-center', isDisabled ? 'bg-background-disabled' : 'bg-primary/12'),
        multiValueLabel: () => 'px-2 text-sm',
        multiValueRemove: () => 'hover:text-error h-5 [&>svg]:scale-[60%]',
        indicatorsContainer: ({ isDisabled }) =>
          cx('h-10 items-center justify-center py-2', {
            'bg-background-disabled': isDisabled,
          }),

        indicatorSeparator: ({ hasValue, isMulti }) =>
          cx('mx-1 bg-border', { hidden: !hasValue || !isMulti }),
        dropdownIndicator: () => 'p-1.5 -m-1.5',
        menu: () => 'z-20 border border-border bg-white mt-2',
        groupHeading: () => 'ml-3 mt-2 mb-1 text-foreground-placeholder text-sm',
        option: ({ isFocused }) =>
          cx('!flex items-center justify-between px-3 py-2 hover:cursor-pointer', {
            'group bg-background-beige': isFocused,
          }),
      }}
      components={{
        Option: (props) => <CustomOption {...props} />,
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
      }}
    />
  )
}

export default SelectField
