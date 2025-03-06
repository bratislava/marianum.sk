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
import { Sort } from '@/components/molecules/SortSelect'

export type SelectOption<T extends Sort | string = string> = { value: T; label: string }

export type SelectProps<
  Option extends SelectOption<Sort | string> = SelectOption<Sort | string>,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = ReactSelectProps<Option, IsMulti, Group>

const DropdownIndicator = <
  Option extends SelectOption<Sort | string>,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  ...props
}: DropdownIndicatorProps<Option, IsMulti, Group>) => {
  const { menuIsOpen, isDisabled } = props.selectProps

  return (
    <components.DropdownIndicator {...props}>
      <div
        className={cx('transform p-2 transition-transform', {
          'rotate-180': menuIsOpen,
          'text-foreground-disabled': isDisabled,
        })}
      >
        <ChevronDownIcon />
      </div>
    </components.DropdownIndicator>
  )
}

const CustomOption = <
  Option extends SelectOption<Sort | string>,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  children,
  ...props
}: OptionProps<Option, IsMulti, Group>) => {
  const { isSelected, isFocused, isMulti } = props

  return (
    <>
      <components.Option {...props}>
        <div
          className={cx(
            'flex h-10 select-none items-center overflow-hidden text-ellipsis whitespace-nowrap px-4 hover:cursor-pointer',
            {
              'bg-primary text-white': isSelected && !isMulti,
              'bg-background-beige': (isFocused && !isSelected) || (isFocused && isMulti),
              'justify-between': isMulti,
            },
          )}
        >
          <div className="truncate">{children}</div>
          {isSelected && isMulti ? (
            <CheckNoPaddingIcon aria-hidden className="text-primary" />
          ) : null}
        </div>
      </components.Option>
      {isMulti ? (
        <div className="mx-3 border-[0.5px] border-border last:hidden" aria-hidden />
      ) : null}
    </>
  )
}

const ClearIndicator = <
  Option extends SelectOption<Sort | string>,
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

const MultiValueRemove = <
  Option extends SelectOption<Sort | string>,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueRemoveProps<Option, IsMulti, Group>,
) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon className="scale-[60%] hover:text-error" />
    </components.MultiValueRemove>
  )
}

/**
 * Figma: https://www.figma.com/design/aSo4AQ5Rag1TmFc8jmANfP/Marianum?node-id=460-362&m=dev
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/lib/Select/Select.tsx
 */

const SelectField = <
  Option extends SelectOption<Sort | string>,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  value,
  placeholder,
  options,
  isDisabled = false,
  isSearchable = false,
  isMulti,
  onChange = () => null,
  className,
  ...rest
}: SelectProps<Option, IsMulti, Group>) => {
  const id = useId()

  return (
    <Select
      id={id}
      value={value}
      placeholder={placeholder}
      options={options}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      isMulti={isMulti}
      onChange={onChange}
      hideSelectedOptions={false}
      closeMenuOnSelect={!isMulti}
      unstyled
      className={twMerge(cx('w-full', className))}
      {...rest}
      classNames={{
        container: (state) => cx('w-full', { 'md:z-10': state.selectProps.menuIsOpen }),
        // If a card with a link appears on large and medium screens, the link covers the select dropdown. The `md:z-10` ensures the select always precedes the link
        control: () =>
          cx(
            'relative flex w-full min-w-0 border border-border bg-white pl-4 pr-2 outline-none hover:cursor-pointer hover:border-border-dark',
            {
              'pl-2': isMulti,
              // This styling will be applied to the Control component and its children, such as the placeholder
              'bg-background-disabled text-foreground-disabled': isDisabled,
            },
          ),
        menu: () => 'z-20 border border-border bg-white mt-2 outline-none',
        valueContainer: () =>
          // If there's a long value in select, it stretches the parent element instead of wrapping the text.
          // `[container-type:inline-size]` fixes this for some reason.
          cx('gap-x-2 gap-y-1 [container-type:inline-size]', {
            // if rounded is not applied, the background overflows to the "control"
            'bg-background-disabled text-foreground-disabled': isDisabled,
          }),
        multiValue: () => 'items-center bg-primary bg-opacity-[12%]',
        multiValueLabel: () => 'px-2 text-sm',
        indicatorsContainer: () => 'flex items-center py-2 justify-center h-10',
        indicatorSeparator: () => cx('mx-1 bg-border', { hidden: !isMulti }),
        placeholder: ({ isFocused }) =>
          cx('truncate text-foreground-placeholder', {
            // I've noticed that `hide` hides the entire placeholder element, which is not what we want
            // `invisible` hides the text but keeps the placeholder container visible
            invisible: isFocused,
          }),
        groupHeading: () => 'ml-3 mt-2 mb-1 text-content-secondary text-sm',
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
