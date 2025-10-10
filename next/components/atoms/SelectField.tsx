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

import { CheckNoPaddingIcon, ChevronDownIcon, CloseIcon } from '@/assets/icons'
import Checkbox from '@/components/atoms/Checkbox'
import cn from '@/utils/cn'

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
      <ChevronDownIcon
        className={cn({
          'rotate-180': menuIsOpen,
          'text-foreground-disabled': isDisabled,
        })}
      />
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
      <CloseIcon className="scale-[80%]" />
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
  const { isMulti, isSelected } = props

  return (
    <>
      <components.Option {...props}>
        <div>{children}</div>
        <div aria-hidden>
          {isMulti ? (
            <Checkbox isSelected={isSelected} />
          ) : isSelected ? (
            <CheckNoPaddingIcon className="text-primary" />
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
      className={cn('w-full', className)}
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          cn('border border-border bg-white hover:cursor-pointer hover:border-border-dark', {
            'border-border': isDisabled,
            'border-border-dark': isFocused && !isDisabled,
            'border-border-default hover:border-border-hover': !isFocused && !isDisabled,
          }),
        placeholder: ({ isDisabled, isFocused }) =>
          cn('text-foreground-placeholder', {
            'text-foreground-disabled': isDisabled,
            // `invisible` hides the text but keeps the placeholder container visible
            invisible: isFocused,
          }),
        // If a card with a link appears on large and medium screens, the link covers the select dropdown. The `md:z-10` ensures the select always precedes the link
        valueContainer: ({ isDisabled }) =>
          // If there's a long value in select, it stretches the parent element instead of wrapping the text.
          // `[container-type:inline-size]` fixes this for some reason.
          cn('gap-x-2 gap-y-1 px-3 py-2 [container-type:inline-size]', {
            'bg-background-disabled text-foreground-disabled': isDisabled,
          }),
        multiValue: ({ isDisabled }) =>
          cn('items-center', isDisabled ? 'bg-background-disabled' : 'bg-primary/12'),
        multiValueLabel: () => 'px-2 text-sm',
        multiValueRemove: () => 'hover:text-error h-5 [&>svg]:scale-[60%]',
        indicatorsContainer: ({ isDisabled }) =>
          cn('gap-3 pr-3', {
            'bg-background-disabled': isDisabled,
          }),
        clearIndicator: () => 'p-1.5 -m-1.5 hover:bg-primary/12',
        indicatorSeparator: ({ hasValue, isMulti }) =>
          cn('my-2 bg-border', { hidden: !hasValue || !isMulti }),
        dropdownIndicator: () => 'p-1.5 -m-1.5',
        menu: () => 'z-20 border border-border-focused bg-white mt-2',
        groupHeading: () => 'ml-3 mt-2 mb-1 text-foreground-placeholder text-sm',
        option: ({ isFocused }) =>
          cn('!flex items-center justify-between px-3 py-2 hover:cursor-pointer', {
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
